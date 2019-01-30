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
    console.log(this.state)
    overmind.actions.OvlTableChangeSort({
      TableState: this.state.myState.myTable,
      Data: this.state.tblTableTestData,
      ColumnId: this.state.myState.myTable.Sort.Field
    })
  }
  // add1000Rows(e) {
  //   overmind.actions.add1000Rows()
  // }

  getUI() {
    return html`
      <div class="o-container o-container--super">
        <button @click="${this.changeFirstName}">${this.state.foo}</button>
        <button @click="${this.add1000Rows}">add100Rows</button>
        <ovl-table
          id="tabletest"
          .props="${
            <TableProps>{
              tableStatePath: "myState.myTable"
            }
          }"
        >
        </ovl-table>
      </div>
    `
  }
}
