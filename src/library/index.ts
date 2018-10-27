import { app } from "../index"
import { render, TemplateResult } from "lit-html"
import { App } from "overmind"
import { Table } from "../state"

export class OvlBaseElement extends HTMLElement {
  trackId: number
  mutationListener: any
  state: App["state"]
  //  child comps should implement getUI to render a htm template
  //  its tracked
  getUI(): TemplateResult {
    return null
  }
  // for preparing stuff which is not tracked
  prepare() {}
  constructor() {
    super()
    this.state = app.state
    console.log("base constructor")
  }
  doRender() {
    this.prepare()
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

export class OvlTableHeaderElement extends OvlBaseElement {
  props: Table
}
