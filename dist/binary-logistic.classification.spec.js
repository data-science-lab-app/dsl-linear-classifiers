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
var binary_logistic_classification_1 = require("./binary-logistic.classification");
describe('Binary Logistic Classification Tests', function () {
    var algorithm;
    // 34.62365962451697,78.0246928153624,0
    // 30.28671076822607,43.89499752400101,0
    // 35.84740876993872,72.90219802708364,0
    // 60.18259938620976,86.30855209546826,1
    // 79.0327360507101,75.3443764369103,1
    // 45.08327747668339,56.3163717815305,0
    // 61.10666453684766,96.51142588489624,1
    var testingInput = {
        'input': {
            features: ['exam 1', 'exam 2'],
            examples: [
                [34.62365962451697, 78.0246928153624],
                [30.28671076822607, 43.89499752400101],
                [35.84740876993872, 72.90219802708364],
                [60.18259938620976, 86.30855209546826],
                [79.0327360507101, 75.3443764369103],
                [45.08327747668339, 56.3163717815305],
                [61.10666453684766, 96.51142588489624],
            ]
        },
        'output': {
            features: ['passed'],
            examples: [
                [0],
                [0],
                [0],
                [1],
                [1],
                [0],
                [1]
            ]
        }
    };
    beforeEach(function () {
        algorithm = new binary_logistic_classification_1.BinaryLogisticClassification();
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
            rows: 7,
            columns: 3,
            data: [
                [1, 34.62365962451697, 78.0246928153624],
                [1, 30.28671076822607, 43.89499752400101],
                [1, 35.84740876993872, 72.90219802708364],
                [1, 60.18259938620976, 86.30855209546826],
                [1, 79.0327360507101, 75.3443764369103],
                [1, 45.08327747668339, 56.3163717815305],
                [1, 61.10666453684766, 96.51142588489624],
            ]
        });
        expect(algorithm.m).toEqual(7);
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
    it('options should retrun false for no more', function () {
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
        expect(algorithm.getOptions().noMore()).toBeTruthy();
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
    it('options should return no more for regularization and lambda', function () {
        algorithm.getOptions().submit({
            'regularization': true,
            'threshold': 0.5,
            'learningRate': 0.1
        });
        algorithm.getOptions().submit({
            'lambda': 0.3
        });
        expect(algorithm.getOptions().noMore()).toBeTruthy();
    });
    it('options should throw in invalid state', function (done) {
        algorithm.getOptions().submit({
            'regularization': true,
            'threshold': 0.5,
            'learningRate': 0.1
        });
        algorithm.getOptions().submit({
            'lambda': 0.3
        });
        try {
            algorithm.getOptions().options();
            done.fail();
        }
        catch (error) {
            expect().nothing();
            done();
        }
    });
    it('initialize should set theta', function () {
        algorithm.getInputs().submit(testingInput);
        algorithm.getOptions().submit({
            'regularization': true,
            'threshold': 0.5,
            'learningRate': 0.1
        });
        algorithm.getOptions().submit({
            'lambda': 0.3
        });
        algorithm.initialize();
        expect(algorithm.data.theta).toEqual({
            rows: 3,
            columns: 1,
            data: [[0], [0], [0]]
        });
    });
    it('export and import without minimial should be able to train', function () { return __awaiter(void 0, void 0, void 0, function () {
        var json, newAlgorithm, initial, i, afterwards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algorithm.getInputs().submit(testingInput);
                    algorithm.getOptions().submit({
                        'regularization': false,
                        'threshold': 0.5,
                        'learningRate': 0.001
                    });
                    algorithm.initialize();
                    return [4 /*yield*/, algorithm.export(false)];
                case 1:
                    json = _a.sent();
                    return [4 /*yield*/, (new binary_logistic_classification_1.BinaryLogisticClassification()).import(json, false)];
                case 2:
                    newAlgorithm = _a.sent();
                    initial = newAlgorithm.computeCost(newAlgorithm.computeH(newAlgorithm.data.input));
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
                    afterwards = newAlgorithm.computeCost(newAlgorithm.computeH(newAlgorithm.data.input));
                    expect(afterwards).toBeLessThan(initial);
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing should get all right', function () { return __awaiter(void 0, void 0, void 0, function () {
        var i, i, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algorithm.getInputs().submit(testingInput);
                    algorithm.getOptions().submit({
                        'regularization': false,
                        'threshold': 0.5,
                        'learningRate': 0.001
                    });
                    algorithm.initialize();
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 100000)) return [3 /*break*/, 4];
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
    it('testing about export minimal should still work', function () { return __awaiter(void 0, void 0, void 0, function () {
        var i, json, newAlgorithm, i, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algorithm.getInputs().submit(testingInput);
                    algorithm.getOptions().submit({
                        'regularization': false,
                        'threshold': 0.5,
                        'learningRate': 0.001
                    });
                    algorithm.initialize();
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 100000)) return [3 /*break*/, 4];
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
                    return [4 /*yield*/, (new binary_logistic_classification_1.BinaryLogisticClassification()).import(json, true)];
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
    describe('after initialize without regularization', function () {
        beforeEach(function () {
            algorithm.getInputs().submit(testingInput);
            algorithm.getOptions().submit({
                'regularization': false,
                'threshold': 0.5,
                'learningRate': 0.001
            });
            algorithm.initialize();
        });
        it('compute h should return matrix', function () {
            var h = algorithm.computeH(algorithm.data.input);
            expect(h).toEqual({
                rows: 7,
                columns: 1,
                data: [[0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5]]
            });
        });
        it('compute theta reg', function () {
            expect(algorithm.computeTheataReg()).toBe(0);
        });
        it('compute cost should return number', function () {
            expect(algorithm
                .computeCost(algorithm
                .computeH(algorithm.data.input)))
                .toBeCloseTo(0.6931471806);
        });
        it('compute gradient should return matrix', function () {
            var gradient = algorithm.computeGradient(algorithm.computeH(algorithm.data.input));
            expect(gradient.rows).toBe(3);
            expect(gradient.columns).toBe(1);
            expect(gradient.data[0][0]).toBeCloseTo(0.07142857143);
            expect(gradient.data[1][0]).toBeCloseTo(-3.89149595246);
            expect(gradient.data[2][0]).toBeCloseTo(-0.50186387638);
        });
        it('step should change theta', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, algorithm.step()];
                    case 1:
                        _a.sent();
                        expect(algorithm.data.theta.rows).toEqual(3);
                        expect(algorithm.data.theta.columns).toEqual(1);
                        expect(algorithm.data.theta.data[0][0]).toBeCloseTo(-0.00007142857143);
                        expect(algorithm.data.theta.data[1][0]).toBeCloseTo(0.00389149595246);
                        expect(algorithm.data.theta.data[2][0]).toBeCloseTo(0.00050186387638);
                        return [2 /*return*/];
                }
            });
        }); });
        it('theta should change after two steps', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, algorithm.step()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, algorithm.step()];
                    case 2:
                        _a.sent();
                        expect(algorithm.data.theta.rows).toEqual(3);
                        expect(algorithm.data.theta.columns).toEqual(1);
                        expect(algorithm.data.theta.data[0][0]).toBeCloseTo(-0.0001997600663);
                        expect(algorithm.data.theta.data[1][0]).toBeCloseTo(0.0046882002465);
                        expect(algorithm.data.theta.data[2][0]).toBeCloseTo(-0.0033129904848);
                        return [2 /*return*/];
                }
            });
        }); });
        it('cost should decrease after a few iterations', function () { return __awaiter(void 0, void 0, void 0, function () {
            var initial, i, afterwards;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initial = algorithm.computeCost(algorithm.computeH(algorithm.data.input));
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
                        afterwards = algorithm.computeCost(algorithm.computeH(algorithm.data.input));
                        expect(afterwards).toBeLessThan(initial);
                        return [2 /*return*/];
                }
            });
        }); });
        it('set recorder service should record cost', function () { return __awaiter(void 0, void 0, void 0, function () {
            var service, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = jasmine.createSpyObj('RecorderService', ['record']);
                        algorithm.setRecorderService(service);
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
                        expect(service.record).toHaveBeenCalledTimes(1000);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('after initialize with regularization', function () {
        beforeEach(function () {
            algorithm.getInputs().submit(testingInput);
            algorithm.getOptions().submit({
                'regularization': true,
                'threshold': 0.5,
                'learningRate': 0.001
            });
            algorithm.getOptions().submit({
                'lambda': 0.3,
            });
            algorithm.initialize();
        });
        it('compute h should return matrix', function () {
            var h = algorithm.computeH(algorithm.data.input);
            expect(h).toEqual({
                rows: 7,
                columns: 1,
                data: [[0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5]]
            });
        });
        it('compute theta reg', function () {
            expect(algorithm.computeTheataReg()).toBe(0);
        });
        it('compute cost should return number', function () {
            expect(algorithm
                .computeCost(algorithm
                .computeH(algorithm.data.input)))
                .toBeCloseTo(0.6931471806);
        });
        it('compute gradient should return matrix', function () {
            var gradient = algorithm.computeGradient(algorithm.computeH(algorithm.data.input));
            expect(gradient.rows).toBe(3);
            expect(gradient.columns).toBe(1);
            expect(gradient.data[0][0]).toBeCloseTo(0.07142857143);
            expect(gradient.data[1][0]).toBeCloseTo(-3.89149595246);
            expect(gradient.data[2][0]).toBeCloseTo(-0.50186387638);
        });
        it('step should change theta', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, algorithm.step()];
                    case 1:
                        _a.sent();
                        expect(algorithm.data.theta.rows).toEqual(3);
                        expect(algorithm.data.theta.columns).toEqual(1);
                        expect(algorithm.data.theta.data[0][0]).toBeCloseTo(-0.00007142857143);
                        expect(algorithm.data.theta.data[1][0]).toBeCloseTo(0.00389149595246);
                        expect(algorithm.data.theta.data[2][0]).toBeCloseTo(0.00050186387638);
                        return [2 /*return*/];
                }
            });
        }); });
        it('after one step compute h', function () { return __awaiter(void 0, void 0, void 0, function () {
            var h;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, algorithm.step()];
                    case 1:
                        _a.sent();
                        h = algorithm.computeH(algorithm.data.input);
                        expect(h.rows).toBe(7);
                        expect(h.columns).toBe(1);
                        expect(h.data[0][0]).toBeCloseTo(0.5433469558);
                        expect(h.data[1][0]).toBeCloseTo(0.5348977908);
                        expect(h.data[2][0]).toBeCloseTo(0.5438906413);
                        expect(h.data[3][0]).toBeCloseTo(0.5689194896);
                        expect(h.data[4][0]).toBeCloseTo(0.5854765939);
                        expect(h.data[5][0]).toBeCloseTo(0.5507330899);
                        expect(h.data[6][0]).toBeCloseTo(0.5710559028);
                        return [2 /*return*/];
                }
            });
        }); });
        it('after one step compute theta reg', function () { return __awaiter(void 0, void 0, void 0, function () {
            var theta_reg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, algorithm.step()];
                    case 1:
                        _a.sent();
                        theta_reg = algorithm.computeTheataReg();
                        expect(theta_reg).toBeCloseTo(3.299058878e-07);
                        return [2 /*return*/];
                }
            });
        }); });
        it('after one step compute gradient', function () { return __awaiter(void 0, void 0, void 0, function () {
            var gradient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, algorithm.step()];
                    case 1:
                        _a.sent();
                        gradient = algorithm.computeGradient(algorithm.computeH(algorithm.data.input));
                        expect(gradient.rows).toBe(3);
                        expect(gradient.columns).toBe(1);
                        expect(gradient.data[0][0]).toBeCloseTo(0.1283314949);
                        expect(gradient.data[1][0]).toBeCloseTo(-0.7965375157);
                        expect(gradient.data[2][0]).toBeCloseTo(3.8148758696);
                        return [2 /*return*/];
                }
            });
        }); });
        it('cost should decrease after a few iterations', function () { return __awaiter(void 0, void 0, void 0, function () {
            var initial, i, afterwards;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initial = algorithm.computeCost(algorithm.computeH(algorithm.data.input));
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
                        afterwards = algorithm.computeCost(algorithm.computeH(algorithm.data.input));
                        expect(afterwards).toBeLessThan(initial);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
