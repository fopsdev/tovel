import { OvlSimpleElement } from "../library/index"
import { TableA } from "./tablea"
import { app } from "../index"
import { Table } from "../state"
//import * as untrackedState from "../state"
import { html } from "lit-html"

export class CompA extends OvlSimpleElement {
  tableProps: Table
  constructor() {
    super()
    this.onclick = e => {
      app.actions.changeFoo()
    }
  }
  prepare() {
    this.tableProps = this.state.TableTest
  }
  getUI() {
    return html`
    <div>${this.state.foo}</div>
    <div>${this.props.Key}</div>
    <table-a .props=${this.tableProps}></table-a>
    `
  }
}
