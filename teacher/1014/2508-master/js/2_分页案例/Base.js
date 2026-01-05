class Base {
  $(el, parent = document) {
    return parent.querySelector(el)
  }
  $all(el, parent = document) {
    return [...parent.querySelectorAll(el)]
  }
}