import { CheckBoxAttributes } from "./library/OmcCheckbox/OmcCheckbox"
import { TextBoxState } from "./library/OmcTextbox/OmcTextbox"
import { SnackbarState } from "./library/OmcSnackbar/OmcSnackbar"

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

let textBox2: TextBoxState = {
  id: "mytextbox2",
  valueState: { value: "jris" },
  label: "pls some text",
  visible: true
}

let snackBar1: SnackbarState = {
  text: "Hello from snackbar"
}

export const state = {
  checkBox1,
  checkBox2,
  textBox1,
  textBox2,
  snackBar1
}
