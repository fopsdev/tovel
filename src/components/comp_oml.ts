import { OvlBaseElement } from "../library/OvlBaseElement"

import { OmlTab } from "../library/OmlTab/OmlTab"

customElements.define("oml-tab", OmlTab)

import { overmind } from "../index"
import { html } from "lit-html"

export class CompOml extends OvlBaseElement {
  getUI() {
    return html`
      <div>
        <oml-tab id="tabletest" .props="${() => this.state.tabState}">
        </ovl-table>
      </div>
    `
  }
}
