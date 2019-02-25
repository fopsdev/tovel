import { OvlBaseElement } from "../OvlBaseElement"
import { MDCTextField } from "@material/textfield"
import { Action } from "../../index"
import { html } from "lit-html"

type OmcTextBoxChangedParam = {
  valueState: { value: string }
  value: string
}

export type TextBoxState = {
  valueState: { value: string }
  label: string
  id: string
  visible: boolean
}

export const OmcTextBoxValueChanged: Action<OmcTextBoxChangedParam> = (
  _,
  value
) => {
  console.log("new value(s) selected:")
  console.log(value)
  value.valueState.value = value.value
  _.state.tab1.activeTab = "tab2"
}

export class OmcTextbox extends OvlBaseElement {
  props: any
  mdcEl: any

  textBox: TextBoxState

  handleChange = e => {
    this.actions.OmcTextBoxValueChanged({
      valueState: this.textBox.valueState,
      value: e.target.value
    })
  }

  init() {
    this.addEventListener("change", this.handleChange)
    this.textBox = this.props(this.state)
  }
  getUI() {
    return html`
      <div class="mdc-text-field">
        <input
          value="${this.textBox.valueState.value}"
          type="text"
          id="${this.textBox.id}"
          class="mdc-text-field__input"
        />
        <label class="mdc-floating-label" for="${this.textBox.id}"
          >${this.textBox.label}</label
        >
        <div class="mdc-line-ripple"></div>
      </div>
    `
  }
  afterRender() {
    if (!this.mdcEl) {
      this.mdcEl = new MDCTextField(this.querySelector(".mdc-text-field"))
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.mdcEl.destroy()
    this.removeEventListener("change", this.handleChange)
  }
}
