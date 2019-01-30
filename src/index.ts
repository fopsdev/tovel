// workaround hmr.. not really hmr now but at least it refreshes...
console.log("start")

import { CompA } from "./components/compa"
customElements.define("comp-a", CompA)

import { Overmind, IAction, TApp } from "overmind"
import * as state from "./state"
import * as actions from "./action"
import { html, render } from "lit-html"

const onInitialize = ({ value: overmind, state, actions, effects }) => {
  console.log("init")
  // const initialData = await effects.api.getInitialData()
  // state.initialData = initialData
  if (state.myState.myTable.FilteredAndSorted.length < 1) {
    state.myState.myTable.Filter = ""
    actions["OvlTableChangeSort"]({
      ColumnId: state.myState.myTable.IDField,
      TableState: state.myState.myTable,
      Data: state.tblTableTestData
    })
  }
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
    lala3<comp-a id="maincomp"></comp-a>
  `,
  document.getElementById("app")
)
