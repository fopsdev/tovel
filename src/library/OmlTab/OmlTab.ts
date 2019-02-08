import { TemplateResult, html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"

import { OvlBaseElement } from "../OvlBaseElement"
import { Action, overmind } from "../../index"

export type TabState = {
  activeTab: string
}

type ChangeTabParam = {
  tabState: TabState
  selectedTab: string
}

export const OmlChangeTab: Action<ChangeTabParam> = ({ value, state }) => {
  console.log(value)
  value.tabState.activeTab = value.selectedTab
}

export class OmlTab extends OvlBaseElement {
  instance: any
  props: any
  tabState: TabState
  constructor() {
    super()
  }

  init() {
    this.tabState = this.props()
    console.log(this.tabState)
  }
  tabHandler = e => {
    if (e.target.parentNode.classList.contains("disabled")) {
      return
    }
    console.log("uuuuuu")
    overmind.actions.OmlChangeTab({
      tabState: this.tabState,
      selectedTab: e.target.hash
    })
  }
  getUI(): TemplateResult {
    {
      let classesTab1 =
        this.state.tabState.activeTab === "#test1" ? "active" : undefined
      let classesTab2 =
        this.state.tabState.activeTab === "#test2" ? "active" : undefined
      let classesTab4 =
        this.state.tabState.activeTab === "#test4" ? "active" : undefined
      const tabContent = html`
        ${this.tabState.activeTab}
      `
      return html`
        <div class="row">
          <div class="col s12">
            <ul @click=${this.tabHandler} id="maintabs" class="tabs">
              <li class="tab col s3">
                <a class="${ifDefined(classesTab1)}" href="#test1">Test 1</a>
              </li>
              <li class="tab col s3">
                <a class="${ifDefined(classesTab2)}" href="#test2">Test 2</a>
              </li>
              <li class="tab col s3 disabled">
                <a href="#test3">Disabled Tab</a>
              </li>
              <li class="tab col s3">
                <a class="${ifDefined(classesTab4)}" href="#test4">Test 4</a>
              </li>
            </ul>
          </div>
        </div>
        ${tabContent}

        <a class="btn-floating btn-large waves-effect waves-light red"
          ><i class="material-icons">add</i></a
        >

        <form action="#">
          <p>
            <label>
              <input type="checkbox" />
              <span>Red</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" />
              <span>Yellow</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" class="filled-in" checked="checked" />
              <span>Filled in</span>
            </label>
          </p>
          <p>
            <label>
              <input id="indeterminate-checkbox" type="checkbox" />
              <span>Indeterminate Style</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" checked="checked" disabled="disabled" />
              <span>Green</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" disabled="disabled" />
              <span>Brown</span>
            </label>
          </p>
        </form>
      `
    }
  }
  afterRender() {
    if (!this.instance) {
      // @ts-ignore
      this.instance = window.M.Tabs.init(document.getElementById("maintabs"))
    }
    this.instance.updateTabIndicator()
  }
  destroy() {
    if (this.instance) {
      this.instance.destroy()
    }
  }
}
