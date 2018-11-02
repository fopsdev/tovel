import { OvlSimpleElement, TableData } from "../library/index"
import { app } from "../index"

//import * as untrackedState from "../state"
import { html, TemplateResult } from "lit-html"

export class CompA extends OvlSimpleElement {
  parentData: TableData
  constructor() {
    super()

    this.onclick = e => {
      app.actions.changeFoo()
    }
  }
  prepare() {
    //prepare the props we will hand over to the table comp
    this.parentData = {
      table: this.state.TableTest,
      data: this.state.tblTableTestData
    }

    // this.parentComp = html`<ovl-table
    //   .table=${this.state.TableTest}
    //   .data = ${this.state.tblTableTestData}>
    //   </ovl-table>`
  }
  getUI() {
    return html`
    <div>${this.state.foo}</div>
    <div>${this.props.Key}</div>

    <custom-table-a 
    .table=${this.parentData.table} 
    .data=${this.parentData.data}>
    </custom-table-a>

    
    `
  }
}
customElements.define("comp-a", CompA)
