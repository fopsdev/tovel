import { OvlBaseElement } from "../library/OvlBaseElement"
import { TableProps } from "../library/OvlTableHeaderElement"
// import { OvlAutoComplete, AutoCompleteProps } from "../library/OvlAutoComplete"
// import {
//   NativeDateInput,
//   NativeDateInputProps
// } from "../library/nativeDateInput"
import { OvlTable } from "../library/OvlTableHeaderElement"
import { OvlTableRow } from "../library/OvlTableRowElement"

customElements.define("ovl-table", OvlTable)
customElements.define("ovl-row", OvlTableRow)
// customElements.define("auto-complete", OvlAutoComplete)
// customElements.define("date-input", NativeDateInput)
import { overmind } from "../index"
import { html } from "lit-html"

export class CompA extends OvlBaseElement {
  changeFirstName(e) {
    overmind.actions.changeFirstName1()
  }
  add1000Rows = e => {
    overmind.actions.add1000Rows()
    overmind.actions.OvlTableRefresh(this.state.myState.myTableA)
    overmind.actions.OvlTableRefresh(this.state.myState.myTableB)
  }

  getUI() {
    return html`
      <div class="o-container o-container--super">
        <button @click="${this.changeFirstName}">changeFirstName.1</button>
        <button @click="${this.add1000Rows}">add100Rows</button>
        <ovl-table
          id="tabletest"
          .props="${<TableProps>{
            tableStatePath: "myState.myTableA"
          }}"
        >
        </ovl-table>

        <ovl-table
          id="tabletest2"
          .props="${<TableProps>{
            tableStatePath: "myState.myTableB"
          }}"
        >
        </ovl-table>
      </div>
    `
  }
}
