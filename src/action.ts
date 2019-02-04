import { Action } from "./index"

// import * as mutations from "./mutations"
// export const changeFoo: Action = action => action.mutate(mutations.changeFoo)
import {
  OvlTableChangeSort,
  OvlTableRefresh
} from "./library/OvlTableHeaderElement"
export { OvlTableChangeSort, OvlTableRefresh }
// import { OvlAutoCompleteChangeValue } from "./library/OvlAutoComplete"
// export { OvlAutoCompleteChangeValue }

import { add1000Rows } from "./components/tableA"
export { add1000Rows }
export const changeFirstName1: Action = ({ state }) => {
  state.tblTableTestData["1"].CustomerFirstName = "Aladin"
}
