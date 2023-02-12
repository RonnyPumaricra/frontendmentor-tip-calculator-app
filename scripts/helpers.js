
const hasObject = ogObject => ({
  theseProps: keysObject => {
    for (let key in keysObject) {
      if (ogObject[key] !== keysObject[key]) return false
    }
    return true
  }
})
/**
 * 
 * @param {*} elem 
 * @param {*} parentProps 
 * @returns {HTMLElement}
 */
export const findParent = (elem, className) => {
  /** @type {HTMLElement} */
  let parent = elem.parentElement
  let counter = 0
  while (!parent.classList.contains(className)) {
    counter++
    parent = parent.parentElement
    // console.log(parent)
    if (parent.tagName === "BODY" || counter >= 100) return null
  }
  return parent
}

export const isValidNum = value => value !== "" && !isNaN(parseFloat(value)) && parseFloat(value) == value && parseFloat(value) > 0