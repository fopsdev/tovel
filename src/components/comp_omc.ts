import { OvlBaseElement } from "../library/OvlBaseElement"
// @ts-ignore
import UIAssets from "../../img/*.png"
import { html } from "lit-html"
import { MDCTopAppBar } from "@material/top-app-bar/index"

export class CompOmc extends OvlBaseElement {
  mdcEl: any

  checkBox1Changed = e => {
    this.actions.OmcSnackbarChange({
      snackState: this.state.snackBar1,
      text: "Hellloooouuu" + new Date().getTime()
    })
    this.actions.OmcDialogOpen(this.state.dialog)
  }

  checkBox2Changed = e => {
    this.actions.OmcDialogOpen(this.state.dialog)
  }

  getUI() {
    let logoMarginLeft = 42
    if (this.state.isMobile) {
      logoMarginLeft = 0
    }
    return html`
      <body class="mdc-typography">
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root" width="100vw">
          <header
            class="mdc-top-app-bar mdc-top-app-bar--prominent "
            style="top: 0px; width:100vw"
          >
            <div class="mdc-top-app-bar__row">
              <section class="mdc-top-app-bar__section ">
                <div style="margin-left:${logoMarginLeft}vw">
                  <img
                    height="100%"
                    id="logo"
                    alt="Logo"
                    href="#/"
                    src="${UIAssets.logo}"
                  />
                </div>
              </section>

              <section
                style="margin-top:1.8em;"
                class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
              >
                <div style="margin-top:-1.8em; margin-right:2vw">
                  <p
                    class="mdc-typography--caption"
                    style="font-size:1em;font-weight:100; "
                  >
                    username@domain.ch
                  </p>
                </div>

                <button
                  class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded"
                  aria-label="Print this page"
                  style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;"
                >
                  help_outline</button
                ><button
                  class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded"
                  aria-label="Bookmark this page"
                  style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;"
                >
                  power_settings_new
                </button>
              </section>
            </div>
          </header>
          <div class="mdc-top-app-bar--fixed-adjust">
            <div id="spacer" style="margin-top:4em"></div>
            <omc-indicator .props=${state => state.indicator1}></omc-indicator>
            <omc-tab .props=${state => state.tab1}></omc-tab>
            <omc-snackbar .props=${state => state.snackBar1}> </omc-snackbar>
            <omc-dialog .props=${state => state.dialog}></omc-dialog>
            <omc-checkbox
              @click=${this.checkBox1Changed}
              .props=${state => state.checkBox1}
            ></omc-checkbox>
            <omc-checkbox
              @click=${this.checkBox2Changed}
              .props=${state => state.checkBox2}
            ></omc-checkbox>
            <omc-textbox .props=${state => state.textBox1}></omc-textbox>
            <omc-textbox .props=${state => state.textBox2}></omc-textbox>
            <omc-fileupload
              .props=${state => state.fileUpload1}
            ></omc-fileupload>
          </div>
        </div>
        <script
          async=""
          src="https://www.google-analytics.com/analytics.js"
        ></script
        ><script
          type="text/javascript"
          src="/material-components-web-catalog/static/js/main.bdb98def.js"
        ></script>
      </body>
    `
  }
  afterRender() {
    if (!this.mdcEl) {
      this.mdcEl = new MDCTopAppBar(this.querySelector(".mdc-top-app-bar"))
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.mdcEl.destroy()
    this.mdcEl = undefined
  }
}
