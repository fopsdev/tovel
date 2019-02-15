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

customElements.define("comp-omc", CompOmc)

const config = {
  state,
  actions
}

export type Config = typeof config

export interface Derive<Parent extends IState, Value>
  extends IDerive<Config, Parent, Value> {}

export interface OnInitialize extends IOnInitialize<Config> {}

export interface Action<Value = void> extends IAction<Config, Value> {}

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
