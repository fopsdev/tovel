import { TableTest, tblTableTestData } from "./components/tablea"
import { Derive } from "overmind"

export type Post = {
  id: number
  title: string
  body: string
}

export let suggestions = [
  "Aal",
  "Barbe",
  "Forelle",
  "Hecht",
  "Regenbogenforelle",
  "Wels"
]

export let isLoadingPosts: boolean = false

export let posts: Post[] = []

export let foo: string = "bar"

export let inputValueTest = { value: "initial" }

let myState = { myTable: TableTest }
export { myState }
export { tblTableTestData }
