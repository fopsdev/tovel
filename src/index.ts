import {
  Overmind,
  IAction,
  IConfig,
  IState,
  IDerive,
  IOperator,
  IOnInitialize
} from "overmind"
import { state } from "./state"
import * as actions from "./action"
import { html, render } from "lit-html"
import { CompOmc } from "./components/comp_omc"
import { OmcSnackbar } from "./library/OmcSnackbar/OmcSnackbar"
import { OmcCheckbox } from "./library/OmcCheckbox/OmcCheckbox"
import { OmcTextbox } from "./library/OmcTextbox/OmcTextbox"
import { OmcFileupload } from "./library/OmcFileupload/OmcFileupload"
import { OmcDialog } from "./library/OmcDialog/OmcDialog"
import { OmcIndicator } from "./library/OmcIndicator/OmcIndicator"

customElements.define("comp-omc", CompOmc)
customElements.define("omc-snackbar", OmcSnackbar)
customElements.define("omc-textbox", OmcTextbox)
customElements.define("omc-fileupload", OmcFileupload)
customElements.define("omc-checkbox", OmcCheckbox)
customElements.define("omc-dialog", OmcDialog)
customElements.define("omc-indicator", OmcIndicator)

export const config = {
  state,
  actions
}

export type Config = IConfig<typeof config>

export interface Derive<Parent extends IState, Value>
  extends IDerive<Config, Parent, Value> {}

export interface OnInitialize extends IOnInitialize<Config> {}

export interface Action<Input = void> extends IAction<Config, Input> {}

export interface Operator<Input = void, Output = Input>
  extends IOperator<Config, Input, Output> {}

export const overmind = new Overmind(config, {
  devtools: true,
  logProxies: false
})

render(
  html`
    <comp-omc id="maincomp"></comp-omc>
  `,
  document.getElementById("app")
)
