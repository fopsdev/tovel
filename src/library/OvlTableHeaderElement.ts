import { app } from "../index"
import { TemplateResult, html } from "lit-html"
import { Action } from "overmind"
import { repeat } from "lit-html/directives/repeat"
import { OvlBaseElement } from "./OvlBaseElement"

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
export type TableColumnAlign = "left" | "center" | "right"

export type TableField = {
  Pos: number
  Type: TableFieldTypes
  Name: string
  Editable: boolean
  Visible: boolean
  Width: number
  Align: TableColumnAlign
  // if no format provided, default will be used
  Format?: Intl.NumberFormat | Intl.DateTimeFormat
}

let defaultNumberFormat = new Intl.NumberFormat("de-ch", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})
let defaultDateFormat = new Intl.DateTimeFormat("de-ch", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit"
})

export type BaseFields = { [key: string]: TableField }

export type BaseData = { [key: string]: any }

export type TableProps = {
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

export class OvlTable extends OvlBaseElement {
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
            Sort: OvlTable.table.Sort,
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

  static getDisplayValue(fieldInfo: TableField, value: any): string {
    switch (fieldInfo.Type) {
      case "date":
        if (!value) {
          return ""
        }
        let format: Intl.DateTimeFormat = <Intl.DateTimeFormat>fieldInfo.Format
        if (!format) {
          format = defaultDateFormat
        }
        return format.format(new Date(value))
      case "decimal":
        if (value === undefined || value === null) {
          return ""
        }
        let format2: Intl.NumberFormat = <Intl.NumberFormat>fieldInfo.Format
        if (!format2) {
          format2 = defaultNumberFormat
        }
        return format2.format(value)
      default:
        if (!value) {
          value = ""
        }
        return value.toString()
    }
  }
  addTracking(paths: Set<string>) {
    paths.add(OvlTable.table.DataStatePath)
  }

  // removeTracking() {
  //   let paths: Set<string> = new Set()
  //   paths.add(OvlTableElement.table.DataStatePath + ".*")
  //   return paths
  // }

  initProps() {
    super.initProps()
    //console.log("init props header")
    OvlTable.table = this.getData().table
    this.data = this.getData().data
    this.untrackedData = this.getData().untrackedData
  }

  prepareUI() {
    this.fields = <BaseFields>(<any>OvlTable.table).Fields
    this.sortedFieldKeys = this.getSortedAndFilteredFieldKeys()
    this.sortedDataKeys = this.getSortedDataKeys()
    console.log("sortedDataKeys")
    console.log(this.sortedDataKeys)
  }

  getUI(): TemplateResult {
    // a default implementation of rendering the column headers
    // and calling the default row element
    // overwrite those getUI methods in your child elements if you prefer a different rendering
    {
      let sortField = OvlTable.table.Sort.Field
      return html`
        <div class="c-table c-table--striped">
          <div class="c-table__caption">Default UI Table</div>
          <div class="c-table__row c-table__row--heading">
            ${
              this.sortedFieldKeys.map((k, index) => {
                let sortMarker = ""
                if (k === sortField) {
                  sortMarker = OvlTable.table.Sort.Ascending ? "▲" : "▼"
                }
                return html`
                  <span
                    class="c-table__cell"
                    tabIndex="${index}"
                    id="${OvlTable.getCellId(this.id, -1, index)}"
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
                      rowKey: i,
                      rowIndex: rowIndex,
                      data: this.data,
                      sortedFieldKeys: this.sortedFieldKeys,
                      fields: this.fields
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

  getSortedAndFilteredFieldKeys(): string[] {
    return Object.keys(this.fields).sort(
      (a, b) => this.fields[a].Pos - this.fields[b].Pos
    )
  }
  getSortedDataKeys(): string[] {
    let sortfield = OvlTable.table.Sort.Field
    let ascending = OvlTable.table.Sort.Ascending ? 1 : -1
    const data = this.untrackedData
    console.log("untracked")
    console.log(this.untrackedData)
    console.log("tracked")
    console.log(this.data)
    let res: number = 0
    return Object.keys(data)
      .filter(v => {
        return Object.keys(data[v]).some(s => {
          const value = OvlBaseElement.getUntrackedValue(data[v], data[v][s])
          const dispValue = OvlTable.getDisplayValue(this.fields[s], value)
          return (
            dispValue
              .toLowerCase()
              .indexOf(OvlTable.table.Filter.toLowerCase()) > -1
          )
        })
      })
      .sort((a, b) => {
        let valB = OvlBaseElement.getUntrackedValue(data[b], data[b][sortfield])
        let valA = OvlBaseElement.getUntrackedValue(data[a], data[a][sortfield])
        switch (this.fields[sortfield].Type) {
          case "date":
            const aDate = new Date(valA).getTime()
            const bDate = new Date(valB).getTime()
            res = aDate - bDate
            break
          case "string":
            if (valA === null) {
              valA = ""
            }
            if (valB === null) {
              valB = ""
            }
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
