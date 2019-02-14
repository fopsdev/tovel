import { OvlBaseElement } from "../library/OvlBaseElement"
import { MDCFormField } from "@material/form-field"

import { OmcCheckbox } from "../library/OmcCheckbox/OmcCheckbox"
import { OmcTextbox } from "../library/OmcTextbox/OmcTextbox"

import { html } from "lit-html"

export class CompOmc extends OvlBaseElement {
  getUI() {
    return html`
      <omc-checkbox .props=${state => state.checkBox1}></omc-checkbox>
      <omc-checkbox .props=${state => state.checkBox2}></omc-checkbox>
      <omc-textbox .props=${state => state.textBox1}></omc-textbox>
    `
  }
}
