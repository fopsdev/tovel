export type TableTestDataEntry = {
  IDTransaction: number
  CustomerFirstName: string
  CustomerLastName: string
  CustomerFullName: string
  DeliveryDate: string
  A_ProvisionTotal: number
  A_ProvisionFactor: number
}

export type TableTestData = {
  [key: string]: TableTestDataEntry
}

export let tblTableTestData: TableTestData = {
  1: {
    IDTransaction: 1,
    A_ProvisionFactor: 10,
    A_ProvisionTotal: 100,
    CustomerFirstName: "Peter",
    CustomerLastName: "Müller",
    get CustomerFullName() {
      return this.CustomerFirstName + " " + this.CustomerLastName
    },
    DeliveryDate: "2017-03-06T00:00:00+00:00"
  },
  2: {
    IDTransaction: 2,
    A_ProvisionFactor: 20,
    A_ProvisionTotal: 200,
    CustomerFirstName: "Paul",
    CustomerLastName: "Meier",
    get CustomerFullName() {
      return this.CustomerFirstName + " " + this.CustomerLastName
    },
    DeliveryDate: "2016-03-07T00:00:00+00:00"
  },
  3: {
    IDTransaction: 3,
    A_ProvisionFactor: 30,
    A_ProvisionTotal: 300,
    CustomerFirstName: "Piotr",
    CustomerLastName: "Saslic",
    get CustomerFullName() {
      return this.CustomerFirstName + " " + this.CustomerLastName
    },
    DeliveryDate: "2017-03-03T00:00:00+00:00"
  },
  4: {
    IDTransaction: 4,
    A_ProvisionFactor: null,
    A_ProvisionTotal: 300,
    CustomerFirstName: null,
    get CustomerFullName() {
      return this.CustomerFirstName + " " + this.CustomerLastName
    },
    CustomerLastName: "Miller",
    DeliveryDate: null
  }
}
