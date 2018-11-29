import { OvlBaseElement } from "../library/OvlBaseElement"
import { TSimpleState } from "../state"
import { html } from "lit-html"
import { repeat } from "../library/repeat"
export class CompList extends OvlBaseElement {
  getData: any
  data: TSimpleState
  initProps() {
    super.initProps()
    this.data = <TSimpleState>this.getData()
  }
  getUI() {
    return html`
      ${
        repeat(
          this,
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
