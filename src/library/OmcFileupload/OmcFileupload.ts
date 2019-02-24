import { OmcTextbox } from "../OmcTextbox/OmcTextbox"
import { html } from "lit-html"

export class OmcFileupload extends OmcTextbox {
  getUI() {
    return html`
      <div class="mdc-text-field" style="top:-3px;">
        <input
          value="${this.textBox.valueState.value}"
          type="file"
          id="${this.textBox.id}"
          class="mdc-text-field__input"
        />
        <div class="mdc-line-ripple"></div>
      </div>
    `
  }
}
