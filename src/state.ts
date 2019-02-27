import { CheckBoxAttributes } from "./library/OmcCheckbox/OmcCheckbox"
import { TextBoxState } from "./library/OmcTextbox/OmcTextbox"
import { SnackbarState } from "./library/OmcSnackbar/OmcSnackbar"
import { IndicatorState } from "./library/OmcIndicator/OmcIndicator"
import { TabState } from "./library/OmcTab/OmcTab"
import { DialogState } from "./library/OmcDialog/OmcDialog"

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

let fileUpload1: TextBoxState = {
  id: "fileUpload1",
  valueState: { value: "" },
  label: "",
  visible: true
}

let indicator1: IndicatorState = {
  open: true
}

let snackBar1: SnackbarState = {
  text: "Hello from snackbar"
}

let dialog: DialogState = {
  cancelText: "Cancel",
  okText: "Ok",
  text: "This is a dialog",
  visible: false,
  result: undefined
}

let tab1: TabState = {
  tabs: [
    { id: "tab1", enabled: true, name: "Tab1" },
    { id: "tab2", enabled: false, name: "Tab2" },
    { id: "tab3", enabled: true, name: "Tab3" },
    { id: "tab4", enabled: true, name: "Tab4" }
  ],
  activeTab: "tab1"
}

export const state = {
  checkBox1,
  checkBox2,
  textBox1,
  textBox2,
  fileUpload1,
  snackBar1,
  indicator1,
  dialog,
  tab1,
  isMobile: false
}
//@ts-ignore
state.isMobile = window.isMobile.phone
