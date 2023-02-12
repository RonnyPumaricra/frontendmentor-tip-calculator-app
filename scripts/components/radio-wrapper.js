import { checkSumbitButton } from "../check-submit-button.js"
import { handleChange } from "../index.js"

const radioData = [
  5,
  10,
  15,
  25,
  50,
  "custom"
]

const RadioWrapper = document.querySelector("#radio-wrapper")

let extraInnerHTML = ""

const getId = data => `"tip-${data}"`

radioData.forEach(data => {
  const id = getId(data)
  const button = typeof data === "number"
    ? /* html */ `
      <div class="button">${data}%</div>
    `
    : /* html */ `
      <input type="text" class="button" placeholder="Custom">
    `
  
  const newInnerHTML = /* html */`
    <input type="radio" name="tip-amount" id=${id} value=${data}>
    <label for=${id}>${button}</label>
  `
  
  extraInnerHTML += newInnerHTML
})

RadioWrapper.innerHTML = extraInnerHTML

/* Check radio when editing the custom input */
RadioWrapper.querySelector("input.button").addEventListener("focus", (e) => {
  const HiddenRadio = RadioWrapper.querySelector("input#tip-custom")
  HiddenRadio.checked = true

  const ShownButton = document.querySelector(`label[for=tip-custom] .button`)
  handleChange({target: ShownButton})
})

/* Enable/disable submit button whenever a radio gets toggled */
RadioWrapper.querySelectorAll("input[type=radio]").forEach(el => {
  el.addEventListener("change", (e) => {
    console.log(el.checked)
    if (el.checked) checkSumbitButton()
  })
})