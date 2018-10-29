"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var index_1 = require("../library/index");
var lit_html_1 = require("lit-html");
var columns = ["IDTransaction"];
var derivedTableFields = function (state) {
    var idField = {
        Pos: 0,
        Name: "ID",
        Type: "int",
        Editable: true,
        Visible: true,
        Width: 10
    };
    var customerFirstNameField = {
        Pos: 1,
        Name: state.foo,
        Type: "string",
        Editable: true,
        Visible: true,
        Width: 30
    };
    var customerLastNameField = {
        Pos: 2,
        Name: "Last Name",
        Type: "string",
        Editable: true,
        Visible: true,
        Width: 30
    };
    var deliveryDateField = {
        Pos: 3,
        Name: "Delivery",
        Type: "date",
        Editable: true,
        Visible: true,
        Width: 10
    };
    var provisionTotalField = {
        Pos: 4,
        Name: "Provision Total",
        Type: "decimal",
        Editable: true,
        Visible: true,
        Width: 10
    };
    var provisionFactorField = {
        Pos: 5,
        Name: "Provision Factor",
        Type: "decimal",
        Editable: true,
        Visible: true,
        Width: 10
    };
    var tableFields = {
        IDTransaction: idField,
        CustomerFirstName: customerFirstNameField,
        CustomerLastName: customerLastNameField,
        DeliveryDate: deliveryDateField,
        A_ProvisionTotal: provisionTotalField,
        A_ProvisionFactor: provisionFactorField
    };
    return tableFields;
};
exports.TableTest = {
    Filter: "",
    Sort: { Ascending: true, Field: "" },
    ThisPath: "TableTest",
    Entity: "tblTransactions",
    IDField: "IDTransaction",
    Path: "Transactions",
    Paging: { Page: 1, Size: 50 },
    Selected: [],
    Fields: derivedTableFields
};
var TableA = /** @class */ (function (_super) {
    __extends(TableA, _super);
    function TableA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableA.prototype.getUI = function () {
        var fields = this.props.Fields;
        // sample of adjusting column headers dynamically
        return lit_html_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    <div>tableheader->yeah!</div>\n    <div>", "</div>\n    "], ["\n    <div>tableheader->yeah!</div>\n    <div>", "</div>\n    "])), fields.CustomerFirstName.Name);
    };
    return TableA;
}(index_1.OvlTableHeaderElement));
exports.TableA = TableA;
var templateObject_1;
