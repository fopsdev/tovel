import { OvlSimpleElement } from "../library/index"
import { TableA, UserTable, TableTest } from "./tablea"
import { app } from "../index"

//import * as untrackedState from "../state"
import { html } from "lit-html"

export class CompA extends OvlSimpleElement {
  parentData
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
      .data=${this.parentData.data}></table-a>
    `
  }
}
