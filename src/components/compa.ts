import { OvlSimpleElement, TableData } from "../library/index"
import { app } from "../index"

//import * as untrackedState from "../state"
import { html } from "lit-html"

export class CompA extends OvlSimpleElement {
  parentData: TableData
  constructor() {
    super()

    this.onclick = e => {
      app.actions.changeFoo()
    }
  }
  prepare() {
    this.parentData = {
      table: this.state.TableTest,
      data: this.state.tblTableTestData
    }
  }
  getUI() {
    return html`
    <div>${this.state.foo}</div>
    <div>${this.props.Key}</div>
    <table-a 
      .table=${this.parentData.table} 
      .data=${this.parentData.data}>
    </table-a>
    <custom-table-a 
      .table=${this.parentData.table} 
      .data=${this.parentData.data}>
    </custom-table-a>
    
    `
  }
}
