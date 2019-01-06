import { html } from "lit-html"

import { Action } from "overmind"
import { app } from ".."
import { OvlBaseElement } from "./OvlBaseElement"

export type AutoCompleteProps = {
  value: { value: string }
  matchesFn: (inputValue: string) => Array<IAutoCompleteItem>
  validFn: (inputValue: string) => boolean
}

export const OvlAutoCompleteChangeValue = ({ value: value, state }) => {
  console.log(value)
  value.stateRef.value = value.value
  app.getMutationTree().state.foo = "bbbaaaarrr"
}

interface IAutoCompleteItem {
  text: string
}

export class OvlAutoComplete extends OvlBaseElement {
  getData: () => AutoCompleteProps
  suggestions: AutoCompleteProps
  inputEl: any
  buttonEl: any
  placeholder: string
  hasFocus: boolean
  items: Array<IAutoCompleteItem>
  selectedItem: IAutoCompleteItem
  activeItem: IAutoCompleteItem
  _isOpen: boolean
  fullList: boolean

  value: string

  initProps() {
    super.initProps()
    this.suggestions = this.getData()
    this.placeholder = ""
  }

  constructor() {
    super()
    this.onkeydown = ev => this.handleKeyDown(ev)
    this.items = [] //this.suggestions.suggestions
    this._isOpen = false
    this.hasFocus = false
    this.fullList = false
  }

  handleBlur = e => {
    this.hasFocus = false
    if (this._isOpen) {
      this.close()
    } else {
      this.doRender()
    }
    let inputVal: string = (<any>e.target).value
    if (this.suggestions.validFn(inputVal)) {
      this.inputEl.classList = "c-field"
      if (this.suggestions.value.value !== inputVal) {
        app.actions.OvlAutoCompleteChangeValue({
          stateRef: this.suggestions.value,
          value: inputVal
        })
      }
    } else {
      this.inputEl.classList = "c-field c-field--error"
    }
  }

  select(item: IAutoCompleteItem): void {
    this.activeItem = item
    this.selectedItem = item
    this.inputEl.value = item.text
    this.value = item.text
    this.close()
  }

  search(e: any): void {
    this.activeItem = null
    let query = e.target.value
    this.fullList = query === ""
    this.items = this.suggestions.matchesFn(query)
    console.log(this.items)
    this._isOpen = this.items.length > 0
    if (this.items.length === 1) {
      this.activeItem = this.items[0]
    }
    this.doRender()
  }

  open(): void {
    this.fullList = true
    this.items = this.suggestions.matchesFn("")
    if (this.items.length > 0) {
      this._isOpen = true
      this.doRender()
    }
  }

  close(): void {
    if (this._isOpen) {
      this.fullList = false
      this._isOpen = false
      this.doRender()
    }
  }
  handleKeyDown(ev: KeyboardEvent): boolean {
    let idx = -1
    if (this.activeItem) {
      this.items.some((f, i) => {
        idx = i
        return f.text === this.activeItem.text
      })
    }
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
    console.log("render:" + this.componentName)
    this.value = this.suggestions.value.value

    let selectButton = undefined
    if (this.hasFocus) {
      console.log("button")
      selectButton = html`
        <button
          tabindex="-1"
          style="height:80%"
          class="c-button c-button--rounded c-button--ghost-info animated fadeIn faster"
          @mousedown="${
            e => {
              e.preventDefault()
              //e.stopImmediatePropagation()
              if (this._isOpen) {
                this.close()
              } else {
                this.open()
              }
              return false
            }
          } "
          @touchstart="${
            e => {
              e.preventDefault()
              //e.stopImmediatePropagation()
              if (this._isOpen) {
                this.close()
              } else {
                this.open()
              }
              return false
            }
          }"
        >
          ▼
        </button>
      `
    }
    let list = undefined
    if (this._isOpen) {
      list = html`
        <div
          tabindex="-1"
          style="margin-top:0;border-top:0; "
          role="menu"
          class="c-card c-card--menu animated fadeInDown faster"
          @mousedown="${
            e => {
              e.preventDefault()
              return false
            }
          }"
        >
          ${
            this.items.map(item => {
              const isActiveClass = this.activeItem
                ? this.activeItem.text === item.text
                  ? "c-card__control--active"
                  : ""
                : ""
              return html`
                <button
                  role="menuitem"
                  class="c-card__control ${isActiveClass}"
                  @mousedown="${
                    e => {
                      e.preventDefault()
                      //console.log(item.text)
                      this.select(item)
                      return false
                    }
                  }"
                  @touch="${
                    e => {
                      e.preventDefault()
                      this.select(item)
                      return false
                    }
                  }"
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
        <div class="list-input">
          <input
            ?readOnly="${this.fullList}"
            class="c-field"
            type="text"
            autocomplete="off"
            id="${this.id + "inp"}"
            .value="${this.suggestions.value.value}"
            .defaultValue="${this.suggestions.value.value}"
            placeholder="${this.placeholder}"
            @blur="${e => this.handleBlur(e)}"
            @input="${e => this.search(e)}"
            @focus="${
              () => {
                this.hasFocus = true
                this.doRender()
              }
            }"
            @click="${
              e => {
                e.preventDefault()
                if (this._isOpen) {
                  this.close()
                }
                return false
              }
            }"
            @touchstart="${
              e => {
                if (this._isOpen) {
                  this.close()
                }
                return false
              }
            }"
          />
          ${selectButton}
        </div>
        ${list}
      </div>
    `
  }
}
