import { TApp } from "overmind"

import { tblTableTestData } from "./testData/tableTestData"
import { TableADef } from "./components/tableA"
import { TableBDef } from "./components/tableB"
import { SelectState } from "./library/OmlSelect/OmlSelect"

let foo: string = "bar"
let foo2: string = "bar2"
let inputValueTest = { value: "initial" }

export const state = {
  tblTableTestData: tblTableTestData,
  myState: { myTableA: TableADef, myTableB: TableBDef },
  foo,
  foo2,
  inputValueTest,
  tabState: { activeTab: "#test4" },
  selectState: <SelectState>{
    selected: ["2", "3"],
    options: [
      { key: "", value: "Pls choose..." },
      { key: "1", value: "Option 1" },
      { key: "2", value: "Option 2" },
      { key: "3", value: "Option 3" }
    ],
    multiple: false
  }
}
