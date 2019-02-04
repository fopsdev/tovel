import { Action } from "./index"
import { TableTestDataEntry } from "./testData/tableTestData"

// import * as mutations from "./mutations"
// export const changeFoo: Action = action => action.mutate(mutations.changeFoo)
import {
  OvlTableChangeSort,
  OvlTableRefresh
} from "./library/OvlTableHeaderElement"
export { OvlTableChangeSort, OvlTableRefresh }
// import { OvlAutoCompleteChangeValue } from "./library/OvlAutoComplete"
// export { OvlAutoCompleteChangeValue }

export const add1000Rows: Action = ({ state }) => {
  // console.log(tableColumnData.Sort)

  for (let z = 0; z < 1000; z++) {
    const entry: TableTestDataEntry = {
      A_ProvisionFactor: z + 0.1,
      A_ProvisionTotal: z + 100,
      CustomerFirstName: "FirstName" + z.toString(),
      CustomerLastName: "LastName" + z.toString(),
      get CustomerFullName() {
        return this.CustomerFirstName + " " + this.CustomerLastName
      },
      DeliveryDate: null,
      IDTransaction: z + 10
    }
    const key = (z + 10).toString()

    state.tblTableTestData[key] = entry
  }
  console.log(state)
  //state.myState.myTable.Sort.Ascending = state.myState.myTable.Sort.Ascending
}

export const changeFirstName1: Action = ({ state }) => {
  state.tblTableTestData["1"].CustomerFirstName = "Aladin"
}
