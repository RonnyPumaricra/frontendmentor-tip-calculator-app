import { findParent } from "./helpers.js"

/**
 * @param {HTMLInputElement} e
 * @param {"add" | "remove"} action
 */
export const handleError = (inputElem, errorType, action) => {
  findParent(inputElem, "input-wrapper").classList[action]("error", errorType)
}