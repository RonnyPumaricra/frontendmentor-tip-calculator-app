import { isValidNum } from "./helpers.js"
import { getRadioValue } from "./index.js"

const SubmitButton = document.querySelector("button")

export const checkSumbitButton = () => {
  const billValue = document.querySelector("#bill").value
  const peopleValue = document.querySelector("#num-of-people").value
  // Disable if these have errors
  // console.log("radio", getRadioValue(), typeof getRadioValue())
  if (!isValidNum(billValue) || !isValidNum(peopleValue) || !isValidNum(getRadioValue())) {
    SubmitButton.disabled = true
    return;
  }

  SubmitButton.disabled = false
}