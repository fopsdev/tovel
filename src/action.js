"use strict";
exports.__esModule = true;
var mutations = require("./mutations");
exports.changeFoo = function (action) { return action.mutate(mutations.changeFoo); };
