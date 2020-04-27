"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_science_lab_core_1 = require("data-science-lab-core");
var classification_helpers_1 = require("./classification.helpers");
var BinaryLogisticClassification = /** @class */ (function (_super) {
    __extends(BinaryLogisticClassification, _super);
    function BinaryLogisticClassification() {
        var _this = _super.call(this) || this;
        _this.options = new BinaryLogisticClassificationPluginOptions(_this);
        _this.inputs = new BinaryLogisticClassificationPluginInputs(_this);
        _this.data = { regularization: false, lambda: 0, threshold: 0.5, learningRate: 0.1 };
        return _this;
    }
    Object.defineProperty(BinaryLogisticClassification.prototype, "m", {
        get: function () {
            return this.data.m;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BinaryLogisticClassification.prototype, "n", {
        get: function () {
            return this.data.n;
        },
        enumerable: true,
        configurable: true
    });
    BinaryLogisticClassification.prototype.export = function (minimum) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (minimum) {
                    return [2 /*return*/, JSON.stringify({
                            threshold: this.data.threshold,
                            theta: this.data.theta,
                            m: this.data.m,
                            n: this.data.n
                        })];
                }
                else {
                    return [2 /*return*/, JSON.stringify(this.data)];
                }
                return [2 /*return*/];
            });
        });
    };
    BinaryLogisticClassification.prototype.import = function (json, minimal) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = JSON.parse(json);
                if (minimal) {
                    this.data.threshold = data.threshold;
                    this.data.theta = data.theta;
                    this.data.m = data.m;
                    this.data.n = data.n;
                }
                else {
                    this.data = data;
                }
                return [2 /*return*/, this];
            });
        });
    };
    BinaryLogisticClassification.prototype.getInputs = function () {
        return this.inputs;
    };
    BinaryLogisticClassification.prototype.getOptions = function () {
        return this.options;
    };
    BinaryLogisticClassification.prototype.initialize = function () {
        this.data.theta = data_science_lab_core_1.Matrix.zeros(this.n, 1);
    };
    BinaryLogisticClassification.prototype.finishTraining = function () {
        return false;
    };
    BinaryLogisticClassification.prototype.test = function (argument) {
        var argumentInput = argument['input'];
        var input = data_science_lab_core_1.Matrix.construct(1, this.n, function (row, column) {
            if (column === 0) {
                return 1;
            }
            return argumentInput[column - 1];
        });
        var h = this.computeH(input);
        var answer = h.data[0][0];
        return {
            'output': [answer > this.data.threshold ? 1 : 0]
        };
    };
    BinaryLogisticClassification.prototype.step = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var h, theata_reg, cost, gradient;
            return __generator(this, function (_b) {
                h = this.computeH(this.data.input);
                theata_reg = this.computeTheataReg();
                cost = this.computeCost(h) + theata_reg;
                gradient = this.computeGradient(h);
                this.data.theta = data_science_lab_core_1.Matrix.subtract(this.data.theta, data_science_lab_core_1.Matrix.multiply(gradient, this.data.learningRate));
                (_a = this.recorder) === null || _a === void 0 ? void 0 : _a.record([
                    {
                        label: 'Cost',
                        value: cost,
                        description: "The average difference between expected and actual output"
                    },
                ]);
                return [2 /*return*/];
            });
        });
    };
    BinaryLogisticClassification.prototype.computeH = function (input) {
        return classification_helpers_1.sigmoid(data_science_lab_core_1.Matrix.multiply(input, this.data.theta));
    };
    BinaryLogisticClassification.prototype.computeGradient = function (h) {
        var _this = this;
        var lhs = data_science_lab_core_1.Matrix.multiply(data_science_lab_core_1.Matrix.transpose(this.data.input), data_science_lab_core_1.Matrix.subtract(h, this.data.output));
        var gradient = data_science_lab_core_1.Matrix.multiply(lhs, (1.0 / this.m));
        if (this.data.regularization) {
            var coefficient_1 = this.data.lambda / this.m;
            return data_science_lab_core_1.Matrix.map(gradient, function (value, row, _) {
                if (row === 0) {
                    return value;
                }
                else {
                    return value + coefficient_1 * _this.data.theta.data[row][0];
                }
            });
        }
        return gradient;
    };
    BinaryLogisticClassification.prototype.computeCost = function (h) {
        var lhs = data_science_lab_core_1.Matrix.columnMultiply(data_science_lab_core_1.Matrix.multiply(this.data.output, -1.0), classification_helpers_1.log(h));
        var rhs = data_science_lab_core_1.Matrix.columnMultiply(classification_helpers_1.subtract(1.0, this.data.output), classification_helpers_1.log(classification_helpers_1.subtract(1, h)));
        var temp = data_science_lab_core_1.Matrix.sum(data_science_lab_core_1.Matrix.subtract(lhs, rhs));
        return temp * (1.0 / this.m);
    };
    BinaryLogisticClassification.prototype.computeTheataReg = function () {
        if (this.data.regularization) {
            var coefficient = this.data.lambda / (2.0 * this.m);
            var sum = 0.0;
            for (var i = 1; i < this.data.theta.rows; ++i) {
                sum += this.data.theta.data[i][0] * this.data.theta.data[i][0];
            }
            return coefficient * sum;
        }
        return 0.0;
    };
    BinaryLogisticClassification.prototype.setRecorderService = function (recorder) {
        this.recorder = recorder;
    };
    BinaryLogisticClassification.prototype.setRegularization = function (reg) {
        this.data.regularization = reg;
    };
    BinaryLogisticClassification.prototype.setLambda = function (lambda) {
        this.data.lambda = lambda;
    };
    BinaryLogisticClassification.prototype.setThreshold = function (threshold) {
        this.data.threshold = threshold;
    };
    BinaryLogisticClassification.prototype.setLearningRate = function (rate) {
        this.data.learningRate = rate;
    };
    BinaryLogisticClassification.prototype.setInput = function (pluginData) {
        this.data.input = data_science_lab_core_1.Matrix.make(pluginData.map(function (value) { return __spreadArrays([1], value); }));
        this.data.n = this.data.input.columns;
        this.data.m = this.data.input.rows;
    };
    BinaryLogisticClassification.prototype.setOutput = function (pluginData) {
        this.data.output = data_science_lab_core_1.Matrix.make(pluginData);
    };
    BinaryLogisticClassification.prototype.getTestingInputs = function () {
        return {
            input: [
                {
                    id: 'input',
                    label: 'Testing Input Features',
                    min: this.data.n - 1,
                    max: this.data.n - 1,
                    type: 'number'
                }
            ],
            output: [
                {
                    id: 'output',
                    label: 'Testing Output Feature',
                    min: 1,
                    max: 1,
                    type: 'number'
                }
            ]
        };
    };
    return BinaryLogisticClassification;
}(data_science_lab_core_1.AlgorithmPlugin));
exports.BinaryLogisticClassification = BinaryLogisticClassification;
var BinaryLogisticClassificationPluginOptions = /** @class */ (function (_super) {
    __extends(BinaryLogisticClassificationPluginOptions, _super);
    function BinaryLogisticClassificationPluginOptions(classifier) {
        var _this = _super.call(this) || this;
        _this.classifier = classifier;
        _this.state = 1;
        return _this;
    }
    BinaryLogisticClassificationPluginOptions.prototype.submit = function (inputs) {
        if (this.state === 1) {
            this.classifier.setThreshold(inputs['threshold']);
            this.classifier.setLearningRate(inputs['learningRate']);
            var regularization = inputs['regularization'];
            if (regularization) {
                this.state = 2;
                this.classifier.setRegularization(regularization);
            }
            else {
                this.state = 3;
            }
        }
        else {
            this.classifier.setLambda(inputs['lambda']);
            this.state = 3;
        }
    };
    BinaryLogisticClassificationPluginOptions.prototype.options = function () {
        switch (this.state) {
            case 1:
                return [
                    new data_science_lab_core_1.NumberOption({
                        id: 'threshold',
                        label: 'Choose a threshold for classification (0.5 recommended)',
                        min: 0,
                        max: 1,
                        step: 0.001
                    }),
                    new data_science_lab_core_1.CheckboxOption({
                        id: 'regularization',
                        label: 'Use regularization?'
                    }),
                    new data_science_lab_core_1.NumberOption({
                        id: 'learningRate',
                        label: 'Learning rate (a number too high the algorithm may diverage, too low and the algorithm will take a long time to train)',
                        min: 0,
                        max: 1,
                        step: 0.001
                    })
                ];
            case 2:
                return [
                    new data_science_lab_core_1.NumberOption({
                        id: 'lambda',
                        label: 'Choose a lambda for regularization (too high causes underfitting, too low causes overfitting)',
                        min: 0,
                        step: 0.1
                    })
                ];
            default:
                throw new Error("Binary Logistic Classification in invalid state.");
        }
    };
    BinaryLogisticClassificationPluginOptions.prototype.noMore = function () {
        return this.state === 3;
    };
    return BinaryLogisticClassificationPluginOptions;
}(data_science_lab_core_1.PluginOptions));
var BinaryLogisticClassificationPluginInputs = /** @class */ (function (_super) {
    __extends(BinaryLogisticClassificationPluginInputs, _super);
    function BinaryLogisticClassificationPluginInputs(classifier) {
        var _this = _super.call(this) || this;
        _this.classifier = classifier;
        return _this;
    }
    BinaryLogisticClassificationPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'input',
                label: 'Input Features',
                min: 1,
                type: 'number'
            },
            {
                id: 'output',
                label: 'Output Feature (0 or 1)',
                type: 'number',
                min: 1,
                max: 1
            }
        ];
    };
    BinaryLogisticClassificationPluginInputs.prototype.submit = function (inputs) {
        if (inputs['input'] === undefined) {
            throw new Error("Binary Logistic Classification's submit expecting plugin data with key input");
        }
        else {
            this.classifier.setInput(inputs['input'].examples);
        }
        if (inputs['output'] === undefined) {
            throw new Error("Binary Logistic Classification's submit expecting plugin data with key output");
        }
        else {
            this.classifier.setOutput(inputs['output'].examples);
        }
    };
    return BinaryLogisticClassificationPluginInputs;
}(data_science_lab_core_1.PluginInputs));
