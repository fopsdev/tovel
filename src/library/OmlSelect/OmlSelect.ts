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
  multiple: boolean
}

type ChangeSelectParam = {
  selectedState: SelectState
  selected: string[]
}

export const OmlChangeSelected: Action<ChangeSelectParam> = ({
  value,
  state
}) => {
  console.log("new value(s) selected:")
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
    let selectedValues = this.instance.getSelectedValues()
    // console.log(selectedValues)
    // console.log(this.state.selectState.selected)
    if (
      JSON.stringify(selectedValues) !==
      JSON.stringify(this.state.selectState.selected)
    ) {
      overmind.actions.OmlChangeSelected({
        selectedState: this.selectState,
        selected: selectedValues
      })
    }
  }
  getUI(): TemplateResult {
    {
      console.log(this.selectState)
      return html`
        
          <div class="input-field col s12">
            <select id="mainselect" ?multiple=${this.selectState.multiple}>
            ${this.selectState.options.map(o => {
              const selected = this.state.selectState.selected.includes(o.key)
              return html`
                <option value="${o.key}" ?selected=${selected}
                  >${o.value}</option
                >
              `
            })}  
            </select>
            <label>Materialize ${
              this.selectState.multiple ? "multiple" : ""
            } Select</label>
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
      //this.instance._setSelectedStates()

      //this.instance.updateTabIndicator()
      this.instance.input.addEventListener("focus", this.selectHandler)
    }
    this.instance._setValueToInput()
    // console.log(this.instance.input.add)
  }
  destroy() {
    if (this.instance) {
      this.instance.destroy()
    }
  }
}
