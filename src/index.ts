// workaround hmr.. not really hmr now but at least it refreshes...
console.log("start")

import { CompA } from "./components/compa"
customElements.define("comp-a", CompA)

import { Overmind, IAction, TApp } from "overmind"
import { state } from "./state"
import * as actions from "./action"
import { html, render } from "lit-html"

const onInitialize = ({ value: overmind, state, actions, effects }) => {
  // console.log("init")
  // if (state.myState.myTableA.FilteredAndSorted.length < 1) {
  //   state.myState.myTableA.Filter = ""
  //   actions["OvlTableChangeSort"]({
  //     ColumnId: state.myState.myTableA.IDField,
  //     TableState: state.myState.myTableA,
  //     Data: state.tblTableTestData
  //   })
  // }
}

const config = {
  onInitialize,
  state,
  actions,
  devtools: false
}

export type Config = typeof config

export interface Action<Value = void> extends IAction<Config, Value> {}

export const overmind = new Overmind(config, { logProxies: false })

render(
  html`
    <comp-a id="maincomp"></comp-a>
  `,
  document.getElementById("app")
)
