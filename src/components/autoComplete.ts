import { OvlBaseElement } from "../library/index"
import { html } from "lit-html"
import autocomplete from "javascript-autocomplete"
import { Action } from "overmind"
import { app } from ".."
type props = {
  suggestions: string[]
  suggestionsStatePath: string
  value: { value: string }
}

export const changeValue: Action<{
  stateRef: { value: string }
  value: string
}> = ({ value: value, state }) => {
  console.log(value)
  value.stateRef.value = value.value
}

export class AutoComplete extends OvlBaseElement {
  getData: () => props
  autocomplete
  suggestions: props
  constructor() {
    super()
  }

  removeTracking() {
    let paths = new Set<string>()
    paths.add(this.suggestions.suggestionsStatePath)
    return paths
  }
  afterRender() {
    let inp = document.getElementById(this.id + "inp")
    inp.addEventListener("blur", e => {
      console.log(e)
      app.actions.changeValue({
        stateRef: this.suggestions.value,
        value: (<any>e.target).value
      })
    })
    let self = this
    this.autocomplete = new autocomplete({
      selector: inp,
      minChars: 1,
      source: function(term, suggest) {
        term = term.toLowerCase()
        var choices = self.suggestions.suggestions
        var matches = []
        let i = 0
        for (i = 0; i < choices.length; i++)
          if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i])
        suggest(matches)
      }
    })
  }
  initProps() {
    super.initProps()
    this.suggestions = this.getData()
  }
  getUI() {
    return html`
      <input id="${this.id + "inp"}" autocomplete ></input>
    `
  }
  disconnectedCallback() {
    this.autocomplete.destroy()
  }
}
