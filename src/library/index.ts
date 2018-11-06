import { app, state } from "../index"
import { render, TemplateResult, html } from "lit-html"
import { App, EventType } from "overmind"

export class OvlBaseElement extends HTMLElement {
  // each element should at least have an id
  mutationListener: any
  paths: Set<string>
  state: App["state"]
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
  removeTracking(paths: Set<string>) {}

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
      this.removeTracking(paths)
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
          this.doRender()
        })
      } else {
        console.log(this.componentName + " updating paths:")
        console.log(paths)
        this.mutationListener.update(paths)
      }
    }
  }

  doRender() {
    console.log("render: " + this.componentName)
    let trackId = this.trackState()
    this.prepareUI()
    let res = this.getUI()
    render(res, this)
    this.clearTrackState(trackId)
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

//#####################TableHeaderElement##########################
export type TableSort = {
  Ascending: boolean
  Field: string
}

export type TablePaging = {
  Page: number
  Size: number
}
export type TableFieldTypes = "int" | "decimal" | "string" | "date"

export type TableField = {
  Pos: number
  Type: TableFieldTypes
  Name: string
  Editable: boolean
  Visible: boolean
  Width: number
}

export type BaseFields = { [key: string]: TableField }

export type BaseData = { [key: string]: any }

export type TableData = {
  table: BaseTable
  data: BaseData
  untrackedData: BaseData
}

export type BaseTable = {
  TableStatePath: string
  DataStatePath: string
  Filter: string
  Sort: TableSort
  Entity: string
  IDField: string
  Paging: TablePaging
  Selected: string[]
}

export class OvlTableElement extends OvlBaseElement {
  getData: any
  table: BaseTable
  fields: BaseFields
  data: BaseData
  untrackedData: BaseData
  sortedFieldKeys: string[]
  sortedDataKeys: string[]

  initProps() {
    super.initProps()
    console.log("init props header")
    this.table = this.getData().table
    this.data = this.getData().data
    this.untrackedData = this.getData().untrackedData
  }

  prepareUI() {
    this.fields = <BaseFields>(<unknown>(<any>this.table).Fields)
    this.sortedFieldKeys = this.getSortedFieldKeys()
    this.sortedDataKeys = this.getSortedDataKeys()
  }

  getUI(): TemplateResult {
    // a default implementation of rendering the column headers
    // and calling the default row element
    // overwrite those getUI methods in your child elements if you prefer a different rendering
    return html`<div class="c-table c-table--striped">
  <div class="c-table__caption">Test Table</div>
  <div class="c-table__row c-table__row--heading">
    ${this.sortedFieldKeys.map(
      k => html`<span class="c-table__cell" >${this.fields[k].Name}</span>`
    )}
  </div>

  ${this.getSortedDataKeys().map(
    i =>
      html`<div class="c-table__row"><ovl-row id="${this.id +
        i}" class="c-table__cell" 
      .getData=${() => ({
        dataStatePath: this.table.DataStatePath,
        rowKey: i,
        data: this.data,
        sortedFieldKeys: this.sortedFieldKeys
      })}> </ovl-row></div>`
  )}
  </div>`
  }

  getSortedFieldKeys(): string[] {
    return Object.keys(this.fields).sort(
      (a, b) => this.fields[a].Pos - this.fields[b].Pos
    )
  }

  getSortedDataKeys(): string[] {
    let sortfield = this.table.Sort.Field
    if (!sortfield) {
      sortfield = this.table.IDField
      //return Object.keys(this.data)
    }
    let ascending = this.table.Sort.Ascending ? 1 : -1
    let res: number = 0
    return Object.keys(this.untrackedData).sort((a, b) => {
      let valB = this.untrackedData[b][sortfield]
      let valA = this.untrackedData[a][sortfield]
      switch (this.fields[sortfield].Type) {
        case "date":
          // if (valA === undefined || valA === null) {
          //   valA = new Date(-8640000000000000)
          // }
          // if (valB === undefined || valB === null) {
          //   valB = new Date(-8640000000000000)
          // }
          const aDate = new Date(valA).getTime()
          const bDate = new Date(valB).getTime()
          res = aDate - bDate
          break
        case "string":
          if (valA < valB) {
            res = -1
          } else if (valA > valB) {
            res = 1
          }
          break
        case "decimal":
        case "int":
          // if (valA === undefined || valA === null) {
          //   valA = Number.MIN_SAFE_INTEGER
          // }
          // if (valB === undefined || valB === null) {
          //   valB = Number.MIN_SAFE_INTEGER
          // }

          res = valA - valB
          break
      }
      return res * ascending
    })
  }
}

export class OvlTableRow extends OvlBaseElement {
  getData: any
  rowData: {
    dataStatePath: string
    rowKey: string
    sortedFieldKeys: string[]
    data: BaseData
  }

  removeTracking(paths: Set<string>) {
    paths.delete(this.rowData.dataStatePath)
  }

  initProps() {
    super.initProps()
    this.rowData = this.getData()
  }

  getUI(): TemplateResult {
    return html`
    ${this.rowData.sortedFieldKeys.map(
      f =>
        html`<span class="c-table__cell">${
          this.rowData.data[this.rowData.rowKey][f]
        }</span>`
    )}
  `
  }
}
customElements.define("ovl-table", OvlTableElement)
customElements.define("ovl-row", OvlTableRow)
