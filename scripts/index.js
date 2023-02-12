import { checkSumbitButton } from "./check-submit-button.js"
import "./components/radio-wrapper.js"
import { handleError } from "./handle-error.js"

import { findParent } from "./helpers.js"

const Form = document.querySelector("form")
const allInputs = [...document.querySelectorAll("input[type=text]")]

export const handleChange = ev => {
  const input = ev.target
  const value = input.value
  const numericValue = parseFloat(value)

  checkSumbitButton()

  if (value === "") {
    handleError(input, "not-positive", "remove")
    handleError(input, "nan-number", "remove")
  };
  /* NaN Error */
  if (isNaN(numericValue) || numericValue != value) {
    handleError(input, "not-positive", "remove")
    handleError(input, "nan-number", "add")
    return;
  }

  handleError(input, "nan-number", "remove")
  if (numericValue > 0) {
    handleError(input, "not-positive", "remove")
  } else {
    handleError(input, "not-positive", "add")
  }

  /* Disable / enable form */
  // const Button = document.querySelector("button")
}

const submitError = () => {
  console.log()
  // alert("There is an unsolved error") 
}

const getInputValue = (parentNode) => {
  const {value} = parentNode.querySelector("input[type=text]")
  /* Si no es un número válido o el número */
  // console.log(value)
  if (parseFloat(value) != value || parseFloat(value) <= 0) return undefined;
  return parseFloat(value)
}

export const getRadioValue = () => {

  const allRadios = [...document.querySelectorAll("input[type=radio][name='tip-amount']")]
  const CheckedRadio = allRadios.filter(el => el.checked)[0]
  console.log("Checked radio:")
  console.log(CheckedRadio)
  if (CheckedRadio === undefined) {
    return undefined;
  }
  const ShownButton = document.querySelector(`label[for=${CheckedRadio.id}] .button`)
  // Regular Button
  if (CheckedRadio.value !== "custom") {
    return parseInt(CheckedRadio.value)
  } else {
    // Input button is valid
    // This should be applied when on focus
    // handleChange({target: ShownButton})
    if (findParent(CheckedRadio, "error") === null) {
      return parseFloat(ShownButton.value)
    }
    return undefined
  }
}

const handleSubmit = ev => {
  ev.preventDefault()

  /* If the 2 large inputs don't have errors, it's ok */
  const largeInputWrappers = [...document.querySelectorAll("label.input-wrapper")]
  const inputValues = []
  for (let i = 0; i < largeInputWrappers.length; i++) {
    const InputWrapper = largeInputWrappers[i]
    const newValue = getInputValue(InputWrapper)
    if (newValue === undefined) {
      submitError()
      return;
    }
    inputValues.push(newValue)
  }

  
  /* If the radio selected isn't the input, it's ok */
  const radioValue = getRadioValue()
  if (radioValue === undefined) {
    submitError()
    return;
  }
  

  /* All forms were validaded!!! */
  const TipOutput = document.querySelector("#tip-amount")
  const TotalOutput = document.querySelector("#total-amount")

  const tip = inputValues[0] * radioValue / 100 / inputValues[1]
  console.log(tip)
  TipOutput.textContent = tip.toFixed(2)
  TotalOutput.textContent = (inputValues[0] / inputValues[1] + tip).toFixed(2)

}

/* Input validation */
allInputs.forEach(el => el.addEventListener("input", handleChange))

/* Validate all on submit */
Form.addEventListener("submit", handleSubmit)