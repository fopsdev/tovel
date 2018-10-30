import { app } from "../index"
import { render, TemplateResult, html } from "lit-html"
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

type TableFields = { [key: string]: TableField }

export type Table = {
  Filter: string
  Sort: TableSort
  Entity: string
  IDField: string
  Paging: TablePaging
  Selected: string[]
}

export class OvlTableHeaderElement extends OvlBaseElement {
  table: Table
  fields: TableFields

  getUI(): TemplateResult {
    // a default implementation of rendering the column headers
    let fn = this.state.TableTest.Fields.CustomerFirstName.Name
    return html`<h1>Column ${fn}</h1>`
  }
}
