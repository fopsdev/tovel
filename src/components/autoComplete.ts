import { html } from "lit-html"

import { Action, log } from "overmind"
import { app } from ".."
import { OvlBaseElement } from "../library"

export type AutoCompleteProps = {
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
  inputEl: any
  placeholder: string
  items: Array<IAutoCompleteItem>
  selectedItem: IAutoCompleteItem
  activeItem: IAutoCompleteItem
  _isOpen: boolean

  value: string

  initProps() {
    super.initProps()
    this.suggestions = this.getData()
    this.value = this.suggestions.value.value
  }

  constructor() {
    super()
    this.onkeydown = ev => this.handleKeyDown(ev)
    this.items = [] //this.suggestions.suggestions
    this._isOpen = false
  }

  handleBlur = e => {
    if (this._isOpen) {
      this.close()
    }
    let inputVal: string = (<any>e.target).value
    if (this.suggestions.validFn(inputVal)) {
      this.inputEl.classList.replace("c-field--error", "c-field")
      if (this.suggestions.value.value !== inputVal) {
        app.actions.changeValue({
          stateRef: this.suggestions.value,
          value: inputVal
        })
      }
    } else {
      this.inputEl.classList.replace("c-field", "c-field--error")
    }
  }

  select(item: IAutoCompleteItem): void {
    this.activeItem = item
    this.selectedItem = item
    this.inputEl.value = item.text
    this.inputEl.defaultValue = item.text
    this.value = item.text

    this.inputEl.focus()
    this.close()
  }

  search(e: any): void {
    this.activeItem = null
    this.items = this.suggestions.matchesFn(e.target.value)
    this._isOpen = this.items.length > 0
    this.doRender()
  }

  open(): void {
    if (this.items.length === 0) {
      this.items = this.suggestions.matchesFn("")
    }
    if (this.items.length > 0) {
      this._isOpen = true
      this.doRender()
    }
  }

  close(): void {
    if (this._isOpen) {
      this._isOpen = false
      this.doRender()
    }
  }
  handleKeyDown(ev: KeyboardEvent): boolean {
    let idx = this.items.indexOf(this.activeItem)
    switch (ev.key) {
      case "Backspace": {
        if (ev.target === this.inputEl && !(<any>ev.target).value) {
          ev.preventDefault()
          if (!this._isOpen) {
            this.open()
          } else {
            this.close()
          }
        }
        break
      }
      case "ArrowDown": {
        ev.preventDefault()

        if (!this._isOpen) {
          this.open()
        } else {
          if (idx < this.items.length - 1) {
            this.activeItem = this.items[idx + 1]
          }
          this.doRender()
        }

        break
      }
      case "ArrowUp": {
        ev.preventDefault()
        if (idx > 0) {
          this.activeItem = this.items[idx - 1]
        }
        this.doRender()
        break
      }
      case "Enter": {
        if (this._isOpen && this.activeItem) {
          ev.preventDefault()
          this.select(this.activeItem)
        } else {
          if (!this._isOpen) {
            this.open()
          } else {
            this.close()
          }
          return false
        }
      }
      case "Escape": {
        if (this._isOpen) {
          ev.preventDefault()
        }
        this.close()
      }
    }
    return true
  }
  afterRender() {
    this.inputEl = document.getElementById(this.id + "inp")
  }
  getUI() {
    console.log("value " + this.value)
    let list = undefined
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
                  @touchstart="${() => this.select(item)}"
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
          id="${this.id + "inp"}"
          type="search"
          class="c-field"
          value="${this.value}"
          defaultValue="${this.value}"
          placeholder="${this.placeholder}"
          autocomplete="off"
          @input="${e => this.search(e)}"
          @blur="${e => this.handleBlur(e)}"
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
