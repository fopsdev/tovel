import { app } from "../index"
import { render, TemplateResult } from "lit-html"
import { IConfig, TApp, EventType } from "overmind"
import { ITrackStateTree } from "proxy-state-tree"

export class OvlBaseElement extends HTMLElement {
  // each element should at least have an id
  mutationListener: any
  paths: Set<string>
  state: TApp<IConfig>["state"]
  trackedTree: ITrackStateTree<object>
  currentFlushId: number
  componentName: string
  id: string
  _id: number

  onUpdate(mutations, paths, flushId) {
    console.log("onUpdate")
    if (app.devtools) {
      app.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
        componentId: this._id,
        componentInstanceId: this._id,
        name: this.componentName,
        flushId: flushId,
        paths: paths
      })
    }
    this.currentFlushId = flushId
    requestAnimationFrame(() => this.doRender())
  }

  static _counter: number = 0

  // child comps should implement getUI to render a htm template
  constructor() {
    super()
    this._id = ++OvlBaseElement._counter
    this.state = app.state
    this.currentFlushId = undefined
  }
  // initialising props
  initProps() {
    this.id = this.getAttribute("id")
    if (!this.id || this.id === "null") {
      throw Error("Ovl Base: id attribute is mandatory")
    }
    this.componentName = this.tagName + "_" + this.id.toString()
    console.log("init props: " + this.componentName)
    if (app.devtools) {
      app.eventHub.emitAsync(EventType.COMPONENT_ADD, {
        componentId: this._id,
        componentInstanceId: this._id,
        name: this.componentName,
        paths: []
      })
    }
  }
  // add manual state tracking paths
  addTracking(paths: Set<string>) {}
  // remove manual state tracking paths
  removeTracking(): Set<string> {
    return undefined
  }
  afterRender() {}
  prepareUI() {}
  // trackState(): number {
  //   this.trackedTree = app.getTrackStateTree()

  //   this.trackedTree.track((e) => {

  //     if (!this.mutationListener) {
  //       if (app.devtools) {
  //         app.eventHub.emitAsync(EventType.COMPONENT_ADD, {
  //           componentId: this._id,
  //           componentInstanceId: this._id,
  //           name: this.componentName,
  //           paths: Array.from(this.trackedTree.pathDependencies) as any
  //         })
  //       }
  //       console.log(this.componentName + " adding paths:")
  //       console.log(paths)
  //       this.mutationListener = app.addMutationListener(paths => {
  //         if (app.devtools) {
  //           app.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
  //             componentId: this._id,
  //             componentInstanceId: this._id,
  //             name: this.componentName,
  //             paths: Array.from(this.trackedTree.pathDependencies) as any

  //           })
  //         }
  //         requestAnimationFrame(() => this.doRender())
  //       })
  //     } else {
  //       console.log(this.componentName + " updating paths:")
  //       console.log(paths)
  //       if (app.devtools) {
  //         app.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
  //           componentId: this._id,
  //           componentInstanceId: this._id,
  //           name: this.componentName,
  //           paths: Array.from(paths)
  //         })
  //       }
  //       this.mutationListener.update(paths)
  //     }
  //   }

  //   })
  //   console.log(this.componentName + " start tracking. trackid:" + )
  //   return 1
  // }
  doRender() {
    console.log("render: " + this.componentName)
    this.prepareUI()
    console.log("Start Render Comp:")
    console.log(this)
    this.trackedTree = app.getTrackStateTree().track(this.onUpdate)

    this.state = <TApp<IConfig>["state"]>this.trackedTree.state
    let res = this.getUI()
    this.trackedTree.dispose()
    //this.clearTrackState(trackId)
    console.log("Stop Render Comp:")
    console.log(this)
    render(res, this)
    this.afterRender()
  }

  connectedCallback() {
    this.initProps()
    this.doRender()
  }

  disconnectedCallback() {
    if (this.trackedTree) {
      this.trackedTree.dispose()
      this.trackedTree == undefined
    }
    if (app.devtools) {
      app.eventHub.emitAsync(EventType.COMPONENT_REMOVE, {
        componentId: this._id,
        componentInstanceId: this._id,
        name: this.componentName
      })
    }
  }
  getUI(): TemplateResult {
    return null
  }
}
