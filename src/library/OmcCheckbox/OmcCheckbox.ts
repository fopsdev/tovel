import { OvlBaseElement } from "../../library/OvlBaseElement"
import { MDCCheckbox } from "@material/checkbox"
import { MDCFormField } from "@material/form-field"

import { Action } from "../../index"

import { html } from "lit-html"

export type CheckBoxAttributes = {
  id: string
  disabled?: boolean
  label?: string
  checkedState: CheckBoxState
  visible: boolean
}

type CheckBoxState = {
  checked: boolean
}
type CheckboxCheckedParam = {
  checkedState: { checked: boolean }
  checked: boolean
}
export const OmcCheckBoxChecked: Action<CheckboxCheckedParam> = async (
  { state },
  value
) => {
  console.log("new value(s) selected:")
  console.log(value)
  value.checkedState.checked = value.checked
}

export class OmcCheckbox extends OvlBaseElement {
  props: any
  mdcEl: any
  mdcForm: any
  checkBox: CheckBoxAttributes

  handleChange = e => {
    console.log("chk1")
    this.actions.OmcCheckBoxChecked({
      checkedState: this.checkBox.checkedState,
      checked: !this.checkBox.checkedState.checked
    })
  }

  init() {
    this.addEventListener("change", this.handleChange)
    this.checkBox = this.props(this.state)
  }
  getUI() {
    return html`
      <div class="mdc-form-field">
        <div class="mdc-checkbox">
          <input
            type="checkbox"
            id="${this.checkBox.id}"
            class="mdc-checkbox__native-control"
            ?checked=${this.checkBox.checkedState.checked}
          />
          <div class="mdc-checkbox__background"></div>
        </div>
        <label for="${this.checkBox.id}">${this.checkBox.label}</label>
      </div>
    `
  }
  afterRender() {
    if (!this.mdcEl) {
      this.mdcForm = new MDCFormField(this.querySelector(".mdc-form-field"))
      this.mdcEl = new MDCCheckbox(this.querySelector(".mdc-checkbox"))
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.mdcEl.destroy()
    this.mdcForm.destroy()
    this.removeEventListener("change", this.handleChange)
  }
}
customElements.define("omc-checkbox", OmcCheckbox)
