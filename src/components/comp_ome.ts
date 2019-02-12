import { OvlBaseElement } from "../library/OvlBaseElement"

import {
  CheckBox,
  CheckBoxAttributes
} from "../library/OmeCheckbox/OmeCheckBox"

customElements.define("ome-checkbox", CheckBox)

import { html } from "lit-html"

export class CompOme extends OvlBaseElement {
  getUI() {
    return html`
      <ome-checkbox tabindex="2" .props=${state => state.checkBox1}>
      </ome-checkbox>
      <ome-checkbox tabindex="1" .props=${state => state.checkBox2}>
      </ome-checkbox>
    `
  }
}
