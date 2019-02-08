import { TemplateResult, html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"

import { OvlBaseElement } from "../OvlBaseElement"
import { Action, overmind } from "../../index"

type Option = {
  key: string
  value: string
}
export type SelectState = {
  options: Option[]
  selected: string[]
}

type ChangeSelectParam = {
  selectedState: SelectState
  selected: string[]
}

export const OmlChangeSelected: Action<ChangeSelectParam> = ({
  value,
  state
}) => {
  console.log(value)
  value.selectedState.selected = value.selected
}

export class OmlSelect extends OvlBaseElement {
  instance: any
  props: any
  selectState: SelectState
  constructor() {
    super()
  }

  init() {
    this.selectState = this.props()
    console.log(this.selectState)
  }
  selectHandler = e => {
    this.instance._setSelectedStates()
    overmind.actions.OmlChangeSelected({
      selectedState: this.selectState,
      selected: this.instance.getSelectedValues()
    })
  }
  getUI(): TemplateResult {
    {
      return html`
        
          <div class="input-field col s12">
            <select id="mainselect" multiple>
              <option value="" selected>Choose your option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
            <label>Materialize Multiple Select</label>
          </div>
        </div>
      `
    }
  }
  afterRender() {
    if (!this.instance) {
      // @ts-ignore
      this.instance = window.M.FormSelect.init(
        document.getElementById("mainselect")
      )
      // @ts-ignore
      this.instance = window.M.FormSelect.getInstance(
        document.getElementById("mainselect")
      )
    }
    //this.instance.updateTabIndicator()
    this.instance.input.addEventListener("focus", this.selectHandler)
    // console.log(this.instance.input.add)
  }
  destroy() {
    if (this.instance) {
      this.instance.destroy()
    }
  }
}
