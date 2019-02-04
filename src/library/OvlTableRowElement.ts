import { html } from "lit-html"
import { repeat } from "lit-html/directives/repeat.js"
import { OvlBaseElement } from "./OvlBaseElement"
import { OvlTable, BaseData, BaseFields } from "./OvlTableHeaderElement"

export type RowProps = {
  rowKey: string
  rowIndex: number
  sortedFieldKeys: string[]
  rowData: any
  fields: BaseFields
}

export class OvlTableRow extends OvlBaseElement {
  rowData: RowProps

  getUI() {
    console.log(this.rowData)
    return html`
      ${repeat(
        this.rowData.sortedFieldKeys,
        f => f,
        (f, columnIndex) => html`
          <span
            class="c-table__cell"
            tabIndex="${columnIndex}"
            id="${OvlTable.getCellId(
              this.id,
              this.rowData.rowIndex,
              columnIndex
            )}"
            >${OvlTable.getDisplayValue(
              this.rowData.fields[f],
              this.rowData.rowData,
              f
            )}
          </span>
        `
      )}
    `
  }
}
