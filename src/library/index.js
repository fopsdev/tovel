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
var index_1 = require("../index");
var lit_html_1 = require("lit-html");
var OvlBaseElement = /** @class */ (function (_super) {
    __extends(OvlBaseElement, _super);
    function OvlBaseElement() {
        var _this = _super.call(this) || this;
        _this.state = index_1.app.state;
        console.log("base constructor");
        return _this;
    }
    //  child comps should implement getUI to render a htm template
    //  its tracked
    // for preparing stuff which is not tracked
    OvlBaseElement.prototype.prepare = function () { };
    OvlBaseElement.prototype.doRender = function () {
        var _this = this;
        this.prepare();
        this.trackId = index_1.app.trackState();
        var res = this.getUI();
        var paths = index_1.app.clearTrackState(this.trackId);
        console.log(paths);
        if (paths.size > 0) {
            if (!this.mutationListener) {
                this.mutationListener = index_1.app.addMutationListener(paths, function () {
                    return _this.doRender();
                });
            }
            else {
                this.mutationListener.update(paths);
            }
        }
        lit_html_1.render(res, this);
    };
    OvlBaseElement.prototype.connectedCallback = function () {
        console.log("base connected");
        this.doRender();
    };
    OvlBaseElement.prototype.disconnectedCallback = function () {
        if (this.mutationListener) {
            this.mutationListener.dispose();
        }
    };
    OvlBaseElement.prototype.getUI = function () {
        return null;
    };
    return OvlBaseElement;
}(HTMLElement));
exports.OvlBaseElement = OvlBaseElement;
var OvlSimpleElement = /** @class */ (function (_super) {
    __extends(OvlSimpleElement, _super);
    function OvlSimpleElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OvlSimpleElement.getPropsTemplate = function () {
        return { Key: "" };
    };
    return OvlSimpleElement;
}(OvlBaseElement));
exports.OvlSimpleElement = OvlSimpleElement;
var OvlTableHeaderElement = /** @class */ (function (_super) {
    __extends(OvlTableHeaderElement, _super);
    function OvlTableHeaderElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OvlTableHeaderElement.prototype.getUI = function () {
        // a default implementation of rendering the column headers
        var fn = this.state.TableTest.Fields.CustomerFirstName.Name;
        return lit_html_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<h1>Column ", "</h1>"], ["<h1>Column ", "</h1>"])), fn);
    };
    return OvlTableHeaderElement;
}(OvlBaseElement));
exports.OvlTableHeaderElement = OvlTableHeaderElement;
var templateObject_1;
