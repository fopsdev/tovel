import { app, state, Tracking } from "../index"
import { render, TemplateResult } from "lit-html"
import { IConfig, TApp, EventType } from "overmind"
export type TrackingType = { trackId: number; mutationListener: any }

export class OvlBaseElement extends HTMLElement {
  // each element should at least have an id
  mutationListener: any
  paths: Set<string>
  state: TApp<IConfig>["state"]
  componentName: string
  id: string
  _id: number

  static _counter: number = 0

  // child comps should implement getUI to render a htm template
  constructor() {
    super()
    this._id = ++OvlBaseElement._counter
    this.state = app.state
  }

  // this function is needed because we also want to access untracked state
  // since derived will be also in the state we need to duplicate the logic when accessing state functions (aka derived)
  // https://github.com/cerebral/overmind/issues/135
  static getUntrackedValue(self: {}, value: any) {
    if (typeof value == "function") {
      value = value(self, state)
    }
    return value
  }
  // initialising props
  initProps() {
    this.id = this.getAttribute("id")
    if (!this.id || this.id === "null") {
      throw Error("Ovl Base: id attribute is mandatory")
    }
    this.componentName = this.tagName + "_" + this.id.toString()
    console.log("init props: " + this.componentName)
  }
  // add manual state tracking paths
  addTracking(paths: Set<string>) {}
  // remove manual state tracking paths
  removeTracking(): Set<string> {
    return undefined
  }
  afterRender() {}
  prepareUI() {}
  trackState(): number {
    let trackId = app.trackState()
    console.log(this.componentName + " start tracking. trackid:" + trackId)
    return trackId
  }
  clearTrackState(trackId: number) {
    console.log(this.componentName + " finish tracking. trackid:" + trackId)
    let paths = app.clearTrackState(trackId)
    if (paths.size > 0) {
      this.addTracking(paths)
      let pathsToRemove: Set<string> = this.removeTracking()
      if (pathsToRemove) {
        pathsToRemove.forEach(v => {
          let searchVal = v
          let pathsToDelete: string[] = []
          if (searchVal.endsWith("*")) {
            //debugger
            searchVal = searchVal.substring(0, searchVal.length - 1)
            paths.forEach(pv => {
              if (pv.startsWith(searchVal)) {
                pathsToDelete.push(pv)
              }
            })
          } else {
            pathsToDelete.push(v)
          }
          pathsToDelete.forEach(p => {
            paths.delete(p)
          })
        })
      }
      if (!Tracking.mutationListener) {
        if (app.devtools) {
          app.eventHub.emitAsync(EventType.COMPONENT_ADD, {
            componentId: this._id,
            componentInstanceId: this._id,
            name: this.componentName,
            paths: Array.from(paths)
          })
        }
        console.log(this.componentName + " adding paths:")
        console.log(paths)
        Tracking.mutationListener = app.addMutationListener(paths, flushId => {
          if (app.devtools) {
            app.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
              componentId: this._id,
              componentInstanceId: this._id,
              name: this.componentName,
              paths: Array.from(paths),
              flushId
            })
          }
          this.doRender()
        })
      } else {
        console.log(this.componentName + " updating paths:")
        console.log(paths)
        Tracking.mutationListener.update(paths)
      }
    }
  }

  doRender() {
    console.log("render: " + this.componentName)
    this.prepareUI()

    Tracking.trackId = this.trackState()
    Tracking.mutationListener = this.mutationListener
    let res = this.getUI()
    render(res, this)
    console.log("finished render: " + this.componentName)

    this.afterRender()
    if (Tracking.trackId !== undefined) {
      this.clearTrackState(Tracking.trackId)
    }
  }

  connectedCallback() {
    if (Tracking.trackId !== undefined) {
      this.clearTrackState(Tracking.trackId)
      Tracking.trackId = undefined
    }
    this.initProps()
    this.doRender()
  }

  disconnectedCallback() {
    if (this.mutationListener) {
      this.mutationListener.dispose()
      this.mutationListener = undefined
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
