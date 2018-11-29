import {
  BaseTable,
  TableField,
  TableSort
} from "../library/OvlTableHeaderElement"
import { Derive, Action } from "overmind"

export const add1000Rows: Action = ({ state }) => {
  // console.log(tableColumnData.Sort)
  state.myState.myTable.Filter = ""

  for (let z = 0; z < 10; z++) {
    const entry: TableTestDataEntry = {
      A_ProvisionFactor: z + 0.1,
      A_ProvisionTotal: z + 100,
      CustomerFirstName: "firstName" + z.toString(),
      CustomerLastName: "lastName" + z.toString(),
      DeliveryDate: null,
      IDTransaction: z + 10,
      CustomerFullName: (self, state) => {
        console.log("self")
        console.log(self)
        return <string>(
          ((self.CustomerFirstName ? self.CustomerFirstName : "") +
            " " +
            (self.CustomerLastName ? self.CustomerLastName : ""))
        )
      }
    }
    const key = (z + 10).toString()

    state.tblTableTestData[key] = entry
    // state.tblTableTestData[key].CustomerFullName = (self, state) => {
    //   return "calcualted"
    //   // const res =
    //   //   (self.CustomerFirstName ? self.CustomerFirstName : "") +
    //   //   " " +
    //   //   (self.CustomerLastName ? self.CustomerLastName : "")
    //   // return res
    // }
  }

  state.myState.myTable.Sort.Ascending = state.myState.myTable.Sort.Ascending
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

  let customerFullNameField: TableField = {
    Pos: 7,
    Name: "Full Name",
    Type: "string",
    Editable: false,
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
    CustomerFullName: customerFullNameField,
    DeliveryDate: deliveryDateField,
    A_ProvisionTotal: provisionTotalField,
    A_ProvisionFactor: provisionFactorField
  }
  return tableFields
}

const SortingField: Derive<TableSort, string> = self =>
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

export type TableTestDataEntry = {
  IDTransaction: number
  CustomerFirstName: string
  CustomerLastName: string
  DeliveryDate: string
  A_ProvisionTotal: number
  A_ProvisionFactor: number
  CustomerFullName: Derive<TableTestDataEntry, string>
}

export type TableTestData = {
  [key: string]: TableTestDataEntry
}

let tblTableTestData0 = {
  1: {
    IDTransaction: 1,
    A_ProvisionFactor: 10,
    A_ProvisionTotal: 100,
    CustomerFirstName: "Peter",
    CustomerLastName: "Müller",
    DeliveryDate: "2017-03-06T00:00:00+00:00"
  },
  2: {
    IDTransaction: 2,
    A_ProvisionFactor: 20,
    A_ProvisionTotal: 200,
    CustomerFirstName: "Paul",
    CustomerLastName: "Meier",
    DeliveryDate: "2016-03-07T00:00:00+00:00"
  },
  3: {
    IDTransaction: 3,
    A_ProvisionFactor: 30,
    A_ProvisionTotal: 300,
    CustomerFirstName: "Piotr",
    CustomerLastName: "Saslic",
    DeliveryDate: "2017-03-03T00:00:00+00:00"
  },
  4: {
    IDTransaction: 4,
    A_ProvisionFactor: null,
    A_ProvisionTotal: 300,
    CustomerFirstName: null,
    CustomerLastName: "Miller",
    DeliveryDate: null
  }
}
export let tblTableTestData: TableTestData = {}

Object.keys(tblTableTestData0).forEach(k => {
  tblTableTestData[k] = tblTableTestData0[k]
  tblTableTestData[k].CustomerFullName = self => {
    console.log(self)

    const res =
      (self.CustomerFirstName ? self.CustomerFirstName : "") +
      " " +
      (self.CustomerLastName ? self.CustomerLastName : "")
    return res
  }
})
