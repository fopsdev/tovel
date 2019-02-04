import { TApp } from "overmind"

import { tblTableTestData } from "./testData/tableTestData"
import { TableADef } from "./components/tableA"
import { TableBDef } from "./components/tableB"

let foo: string = "bar"
let foo2: string = "bar2"
let inputValueTest = { value: "initial" }

export const state = {
  tblTableTestData: tblTableTestData,
  myState: { myTableA: TableADef, myTableB: TableBDef },
  foo,
  foo2,
  inputValueTest
}
