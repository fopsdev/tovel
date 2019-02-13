import { OvlBaseElement } from "../library/OvlBaseElement"
import { MDCFormField } from "@material/form-field"
import { MDCCheckbox } from "@material/checkbox"
import { Action } from "../index"

// import { OmcCheckbox } from "../library/OmcCheckbox/OmcCheckbox"

// customElements.define("ome-checkbox", OmcCheckbox)

import { html } from "lit-html"

export type CheckBoxAttributes = {
  id: string
  disabled?: boolean
  label?: string
  checkedState: CheckBoxState
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

export class CompOmc extends OvlBaseElement {
  props: any
  formFields: any
  checkboxes: any
  checkBox1: CheckBoxAttributes

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
    }
  }
  init() {
    this.addEventListener("change", this.handleChange)
    this.checkBox1 = this.props(this.state)
  }
  getUI() {
    return html`
      <div class="mdc-form-field">
        <div class="mdc-checkbox">
          <input
            type="checkbox"
            id="${this.checkBox1.id}"
            class="mdc-checkbox__native-control"
            ?checked=${this.checkBox1.checkedState.checked}
          />
          <div class="mdc-checkbox__background"></div>
        </div>
        <label for="${this.checkBox1.id}">${this.checkBox1.label}</label>
      </div>
    `
  }
  afterRender() {
    this.formFields = document.querySelectorAll(".mdc-form-field")
    this.checkboxes = document.querySelectorAll(".mdc-checkbox")
    this.formFields.forEach(n => {
      new MDCFormField(n)
    })

    this.checkboxes.forEach(n => {
      new MDCCheckbox(n)
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
    this.removeEventListener("change", this.handleChange)
  }
}
