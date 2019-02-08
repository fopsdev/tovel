import { OvlBaseElement } from "../library/OvlBaseElement"

import { OmlTab } from "../library/OmlTab/OmlTab"
import { OmlSelect } from "../library/OmlSelect/OmlSelect"

customElements.define("oml-select", OmlSelect)
customElements.define("oml-tab", OmlTab)

import { html } from "lit-html"

export class CompOml extends OvlBaseElement {
  getUI() {
    return html`
      <div>
        <oml-tab id="tabletest" .props="${() => this.state.tabState}">
        </oml-tab>
        <oml-select id="selecttest" .props="${() => this.state.selectState}">
        </oml-select>
      </div>
    `
  }
}
