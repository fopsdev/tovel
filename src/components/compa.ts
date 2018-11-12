import { OvlBaseElement, TableProps } from "../library/index"
import { AutoComplete, AutoCompleteProps } from "./autoComplete"
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
    let props: AutoCompleteProps = {
      suggestions: this.state.suggestions,
      suggestionsStatePath: "suggestions",
      value: this.state.inputValueTest,
      validFn: inp => {
        return this.state.suggestions.includes(inp)
      }
    }
    let tableProps: TableProps = {
      table: this.state.myState.myTable,
      data: this.state.tblTableTestData
    }
    return html`
      <div class="o-container o-container--super">
      <div>${this.state.foo}</div>
      <auto-complete id="myautocomplete" .getData="${() =>
        props}""></auto-complete>
      <button @click="${this.handleEvent}">changeFirstName1</button>
      <ovl-table
        id="tabletest"
        .getData="${() => tableProps}"
      >
      </ovl-table>
      </div>
    `
  }
}
