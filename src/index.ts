// workaround hmr.. not really hmr now but at least it refreshes...
console.log("start")
if (document.getElementById("TableTest")) {
  location.reload()
}

import { CompA } from "./components/compa"
import { Overmind, TApp } from "overmind"
import * as state from "./state"
import * as actions from "./action"

import { html, render } from "lit-html"

const config = {
  state,
  actions
}

declare module "overmind" {
  interface App extends TApp<typeof config> {}
}

export const app = new Overmind(config, {
  devtools: "localhost:3031"
})

let obj = CompA.getPropsTemplate()
obj.Key = "2"
render(
  html`lala3<comp-a key="lolo" .props = ${obj}></comp-a>`,
  document.getElementById("app")
)
