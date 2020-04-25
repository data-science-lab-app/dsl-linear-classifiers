import { Matrix } from "data-science-lab-core";

export function sigmoid(m: Matrix.Matrix): Matrix.Matrix {
    return Matrix.map(Matrix.multiply(m, -1.0), (value) => {
        return 1.0 / (1.0 + Math.exp(value));
    });
}

export function log(m: Matrix.Matrix): Matrix.Matrix {
    return Matrix.map(m, (value) => {
        return Math.log(value);
    });
}

export function subtract(lhs: number, m: Matrix.Matrix) {
    return Matrix.map(m, (value) => {
        return lhs - value;
    });
}