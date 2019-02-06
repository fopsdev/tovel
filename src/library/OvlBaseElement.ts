import { overmind, Config } from "../index"
import { TApp, EventType } from "overmind"
import { render, TemplateResult } from "lit-html"
import { ITrackStateTree } from "proxy-state-tree"

export class OvlBaseElement extends HTMLElement {
  _id: number
  _flushId: number
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
    // @ts-ignore
    //this.trackedTree.resume()

    // from here now this.state.xy will be tracked
    render(this.getUI(), this)
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

    // @ts-ignore
    //this.trackedTree.pause()
  }

  disconnectedCallback() {
    console.log(this.name + " disconnect")

    overmind.eventHub.emitAsync(EventType.COMPONENT_REMOVE, {
      componentId: this.name,
      componentInstanceId: this._id,
      name: this.name
    })

    this.trackedTree.dispose()
  }
}
