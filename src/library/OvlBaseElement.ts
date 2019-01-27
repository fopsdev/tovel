import { overmind, Config } from "../index"
import { TApp } from "overmind"
import { render, TemplateResult } from "lit-html"
import { ITrackStateTree } from "proxy-state-tree"

export class OvlBaseElement extends HTMLElement {
  _id: number
  state: TApp<Config>["state"]

  name: string
  trackedTree: ITrackStateTree<object>
  actions: TApp<Config>["actions"]
  static _counter: number = 0

  // should be overwritten in derived element
  getUI(): TemplateResult {
    return null
  }
  // can be overwritten in derived element
  prepare() {
    // accessing state from inside this method should not be tracked
  }
  // can be overwritten in derived element
  init() {
    // use it for getting data from parent, ...
  }

  constructor() {
    super()
    this._id = ++OvlBaseElement._counter
    this.name = this.localName + this._id.toString()
    this.trackedTree = overmind.getTrackStateTree()
    this.actions = overmind.actions
    this.state = <TApp<Config>["state"]>this.trackedTree.state
  }

  doRender() {
    console.log(this.name + " startRender")
    this.prepare()
    // now that we have prepared our stuff, start tracking
    // @ts-ignore
    this.trackedTree.resume()

    // from here now this.state.xy will be tracked
    render(this.getUI(), this)
    console.log(this.name + " finishedRender. Registered paths:")
    console.log(Array.from(this.trackedTree.pathDependencies))
  }

  onUpdate = (mutations, paths, flushId) => {
    console.log(this.name + " onUpdate")
    console.log(paths)
    console.log(mutations)
    this.doRender()
  }

  connectedCallback() {
    console.log(this.name + " connect")
    this.trackedTree.track(this.onUpdate)
    // @ts-ignore
    this.trackedTree.pause()
    this.init()
    this.doRender()
  }

  disconnectedCallback() {
    console.log(this.name + " disconnect")
    this.trackedTree.dispose()
  }
}
