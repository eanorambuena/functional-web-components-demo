import { html as h } from 'emmy-dom';

export const html = (strings, ...values) => {
  let parsedValues = values.map(value => {
    if (typeof value === 'function') {
      const functionString = value.name
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\n/g, ';')
        .replace(/ /g, '')
        .replace(/\t/g, '')
      return `"(${functionString})()"`
    }
    return value
  })
  return h(strings, ...parsedValues).replace(/@/g, 'use')
}
  
export function useEvent(el, eventName, dependencies = []) {
  dependencies.forEach((dependency) => {
    globalThis[dependency.name] = dependency
  })
  const useEventName = `use${eventName}`
  el.useEffect(() => {
    const eventListeners = el.querySelectorAll(`[${useEventName}]`)
    eventListeners.forEach((element) => {
      const event = element.getAttribute(useEventName)
      element.addEventListener(eventName, () => {
        eval(event)
        el.rerender()
      })
    })
  }, [])
}

export const useClick = (el, dependencies) => useEvent(el, 'click', dependencies)
