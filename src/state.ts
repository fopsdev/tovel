import { TableTest } from "./components/tablea"
export type Post = {
  id: number
  title: string
  body: string
}

export type TableTestData = {
  [key: string]: {
    IDTransaction: number
    CustomerFirstName: string
    CustomerLastName: string
    DeliveryDate: string
    A_ProvisionTotal: number
    A_ProvisionFactor: number
  }
}

export let tblTableTestData: TableTestData = {
  1: {
    IDTransaction: 1,
    A_ProvisionFactor: 10,
    A_ProvisionTotal: 100,
    CustomerFirstName: "Peter",
    CustomerLastName: "Müller",
    DeliveryDate: "2017-03-06T00:00:00+00:00"
  },
  2: {
    IDTransaction: 2,
    A_ProvisionFactor: 20,
    A_ProvisionTotal: 200,
    CustomerFirstName: "Paul",
    CustomerLastName: "Meier",
    DeliveryDate: "2016-03-07T00:00:00+00:00"
  },
  3: {
    IDTransaction: 3,
    A_ProvisionFactor: 30,
    A_ProvisionTotal: 300,
    CustomerFirstName: "Piotr",
    CustomerLastName: "Saslic",
    DeliveryDate: "2017-03-03T00:00:00+00:00"
  }
}

export let isLoadingPosts: boolean = false

export let posts: Post[] = []

export const foo: string = "bar"

export { TableTest }
