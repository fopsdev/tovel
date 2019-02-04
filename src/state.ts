export const state: any = {}
import { tblTableTestData } from "./testData/tableTestData"
import { TableADef } from "./components/tableA"
import { TableBDef } from "./components/tableB"

let foo: string = "bar"
let foo2: string = "bar2"
let inputValueTest = { value: "initial" }

state.tblTableTestData = tblTableTestData
let myState = { myTableA: TableADef, myTableB: TableBDef }
myState.myTableA.Data = state.tblTableTestData
myState.myTableB.Data = state.tblTableTestData
state.foo = foo
state.foo2 = foo2
state.inputValueTest = inputValueTest
state.myState = myState
console.log(state.tblTableTestData === state.myState.myTableA.Data)
