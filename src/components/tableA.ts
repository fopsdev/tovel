import {
  BaseTable,
  TableField,
  TableSort
} from "../library/OvlTableHeaderElement"
import { Derive, TApp } from "overmind"
import { Action, Config } from "../index"
import { state } from "../state"

type TableTestColumns =
  | "IDTransaction"
  | "CustomerFirstName"
  | "CustomerLastName"
  | "CustomerFullName"
  | "DeliveryDate"
  | "A_ProvisionTotal"
  | "A_ProvisionFactor"

type TableFields = { [key in TableTestColumns]: TableField }

// const getFullName = (row: TableTestDataEntry) =>
//   row.CustomerFirstName + " " + row.CustomerLastName

export interface UserTable extends BaseTable {
  Fields: Derive<TableField, TableFields>
}

const SortingField: Derive<TableSort, string> = self =>
  self.field !== "" ? self.field : TableADef.IDField

export let TableADef: UserTable = {
  Data: (self, state) => state.tblTableTestData,
  Filter: "er",
  Sort: {
    Ascending: true,
    field: "",
    Field: <string>(<any>SortingField)
  },
  Entity: "tblTransactions",
  IDField: "IDTransaction",
  Paging: { Page: 1, Size: 50 },
  Selected: [],
  FilteredAndSorted: [
    /*"4", "2", "1"*/
  ],
  Fields: (self, state: TApp<Config>["state"]) => {
    let idField: TableField = {
      Pos: 0,
      Name: "ID",
      Type: "int",
      Editable: true,
      Visible: true,
      Width: 10,
      Align: "left"
    }

    let customerFirstNameField: TableField = {
      Pos: 1,

      Name: state.inputValueTest.value,
      Type: "string",
      Editable: true,
      Visible: true,
      Width: 30,
      Align: "left"
    }

    let customerLastNameField: TableField = {
      Pos: 2,
      Name: "Last Name",
      Type: "string",
      Editable: true,
      Visible: true,
      Width: 30,
      Align: "left"
    }
    let customerFullName: TableField = {
      Pos: 2,
      Name: "Full Name",
      Type: "string",
      Editable: true,
      Visible: true,
      Width: 30,
      Align: "left"
    }

    let deliveryDateField: TableField = {
      Pos: 3,
      Name: "Delivery",
      Type: "date",
      Editable: true,
      Visible: true,
      Width: 10,
      Align: "center"
    }
    let provisionTotalField: TableField = {
      Pos: 4,
      Name: "Provision Total",
      Type: "decimal",
      Editable: true,
      Visible: true,
      Width: 10,
      Align: "right"
    }
    let provisionFactorField: TableField = {
      Pos: 5,
      Name: "Provision Factor",
      Type: "decimal",
      Editable: true,
      Visible: true,
      Width: 10,
      Align: "right"
    }
    let tableFields: TableFields = {
      IDTransaction: idField,
      CustomerFirstName: customerFirstNameField,
      CustomerLastName: customerLastNameField,
      CustomerFullName: customerFullName,
      DeliveryDate: deliveryDateField,
      A_ProvisionTotal: provisionTotalField,
      A_ProvisionFactor: provisionFactorField
    }
    return tableFields
  }
}
