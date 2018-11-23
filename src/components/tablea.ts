import {
  OvlTableElement,
  BaseTable,
  TableField,
  TableSort
} from "../library/index"
import { Derive } from "overmind"

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
  Fields: Derive<UserTable, TableFields>
}

const derivedTableFields: Derive<UserTable, TableFields> = (self, state) => {
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
    Name: state.inputValueTest.value,
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

const SortingField: Derive<TableSort, string> = (self, state) =>
  self.field !== "" ? self.field : TableTest.IDField

export let TableTest: UserTable = {
  DataStatePath: "tblTableTestData",
  Filter: "er",
  Sort: { Ascending: true, field: "", Field: <string>(<any>SortingField) },
  Entity: "tblTransactions",
  IDField: "IDTransaction",
  Paging: { Page: 1, Size: 50 },
  Selected: [],
  Fields: derivedTableFields
}

// customElements.define("custom-table-a", CustomTableA)
// customElements.define("custom-row-a", CustomRowA)
