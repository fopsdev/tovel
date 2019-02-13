import {
  Overmind,
  IAction,
  TApp,
  IConfig,
  TStateObject,
  IDerive,
  IOperator,
  IOnInitialize
} from "overmind"
import { state } from "./state"
import * as actions from "./action"
import { html, render } from "lit-html"
import { CompOmc } from "./components/comp_omc"

customElements.define("comp-omc", CompOmc)

const onInitialize: OnInitialize = ({
  value: overmind,
  state,
  actions,
  effects
}) => {
  console.log("init")
  // @ts-ignore
  //window.M.AutoInit()
  actions.OvlTableRefresh(state.myState.myTableA)
  actions.OvlTableRefresh(state.myState.myTableB)
}

const config = {
  onInitialize,
  state,
  actions
}

export type Config = IConfig<typeof config>

export interface Derive<Parent extends TStateObject, Output>
  extends IDerive<Config, Parent, Output> {}

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
    <comp-omc .props=${state => state.checkBox1} id="maincomp"></comp-omc>
  `,
  document.getElementById("app")
)
