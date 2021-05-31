document.querySelector('.faq-block').addEventListener('click', (e) => {
  // e.currentTarget 取到加上監聽器的元素
  const element = closest(e.target, 'faq-item')
  if (element) {
    e.target.closest('.faq-item').classList.toggle('faq-item__hide')
  }
})

function closest(node, className) {
  while (node && node.classList) {
    if (node.classList.contains(className)) {
      return node
    }
    node = node.parentNode
  }
}

/*
function closestRecursive(node, className) {
  if (!node || !node.classList) return null
  if (node.classList.contains(className)) {
    return node
  }
  return closestRecursive(node.parentNode, className)
}
*/
