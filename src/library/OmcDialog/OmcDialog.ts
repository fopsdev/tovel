import { OvlBaseElement } from "../OvlBaseElement"
import { MDCDialog } from "@material/dialog"
import { Action } from "../../index"
import { html } from "lit-html"

type OmcDialogChangedParam = {
  dialogState: DialogState
  buttonId: string
}

export type DialogState = {
  text: string
  okText: string
  cancelText: string
  visible: boolean
  result: undefined | "ok" | "cancel"
}

export const OmcDialogChanged: Action<OmcDialogChangedParam> = (_, value) => {
  console.log("new value(s) selected:")
  console.log(value)
  if (value.buttonId.indexOf("ok") > 0) {
    value.dialogState.result = "ok"
  } else {
    value.dialogState.result = "cancel"
  }
}

export const OmcDialogOpen: Action<DialogState> = (_, value) => {
  value.visible = true
}

export class OmcDialog extends OvlBaseElement {
  props: any
  mdcEl: any

  dialog: DialogState

  handleChange = e => {
    this.actions.OmcDialogChanged({
      dialogState: this.dialog,
      buttonId: e.target.id
    })
  }

  init() {
    this.addEventListener("change", this.handleChange)
    this.dialog = this.props(this.state)
  }
  getUI() {
    return html`
      ${this.dialog.visible
        ? html`
            <div
              class="mdc-dialog"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="my-dialog-title"
              aria-describedby="my-dialog-content"
            >
              <div class="mdc-dialog__container">
                <div class="mdc-dialog__surface">
                  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
                  <h2 class="mdc-dialog__title" id="my-dialog-title">
                    DS Portal
                  </h2>
                  <div class="mdc-dialog__content" id="my-dialog-content">
                    ${this.dialog.text}
                  </div>
                  <footer class="mdc-dialog__actions">
                    <button
                      type="button"
                      class="mdc-button mdc-dialog__button"
                      data-mdc-dialog-action="no"
                    >
                      <span class="mdc-button__label">No</span>
                    </button>
                    <button
                      type="button"
                      class="mdc-button mdc-dialog__button"
                      data-mdc-dialog-action="yes"
                    >
                      <span class="mdc-button__label">Yes</span>
                    </button>
                  </footer>
                </div>
              </div>
              <div class="mdc-dialog__scrim"></div>
            </div>
          `
        : null}
    `
  }
  afterRender() {
    if (!this.mdcEl && this.state.dialog.visible) {
      this.mdcEl = new MDCDialog(this.querySelector(".mdc-dialog"))
    }
    if (this.state.dialog.visible) {
      this.mdcEl.open()
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.mdcEl.destroy()
    this.removeEventListener("change", this.handleChange)
  }
}
