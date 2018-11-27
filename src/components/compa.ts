import { OvlBaseElement, TableProps } from "../library/index"
import { AutoComplete, AutoCompleteProps } from "./autoComplete"
import { NativeDateInput, NativeDateInputProps } from "./nativeDateInput"
customElements.define("auto-complete", AutoComplete)
customElements.define("date-input", NativeDateInput)
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
              if (
                (v.CustomerFirstName ? v.CustomerFirstName : "")
                  .toLowerCase()
                  .indexOf(inp2) > -1
              ) {
                a.push({ text: v.CustomerFirstName })
              }
              return a
            },
            []
          )
          return res
        },
        value: this.state.inputValueTest,
        validFn: inp => {
          return Object.values(this.state.tblTableTestData).some(
            v => inp === v.CustomerFirstName
          )
        }
      })}""></auto-complete>
          <div style="width:30%;"><auto-complete id="myautocomplete2" .getData="${(): AutoCompleteProps => ({
            matchesFn: inp => {
              let inp2 = inp.toLowerCase()
              let res = Object.values(this.state.tblTableTestData).reduce(
                (a, v) => {
                  if (
                    (v.CustomerFirstName ? v.CustomerFirstName : "")
                      .toLowerCase()
                      .indexOf(inp2) > -1
                  ) {
                    a.push({ text: v.CustomerFirstName })
                  }
                  return a
                },
                []
              )
              return res
            },
            value: this.state.inputValueTest,
            validFn: inp => {
              return Object.values(this.state.tblTableTestData).some(
                v => inp === v.CustomerFirstName
              )
            }
          })}" "></auto-complete></div>
 
      <button @click="${this.handleEvent}">changeFirstName1</button>
      <ovl-table
        id="tabletest"
        .getData="${(): TableProps => ({
          table: this.state.myState.myTable,
          data: this.state.tblTableTestData
        })}"
      >
      </ovl-table>
                <auto-complete id="myautocomplete3" .getData="${(): AutoCompleteProps => ({
                  matchesFn: inp => {
                    let inp2 = inp.toLowerCase()
                    let res = Object.values(this.state.tblTableTestData).reduce(
                      (a, v) => {
                        if (
                          (v.CustomerFirstName ? v.CustomerFirstName : "")
                            .toLowerCase()
                            .indexOf(inp2) > -1
                        ) {
                          a.push({ text: v.CustomerFirstName })
                        }
                        return a
                      },
                      []
                    )
                    for (let z = 0; z < 200; z++) {
                      res.push({ text: z.toString() })
                    }
                    return res
                  },
                  value: this.state.inputValueTest,
                  validFn: inp => {
                    return Object.values(this.state.tblTableTestData).some(
                      v => inp === v.CustomerFirstName
                    )
                  }
                })}" "></auto-complete>
<date-input id="mydateinput"/>
      </div>
    `
  }
}
