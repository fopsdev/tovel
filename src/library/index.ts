import { app } from "../index"
import { render, TemplateResult, html, Directive, NodePart } from "lit-html"
import { repeat, KeyFn, ItemTemplate } from "lit-html/directives/repeat"
import { App, EventType } from "overmind"

export class OvlBaseElement extends HTMLElement {
  mutationListener: any
  state: App["state"]
  id: string
  _id: number
  static counter: number = 0

  repeat<T>(
    items: Iterable<T>,
    keyFnOrTemplate: KeyFn<T> | ItemTemplate<T>,
    template?: ItemTemplate<T>
  ): Directive<NodePart> {
    //let trackId = app.trackState()
    const myFn = (i, ix) => {
      let trackId = this.trackState()
      let res = template(i, ix)
      this.clearTrackState(trackId)
      return res
    }
    return repeat(items, keyFnOrTemplate, myFn)
  }
  //  child comps should implement getUI to render a htm template
  //  its tracked
  // for preparing stuff which is not tracked
  prepare() {}
  // initialising tracked props
  initProps() {}
  // add manual state tracking paths
  addTracking(paths: Set<string>) {}
  // remove manual state tracking paths
  removeTracking(paths: Set<string>) {}

  prepareUI() {}
  constructor() {
    super()
    this.state = app.state
    this._id = ++OvlBaseElement.counter
    console.log("base constructor id " + this.id)
  }
  trackState(): number {
    return app.trackState()
  }
  clearTrackState(trackId: number) {
    let paths = app.clearTrackState(trackId)
    //console.log(this.mutationListener)
    if (paths.size > 0) {
      this.addTracking(paths)
      this.removeTracking(paths)
      if (!this.mutationListener) {
        if (app.devtools) {
          let componentId = this.tagName + "_" + this.id
          app.eventHub.emitAsync(EventType.COMPONENT_ADD, {
            componentId: this._id,
            componentInstanceId: OvlBaseElement.counter,
            name: componentId,
            paths: Array.from(paths)
          })
        }
        console.log("Comp: " + this.tagName + "_" + this.id + " adding paths:")
        console.log(paths)
        this.mutationListener = app.addMutationListener(paths, flushId => {
          if (app.devtools) {
            let componentId = this.tagName + "_" + this._id.toString()
            app.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
              componentId: this._id,
              componentInstanceId: OvlBaseElement.counter,
              name: componentId,
              paths: Array.from(paths),
              flushId
            })
          }
          this.doRender()
        })
      } else {
        console.log(
          "Comp: " + this.tagName + "_" + this.id + " updating paths:"
        )
        console.log(paths)
        this.mutationListener.update(paths)
      }
    }
  }
  doRender() {
    this.prepare()
    let trackId = this.trackState()
    this.prepareUI()
    let res = this.getUI()
    this.clearTrackState(trackId)
    render(res, this)
  }

  connectedCallback() {
    console.log("base connected")
    this.initProps()
    this.doRender()
  }

  disconnectedCallback() {
    if (this.mutationListener) {
      this.mutationListener.dispose()
      this.mutationListener = null
    }
    if (app.devtools) {
      let componentId = this.tagName + "_" + this._id.toString()
      app.eventHub.emitAsync(EventType.COMPONENT_REMOVE, {
        componentId: this._id,
        componentInstanceId: OvlBaseElement.counter,
        name: componentId
      })
    }
  }
  getUI(): TemplateResult {
    return null
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

export type TableData = { table: BaseTable; data: BaseData }

export type BaseTable = {
  TableStatePath: string
  DataStatePath: string
  Id: string
  Filter: string
  Sort: TableSort
  Entity: string
  IDField: string
  Paging: TablePaging
  Selected: string[]
}

export class OvlTableElement extends OvlBaseElement {
  table: BaseTable
  fields: BaseFields
  data: BaseData
  sortedFieldKeys: string[]
  sortedDataKeys: string[]
  addTracking(paths: Set<string>) {
    paths.add(this.table.TableStatePath)
  }
  initProps() {
    console.log("init props header")
    this.id = this.table.Id
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
      html`<div class="c-table__row"><ovl-row class="c-table__cell" 
      .rowData=${{
        id: this.table.Id + i,
        dataStatePath: this.table.DataStatePath,
        rowKey: i,
        data: this.data,
        sortedFieldKeys: this.sortedFieldKeys
      }}> </ovl-row></div>`
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
      return Object.keys(this.data)
    }
    let ascending = this.table.Sort.Ascending ? 1 : -1
    let res: number = 0
    return Object.keys(this.data).sort((a, b) => {
      const valB = this.data[b][sortfield]
      const valA = this.data[a][sortfield]
      switch (this.fields[sortfield].Type) {
        case "date":
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
          res = valA - valB
          break
      }
      return res * ascending
    })
  }
}

export class OvlTableRow extends OvlBaseElement {
  rowData: {
    id: string
    dataStatePath: string
    rowKey: string
    sortedFieldKeys: string[]
    data: BaseData
  }
  removeTracking(paths: Set<string>) {
    paths.delete(this.rowData.dataStatePath)
  }
  initProps() {
    this.id = this.rowData.id
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
if (!customElements.get("ovl-table")) {
  customElements.define("ovl-table", OvlTableElement)
  customElements.define("ovl-row", OvlTableRow)
}
