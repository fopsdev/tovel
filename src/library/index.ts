import { app } from "../index"
import { render, TemplateResult, html } from "lit-html"
import { IApp, EventType, Action, Derive } from "overmind"
import { repeat } from "lit-html/directives/repeat"
import { TableTest } from "../components/tablea"

export class OvlBaseElement extends HTMLElement {
  // each element should at least have an id
  mutationListener: any
  paths: Set<string>
  state: IApp["state"]
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
type TableColumnEventData = {
  Sort: TableSort
  ColumnId: string
}
export const changeSort: Action<TableColumnEventData> = ({
  value: tableColumnData,
  state
}) => {
  // console.log(tableColumnData.Sort)
  // console.log(state)
  const field = tableColumnData.Sort.Field
  if (tableColumnData.ColumnId === field) {
    tableColumnData.Sort.Ascending = !tableColumnData.Sort.Ascending
  } else {
    tableColumnData.Sort.field = tableColumnData.ColumnId
    tableColumnData.Sort.Ascending = true
  }
  //tableColumnData.Sort.Field = tableColumnData.ColumnId
}

type TableEventTypes = "@ovlcell@"

export type TableSort = {
  Ascending: boolean
  field: string
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
  DataStatePath: string
  Filter: string
  Sort: TableSort
  Entity: string
  IDField: string
  Paging: TablePaging
  Selected: string[]
}

type TableEventPosition = {
  rowIndex: number
  columnIndex: number
}

export class OvlTableElement extends OvlBaseElement {
  getData: any
  static table: BaseTable
  fields: BaseFields
  data: BaseData
  untrackedData: BaseData
  sortedFieldKeys: string[]
  sortedDataKeys: string[]
  constructor() {
    super()
    this.addEventListener("click", e => {
      this.handleTableEvent(e)
    })
    this.addEventListener("blur", e => {
      this.handleTableEvent(e)
    })
    this.addEventListener("focus", e => {
      this.handleTableEvent(e)
    })
    this.addEventListener("keypress", e => {
      this.handleTableEvent(e)
    })
  }
  handleTableEvent(e) {
    let position = this.getTableEventProps(e)
    //console.log("Event Type:" + e.type + " pos: " + JSON.stringify(position))
    if (!position) {
      return
    }
    let cancel = false
    this.handleEventBefore(e, position, cancel)
    if (!cancel) {
      // do default stuff like sorting
      if (e.type === "click") {
        if (position.rowIndex === -1) {
          // its a click on a column header
          app.actions.changeSort({
            Sort: OvlTableElement.table.Sort,
            ColumnId: this.sortedFieldKeys[position.columnIndex]
          })
        }
      }
      this.handleEventAfter(e, position)
    }
  }
  getTableEventProps(e): TableEventPosition {
    let target = e.target.id
    if (target.indexOf(<TableEventTypes>"@ovlcell@") < 0) {
      // lookup on the parent
      target = e.target.parentElement.id
      if (target.indexOf(<TableEventTypes>"@ovlcell@") < 0) {
        // was no table event so just return
        return undefined
      }
    }
    const position = target.split(<TableEventTypes>"@ovlcell@")[1]
    const rowIndex = parseInt(position.split("_")[0])
    const columnIndex = parseInt(position.split("_")[1])
    return { rowIndex, columnIndex }
  }
  handleEventBefore(e, position: TableEventPosition, cancel: boolean) {}
  handleEventAfter(e, position: TableEventPosition) {}
  initProps() {
    super.initProps()
    console.log("init props header")
    OvlTableElement.table = this.getData().table
    this.data = this.getData().data
    this.untrackedData = this.getData().untrackedData
  }

  prepareUI() {
    this.fields = <BaseFields>(<any>OvlTableElement.table).Fields
    this.sortedFieldKeys = this.getSortedFieldKeys()
    this.sortedDataKeys = this.getSortedDataKeys()
  }

  getUI(): TemplateResult {
    // a default implementation of rendering the column headers
    // and calling the default row element
    // overwrite those getUI methods in your child elements if you prefer a different rendering
    {
      let sortField = OvlTableElement.table.Sort.Field
      return html`
        <div class="c-table c-table--striped">
          <div class="c-table__caption">Default UI Table</div>
          <div class="c-table__row c-table__row--heading">
            ${
              this.sortedFieldKeys.map((k, index) => {
                let sortMarker = ""
                if (k === sortField) {
                  sortMarker = OvlTableElement.table.Sort.Ascending ? "▲" : "▼"
                }
                return html`
                  <span
                    class="c-table__cell"
                    tabIndex="${index}"
                    id="${OvlTableElement.getCellId(this.id, -1, index)}"
                    >${this.fields[k].Name}${sortMarker}
                  </span>
                `
              })
            }
          </div>

          ${
            repeat(
              this.getSortedDataKeys(),
              i => i,
              (i, rowIndex) => html`
                <ovl-row
                  id="${this.id + i}"
                  class="c-table__row"
                  .getData="${
                    () => ({
                      dataStatePath: OvlTableElement.table.DataStatePath,
                      rowKey: i,
                      rowIndex: rowIndex,
                      data: this.data,
                      sortedFieldKeys: this.sortedFieldKeys
                    })
                  }"
                >
                </ovl-row>
              `
            )
          }
        </div>
      `
    }
  }
  static getCellId(
    tableId: string,
    rowIndex: number,
    columnIndex: number
  ): string {
    return (
      tableId +
      <TableEventTypes>"@ovlcell@" +
      rowIndex.toString() +
      "_" +
      columnIndex.toString()
    )
  }

  getSortedFieldKeys(): string[] {
    return Object.keys(this.fields).sort(
      (a, b) => this.fields[a].Pos - this.fields[b].Pos
    )
  }
  getSortedDataKeys(): string[] {
    let sortfield = OvlTableElement.table.Sort.Field
    let ascending = OvlTableElement.table.Sort.Ascending ? 1 : -1
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
    rowIndex: number
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

  getCellId(cindex: number): string {
    return this.id + "_" + cindex.toString()
  }
  getUI() {
    return html`
      ${
        repeat(
          this.rowData.sortedFieldKeys,
          f => f,
          (f, columnIndex) => html`
            <span
              class="c-table__cell"
              tabIndex="${columnIndex}"
              id="${
                OvlTableElement.getCellId(
                  this.id,
                  this.rowData.rowIndex,
                  columnIndex
                )
              }"
              >${this.rowData.data[this.rowData.rowKey][f]}
            </span>
          `
        )
      }
    `
  }
}
customElements.define("ovl-table", OvlTableElement)
customElements.define("ovl-row", OvlTableRow)
