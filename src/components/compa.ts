import { OvlBaseElement } from "../library/OvlBaseElement"
import { TSimpleState } from "../state"
import { html } from "lit-html"

export class CompA extends OvlBaseElement {
  getData: any
  data: TSimpleState
  initProps() {
    //prepare the props we will hand over to the table comp
    super.initProps()
    this.data = <TSimpleState>this.getData()
  }
  getUI() {
    return html`
      ${this.data.A}
      <comp-b .getData="${() => this.data}" id="b"></comp-b>
    `
  }
}
