export function debounce(func, immediate) {
  let timeout
  return function executedFunction() {
    const context = this
    const args = arguments

    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, 500)
    if (callNow) func.apply(context, args)
  }
}
