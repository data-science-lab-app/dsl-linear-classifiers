import { sigmoid, log, subtract } from "./classification.helpers";
import { Matrix } from "data-science-lab-core";


describe('Classification Helper Tests', () => {
    it('sigmoid function should perform sigmod on each value', () => {
        const output = sigmoid(Matrix.make([[1, 2], [3, 4]]));
        expect(output).toEqual({
            rows: 2,
            columns: 2,
            data: [
                [1.0 / (1.0 + Math.exp(-1)), 1.0 / (1.0 + Math.exp(-2))],
                [1.0 / (1.0 + Math.exp(-3)), 1.0 / (1.0 + Math.exp(-4))]]
        });
    });

    it('log function should perform log on each value', () => {
        const output = log(Matrix.make([[1, 2], [3, 4]]));
        expect(output).toEqual({
            rows: 2,
            columns: 2,
            data: [
                [Math.log(1), Math.log(2)],
                [Math.log(3), Math.log(4)],
            ]
        });
    });

    it('subtract function should perform subtraction on each value', () => {
        const output = subtract(1, Matrix.make([[1, 2], [3, 4]]));
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