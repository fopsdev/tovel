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
var index_2 = require("../index");
//import * as untrackedState from "../state"
var lit_html_1 = require("lit-html");
var CompA = /** @class */ (function (_super) {
    __extends(CompA, _super);
    function CompA() {
        var _this = _super.call(this) || this;
        _this.onclick = function (e) {
            index_2.app.actions.changeFoo();
        };
        return _this;
    }
    CompA.prototype.getUI = function () {
        return lit_html_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    <div>", "</div>\n    <div>", "</div>\n    <table-a .props=", "></table-a>\n    "], ["\n    <div>", "</div>\n    <div>", "</div>\n    <table-a .props=", "></table-a>\n    "])), this.state.foo, this.props.Key, this.state.TableTest);
    };
    return CompA;
}(index_1.OvlSimpleElement));
exports.CompA = CompA;
var templateObject_1;
