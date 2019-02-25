import { OvlBaseElement } from "../OvlBaseElement"
import { MDCTabBar } from "@material/tab-bar"
import { MDCTabIndicator } from "@material/tab-indicator"
import { Action } from "../../index"
import { html } from "lit-html"

type OmcTabChangedParam = {
  tabState: TabState
  activeTab: string
}

type tab = {
  id: string
  name: string
  enabled: boolean
}

export type TabState = {
  tabs: tab[]
  activeTab: string
}

export const OmcTabChanged: Action<OmcTabChangedParam> = (_, value) => {
  console.log("new value(s) selected:")
  console.log(value)
  value.tabState.activeTab = value.activeTab
}

export class OmcTab extends OvlBaseElement {
  props: any
  mdcEl: any

  tab: TabState

  handleChange = e => {
    this.actions.OmcTabChanged({
      tabState: this.tab,
      activeTab: this.tab.tabs[e.detail.index].id
    })
  }

  init() {
    this.addEventListener("MDCTabBar:activated", this.handleChange)
    this.tab = this.props(this.state)
  }
  getUI() {
    let res = undefined
    if (!this.mdcEl) {
      res = html`
        <div class="mdc-tab-bar" role="tablist">
          <div class="mdc-tab-scroller">
            <div
              class="mdc-tab-scroller__scroll-area mdc-tab-scroller__scroll-area--scroll"
              style="margin-bottom: 0px;"
            >
              <div class="mdc-tab-scroller__scroll-content">
                ${this.tab.tabs.map((t, i) => {
                  let active = ""
                  let indicatorActive = ""
                  if (t.id === this.tab.activeTab) {
                    active = "mdc-tab--active"
                    indicatorActive = "mdc-tab-indicator--active"
                  }
                  return html`
                    <button
                      class="mdc-tab ${active}"
                      role="tab"
                      aria-selected="true"
                      tabindex="0"
                      id="${t.id}"
                    >
                      <span class="mdc-tab__content"
                        ><span class="mdc-tab__text-label"
                          >${t.name}</span
                        ></span
                      ><span class="mdc-tab-indicator ${indicatorActive}"
                        ><span
                          class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"
                          style=""
                        ></span></span
                      ><span
                        class="mdc-tab__ripple mdc-ripple-upgraded"
                        style="--mdc-ripple-fg-size:150px; --mdc-ripple-fg-scale:1.7736; --mdc-ripple-fg-translate-start:79.5px, -55.8125px; --mdc-ripple-fg-translate-end:50.75px, -51px;"
                      ></span>
                    </button>
                  `
                })}
              </div>
            </div>
          </div>
        </div>
      `
    }

    return res
  }
  afterRender() {
    if (!this.mdcEl) {
      this.mdcEl = new MDCTabBar(this.querySelector(".mdc-tab-bar"))
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.mdcEl.destroy()
    this.removeEventListener("change", this.handleChange)
  }
}
