import { OvlTableHeaderElement, Table, TableField } from "../library/index"
import { html } from "lit-html"

type TableTestColumns =
  | "IDTransaction"
  | "CustomerFirstName"
  | "CustomerLastName"
  | "DeliveryDate"
  | "A_ProvisionTotal"
  | "A_ProvisionFactor"

type TableFields = { [key in TableTestColumns]: TableField }

export interface UserTable extends Table {
  Fields: TableFields
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

  Fields: {
    IDTransaction: {
      Pos: 0,
      Type: "int",
      Name: "IDTransaction",
      Editable: true,
      Visible: true,
      Width: 20
    },
    CustomerFirstName: {
      Pos: 1,
      Type: "string",
      Name: "First Name",
      Editable: true,
      Visible: true,
      Width: 30
    },
    CustomerLastName: {
      Pos: 2,
      Type: "string",
      Name: "Last Name",
      Editable: true,
      Visible: true,
      Width: 30
    },
    DeliveryDate: {
      Pos: 3,
      Name: "Delivery Date",
      Type: "date",
      Editable: true,
      Visible: true,
      Width: 10
    },
    A_ProvisionTotal: {
      Pos: 4,
      Type: "decimal",
      Name: "Provision",
      Editable: true,
      Visible: true,
      Width: 20
    },
    A_ProvisionFactor: {
      Pos: 4,
      Type: "decimal",
      Name: "Provision Factor",
      Editable: true,
      Visible: true,
      Width: 20
    }
  }
}

export class TableA extends OvlTableHeaderElement {
  props: UserTable
  constructor() {
    super()
  }
  getUI() {
    // sample of adjusting column headers dynamically
    Object.entries(this.props.Fields).forEach(([col, field]) => {
      switch (<TableTestColumns>col) {
        case "IDTransaction":
          field.Name = "ID"
          break
        default:
          break
      }
    })
    return html`
    <div>tableheader->yeah!</div>
    <div>${this.props.IDField}</div>
    `
  }
}
