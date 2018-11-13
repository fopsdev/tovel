import { html } from "lit-html"
import autocomplete from "javascript-autocomplete"
import { Action, log } from "overmind"
import { app } from ".."
import { OvlBaseElement } from "../library"

export type AutoCompleteProps = {
  suggestionsStatePath: string
  value: { value: string }
  matchesFn: (inputValue: string) => Array<IAutoCompleteItem>
  validFn: (inputValue: string) => boolean
}

export const changeValue: Action<{
  stateRef: { value: string }
  value: string
}> = ({ value: value, state }) => {
  console.log(value)
  value.stateRef.value = value.value
}

interface IAutoCompleteItem {
  text: string
}

export class AutoComplete extends OvlBaseElement {
  getData: () => AutoCompleteProps
  suggestions: AutoCompleteProps

  placeholder: string
  items: Array<IAutoCompleteItem>
  selectedItem: IAutoCompleteItem
  activeItem: IAutoCompleteItem
  _isOpen: boolean
  value: string

  initProps() {
    super.initProps()
    this.suggestions = this.getData()
  }

  removeTracking() {
    let paths = new Set<string>()
    paths.add(this.suggestions.suggestionsStatePath)
    return paths
  }

  constructor() {
    super()
    this.onkeydown = ev => this.handleKeyDown(ev)
    this.items = [] //this.suggestions.suggestions
  }

  // setItems(items: Array<IAutoCompleteItem>): void {
  //   this.items = items
  //   this.value ? this.open() : this.close()
  // }
  select(item: IAutoCompleteItem): void {
    this.activeItem = item
    this.selectedItem = item
    this.value = item.text
    this.close()
  }
  search(e: any): void {
    console.log("search")
    this.activeItem = null
    //this.value = e.target.value
    this.items = this.suggestions.matchesFn(e.target.value)
    this._isOpen = this.items.length > 0
    this.doRender()
  }
  open(): void {
    if (this.items.length) {
      this._isOpen = true
      this.doRender()
    }
  }
  close(): void {
    this._isOpen = false
    this.doRender()
  }
  handleKeyDown(ev: KeyboardEvent): void {
    let idx = this.items.indexOf(this.activeItem)
    switch (ev.key) {
      case "ArrowDown": {
        ev.preventDefault()
        this.open()
        if (idx < this.items.length - 1) {
          this.activeItem = this.items[idx + 1]
        }
        break
      }
      case "ArrowUp": {
        ev.preventDefault()
        if (idx > 0) {
          this.activeItem = this.items[idx - 1]
        }
        break
      }
      case "Enter": {
        if (this.activeItem) {
          ev.preventDefault()
          this.select(this.activeItem)
        }
      }
      case "Escape": {
        this.close()
      }
    }
    this.doRender()
  }
  getUI() {
    console.log("value " + this.value)
    let list = ""
    if (this._isOpen) {
      list = html`
        <div role="menu" class="c-card c-card--menu">
          ${
            this.items.map(item => {
              const isActiveClass =
                this.activeItem === item ? "c-card__control--active" : ""
              return html`
                <button
                  role="menuitem"
                  class="c-card__control ${isActiveClass}"
                  @click="${() => this.select(item)}"
                >
                  ${item.text}
                </button>
              `
            })
          }
        </div>
      `
    }
    return html`
      <div class="o-field o-field--autocomplete">
        <input
          type="search"
          class="c-field"
          placeholder="${this.placeholder}"
          autocomplete="off"
          .value="${this.value}"
          @input="${e => this.search(e)}"
          @click="${() => this.open()}"
        />
        ${list}
      </div>
    `
  }
}

// export class OldAutoComplete extends OvlBaseElement {
//   getData: () => AutoCompleteProps
//   autocomplete
//   suggestions: AutoCompleteProps
//   inp: HTMLElement
//   constructor() {
//     super()
//   }

//   handleBlur = e => {
//     console.log(e)
//     let inputVal: string = (<any>e.target).value
//     if (this.suggestions.validFn(inputVal)) {
//       this.inp.classList.replace("c-field--error", "c-field")
//       if (this.suggestions.value.value !== inputVal) {
//         app.actions.changeValue({
//           stateRef: this.suggestions.value,
//           value: inputVal
//         })
//       }
//     } else {
//       this.inp.classList.replace("c-field", "c-field--error")
//     }
//   }

//   removeTracking() {
//     let paths = new Set<string>()
//     paths.add(this.suggestions.suggestionsStatePath)
//     return paths
//   }
//   afterRender() {
//     if (this.autocomplete) {
//       return
//     }
//     this.inp = document.getElementById(this.id + "inp")
//     this.inp.addEventListener("blur", this.handleBlur)
//     let self = this
//     this.autocomplete = new autocomplete({
//       selector: self.inp,
//       minChars: 1,
//       cache: false,
//       source: function(term, suggest) {
//         term = term.toLowerCase()
//         var choices = self.suggestions.suggestions
//         var matches = choices.filter(c => c.toLowerCase().indexOf(term) > -1)
//         suggest(matches)
//       }
//     })
//   }
//   initProps() {
//     super.initProps()
//     this.suggestions = this.getData()
//   }
//   getUI() {
//     return html`
//       <input id="${this.id + "inp"}"  class="c-field" autocomplete ></input>
//     `
//   }
//   disconnectedCallback() {
//     this.inp.removeEventListener("blur", this.handleBlur)
//     this.autocomplete.destroy()
//     this.autocomplete = undefined
//   }
// }
