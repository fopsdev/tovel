import { OvlBaseElement } from "../OvlBaseElement"
import { Action } from "../../index"
//import { setTabbable } from "../OmeUtils/utils"

type CheckboxCheckedParam = {
  checkedState: { checked: boolean }
  checked: boolean
}

export const OmeCheckBoxChecked: Action<CheckboxCheckedParam> = ({
  value,
  state
}) => {
  console.log("new value(s) selected:")
  console.log(value)
  value.checkedState.checked = value.checked
}

export type CheckBoxAttributes = {
  id: string
  disabled?: boolean
  label?: string
  checkedState: CheckBoxState
}

type CheckBoxState = {
  checked: boolean
}

export class CheckBox extends OvlBaseElement {
  props: any
  checkBoxAttributes: CheckBoxAttributes
  inputEl: HTMLInputElement
  labelEl: HTMLLabelElement
  svgEl: SVGAElement
  svgId: string

  handleChange = e => {
    this.actions.OmeCheckBoxChecked({
      checkedState: this.checkBoxAttributes.checkedState,
      checked: !this.checkBoxAttributes.checkedState.checked
    })
  }
  init() {
    this.style.cssText =
      "display: grid; grid-template-rows: 1fr; grid-template-columns: 1fr 1fr 1fr; "
    this.checkBoxAttributes = this.props(this.state)
    let id = this.name + "-" + this.checkBoxAttributes.id
    this.setAttribute("id", id)

    let labelEl: HTMLLabelElement
    if (this.checkBoxAttributes.label) {
      labelEl = document.createElement("label")
      //labelEl.setAttribute("for", this.checkBoxAttributes.id)
      //labelEl.style.cssText = "margin-left: 1.5em;margin-top: 1.5em"
      this.appendChild(labelEl)
      this.labelEl = labelEl
    }

    let inputEl = document.createElement("input")
    inputEl.setAttribute("type", "checkbox")
    inputEl.setAttribute("tabindex", "-1")
    this.appendChild(inputEl)
    this.inputEl = inputEl
    this.svgId = id + "svg"
    let iconSVG = `
    <svg height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
      <path id="${this.svgId +
        "checked"}" style="visibility: visible;" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      <path id="${this.svgId +
        "unchecked"}" style="visibility: visible;" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>`

    this.insertAdjacentHTML("afterbegin", iconSVG)
    this.addEventListener("click", this.handleChange)
  }
  setUI() {
    let checkedVisibility = "hidden"
    let uncheckedVisibility = "visible"
    console.log("setUI")

    this.labelEl.innerText = this.checkBoxAttributes.label
    let inputEl: HTMLInputElement = this.inputEl
    Object.keys(this.checkBoxAttributes).forEach(key => {
      let val = this.checkBoxAttributes[key]
      switch (key) {
        case "checkedState":
          val = val.checked
          if (val) {
            checkedVisibility = "visible"
            uncheckedVisibility = "hidden"
            inputEl.setAttribute("checked", "")
          } else {
            inputEl.removeAttribute("checked")
          }
          break
        case "disabled":
          if (val) {
            inputEl.setAttribute(key, "")
          } else {
            inputEl.removeAttribute(key)
          }
          break
        case "label":
          break
        default:
          inputEl.setAttribute(key, val)
          break
      }
    })

    document
      .getElementById(this.svgId + "checked")
      .setAttribute("style", `visibility: ${checkedVisibility};`)
    document
      .getElementById(this.svgId + "unchecked")
      .setAttribute("style", `visibility: ${uncheckedVisibility};`)
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("click", this.handleChange)
  }
}
