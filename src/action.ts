import { Action } from "overmind"
// import * as mutations from "./mutations"
// export const changeFoo: Action = action => action.mutate(mutations.changeFoo)
import { changeSort } from "./library/index"
export { changeSort }
import { changeValue } from "./components/autoComplete"
export { changeValue }
export const changeFirstName1: Action = ({ state }) => {
  // console.log(tableColumnData.Sort)
  state.tblTableTestData["1"].CustomerFirstName = "Aladin"
  state.suggestions.push("Rotauge")
}
