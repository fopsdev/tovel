import { html } from "lit-html"
import { repeat } from "./repeat"
import { OvlBaseElement } from "./OvlBaseElement"
import { OvlTable, BaseData, BaseFields } from "./OvlTableHeaderElement"
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

  removeTracking() {
    let paths: Set<string> = new Set()
    paths.add(this.rowData.dataStatePath)
    return paths
  }

  initProps() {
    super.initProps()
    this.rowData = this.getData()
    this.rowData.dataStatePath = OvlTable.table.DataStatePath
  }

  getCellId(cindex: number): string {
    return this.id + "_" + cindex.toString()
  }
  getUI() {
    return html`
      ${
        repeat(
          this,
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
                  this.rowData.data[this.rowData.rowKey][f]
                )
              }
            </span>
          `
        )
      }
    `
  }
}
