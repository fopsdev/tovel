import { action, pipe, map } from "overmind"
import { Operator } from "../../index"
import {
  TableColumnEventData,
  BaseTable,
  OvlTable
} from "./OvlTableHeaderElement"

export const OvlTableChangeSort: Operator<TableColumnEventData> = action(
  ({ value: tableColumnData, state }) => {
    const field = tableColumnData.TableState.Sort.Field
    if (tableColumnData.ColumnId === field) {
      tableColumnData.TableState.Sort.Ascending = !tableColumnData.TableState
        .Sort.Ascending
    } else {
      tableColumnData.TableState.Sort.field = tableColumnData.ColumnId
      tableColumnData.TableState.Sort.Ascending = true
    }
  }
)

export const OvlTableRefresh: Operator<BaseTable> = action(
  ({ value: baseTable, state }) => {
    let sortfield = baseTable.Sort.Field
    let ascending = baseTable.Sort.Ascending ? 1 : -1

    const data = baseTable.Data
    let res: number = 0
    baseTable.FilteredAndSorted = Object.keys(data)
      .filter(v => {
        return Object.keys(data[v]).some(s => {
          const dispValue = OvlTable.getDisplayValue(
            baseTable.Fields,
            data[v],
            s
          )
          return (
            dispValue.toLowerCase().indexOf(baseTable.Filter.toLowerCase()) > -1
          )
        })
      })
      .sort((a, b) => {
        let valB = data[b][sortfield]
        let valA = data[a][sortfield]
        switch (baseTable.Fields[sortfield].Type) {
          case "date":
            const aDate = new Date(valA).getTime()
            const bDate = new Date(valB).getTime()
            res = aDate - bDate
            break
          case "string":
            if (valA === null) {
              valA = ""
            }
            if (valB === null) {
              valB = ""
            }
            if (valA < valB) {
              res = -1
            } else if (valA > valB) {
              res = 1
            }
            break
          case "decimal":
          case "int":
            res = valA - valB
            break
        }

        return res * ascending
      })
  }
)
const getBaseTable: Operator<TableColumnEventData, BaseTable> = map(
  ({ value }) => value.TableState
)

export const OvlTableSortAndRefresh: Operator<
  TableColumnEventData,
  BaseTable
> = pipe(
  OvlTableChangeSort,
  getBaseTable,
  OvlTableRefresh
)
