import { OvlBaseElement } from "../library/index"
import { AutoComplete } from "./autoComplete"
customElements.define("auto-complete", AutoComplete)
import { app, state as untracked } from "../index"
import { html } from "lit-html"

export class CompA extends OvlBaseElement {
  handleEvent(e) {
    app.actions.changeFirstName1()
  }

  constructor() {
    super()
  }
  initProps() {
    //prepare the props we will hand over to the table comp
    super.initProps()
  }
  getUI() {
    return html`
      <div>${this.state.foo}</div>
      <auto-complete id="myautocomplete" .getData="${() => ({
        suggestions: this.state.suggestions,
        suggestionsStatePath: "suggestions",
        value: this.state.inputValueTest
      })}""></auto-complete>
      <button @click="${this.handleEvent}">changeFirstName1</button>
      <ovl-table
        id="tabletest"
        .getData="${() => ({
          table: this.state.myState.myTable,
          data: this.state.tblTableTestData
        })}"
      >
      </ovl-table>
    `
  }
}
