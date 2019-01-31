import { TableTest, tblTableTestData } from "./components/testTable"

export type Post = {
  id: number
  title: string
  body: string
}

let suggestions = [
  "Aal",
  "Barbe",
  "Forelle",
  "Hecht",
  "Regenbogenforelle",
  "Wels"
]

let isLoadingPosts: boolean = false

let posts: Post[] = []

let foo: string = "bar"
let foo2: string = "bar2"
let inputValueTest = { value: "initial" }

let myState = { myTable: TableTest }

export const state: any = {}

state.foo = foo
state.foo2 = foo2
state.inputValueTest = inputValueTest
state.myState = myState
state.tblTableTestData = tblTableTestData
