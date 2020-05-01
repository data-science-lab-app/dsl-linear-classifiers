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
var MultiLogisticClassification = /** @class */ (function (_super) {
    __extends(MultiLogisticClassification, _super);
    function MultiLogisticClassification() {
        var _this = _super.call(this) || this;
        _this.options = new MultiLogisticClassificationPluginOptions(_this);
        _this.inputs = new MultiLogisticClassificationPluginInputs(_this);
        _this.data = { regularization: false, lambda: 0, threshold: 0.5, learningRate: 0.1 };
        return _this;
    }
    Object.defineProperty(MultiLogisticClassification.prototype, "m", {
        get: function () {
            return this.data.m;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiLogisticClassification.prototype, "n", {
        get: function () {
            return this.data.n;
        },
        enumerable: true,
        configurable: true
    });
    MultiLogisticClassification.prototype.export = function (minimum) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (minimum) {
                    return [2 /*return*/, JSON.stringify({
                            threshold: this.data.threshold,
                            thetas: this.data.thetas,
                            labels: this.data.labels,
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
    MultiLogisticClassification.prototype.import = function (json, _) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = JSON.parse(json);
                this.data = data;
                return [2 /*return*/, this];
            });
        });
    };
    MultiLogisticClassification.prototype.getInputs = function () {
        return this.inputs;
    };
    MultiLogisticClassification.prototype.getOptions = function () {
        return this.options;
    };
    MultiLogisticClassification.prototype.setInput = function (pluginData) {
        this.data.input = data_science_lab_core_1.Matrix.make(pluginData.map(function (value) { return __spreadArrays([1], value); }));
        this.data.n = this.data.input.columns;
        this.data.m = this.data.input.rows;
    };
    MultiLogisticClassification.prototype.setOutput = function (pluginData) {
        this.data.output = data_science_lab_core_1.Matrix.make(pluginData);
    };
    MultiLogisticClassification.prototype.initialize = function () {
        var _this = this;
        this.data.thetas = this.data.labels.map(function () { return data_science_lab_core_1.Matrix.zeros(_this.n, 1); });
    };
    MultiLogisticClassification.prototype.finishTraining = function () {
        return false;
    };
    MultiLogisticClassification.prototype.test = function (argument) {
        var argumentInput = argument['input'];
        var input = data_science_lab_core_1.Matrix.construct(1, this.n, function (row, column) {
            if (column === 0) {
                return 1;
            }
            return argumentInput[column - 1];
        });
        var Hs = this.computeHs(input);
        var max = 0;
        for (var i = 1; i < Hs.length; ++i) {
            if (Hs[i].data[0][0] > Hs[max].data[0][0]) {
                max = i;
            }
        }
        return {
            'output': [this.data.labels[max]]
        };
    };
    MultiLogisticClassification.prototype.step = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var Hs, theta_regs, costs, gradients;
            var _this = this;
            return __generator(this, function (_b) {
                Hs = this.computeHs(this.data.input);
                theta_regs = this.computeThetaRegs();
                costs = this.computeCosts(Hs).map(function (value, index) { return value + theta_regs[index]; });
                gradients = this.computeGradients(Hs);
                this.data.thetas = this.data.thetas.map(function (theta, index) {
                    return data_science_lab_core_1.Matrix.subtract(theta, data_science_lab_core_1.Matrix.multiply(gradients[index], _this.data.learningRate));
                });
                (_a = this.recorder) === null || _a === void 0 ? void 0 : _a.record(costs.map(function (value, index) { return ({
                    label: "Cost for " + _this.data.labels[index],
                    value: value,
                    description: "The average difference between expected and actual output"
                }); }));
                return [2 /*return*/];
            });
        });
    };
    MultiLogisticClassification.prototype.computeHs = function (input) {
        return this.data.thetas.map(function (value) { return classification_helpers_1.sigmoid(data_science_lab_core_1.Matrix.multiply(input, value)); });
    };
    MultiLogisticClassification.prototype.computeCosts = function (Hs) {
        var _this = this;
        return this.data.labels.map(function (label, index) {
            var output = data_science_lab_core_1.Matrix.map(_this.data.output, function (value) {
                return value === label ? 1 : 0;
            });
            var h = Hs[index];
            var lhs = data_science_lab_core_1.Matrix.columnMultiply(data_science_lab_core_1.Matrix.multiply(output, -1.0), classification_helpers_1.log(h));
            var rhs = data_science_lab_core_1.Matrix.columnMultiply(classification_helpers_1.subtract(1.0, output), classification_helpers_1.log(classification_helpers_1.subtract(1, h)));
            var temp = data_science_lab_core_1.Matrix.sum(data_science_lab_core_1.Matrix.subtract(lhs, rhs));
            return temp * (1.0 / _this.m);
        });
    };
    MultiLogisticClassification.prototype.computeGradients = function (Hs) {
        var _this = this;
        return this.data.labels.map(function (label, index) {
            var output = data_science_lab_core_1.Matrix.map(_this.data.output, function (value) {
                return value === label ? 1 : 0;
            });
            var h = Hs[index];
            var lhs = data_science_lab_core_1.Matrix.multiply(data_science_lab_core_1.Matrix.transpose(_this.data.input), data_science_lab_core_1.Matrix.subtract(h, output));
            var gradient = data_science_lab_core_1.Matrix.multiply(lhs, (1.0 / _this.m));
            if (_this.data.regularization) {
                var coefficient_1 = _this.data.lambda / _this.m;
                return data_science_lab_core_1.Matrix.map(gradient, function (value, row, _) {
                    if (row === 0) {
                        return value;
                    }
                    else {
                        return value + coefficient_1 * _this.data.thetas[index].data[row][0];
                    }
                });
            }
            return gradient;
        });
    };
    MultiLogisticClassification.prototype.computeThetaRegs = function () {
        if (this.data.regularization) {
            var coefficient_2 = this.data.lambda / (2.0 * this.m);
            this.data.thetas.map(function (value) {
                var sum = 0.0;
                for (var i = 1; i < value.rows; ++i) {
                    sum += value.data[i][0] * value.data[i][0];
                }
                return coefficient_2 * sum;
            });
        }
        return this.data.labels.map(function () { return 0.0; });
    };
    MultiLogisticClassification.prototype.setRecorderService = function (recorder) {
        this.recorder = recorder;
    };
    MultiLogisticClassification.prototype.setRegularization = function (reg) {
        this.data.regularization = reg;
    };
    MultiLogisticClassification.prototype.setLambda = function (lambda) {
        this.data.lambda = lambda;
    };
    MultiLogisticClassification.prototype.setThreshold = function (threshold) {
        this.data.threshold = threshold;
    };
    MultiLogisticClassification.prototype.setLearningRate = function (rate) {
        this.data.learningRate = rate;
    };
    MultiLogisticClassification.prototype.autoDetect = function () {
        var list = Array.from(new Set(this.data.output.data.map(function (value) { return value[0]; })));
        list.sort(function (a, b) { return a - b; });
        return list;
    };
    MultiLogisticClassification.prototype.setLabels = function (labels) {
        var list = Array.from(new Set(labels));
        list.sort(function (a, b) { return a - b; });
        this.data.labels = list;
    };
    MultiLogisticClassification.prototype.getTestingInputs = function () {
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
    return MultiLogisticClassification;
}(data_science_lab_core_1.AlgorithmPlugin));
exports.MultiLogisticClassification = MultiLogisticClassification;
var MultiLogisticClassificationPluginInputs = /** @class */ (function (_super) {
    __extends(MultiLogisticClassificationPluginInputs, _super);
    function MultiLogisticClassificationPluginInputs(classifier) {
        var _this = _super.call(this) || this;
        _this.classifier = classifier;
        return _this;
    }
    MultiLogisticClassificationPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'input',
                label: 'Input Features',
                min: 1,
                type: 'number',
            },
            {
                id: 'output',
                label: 'Output Feature',
                type: 'number',
                min: 1,
                max: 1
            }
        ];
    };
    MultiLogisticClassificationPluginInputs.prototype.submit = function (inputs) {
        if (inputs['input'] === undefined) {
            throw new Error("Multi Logistic Classification's submit expecting plugin data with key input");
        }
        else {
            this.classifier.setInput(inputs['input'].examples);
        }
        if (inputs['output'] === undefined) {
            throw new Error("Multi Logistic Classification's submit expecting plugin data with key output");
        }
        else {
            this.classifier.setOutput(inputs['output'].examples);
        }
    };
    return MultiLogisticClassificationPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var MultiLogisticClassificationPluginOptions = /** @class */ (function (_super) {
    __extends(MultiLogisticClassificationPluginOptions, _super);
    function MultiLogisticClassificationPluginOptions(classifier) {
        var _this = _super.call(this) || this;
        _this.classifier = classifier;
        _this.state = 1;
        _this.labels = [];
        return _this;
    }
    MultiLogisticClassificationPluginOptions.prototype.submit = function (inputs) {
        switch (this.state) {
            case 1:
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
                break;
            case 2:
                this.classifier.setLambda(inputs['lambda']);
                this.state = 3;
                break;
            case 5:
                this.classifier.setLabels(JSON.parse("[" + inputs['labels'] + "]"));
                this.state = 6;
                break;
            default:
                throw new Error("Multi Logistic Classification in invalid state.");
        }
    };
    MultiLogisticClassificationPluginOptions.prototype.executeCommand = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (this.state) {
                    case 3:
                        if (id === 'autoDetect') {
                            this.labels = this.classifier.autoDetect();
                            this.state = 4;
                        }
                        else if (id === 'manual') {
                            this.state = 5;
                        }
                        else {
                            throw new Error("Multi Logistic Classification got invalid command: " + id);
                        }
                        break;
                    case 4:
                        if (id === 'yes') {
                            this.classifier.setLabels(this.labels);
                            this.state = 6;
                        }
                        else if (id === 'no') {
                            this.state = 5;
                        }
                        else {
                            throw new Error("Multi Logistic Classification got invalid command: " + id);
                        }
                        break;
                    default:
                        throw new Error("Multi Logistic Classification in invalid state");
                }
                return [2 /*return*/];
            });
        });
    };
    MultiLogisticClassificationPluginOptions.prototype.options = function () {
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
            case 3:
                return [
                    new data_science_lab_core_1.CommandOption({
                        id: 'autoDetect',
                        command: 'Auto Detect',
                        label: 'Detect the number of labels in output features',
                    }),
                    new data_science_lab_core_1.CommandOption({
                        id: 'manual',
                        command: 'Input Labels',
                        label: 'Manually type the set of labels'
                    })
                ];
            case 4:
                return [
                    new data_science_lab_core_1.CommandOption({
                        id: 'yes',
                        command: 'Yes',
                        label: "Are these labels " + this.labels + " correct?",
                    }),
                    new data_science_lab_core_1.CommandOption({
                        id: 'no',
                        command: 'No',
                        label: 'Incorrect. Will go to manual input when click',
                    }),
                ];
            case 5:
                return [
                    new data_science_lab_core_1.TextOption({
                        id: 'labels',
                        label: 'Input Label List. (example input: 1,2,3,4)',
                        min: 1,
                        pattern: '^([ ]*[0-9]+[ ]*)(,[ ]*[0-9]+[ ]*)+$'
                    })
                ];
            default:
                throw new Error("Multi Logistic Classification in invalid state.");
        }
    };
    MultiLogisticClassificationPluginOptions.prototype.noMore = function () {
        return this.state === 6;
    };
    return MultiLogisticClassificationPluginOptions;
}(data_science_lab_core_1.PluginOptions));
