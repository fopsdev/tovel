import { OvlTableHeaderElement } from "../library/index"
import { html } from "lit-html"

export class TableA extends OvlTableHeaderElement {
  getUI() {
    return html`
    <div>tableheader->yeah!</div>
    <div>${this.props.table.Entity}</div>
    `
  }
}
