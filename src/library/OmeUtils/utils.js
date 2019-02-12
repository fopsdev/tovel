export function setTabbable(el, fn) {
  if (el.getAttribute("tabindex")) {
    el.addEventListener("keypress", function(event) {
      if (event.key === " " || event.key === "Enter") {
        fn && fn()
        event.preventDefault()
      }
    })
  }
}
