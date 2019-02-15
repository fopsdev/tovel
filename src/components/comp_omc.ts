import { OvlBaseElement } from "../library/OvlBaseElement"

import { html } from "lit-html"

export class CompOmc extends OvlBaseElement {
  checkBox1Changed = e => {
    this.actions.OmcSnackbarChange({
      snackState: this.state.snackBar1,
      text: "Hellloooouuu" + new Date().getTime()
    })
  }
  getUI() {
    return html`
      <omc-snackbar .props=${state => state.snackBar1}> </omc-snackbar>

      <omc-checkbox
        @click=${this.checkBox1Changed}
        .props=${state => state.checkBox1}
      ></omc-checkbox>
      <omc-checkbox .props=${state => state.checkBox2}></omc-checkbox>
      <omc-textbox .props=${state => state.textBox1}></omc-textbox>
      <omc-textbox .props=${state => state.textBox2}></omc-textbox>
    `
  }
}
