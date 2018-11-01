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

export const app = new Overmind(config)

let obj = CompA.getPropsTemplate()
obj.Key = "2"
render(
  html`lala3<comp-a key="lolo" .props = ${obj}></comp-a>`,
  document.getElementById("app")
)
