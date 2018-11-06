import { OvlBaseElement, TableData } from "../library/index"
import { app } from "../index"
import { html } from "lit-html"

export class CompA extends OvlBaseElement {
  parentData: TableData
  constructor() {
    super()
    this.onclick = e => {
      app.actions.changeFoo()
    }
  }
  initProps() {
    //prepare the props we will hand over to the table comp
    super.initProps()
    this.parentData = {
      table: this.state.myState.myTable,
      data: this.state.tblTableTestData
    }
  }
  getUI() {
    return html`
    <div>${this.state.foo}</div>

    <custom-table-a id="tabletest" 
    .getData=${() => ({
      table: this.parentData.table,
      data: this.parentData.data
    })}>
    </custom-table-a>

    
    `
  }
}
