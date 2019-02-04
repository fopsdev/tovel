import { tblTableTestData } from "../testData/tableTestData"
import {
  BaseTable,
  TableField,
  TableSort
} from "../library/OvlTableHeaderElement"
import { Derive, TApp } from "overmind"
import { Config } from "../index"

type TableTestColumns =
  | "IDTransaction"
  | "CustomerFullName"
  | "DeliveryDate"
  | "A_ProvisionTotal"

type TableFields = { [key in TableTestColumns]: TableField }

// const getFullName = (row: TableTestDataEntry) =>
//   row.CustomerFirstName + " " + row.CustomerLastName

export interface UserTable extends BaseTable {
  Fields: Derive<TableField, TableFields>
}

const SortingField: Derive<TableSort, string> = self =>
  self.field !== "" ? self.field : TableBDef.IDField

export let TableBDef: UserTable = {
  Data: {},

  Filter: "",
  Sort: {
    Ascending: true,
    field: "",
    Field: <string>(<any>SortingField)
  },
  Entity: "tblTransactions",
  IDField: "IDTransaction",
  Paging: { Page: 1, Size: 50 },
  Selected: [],
  FilteredAndSorted: [],
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
    let tableFields: TableFields = {
      IDTransaction: idField,
      CustomerFullName: customerFullName,
      DeliveryDate: deliveryDateField,
      A_ProvisionTotal: provisionTotalField
    }
    return tableFields
  }
}
