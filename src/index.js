"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var overmind_1 = require("overmind");
var state = require("./state");
var actions = require("./action");
var compa_1 = require("./components/compa");
var tablea_1 = require("./components/tablea");
if (customElements.get("comp-a"))
    window.location.reload();
customElements.define("comp-a", compa_1.CompA);
customElements.define("table-a", tablea_1.TableA);
var lit_html_1 = require("lit-html");
var config = {
    state: state,
    actions: actions
};
exports.app = new overmind_1.Overmind(config);
var obj = compa_1.CompA.getPropsTemplate();
obj.Key = "2";
lit_html_1.render(lit_html_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["lala3<comp-a key=\"lolo\" .props = ", "></comp-a>"], ["lala3<comp-a key=\"lolo\" .props = ", "></comp-a>"])), obj), document.getElementById("app"));
var templateObject_1;
