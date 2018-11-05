import {
  OvlTableElement,
  OvlTableRow,
  BaseTable,
  TableField
} from "../library/index"
import { Derive } from "overmind"
import { html } from "lit-html"
import { repeat } from "lit-html/directives/repeat"

type TableTestColumns =
  | "IDTransaction"
  | "CustomerFirstName"
  | "CustomerLastName"
  | "CustomerFullName"
  | "DeliveryDate"
  | "A_ProvisionTotal"
  | "A_ProvisionFactor"

type TableFields = { [key in TableTestColumns]: TableField }

export interface UserTable extends BaseTable {
  Fields: Derive<TableFields>
}

const derivedTableFields: Derive<TableFields> = state => {
  let idField: TableField = {
    Pos: 0,
    Name: "ID",
    Type: "int",
    Editable: true,
    Visible: true,
    Width: 10
  }

  let customerFirstNameField: TableField = {
    Pos: 1,
    Name: state.foo,
    Type: "string",
    Editable: true,
    Visible: true,
    Width: 30
  }

  let customerLastNameField: TableField = {
    Pos: 2,
    Name: "Last Name",
    Type: "string",
    Editable: true,
    Visible: true,
    Width: 30
  }

  let customerFullNameField: TableField = {
    Pos: 7,
    Name: "Full Name",
    Type: "string",
    Editable: false,
    Visible: true,
    Width: 30
  }

  let deliveryDateField: TableField = {
    Pos: 3,
    Name: "Delivery",
    Type: "date",
    Editable: true,
    Visible: true,
    Width: 10
  }
  let provisionTotalField: TableField = {
    Pos: 4,
    Name: "Provision Total",
    Type: "decimal",
    Editable: true,
    Visible: true,
    Width: 10
  }
  let provisionFactorField: TableField = {
    Pos: 5,
    Name: "Provision Factor",
    Type: "decimal",
    Editable: true,
    Visible: true,
    Width: 10
  }
  let tableFields: TableFields = {
    IDTransaction: idField,
    CustomerFirstName: customerFirstNameField,
    CustomerLastName: customerLastNameField,
    CustomerFullName: customerFullNameField,
    DeliveryDate: deliveryDateField,
    A_ProvisionTotal: provisionTotalField,
    A_ProvisionFactor: provisionFactorField
  }
  return tableFields
}

export let TableTest: UserTable = {
  TableStatePath: "myState.TableTest",
  DataStatePath: "tblTableTestData",

  Filter: "",
  Sort: { Ascending: true, Field: <TableTestColumns>"" },
  Entity: "tblTransactions",
  IDField: "IDTransaction",
  Paging: { Page: 1, Size: 50 },
  Selected: [],
  Fields: derivedTableFields
}

// export class CustomTableA extends OvlTableElement {
//   getUI() {
//     console.log("getUI Called")
//     return html`<div class="c-table c-table--striped">
//   <div class="c-table__caption">Custom UI Table</div>
//   <div class="c-table__row c-table__row--heading">
//     ${this.sortedFieldKeys.map(
//       k => html`
//     <span class="c-table__cell">${this.fields[k].Name}</span>`
//     )}
//   </div>

//   ${this.getSortedDataKeys().map(i => {
//     console.log("repeatRow called...")
//     return html`
//   <div class="c-table__row">
//     <custom-row-a class="c-table__cell" .getData=${() => ({
//       id: this.table.Id + i,
//       dataStatePath: this.table.DataStatePath,
//       rowKey: i,
//       data: this.data,
//       sortedFieldKeys: this.sortedFieldKeys
//     })}> </custom-row-a>
//   </div>`
//   })}
// </div>`
//   }
// }

// export class CustomRowA extends OvlTableRow {
//   getUI() {
//     return html`
//     ${this.rowData.sortedFieldKeys.map(f => {
//       let c = ""
//       if (f == "CustomerLastName") {
//         c = "HeyHeyHey"
//       }
//       return html`<span class="c-table__cell">${c +
//         this.rowData.data[this.rowData.rowKey][f]}</span>`
//     })}
//   `
//   }
// }
// an implementation of the repeat directive... but it creates
export class CustomTableA extends OvlTableElement {
  getUI() {
    return html`<div class="c-table c-table--striped">
  <div class="c-table__caption">Custom UI Table</div>
  <div class="c-table__row c-table__row--heading">
    ${this.sortedFieldKeys.map(
      k => html`
    <span class="c-table__cell">${this.fields[k].Name}</span>`
    )}
  </div>

  ${repeat(
    this.getSortedDataKeys(),
    i => i,
    i => html`
  <div class="c-table__row">
    <custom-row-a id="${this.id + i}" class="c-table__cell" .getData=${() => ({
      dataStatePath: this.table.DataStatePath,
      rowKey: i,
      data: this.data,
      sortedFieldKeys: this.sortedFieldKeys
    })}> </custom-row-a>
  </div>`
  )}
</div>`
  }
}

export class CustomRowA extends OvlTableRow {
  getUI() {
    return html`
     ${repeat(
       this.rowData.sortedFieldKeys,
       f => f,
       (f: TableTestColumns, findex) => {
         let c = ""
         if (f == "CustomerLastName") {
           c = "HeyHeyHey"
         }
         return html`
    <span class="c-table__cell">${c + this.rowData.data[this.rowData.rowKey][f]}
    </span>`
       }
     )}
  `
  }
}

customElements.define("custom-table-a", CustomTableA)
customElements.define("custom-row-a", CustomRowA)
