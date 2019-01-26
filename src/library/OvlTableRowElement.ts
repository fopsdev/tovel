import { html } from "lit-html"
//import { repeat } from "./repeat"
import { repeat } from "lit-html/directives/repeat.js"
import { OvlBaseElement } from "./OvlBaseElement"
import { OvlTable, BaseData, BaseFields } from "./OvlTableHeaderElement"
import { overmind } from "../index"
export class OvlTableRow extends OvlBaseElement {
  getData: any
  rowData: {
    dataStatePath: string
    rowKey: string
    rowIndex: number
    sortedFieldKeys: string[]
    data: BaseData
    fields: BaseFields
  }

  init() {
    super.init()
    this.rowData = this.getData(this.state)
    this.rowData.dataStatePath = OvlTable.table.DataStatePath
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
                OvlTable.getCellId(this.id, this.rowData.rowIndex, columnIndex)
              }"
              >${
                OvlTable.getDisplayValue(
                  this.rowData.fields[f],
                  this.rowData.data[this.rowData.rowKey],
                  f
                )
              }
            </span>
          `
        )
      }
    `
  }
}
