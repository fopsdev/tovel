import { OvlBaseElement, TableData, BaseTable } from "../library/index"
import { app, state as untracked } from "../index"
import { html } from "lit-html"

export class CompA extends OvlBaseElement {
  parentData: TableData

  handleEvent(e) {
    app.actions.changeFirstName1()
  }

  constructor() {
    super()
  }
  initProps() {
    //prepare the props we will hand over to the table comp
    super.initProps()
    this.parentData = {
      table: this.state.myState.myTable,
      data: this.state.tblTableTestData,
      untrackedData: untracked.tblTableTestData
    }
  }
  getUI() {
    return html`
      <div>${this.state.foo}</div>
      <button @click="${this.handleEvent}">changeFirstName1</button>
      <ovl-table
        id="tabletest"
        .getData="${
          () => ({
            table: this.parentData.table,
            data: this.parentData.data,
            untrackedData: this.parentData.untrackedData
          })
        }"
      >
      </ovl-table>
    `
  }
}
