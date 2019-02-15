import { overmind, Config, Action } from "../index"
import { EventType } from "overmind"
import { render, TemplateResult } from "lit-html"
import { ITrackStateTree } from "proxy-state-tree"

export class OvlBaseElement extends HTMLElement {
  _id: number
  _flushId: number
  state: Config["state"]

  name: string
  trackedTree: ITrackStateTree<object>
  actions: Config["actions"]
  static _counter: number = 0

  // should be overwritten in derived element
  // gets a optimized lit-html template
  getUI(): TemplateResult {
    return undefined
  }

  // use this to create/update dom when not using lit-html
  setUI() {}

  // can be overwritten in derived element
  init() {
    // use it for getting data from parent, ...
  }

  afterRender() {
    // use it eg. for dom manips after rendering ...
  }

  destroy() {
    // use it eg. for cleanup dom refs  ...
  }

  constructor() {
    super()
    this._id = ++OvlBaseElement._counter
    this.name = this.localName + this._id.toString()
    this.trackedTree = overmind.getTrackStateTree()
    this.actions = <Config["actions"]>overmind.actions
    this.state = <Config["state"]>this.trackedTree.state
  }

  doRender() {
    console.log(this.name + " startRender")
    // from here now this.state.xy will be tracked
    let res = this.getUI()
    if (res !== undefined) {
      render(res, this)
    }
    this.setUI()
    this.afterRender()
    console.log(this.name + " finishedRender. Registered paths:")
    console.log(this.trackedTree.pathDependencies)
    let eventType = EventType.COMPONENT_ADD
    if (this._flushId) {
      eventType = EventType.COMPONENT_UPDATE
    }
    let eventObj: any = {
      componentId: this.name,
      componentInstanceId: this._id,
      name: this.name,
      paths: Array.from(this.trackedTree.pathDependencies) as any
    }
    if (this._flushId) {
      eventObj.flushId = this._flushId
    }
    console.log("send to devtools:")
    console.log(eventType)
    console.log(eventObj)
    overmind.eventHub.emitAsync(eventType, eventObj)
  }

  onUpdate = (mutations, paths, flushId) => {
    console.log(this.name + " onUpdate")
    console.log(paths)
    console.log(flushId)
    // console.log(mutations)
    this._flushId = flushId
    this.trackedTree.trackScope(() => this.doRender(), this.onUpdate)
  }

  connectedCallback() {
    console.log(this.name + " connect")

    this.trackedTree.trackScope(() => {
      this.init()
      this.doRender()
    }, this.onUpdate)
  }

  disconnectedCallback() {
    console.log(this.name + " disconnect")

    overmind.eventHub.emitAsync(EventType.COMPONENT_REMOVE, {
      componentId: this.name,
      componentInstanceId: this._id,
      name: this.name
    })

    this.trackedTree.dispose()
    this.destroy()
  }
}
