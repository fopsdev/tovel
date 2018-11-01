import { app } from "../index"
import { render, TemplateResult, html } from "lit-html"
import { repeat } from "lit-html/directives/repeat"
import { App } from "overmind"

export class OvlBaseElement extends HTMLElement {
  trackId: number
  mutationListener: any
  state: App["state"]
  //  child comps should implement getUI to render a htm template
  //  its tracked

  // for preparing stuff which is not tracked
  prepare() {}
  // initialising tracked props
  initProps() {}
  constructor() {
    super()
    this.state = app.state
    console.log("base constructor")
  }
  doRender() {
    this.prepare()
    this.trackId = app.trackState()
    this.initProps()
    let res = this.getUI()

    render(res, this)
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
  initProps() {
    console.log("init props header")
    this.fields = <BaseFields>(<unknown>(<any>this.table).Fields)
    this.sortedFieldKeys = this.getSortedFieldKeys()
    this.sortedDataKeys = this.getSortedDataKeys()
  }
  getUI(): TemplateResult {
    // a default implementation of rendering the column headers
    // let fn = this.fields.CustomerFirstName.Name
    // return html`<h1>Column ${fn}</h1>`

    return html`<div class="c-table c-table--striped">
  <div class="c-table__caption">Test Table</div>
  <div class="c-table__row c-table__row--heading">
    ${this.sortedFieldKeys.map(
      k => html`<span class="c-table__cell" >${this.fields[k].Name}</span>`
    )}
  </div>

  ${repeat(
    this.getSortedDataKeys(),
    i => i,
    (i, index) =>
      html`<div class="c-table__row"><ovl-row class="c-table__cell" .rowData=${{
        id: i,
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
    return Object.keys(this.data)
  }
}

export class OvlTableRow extends OvlBaseElement {
  rowData: { id: string; sortedFieldKeys: string[]; data: BaseData }
  getUI(): TemplateResult {
    return html`
    ${repeat(
      this.rowData.sortedFieldKeys,
      f => f,
      (f, findex) =>
        html`<span class="c-table__cell">${
          this.rowData.data[this.rowData.id][f]
        }</span>`
    )}
  `
  }
}
