import { Action } from "./index"
import { TableTestDataEntry } from "./testData/tableTestData"

// import * as mutations from "./mutations"
// export const changeFoo: Action = action => action.mutate(mutations.changeFoo)
import { BaseTable } from "./library/OvlTable/OvlTableHeaderElement"

import {
  OvlTableChangeSort,
  OvlTableRefresh,
  OvlTableSortAndRefresh
} from "./library/OvlTable/operators"
import { OmlChangeTab } from "./library/OmlTab/OmlTab"
import { OmlChangeSelected } from "./library/OmlSelect/OmlSelect"
import { pipe, forEach, action } from "overmind"
import { Operator } from "./index"

export {
  OvlTableChangeSort,
  OvlTableRefresh,
  OvlTableSortAndRefresh,
  OmlChangeTab,
  OmlChangeSelected
}
// import { OvlAutoCompleteChangeValue } from "./library/OvlAutoComplete"
// export { OvlAutoCompleteChangeValue }

export const Add1000Properly: Operator<BaseTable[]> = pipe(
  action(({ state }) => {
    // console.log(tableColumnData.Sort)

    for (let z = 0; z < 20; z++) {
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
  }),
  forEach(OvlTableRefresh)
)

export const changeFirstName1: Action = ({ state }) => {
  state.tblTableTestData["1"].CustomerFirstName = "Aladin"
}

export const SelectOption: Action = ({ state }) => {
  state.selectState.selected = ["1","2","3"]
}
