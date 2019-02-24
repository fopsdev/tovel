import { OvlBaseElement } from "../OvlBaseElement"
import { MDCLinearProgress } from "@material/linear-progress"
import { Action } from "../../index"
import { html } from "lit-html"

export type IndicatorState = {
  open: boolean
}

export class OmcIndicator extends OvlBaseElement {
  props: any
  mdcEl: any
  indicator: IndicatorState

  init() {
    this.indicator = this.props(this.state)
  }
  getUI() {
    return html`
      ${this.indicator.open
        ? html`
            <div
              height="20px"
              role="progressbar"
              class="mdc-linear-progress mdc-linear-progress--indeterminate"
            >
              <div class=" mdc-linear-progress__buffering-dots"></div>
              <div class="mdc-linear-progress__buffer"></div>
              <div
                class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
              >
                <span class="mdc-linear-progress__bar-inner"></span>
              </div>
              <div
                class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar"
              >
                <span class="mdc-linear-progress__bar-inner"></span>
              </div>
            </div>
          `
        : null}
    `
  }
  afterRender() {
    if (!this.mdcEl) {
      this.mdcEl = new MDCLinearProgress(
        this.querySelector(".mdc-linear-progress--indeterminate")
      )
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.mdcEl.destroy()
    this.mdcEl = undefined
  }
}
