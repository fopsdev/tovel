import { app } from "../index"
import { render, TemplateResult } from "lit-html"
import { IConfig, TApp, EventType } from "overmind"

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
      if (!this.mutationListener) {
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
        this.mutationListener = app.addMutationListener(paths, flushId => {
          if (app.devtools) {
            app.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
              componentId: this._id,
              componentInstanceId: this._id,
              name: this.componentName,
              paths: Array.from(paths),
              flushId
            })
          }
          requestAnimationFrame(() => this.doRender())
        })
      } else {
        console.log(this.componentName + " updating paths:")
        console.log(paths)
        if (app.devtools) {
          app.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
            componentId: this._id,
            componentInstanceId: this._id,
            name: this.componentName,
            paths: Array.from(paths)
          })
        }
        this.mutationListener.update(paths)
      }
    }
  }

  doRender() {
    console.log("render: " + this.componentName)
    this.prepareUI()
    let trackId = this.trackState()
    let res = this.getUI()
    this.clearTrackState(trackId)
    render(res, this)
    this.afterRender()
  }

  connectedCallback() {
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
