export type Post = {
  id: number
  title: string
  body: string
}

export type TableSort = {
  Ascending: boolean
  Field: string
}

export type TablePaging = {
  Page: number
  Size: number
}
export enum TableFieldTypes {
  int,
  decimal,
  string,
  date
}
export type TableFields = {
  [key: string]: {
    Pos: number
    Type: TableFieldTypes
    Name: string
    Editable: boolean
    Visible: boolean
    Width: number
  }
}
export type Table = {
  Filter: string
  Sort: TableSort
  ThisPath: string
  Entity: string
  IDField: string
  Path: string
  Paging: TablePaging
  Selected: string[]
  Fields: TableFields
}

export let isLoadingPosts: boolean = false

export let posts: Post[] = []

export const foo: string = "bar"

export let TableTest: Table = {
  Filter: "",
  Sort: { Ascending: true, Field: "" },
  ThisPath: "TableTest",
  Entity: "tblTransactions",
  IDField: "IDTransaction",
  Path: "Transactions",
  Paging: { Page: 1, Size: 50 },
  Selected: [],

  Fields: {
    IDTransaction: {
      Pos: 0,
      Type: TableFieldTypes.int,
      Name: "IDTransaction",
      Editable: true,
      Visible: true,
      Width: 20
    },
    CustomerFirstName: {
      Pos: 1,
      Type: TableFieldTypes.string,
      Name: "First Name",
      Editable: true,
      Visible: true,
      Width: 30
    },
    CustomerLastName: {
      Pos: 2,
      Type: TableFieldTypes.string,
      Name: "Last Name",
      Editable: true,
      Visible: true,
      Width: 30
    },
    DeliveryDate: {
      Pos: 3,
      Name: "Delivery Date",
      Type: TableFieldTypes.date,
      Editable: true,
      Visible: true,
      Width: 10
    },
    A_ProvisionTotal: {
      Pos: 4,
      Type: TableFieldTypes.decimal,
      Name: "Provision",
      Editable: true,
      Visible: true,
      Width: 20
    },
    A_ProvisionFactor: {
      Pos: 4,
      Type: TableFieldTypes.decimal,
      Name: "Provision Factor",
      Editable: true,
      Visible: true,
      Width: 20
    }
  }
}
