import { OvlBaseElement } from "../library/OvlBaseElement"
import { TSimpleState } from "../state"
import { html } from "lit-html"
import { repeat } from "lit-html/directives/repeat"
export class CompList extends OvlBaseElement {
  getData: any
  data: TSimpleState
  initProps() {
    //prepare the props we will hand over to the table comp
    super.initProps()
    this.data = <TSimpleState>this.getData()
  }
  getUI() {
    return html`
      ${
        repeat(
          Object.keys(this.data),
          k => k,
          k =>
            html`
              <li>${this.data[k]}</li>
            `
        )
      }
    `
  }
}
