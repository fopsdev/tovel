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

  // add1000Rows(e) {
  //   overmind.actions.add1000Rows()
  // }

  prepare() {
    let shouldnotbetracked = this.state.foo2
  }
  getUI() {
    return html`
      <div class="o-container o-container--super">
        <button @click="${this.changeFirstName}">${this.state.foo}</button>

        <ovl-table
          id="tabletest"
          .props="${
            {
              tableStatePath: "myState.myTable"
            }
          }"
        >
        </ovl-table>
      </div>
    `
  }
}
