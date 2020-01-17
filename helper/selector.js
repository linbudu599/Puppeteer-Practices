function $(selector, node) {
  return (node || document).querySelector(selector);
}

function $$(selector, node) {
  return (node || document).querySelectorAll(selector);
}
