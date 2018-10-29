import { OvlTableHeaderElement, Table, TableField } from "../library/index"
import { Derive } from "overmind"
import { html } from "lit-html"

const columns = ["IDTransaction"]
type TableTestColumns =
  | "IDTransaction"
  | "CustomerFirstName"
  | "CustomerLastName"
  | "DeliveryDate"
  | "A_ProvisionTotal"
  | "A_ProvisionFactor"

type TableFields = { [key in TableTestColumns]: TableField }

export interface UserTable extends Table {
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
    DeliveryDate: deliveryDateField,
    A_ProvisionTotal: provisionTotalField,
    A_ProvisionFactor: provisionFactorField
  }
  return tableFields
}

export let TableTest: UserTable = {
  Filter: "",
  Sort: { Ascending: true, Field: "" },
  ThisPath: "TableTest",
  Entity: "tblTransactions",
  IDField: "IDTransaction",
  Path: "Transactions",
  Paging: { Page: 1, Size: 50 },
  Selected: [],
  Fields: derivedTableFields
}

export class TableA extends OvlTableHeaderElement {
  props: UserTable

  getUI() {
    let fields: TableFields = <TableFields>(<unknown>this.props.Fields)
    // sample of adjusting column headers dynamically
    return html`
    <div>tableheader->yeah!</div>
    <div>${fields.CustomerFirstName.Name}</div>
    `
  }
}
