import { app } from "../index"
import { render, TemplateResult } from "lit-html"
import { App } from "overmind"

export class OvlBaseElement extends HTMLElement {
  trackId: number
  mutationListener: any
  state: App["state"]
  getUI(): TemplateResult {
    return null
  }
  constructor() {
    super()
    this.state = app.state
    console.log("base constructor")
  }
  doRender() {
    this.trackId = app.trackState()
    let res = this.getUI()
    let paths = app.clearTrackState(this.trackId)
    console.log(paths)
    if (paths.size > 0) {
      if (!this.mutationListener) {
        this.mutationListener = app.addMutationListener(paths, () =>
          this.doRender()
        )
      } else {
        this.mutationListener.update(paths)
      }
    }
    render(res, this)
  }

  connectedCallback() {
    console.log("base connected")
    this.doRender()
  }

  disconnectedCallback() {
    if (this.mutationListener) {
      this.mutationListener.dispose()
    }
  }
}

// philosophy: use the class which fits the most. its props interface should give an idea for what it is used for
// that said, implementing a getPropsTemplate method helps because then the interfaces doen't need to be referenced by the outer components

export interface ISimpleProps {
  Key: string
}

export class OvlSimpleElement extends OvlBaseElement {
  props: ISimpleProps
  static getPropsTemplate(): ISimpleProps {
    return { Key: "" }
  }
}
