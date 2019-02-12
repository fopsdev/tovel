import { TApp } from "overmind"

import { tblTableTestData } from "./testData/tableTestData"
import { TableADef } from "./components/tableA"
import { TableBDef } from "./components/tableB"
import { SelectState } from "./library/OmlSelect/OmlSelect"
import { TabState } from "./library/OmlTab/OmlTab"
import { CheckBoxAttributes } from "./library/OmeCheckbox/OmeCheckBox"

let foo: string = "bar"
let foo2: string = "bar2"
let inputValueTest = { value: "initial" }

let tabState: TabState = { activeTab: "#test4" }

let checkBox1: CheckBoxAttributes = {
  checkedState: { checked: true },
  id: "myCheckbox1",
  label: "MyChk1"
}

let checkBox2: CheckBoxAttributes = {
  checkedState: { checked: false },
  id: "myCheckbox2",
  label: "MyChk2"
}

let selectState: SelectState = {
  selected: ["1", "2", ""],
  options: [
    { key: "", value: "Pls choose..." },
    { key: "1", value: "Option 1" },
    { key: "2", value: "Option 2" },
    { key: "3", value: "Option 3" }
  ],
  multiple: true
}
export const state = {
  tblTableTestData: tblTableTestData,
  myState: { myTableA: TableADef, myTableB: TableBDef },
  foo,
  foo2,
  inputValueTest,
  tabState,
  selectState,
  checkBox1,
  checkBox2
}
