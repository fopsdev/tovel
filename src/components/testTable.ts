import {
  BaseTable,
  TableField,
  TableSort
} from "../library/OvlTableHeaderElement"
import { Derive, TApp } from "overmind"
import { Action, Config } from "../index"

export const add1000Rows: Action = ({ state }) => {
  // console.log(tableColumnData.Sort)

  for (let z = 0; z < 1000; z++) {
    const entry: TableTestDataEntry = {
      A_ProvisionFactor: z + 0.1,
      A_ProvisionTotal: z + 100,
      CustomerFirstName: "FirstName" + z.toString(),
      CustomerLastName: "LastName" + z.toString(),
      get CustomerFullName() {
        return this.CustomerFirstName + " " + this.CustomerLastName
      },
      DeliveryDate: null,
      IDTransaction: z + 10
    }
    const key = (z + 10).toString()
    
    state.tblTableTestData[key] = entry
  }
  //state.myState.myTable.Sort.Ascending = state.myState.myTable.Sort.Ascending
}

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
  self.field !== "" ? self.field : TableTest.IDField

export let TableTest: UserTable = {
  DataStatePath: "tblTableTestData",
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

export type TableTestDataEntry = {
  IDTransaction: number
  CustomerFirstName: string
  CustomerLastName: string
  CustomerFullName: string
  DeliveryDate: string
  A_ProvisionTotal: number
  A_ProvisionFactor: number
}

export type TableTestData = {
  [key: string]: TableTestDataEntry
}

export let tblTableTestData: TableTestData = {
  1: {
    IDTransaction: 1,
    A_ProvisionFactor: 10,
    A_ProvisionTotal: 100,
    CustomerFirstName: "Peter",
    CustomerLastName: "Müller",
    get CustomerFullName() {
      return this.CustomerFirstName + " " + this.CustomerLastName
    },
    DeliveryDate: "2017-03-06T00:00:00+00:00"
  },
  2: {
    IDTransaction: 2,
    A_ProvisionFactor: 20,
    A_ProvisionTotal: 200,
    CustomerFirstName: "Paul",
    CustomerLastName: "Meier",
    get CustomerFullName() {
      return this.CustomerFirstName + " " + this.CustomerLastName
    },
    DeliveryDate: "2016-03-07T00:00:00+00:00"
  },
  3: {
    IDTransaction: 3,
    A_ProvisionFactor: 30,
    A_ProvisionTotal: 300,
    CustomerFirstName: "Piotr",
    CustomerLastName: "Saslic",
    get CustomerFullName() {
      return this.CustomerFirstName + " " + this.CustomerLastName
    },
    DeliveryDate: "2017-03-03T00:00:00+00:00"
  },
  4: {
    IDTransaction: 4,
    A_ProvisionFactor: null,
    A_ProvisionTotal: 300,
    CustomerFirstName: null,
    get CustomerFullName() {
      return this.CustomerFirstName + " " + this.CustomerLastName
    },
    CustomerLastName: "Miller",
    DeliveryDate: null
  }
}
