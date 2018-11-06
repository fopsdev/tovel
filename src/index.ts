// workaround hmr.. not really hmr now but at least it refreshes...
console.log("start")

import { CompA } from "./components/compa"
customElements.define("comp-a", CompA)

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

export { state }

render(
  html`lala3<comp-a id="maincomp"></comp-a>`,
  document.getElementById("app")
)
