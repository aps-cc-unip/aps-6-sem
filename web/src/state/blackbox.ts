import { useEffect, useState } from 'react'

type GenericBox = Record<string, unknown>
type Subscriber<T> = (value: T) => void
type BlackBox<T extends GenericBox> = {
  get: () => T
  set: (value: Partial<T>) => void
  subscribe: (subscriber: Subscriber<T>) => () => void
  update: (updater: (value: T) => T) => void
}

export function createBox<T extends GenericBox>(value: T): BlackBox<T> {
  let inner = value
  const subscribers: Array<Subscriber<T>> = []

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
  }
}

export function useBox<T extends GenericBox>(box: BlackBox<T>): T {
  const [state, setState] = useState(box.get())

  useEffect(() => {
    return box.subscribe(setState)
  }, [box])

  return state
}
