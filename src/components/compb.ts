import { OvlBaseElement } from "../library/OvlBaseElement"
import { TSimpleState } from "../state"
import { html } from "lit-html"

export class CompB extends OvlBaseElement {
  getData: any
  data: TSimpleState
  initProps() {
    //prepare the props we will hand over to the table comp
    super.initProps()
    this.data = <TSimpleState>this.getData()
  }
  prepareUI() {
    // imagine a functions which needs to access state all over the place to compute a result
    // use case: a table elemment with a table-filter and sorting (it needs to run through all props)
    // so how the **** can i ignore tracking for this method???
    let a = this.data.A
    let b = this.data.B
    let c = this.data.C
  }
  getUI() {
    return html`
      ${this.data.B}
      <comp-c .getData="${() => this.data}" id="c"></comp-c>
      <div>
        <comp-list .getData="${() => this.data}" id="list"> </comp-list>
      </div>
    `
  }
}
