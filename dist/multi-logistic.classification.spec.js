"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var multi_logistic_classification_1 = require("./multi-logistic.classification");
/*
5| 1 1
4| 1
3|       2 2
2| 3     2
1| 3 3
------------
#  1 2 3 4 5

*/
describe('Multi Logistic Classification Tests', function () {
    var algorithm;
    var testingInput = {
        'input': {
            features: ['x coord', 'y coord'],
            examples: [
                [1, 5],
                [1, 4],
                [2, 5],
                [4, 3],
                [4, 2],
                [5, 3],
                [1, 2],
                [1, 1],
                [2, 1],
            ]
        },
        'output': {
            features: ['label'],
            examples: [
                [1],
                [1],
                [1],
                [2],
                [2],
                [2],
                [3],
                [3],
                [3],
            ]
        }
    };
    beforeEach(function () {
        algorithm = new multi_logistic_classification_1.MultiLogisticClassification();
    });
    it('inputs should return two', function () {
        var inputs = algorithm.getInputs().inputs();
        expect(inputs.length).toBe(2);
    });
    it('inputs should throw for not provindg input', function (done) {
        try {
            algorithm.getInputs().submit({
                'output': {
                    features: [],
                    examples: []
                }
            });
            done.fail();
        }
        catch (error) {
            expect().nothing();
            done();
        }
    });
    it('inputs should throw for not provindg output', function (done) {
        try {
            algorithm.getInputs().submit({
                'input': {
                    features: [],
                    examples: []
                }
            });
            done.fail();
        }
        catch (error) {
            expect().nothing();
            done();
        }
    });
    it('inputs and outputs should set data inside algorithm', function () {
        algorithm.getInputs().submit(testingInput);
        expect(algorithm.data.input).toEqual({
            rows: 9,
            columns: 3,
            data: [
                [1, 1, 5],
                [1, 1, 4],
                [1, 2, 5],
                [1, 4, 3],
                [1, 4, 2],
                [1, 5, 3],
                [1, 1, 2],
                [1, 1, 1],
                [1, 2, 1],
            ]
        });
        expect(algorithm.m).toEqual(9);
        expect(algorithm.n).toEqual(3);
    });
    it('get testing input should match given input', function () {
        algorithm.getInputs().submit(testingInput);
        var testing = algorithm.getTestingInputs();
        expect(testing.input.length).toBe(1);
        expect(testing.input[0].min).toBe(2);
        expect(testing.input[0].max).toBe(2);
        expect(testing.output).toBeDefined();
        if (testing.output) {
            expect(testing.output.length).toBe(1);
            expect(testing.output[0].min).toBe(1);
            expect(testing.output[0].max).toBe(1);
        }
    });
    it('options should return false for no more', function () {
        expect(algorithm.getOptions().noMore()).toBeFalsy();
    });
    it('options should prompt for regularization and threshold and learning rate', function () {
        var options = algorithm.getOptions().options();
        expect(options.length).toBe(3);
    });
    it('options should return no more when regularization is submitted false', function () {
        algorithm.getOptions().submit({
            'regularization': false,
            'threshold': 0.5,
            'learningRate': 0.1
        });
        expect(algorithm.getOptions().noMore()).toBeFalsy();
    });
    it('options should want more when regularization is submitted true', function () {
        algorithm.getOptions().submit({
            'regularization': true,
            'threshold': 0.5,
            'learningRate': 0.1
        });
        expect(algorithm.getOptions().noMore()).toBeFalse();
        expect(algorithm.getOptions().options().length).toBe(1);
    });
    it('options should return more for regularization and lambda', function () {
        algorithm.getOptions().submit({
            'regularization': true,
            'threshold': 0.5,
            'learningRate': 0.1
        });
        algorithm.getOptions().submit({
            'lambda': 0.3
        });
        expect(algorithm.getOptions().noMore()).toBeFalsy();
    });
    it('options auto detect should have labels', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algorithm.getInputs().submit(testingInput);
                    algorithm.getOptions().submit({
                        'regularization': true,
                        'threshold': 0.5,
                        'learningRate': 0.1
                    });
                    algorithm.getOptions().submit({
                        'lambda': 0.3
                    });
                    expect(algorithm.getOptions().options().length).toBe(2);
                    return [4 /*yield*/, algorithm.getOptions().executeCommand('autoDetect')];
                case 1:
                    _a.sent();
                    expect(algorithm.getOptions().labels).toEqual([1, 2, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('options auto detect should ask for confirmation', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algorithm.getInputs().submit(testingInput);
                    algorithm.getOptions().submit({
                        'regularization': true,
                        'threshold': 0.5,
                        'learningRate': 0.1
                    });
                    algorithm.getOptions().submit({
                        'lambda': 0.3
                    });
                    expect(algorithm.getOptions().options().length).toBe(2);
                    return [4 /*yield*/, algorithm.getOptions().executeCommand('autoDetect')];
                case 1:
                    _a.sent();
                    expect(algorithm.getOptions().options().length).toBe(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('options auto detect should be done after confirmation', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algorithm.getInputs().submit(testingInput);
                    algorithm.getOptions().submit({
                        'regularization': true,
                        'threshold': 0.5,
                        'learningRate': 0.1
                    });
                    algorithm.getOptions().submit({
                        'lambda': 0.3
                    });
                    expect(algorithm.getOptions().options().length).toBe(2);
                    return [4 /*yield*/, algorithm.getOptions().executeCommand('autoDetect')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, algorithm.getOptions().executeCommand('yes')];
                case 2:
                    _a.sent();
                    expect(algorithm.data.labels).toEqual([1, 2, 3]);
                    expect(algorithm.getOptions().noMore()).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('options auto detect should go for manual after incorrect', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algorithm.getInputs().submit(testingInput);
                    algorithm.getOptions().submit({
                        'regularization': true,
                        'threshold': 0.5,
                        'learningRate': 0.1
                    });
                    algorithm.getOptions().submit({
                        'lambda': 0.3
                    });
                    expect(algorithm.getOptions().options().length).toBe(2);
                    return [4 /*yield*/, algorithm.getOptions().executeCommand('autoDetect')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, algorithm.getOptions().executeCommand('no')];
                case 2:
                    _a.sent();
                    expect(algorithm.getOptions().noMore()).toBeFalsy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('options manual should have labels', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algorithm.getInputs().submit(testingInput);
                    algorithm.getOptions().submit({
                        'regularization': true,
                        'threshold': 0.5,
                        'learningRate': 0.1
                    });
                    algorithm.getOptions().submit({
                        'lambda': 0.3
                    });
                    expect(algorithm.getOptions().options().length).toBe(2);
                    return [4 /*yield*/, algorithm.getOptions().executeCommand('manual')];
                case 1:
                    _a.sent();
                    expect(algorithm.getOptions().options().length).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('options manual should be done after input', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algorithm.getInputs().submit(testingInput);
                    algorithm.getOptions().submit({
                        'regularization': true,
                        'threshold': 0.5,
                        'learningRate': 0.1
                    });
                    algorithm.getOptions().submit({
                        'lambda': 0.3
                    });
                    expect(algorithm.getOptions().options().length).toBe(2);
                    return [4 /*yield*/, algorithm.getOptions().executeCommand('manual')];
                case 1:
                    _a.sent();
                    algorithm.getOptions().submit({
                        'labels': "4, 1, 2, 3, 3, 3"
                    });
                    expect(algorithm.data.labels).toEqual([1, 2, 3, 4]);
                    expect(algorithm.getOptions().noMore()).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('after all inputs', function () {
        beforeEach(function (done) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        algorithm.getInputs().submit(testingInput);
                        algorithm.getOptions().submit({
                            'regularization': true,
                            'threshold': 0.5,
                            'learningRate': 0.1
                        });
                        algorithm.getOptions().submit({
                            'lambda': 0.3
                        });
                        return [4 /*yield*/, algorithm.getOptions().executeCommand('autoDetect')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, algorithm.getOptions().executeCommand('yes')];
                    case 2:
                        _a.sent();
                        algorithm.initialize();
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        it('computeHs should return array of Matrx', function () {
            var Hs = algorithm.computeHs(algorithm.data.input);
            expect(Hs.length).toBe(3);
            expect(Hs[0].rows).toBe(9);
            expect(Hs[0].columns).toBe(1);
        });
        it('testing after iterations should get all right', function () { return __awaiter(void 0, void 0, void 0, function () {
            var i, i, actual;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 1000)) return [3 /*break*/, 4];
                        return [4 /*yield*/, algorithm.step()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4:
                        for (i = 0; i < testingInput.output.examples.length; ++i) {
                            actual = algorithm.test({ 'input': testingInput.input.examples[i] });
                            expect(actual.output).toEqual(testingInput.output.examples[i]);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        it('export and import without minimial should be able to train', function () { return __awaiter(void 0, void 0, void 0, function () {
            var json, newAlgorithm, i, i, actual;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, algorithm.export(false)];
                    case 1:
                        json = _a.sent();
                        return [4 /*yield*/, (new multi_logistic_classification_1.MultiLogisticClassification()).import(json, false)];
                    case 2:
                        newAlgorithm = _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < 1000)) return [3 /*break*/, 6];
                        return [4 /*yield*/, newAlgorithm.step()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        ++i;
                        return [3 /*break*/, 3];
                    case 6:
                        for (i = 0; i < testingInput.output.examples.length; ++i) {
                            actual = newAlgorithm.test({ 'input': testingInput.input.examples[i] });
                            expect(actual.output).toEqual(testingInput.output.examples[i]);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        it('testing about export minimal should still work', function () { return __awaiter(void 0, void 0, void 0, function () {
            var i, json, newAlgorithm, i, actual;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 1000)) return [3 /*break*/, 4];
                        return [4 /*yield*/, algorithm.step()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, algorithm.export(true)];
                    case 5:
                        json = _a.sent();
                        return [4 /*yield*/, (new multi_logistic_classification_1.MultiLogisticClassification()).import(json, true)];
                    case 6:
                        newAlgorithm = _a.sent();
                        for (i = 0; i < testingInput.output.examples.length; ++i) {
                            actual = newAlgorithm.test({ 'input': testingInput.input.examples[i] });
                            expect(actual.output).toEqual(testingInput.output.examples[i]);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
