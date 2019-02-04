import { OvlBaseElement } from "../library/OvlBaseElement"
import {
  TableProps,
  BaseData,
  BaseTable
} from "../library/OvlTableHeaderElement"

import { OvlTable } from "../library/OvlTableHeaderElement"
import { OvlTableRow } from "../library/OvlTableRowElement"

customElements.define("ovl-table", OvlTable)
customElements.define("ovl-row", OvlTableRow)

import { overmind } from "../index"
import { html } from "lit-html"

export class CompA extends OvlBaseElement {
  changeFirstName(e) {
    overmind.actions.changeFirstName1()
  }
  add1000Rows = e => {
    overmind.actions.Add1000Properly([
      this.state.myState.myTableA,
      this.state.myState.myTableB
    ])
    // overmind.actions.add1000Rows()
    // overmind.actions.OvlTableRefresh(this.state.myState.myTableA)
    // overmind.actions.OvlTableRefresh(this.state.myState.myTableB)
  }

  getUI() {
    return html`
      <div class="o-container o-container--super">
        <button @click="${this.changeFirstName}">changeFirstName.1</button>
        <button @click="${this.add1000Rows}">add100Rows</button>
        <ovl-table id="tabletest" .props="${() => this.state.myState.myTableA}">
        </ovl-table>

        <ovl-table
          id="tabletest2"
          .props="${() => this.state.myState.myTableB}"
        >
        </ovl-table>
      </div>
    `
  }
}
