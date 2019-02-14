import { OvlBaseElement } from "../library/OvlBaseElement"
import { MDCFormField } from "@material/form-field"
import { MDCCheckbox } from "@material/checkbox"
import { MDCTextField } from "@material/textfield"
import { Action } from "../index"

// import { OmcCheckbox } from "../library/OmcCheckbox/OmcCheckbox"

// customElements.define("ome-checkbox", OmcCheckbox)

import { html } from "lit-html"

export type CheckBoxAttributes = {
  id: string
  disabled?: boolean
  label?: string
  checkedState: CheckBoxState
  visible: boolean
}

export type TextBoxState = {
  valueState: { value: string }
  label: string
  id: string
  visible: boolean
}

type CheckBoxState = {
  checked: boolean
}
type CheckboxCheckedParam = {
  checkedState: { checked: boolean }
  checked: boolean
}
export const OmcCheckBoxChecked: Action<CheckboxCheckedParam> = ({
  value,
  state
}) => {
  console.log("new value(s) selected:")
  console.log(value)
  value.checkedState.checked = value.checked
}

type OmcTextBoxChangedParam = {
  valueState: { value: string }
  value: string
}

export const OmcTextBoxValueChanged: Action<OmcTextBoxChangedParam> = ({
  value,
  state
}) => {
  console.log("new value(s) selected:")
  console.log(value)
  value.valueState.value = value.value
}

export class CompOmc extends OvlBaseElement {
  props: any
  formFields: any
  checkboxes: any
  textboxes: any
  checkBox1: CheckBoxAttributes
  checkBox2: CheckBoxAttributes
  textBox1: TextBoxState

  handleChange = e => {
    console.log(e)

    switch (e.target.id) {
      case this.checkBox1.id:
        console.log("chk1")
        this.actions.OmcCheckBoxChecked({
          checkedState: this.checkBox1.checkedState,
          checked: !this.checkBox1.checkedState.checked
        })
        break
      case this.checkBox2.id:
        console.log("chk2")
        this.actions.OmcCheckBoxChecked({
          checkedState: this.checkBox2.checkedState,
          checked: !this.checkBox2.checkedState.checked
        })

        break

      case this.textBox1.id:
        this.actions.OmcTextBoxValueChanged({
          valueState: this.textBox1.valueState,
          value: e.target.value
        })
        break
    }
  }
  init() {
    this.addEventListener("change", this.handleChange)
    this.checkBox1 = this.props(this.state).checkBox1
    this.checkBox2 = this.props(this.state).checkBox2
    this.textBox1 = this.props(this.state).textBox1
  }
  getUI() {
    return html`
      <div class="mdc-form-field">
        <div
          style="visibility:${this.checkBox1.visible ? "visible" : "hidden"};"
          class="mdc-checkbox"
        >
          <input
            type="checkbox"
            id="${this.checkBox1.id}"
            class="mdc-checkbox__native-control"
            ?checked=${this.checkBox1.checkedState.checked}
          />
          <div class="mdc-checkbox__background"></div>
        </div>

        <label
          style="visibility:${this.checkBox1.visible ? "visible" : "hidden"};"
          for="${this.checkBox1.id}"
          >${this.checkBox1.label}</label
        >
        <div class="mdc-checkbox">
          <input
            type="checkbox"
            id="${this.checkBox2.id}"
            class="mdc-checkbox__native-control"
            ?checked=${this.checkBox2.checkedState.checked}
          />
          <div class="mdc-checkbox__background"></div>
        </div>
        <label for="${this.checkBox2.id}">${this.checkBox2.label}</label>

        <div class="mdc-text-field">
          <input
            value="${this.textBox1.valueState.value}"
            type="text"
            id="${this.textBox1.id}"
            class="mdc-text-field__input"
          />
          <label class="mdc-floating-label" for="${this.textBox1.id}"
            >${this.textBox1.label}</label
          >
          <div class="mdc-line-ripple"></div>
        </div>
      </div>
    `
  }
  afterRender() {
    this.formFields = document.querySelectorAll(".mdc-form-field")
    this.checkboxes = document.querySelectorAll(".mdc-checkbox")
    this.textboxes = document.querySelectorAll(".mdc-text-field")

    this.formFields.forEach(n => {
      new MDCFormField(n)
    })

    this.checkboxes.forEach(n => {
      new MDCCheckbox(n)
    })

    this.textboxes.forEach(n => {
      new MDCTextField(n)
    })

    //this.formField.input = this.checkbox1
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.formFields.forEach(n => {
      n.destroy()
    })
    this.checkboxes.forEach(n => {
      n.destroy()
    })
    this.textboxes.forEach(n => {
      n.destroy()
    })
    this.removeEventListener("change", this.handleChange)
  }
}
