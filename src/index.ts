import { CompA } from "./components/compa"
customElements.define("comp-a", CompA)

import { CompB } from "./components/compb"
customElements.define("comp-b", CompB)

import { CompC } from "./components/compc"
customElements.define("comp-c", CompC)

import { CompList } from "./components/complist"
customElements.define("comp-list", CompList)

import { Overmind, TConfig } from "overmind"
import * as state from "./state"

import { html, render } from "lit-html"

const config = {
  state,
  actions: {}
}
declare module "overmind" {
  interface IConfig extends TConfig<typeof config> {}
}

export const app = new Overmind(config, {
  devtools: "localhost:3031"
})

render(
  html`
    <comp-a .getData="${() => app.state.myState}" id="a"></comp-a>
  `,
  document.getElementById("app")
)
