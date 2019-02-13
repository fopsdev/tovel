import { TApp } from "overmind"
import { CheckBoxAttributes, TextBoxState } from "./components/comp_omc"

let checkBox1: CheckBoxAttributes = {
  checkedState: { checked: true },
  id: "myCheckbox1",
  label: "MyChk1",
  visible: true
}

let checkBox2: CheckBoxAttributes = {
  checkedState: { checked: false },
  id: "myCheckbox2",
  label: "MyChk2",
  visible: true
}

let textBox1: TextBoxState = {
  id: "mytextbox1",
  valueState: { value: "initial" },
  label: "pls some text",
  visible: true
}

export const state = {
  checkBox1,
  checkBox2,
  textBox1
}
