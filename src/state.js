"use strict";
exports.__esModule = true;
var TableFieldTypes;
(function (TableFieldTypes) {
    TableFieldTypes[TableFieldTypes["int"] = 0] = "int";
    TableFieldTypes[TableFieldTypes["decimal"] = 1] = "decimal";
    TableFieldTypes[TableFieldTypes["string"] = 2] = "string";
    TableFieldTypes[TableFieldTypes["date"] = 3] = "date";
})(TableFieldTypes = exports.TableFieldTypes || (exports.TableFieldTypes = {}));
exports.isLoadingPosts = false;
exports.posts = [];
exports.foo = "bar";
// enum TableTestColumns {
//   IDTransaction = "IDTransaction",
//   CustomerFirstName = "CustomerFirstName",
//   CustomerLastName = "CustomerLastName",
//   DeliveryDate = "DeliveryDate",
//   A_ProvisionTotal = "A_ProvisionTotal",
//   A_ProvisionFactor = "A_ProvisionFactor"
// }
// let t = TableTestColumns.IDTransaction
// console.log(t)
exports.TableTest = {
    Filter: "",
    Sort: { Ascending: true, Field: "" },
    ThisPath: "TableTest",
    Entity: "tblTransactions",
    IDField: "IDTransaction",
    Path: "Transactions",
    Paging: { Page: 1, Size: 50 },
    Selected: [],
    Fields: {
        IDTransaction: {
            Pos: 0,
            Type: TableFieldTypes.int,
            Name: "IDTransaction",
            Editable: true,
            Visible: true,
            Width: 20
        },
        CustomerFirstName: {
            Pos: 1,
            Type: TableFieldTypes.string,
            Name: "First Name",
            Editable: true,
            Visible: true,
            Width: 30
        },
        CustomerLastName: {
            Pos: 2,
            Type: TableFieldTypes.string,
            Name: "Last Name",
            Editable: true,
            Visible: true,
            Width: 30
        },
        DeliveryDate: {
            Pos: 3,
            Name: "Delivery Date",
            Type: TableFieldTypes.date,
            Editable: true,
            Visible: true,
            Width: 10
        },
        A_ProvisionTotal: {
            Pos: 4,
            Type: TableFieldTypes.decimal,
            Name: "Provision",
            Editable: true,
            Visible: true,
            Width: 20
        },
        A_ProvisionFactor: {
            Pos: 4,
            Type: TableFieldTypes.decimal,
            Name: "Provision Factor",
            Editable: true,
            Visible: true,
            Width: 20
        }
    }
};
