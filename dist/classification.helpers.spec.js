"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classification_helpers_1 = require("./classification.helpers");
var data_science_lab_core_1 = require("data-science-lab-core");
describe('Classification Helper Tests', function () {
    it('sigmoid function should perform sigmod on each value', function () {
        var output = classification_helpers_1.sigmoid(data_science_lab_core_1.Matrix.make([[1, 2], [3, 4]]));
        expect(output).toEqual({
            rows: 2,
            columns: 2,
            data: [
                [1.0 / (1.0 + Math.exp(-1)), 1.0 / (1.0 + Math.exp(-2))],
                [1.0 / (1.0 + Math.exp(-3)), 1.0 / (1.0 + Math.exp(-4))]
            ]
        });
    });
    it('log function should perform log on each value', function () {
        var output = classification_helpers_1.log(data_science_lab_core_1.Matrix.make([[1, 2], [3, 4]]));
        expect(output).toEqual({
            rows: 2,
            columns: 2,
            data: [
                [Math.log(1), Math.log(2)],
                [Math.log(3), Math.log(4)],
            ]
        });
    });
    it('subtract function should perform subtraction on each value', function () {
        var output = classification_helpers_1.subtract(1, data_science_lab_core_1.Matrix.make([[1, 2], [3, 4]]));
        expect(output).toEqual({
            rows: 2,
            columns: 2,
            data: [
                [0, -1],
                [-2, -3],
            ]
        });
    });
});
