import { OvlSimpleElement } from "../library/index"

import { app } from "../index"
//import * as untrackedState from "../state"
import { html } from "lit-html"

export class CompA extends OvlSimpleElement {
  constructor() {
    super()
    this.onclick = e => {
      app.actions.changeFoo()
    }
  }
  getUI() {
    return html`
    <div>${this.state.foo}</div>
    <div>${this.props.Key}</div>
    `
  }
}
