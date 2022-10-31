import { useEffect, useState } from 'react'

type GenericBox = Record<string, unknown>
type Subscriber<T> = (value: T) => void
type BlackBox<T extends GenericBox> = {
  get: () => T
  set: (value: Partial<T>) => void
  subscribe: (subscriber: Subscriber<T>) => () => void
  update: (updater: (value: T) => T) => void
  reset: () => void
}

export function createBox<T extends GenericBox>(value: T): BlackBox<T> {
  let inner = value
  const zero = structuredClone(value)
  const subscribers: Array<Subscriber<T>> = []

  const reset = () => {
    inner = zero
  }

  const get = () => {
    return inner
  }

  const set = (value: Partial<T>) => {
    inner = Object.assign({}, inner, value)
    subscribers.forEach((subscriber) => subscriber(inner))
  }

  const update = (fn: (value: T) => T) => {
    const clone = Object.assign({}, inner)

    fn(clone)
    inner = clone

    subscribers.forEach((subscriber) => subscriber(inner))
  }

  const subscribe = (subscriber: Subscriber<T>) => {
    subscribers.push(subscriber)

    return () => {
      const index = subscribers.indexOf(subscriber)
      subscribers.splice(index, 1)
    }
  }

  return {
    get,
    set,
    update,
    subscribe,
    reset,
  }
}

export function useBox<T extends GenericBox>(box: BlackBox<T>): T {
  const [state, setState] = useState(box.get())

  useEffect(() => {
    return box.subscribe(setState)
  }, [box])

  return state
}

type ProxyState<T extends Record<string, unknown>> = T & {
  subscribe: (fn: (state: ProxyState<T>) => void) => void
}

export function createProxy<T extends Record<string, unknown>>(
  initial: T,
): ProxyState<T> {
  const subscribers: ((state: ProxyState<T>) => void)[] = []
  return new Proxy(
    {
      ...initial,
      subscribe: (fn: (state: ProxyState<T>) => void) => {
        subscribers.push(fn)
        return () => {
          const index = subscribers.indexOf(fn)
          subscribers.splice(index, 1)
        }
      },
    },
    {
      get: (target, key) => {
        return target[key as keyof T]
      },
      set: (target, key, value) => {
        target[key as keyof T] = value
        subscribers.forEach((fn) => fn(target))
        return true
      },
    },
  )
}

export function useProxy<T extends Record<string, unknown>>(
  proxy: ProxyState<T>,
): ProxyState<T> {
  const [, setState] = useState(proxy)

  useEffect(() => {
    return proxy.subscribe(setState)
  }, [proxy])

  return proxy
}
