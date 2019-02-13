import { TApp } from "overmind"
import { CheckBoxAttributes, TextBoxState } from "./components/comp_omc"

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

let textBox1: TextBoxState = {
  id: "mytextbox1",
  valueState: { value: "initial" },
  label: "pls some text"
}

export const state = {
  checkBox1,
  checkBox2,
  textBox1
}
