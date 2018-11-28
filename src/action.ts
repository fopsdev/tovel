import { Action } from "overmind"

// import * as mutations from "./mutations"
// export const changeFoo: Action = action => action.mutate(mutations.changeFoo)
import { changeSort } from "./library/OvlTableHeaderElement"
export { changeSort }
import { changeValue } from "./library/autoComplete"
export { changeValue }

import { add1000Rows } from "./components/tablea"
export { add1000Rows }
export const changeFirstName1: Action = ({ state }) => {
  // console.log(tableColumnData.Sort)
  state.tblTableTestData["1"].CustomerFirstName = "Aladin"
  state.suggestions.push("Rotauge")
}
