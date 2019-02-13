import { OvlBaseElement } from "../OvlBaseElement"
import { Action } from "../../index"
//import { setTabbable } from "../OmeUtils/utils"

type CheckboxCheckedParam = {
  checkedState: { checked: boolean }
  checked: boolean
}

export const OmeCheckBoxChecked: Action<CheckboxCheckedParam> = ({
  value,
  state
}) => {
  console.log("new value(s) selected:")
  console.log(value)
  value.checkedState.checked = value.checked
}

export type CheckBoxAttributes = {
  id: string
  disabled?: boolean
  label?: string
  checkedState: CheckBoxState
}

type CheckBoxState = {
  checked: boolean
}

export class OmcCheckbox extends OvlBaseElement {
  props: any
  checkBoxAttributes: CheckBoxAttributes

  handleChange = e => {
    this.actions.OmeCheckBoxChecked({
      checkedState: this.checkBoxAttributes.checkedState,
      checked: !this.checkBoxAttributes.checkedState.checked
    })
  }
  init() {
    this.checkBoxAttributes = this.props(this.state)
  }
  setUI() {}

  disconnectedCallback() {
    super.disconnectedCallback()
  }
}
