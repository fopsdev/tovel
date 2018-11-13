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
    return html`
      <div class="o-container o-container--super">
      <div>${this.state.foo}</div>
      <auto-complete id="myautocomplete" .getData="${(): AutoCompleteProps => ({
        matchesFn: inp => {
          let inp2 = inp.toLowerCase()
          let res = Object.values(this.state.tblTableTestData).reduce(
            (a, v) => {
              console.log(a)
              console.log(inp2)
              console.log(v.CustomerFirstName.toLowerCase())
              if (v.CustomerFirstName.toLowerCase().indexOf(inp2) > -1) {
                a.push({ text: v.CustomerFirstName })
              }
              return a
            },
            []
          )
          console.log(res)
          return res
        },
        suggestionsStatePath: "suggestions",
        value: this.state.inputValueTest,
        validFn: inp => {
          return this.state.suggestions.includes(inp)
        }
      })}""></auto-complete>
      <button @click="${this.handleEvent}">changeFirstName1</button>
      <ovl-table
        id="tabletest"
        .getData="${(): TableProps => ({
          table: this.state.myState.myTable,
          data: this.state.tblTableTestData
        })}"
      >
      </ovl-table>
      </div>
    `
  }
}
