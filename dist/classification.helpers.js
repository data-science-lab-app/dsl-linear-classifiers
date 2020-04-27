"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_science_lab_core_1 = require("data-science-lab-core");
function sigmoid(m) {
    return data_science_lab_core_1.Matrix.map(data_science_lab_core_1.Matrix.multiply(m, -1.0), function (value) {
        return 1.0 / (1.0 + Math.exp(value));
    });
}
exports.sigmoid = sigmoid;
function log(m) {
    return data_science_lab_core_1.Matrix.map(m, function (value) {
        return Math.log(value);
    });
}
exports.log = log;
function subtract(lhs, m) {
    return data_science_lab_core_1.Matrix.map(m, function (value) {
        return lhs - value;
    });
}
exports.subtract = subtract;
