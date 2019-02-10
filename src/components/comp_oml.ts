import { OvlBaseElement } from "../library/OvlBaseElement"

import { OmlTab } from "../library/OmlTab/OmlTab"
import { OmlSelect } from "../library/OmlSelect/OmlSelect"

customElements.define("oml-select", OmlSelect)
customElements.define("oml-tab", OmlTab)

import { html } from "lit-html"

export class CompOml extends OvlBaseElement {
  SelectOptions = () => {
    this.actions.SelectOption()
  }
  getUI() {
    return html`
      <div>
        <button @click="${this.SelectOptions}">SelectOptions</button>
        <oml-tab id="tabletest" .props="${() => this.state.tabState}">
        </oml-tab>
        <oml-select id="selecttest" .props="${() => this.state.selectState}">
        </oml-select>
      </div>
    `
  }
}
