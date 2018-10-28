import { OvlSimpleElement } from "../library/index"
import { TableA, UserTable, TableTest } from "./tablea"
import { app } from "../index"

//import * as untrackedState from "../state"
import { html } from "lit-html"

export class CompA extends OvlSimpleElement {
  tableProps: UserTable
  constructor() {
    super()
    this.onclick = e => {
      app.actions.changeFoo()
    }
  }
  prepare() {
    this.tableProps = TableTest
  }
  getUI() {
    return html`
    <div>${this.state.foo}</div>
    <div>${this.props.Key}</div>
    <table-a .props=${this.tableProps}></table-a>
    `
  }
}
