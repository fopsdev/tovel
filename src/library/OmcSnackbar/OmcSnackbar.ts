import { OvlBaseElement } from "../OvlBaseElement"
import { MDCSnackbar } from "@material/snackbar"
import { Action } from "../../index"
import { html } from "lit-html"

export type SnackbarState = {
  text: string
}

type SnackbarChangeParam = {
  snackState: SnackbarState
  text: string
}
export const OmcSnackbarChange: Action<SnackbarChangeParam> = (_, value) => {
  console.log("new text to set")
  console.log(value.text)
  value.snackState.text = value.text
}

export class OmcSnackbar extends OvlBaseElement {
  props: any
  mdcEl: any
  snackBar: SnackbarState

  queue: any[]
  openSnack = newState => {
    console.log("handleOoopen")
    this.queue.push(() => {
      this.mdcEl.labelText = this.state.snackBar1.text
      this.mdcEl.timeoutMs = 4000
      console.log("opeeen")
      this.mdcEl.open()
    })
    if (this.queue.length === 1) {
      this.queue[0]()
    }
  }

  handleClosed = () => {
    console.log("handleClooosed")
    this.queue.shift()
    if (this.queue.length > 0) {
      this.queue[0]()
    }
  }

  init() {
    this.queue = []
    this.snackBar = this.props(this.state)
  }
  getUI() {
    // it always needs to read this for the tracking
    let text = this.snackBar.text
    if (!this.mdcEl) {
      return html`
        <div class="mdc-snackbar">
          <div class="mdc-snackbar__surface">
            <div class="mdc-snackbar__label" role="status" aria-live="polite">
              ${text}
            </div>
            <div class="mdc-snackbar__actions">
              <button type="button" class="mdc-button mdc-snackbar__action">
                Retry
              </button>
            </div>
          </div>
        </div>
      `
    }
    return undefined
  }
  afterRender() {
    if (this.mdcEl) {
      this.openSnack(this.snackBar)
    }
    if (!this.mdcEl) {
      this.mdcEl = new MDCSnackbar(this.querySelector(".mdc-snackbar"))
      this.mdcEl.listen("MDCSnackbar:closed", () => this.handleClosed())
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.mdcEl.destroy()
    this.mdcEl = undefined
  }
}
