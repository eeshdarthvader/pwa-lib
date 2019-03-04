export const getDistanceFromTop = el => {
  const rect = el.getBoundingClientRect()
  const docEl = document.documentElement
  return rect.top + (window.pageYOffset || docEl.scrollTop || 0)
}

export const calculateHeight = el => {
  const distanceFromTop = getDistanceFromTop(el)
  const totalHeight = window.innerHeight
  const height = totalHeight - distanceFromTop
  return height
}
