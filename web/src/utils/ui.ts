interface PreventDefault {
  preventDefault: () => void
}

interface StopPropagation {
  stopPropagation: () => void
}

export function preventDefault<Event extends PreventDefault>(
  fn: (event: Event) => void
) {
  return (event: Event) => {
    event.preventDefault()
    fn(event)
  }
}

export function stopPropagation<Event extends StopPropagation>(
  fn: (event: Event) => void
) {
  return (event: Event) => {
    event.stopPropagation()
    fn(event)
  }
}
