import { BinaryLogisticClassification } from "./binary-logistic.classification";
import { Matrix } from "data-science-lab-core";


describe('Binary Logistic Classification Tests', () => {
    let algorithm: BinaryLogisticClassification;

    // 34.62365962451697,78.0246928153624,0
    // 30.28671076822607,43.89499752400101,0
    // 35.84740876993872,72.90219802708364,0
    // 60.18259938620976,86.30855209546826,1
    // 79.0327360507101,75.3443764369103,1
    // 45.08327747668339,56.3163717815305,0
    // 61.10666453684766,96.51142588489624,1

    const testingInput = {
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

    beforeEach(() => {
        algorithm = new BinaryLogisticClassification();
    });

    it('inputs should return two', () => {
        const inputs = algorithm.getInputs().inputs();
        expect(inputs.length).toBe(2);
    });

    it('inputs should throw for not provindg input', (done) => {
        try {
            algorithm.getInputs().submit({
                'output': {
                    features: [],
                    examples: []
                }
            })
            done.fail();
        } catch (error) {
            expect().nothing();
            done();
        }
    });


    it('inputs should throw for not provindg output', (done) => {
        try {
            algorithm.getInputs().submit({
                'input': {
                    features: [],
                    examples: []
                }
            })
            done.fail();
        } catch (error) {
            expect().nothing();
            done();
        }
    });

    it('inputs and outputs should set data inside algorithm', () => {
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

    it('get testing input should match given input', () => {
        algorithm.getInputs().submit(testingInput);
        const testing = algorithm.getTestingInputs();
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

    it('sigmoid function should perform sigmod on each value', () => {
        const output = algorithm.sigmoid(Matrix.make([[1, 2], [3, 4]]));
        expect(output).toEqual({
            rows: 2,
            columns: 2,
            data: [
                [1.0 / (1.0 + Math.exp(-1)), 1.0 / (1.0 + Math.exp(-2))],
                [1.0 / (1.0 + Math.exp(-3)), 1.0 / (1.0 + Math.exp(-4))]]
        });
    });

    it('log function should perform log on each value', () => {
        const output = algorithm.log(Matrix.make([[1, 2], [3, 4]]));
        expect(output).toEqual({
            rows: 2,
            columns: 2,
            data: [
                [Math.log(1), Math.log(2)],
                [Math.log(3), Math.log(4)],
            ]
        });
    });

    it('subt function should perform subtraction on each value', () => {
        const output = algorithm.subt(1, Matrix.make([[1, 2], [3, 4]]));
        expect(output).toEqual({
            rows: 2,
            columns: 2,
            data: [
                [0, -1],
                [-2, -3],
            ]
        });
    });

    it('options should retrun false for no more', () => {
        expect(algorithm.getOptions().noMore()).toBeFalsy();
    });

    it('options should prompt for regularization and threshold and learning rate', () => {
        const options = algorithm.getOptions().options();
        expect(options.length).toBe(3);
    });

    it('options should return no more when regularization is submitted false', () => {
        algorithm.getOptions().submit({
            'regularization': false,
            'threshold': 0.5,
            'learningRate': 0.1
        });
        expect(algorithm.getOptions().noMore()).toBeTruthy();
    });

    it('options should want more when regularization is submitted true', () => {
        algorithm.getOptions().submit({
            'regularization': true,
            'threshold': 0.5,
            'learningRate': 0.1
        });
        expect(algorithm.getOptions().noMore()).toBeFalse();
        expect(algorithm.getOptions().options().length).toBe(1);
    });

    it('options should return no more for regularization and lambda', () => {
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

    it('options should throw in invalid state', (done) => {
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
        } catch (error) {
            expect().nothing();
            done();
        }
    });

    it('initialize should set theta', () => {
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
        })
    });

    describe('after initialize without regularization', () => {

        beforeEach(() => {
            algorithm.getInputs().submit(testingInput);
            algorithm.getOptions().submit({
                'regularization': false,
                'threshold': 0.5,
                'learningRate': 0.001
            });
            algorithm.initialize();
        });

        it('compute h should return matrix', () => {
            const h = algorithm.computeH(algorithm.data.input);
            expect(h).toEqual({
                rows: 7,
                columns: 1,
                data: [[0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5]]
            });
        });

        it('compute theta reg', () => {
            expect(algorithm.computeTheataReg()).toBe(0);
        });

        it('compute cost should return number', () => {
            expect(algorithm
                .computeCost(algorithm
                    .computeH(algorithm.data.input)))
                .toBeCloseTo(0.6931471806)
        });

        it('compute gradient should return matrix', () => {
            const gradient = algorithm.computeGradient(algorithm.computeH(algorithm.data.input));
            expect(gradient.rows).toBe(3);
            expect(gradient.columns).toBe(1);
            expect(gradient.data[0][0]).toBeCloseTo(0.07142857143);
            expect(gradient.data[1][0]).toBeCloseTo(-3.89149595246);
            expect(gradient.data[2][0]).toBeCloseTo(-0.50186387638);
        });

        it('step should change theta', async () => {
            await algorithm.step();
            expect(algorithm.data.theta.rows).toEqual(3);
            expect(algorithm.data.theta.columns).toEqual(1);
            expect(algorithm.data.theta.data[0][0]).toBeCloseTo(-0.00007142857143);
            expect(algorithm.data.theta.data[1][0]).toBeCloseTo(0.00389149595246);
            expect(algorithm.data.theta.data[2][0]).toBeCloseTo(0.00050186387638);
        });

        it('theta should change after two steps', async () => {
            await algorithm.step();
            await algorithm.step();
            expect(algorithm.data.theta.rows).toEqual(3);
            expect(algorithm.data.theta.columns).toEqual(1);
            expect(algorithm.data.theta.data[0][0]).toBeCloseTo(-0.0001997600663);
            expect(algorithm.data.theta.data[1][0]).toBeCloseTo(0.0046882002465);
            expect(algorithm.data.theta.data[2][0]).toBeCloseTo(-0.0033129904848);
        });

        it('cost should decrease after a few iterations', async () => {
            const initial = algorithm.computeCost(algorithm.computeH(algorithm.data.input));
            for (let i = 0; i < 1000; ++i) {
                await algorithm.step();
            }
            const afterwards = algorithm.computeCost(algorithm.computeH(algorithm.data.input));
            expect(afterwards).toBeLessThan(initial);
        });

        it('set recorder service should record cost', async () => {
            const service = jasmine.createSpyObj('RecorderService', ['record']);
            algorithm.setRecorderService(service);
            for (let i = 0; i < 1000; ++i) {
                await algorithm.step();
            }
            expect(service.record).toHaveBeenCalledTimes(1000);
        });
    });

    describe('after initialize with regularization', () => {

        beforeEach(() => {
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

        it('compute h should return matrix', () => {
            const h = algorithm.computeH(algorithm.data.input);
            expect(h).toEqual({
                rows: 7,
                columns: 1,
                data: [[0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5]]
            });
        });

        it('compute theta reg', () => {
            expect(algorithm.computeTheataReg()).toBe(0);
        });

        it('compute cost should return number', () => {
            expect(algorithm
                .computeCost(algorithm
                    .computeH(algorithm.data.input)))
                .toBeCloseTo(0.6931471806)
        });

        it('compute gradient should return matrix', () => {
            const gradient = algorithm.computeGradient(algorithm.computeH(algorithm.data.input));
            expect(gradient.rows).toBe(3);
            expect(gradient.columns).toBe(1);
            expect(gradient.data[0][0]).toBeCloseTo(0.07142857143);
            expect(gradient.data[1][0]).toBeCloseTo(-3.89149595246);
            expect(gradient.data[2][0]).toBeCloseTo(-0.50186387638);
        });

        it('step should change theta', async () => {
            await algorithm.step();
            expect(algorithm.data.theta.rows).toEqual(3);
            expect(algorithm.data.theta.columns).toEqual(1);
            expect(algorithm.data.theta.data[0][0]).toBeCloseTo(-0.00007142857143);
            expect(algorithm.data.theta.data[1][0]).toBeCloseTo(0.00389149595246);
            expect(algorithm.data.theta.data[2][0]).toBeCloseTo(0.00050186387638);
        });

        it('after one step compute h', async () => {
            await algorithm.step();
            const h = algorithm.computeH(algorithm.data.input);
            expect(h.rows).toBe(7);
            expect(h.columns).toBe(1);
            expect(h.data[0][0]).toBeCloseTo(0.5433469558);
            expect(h.data[1][0]).toBeCloseTo(0.5348977908);
            expect(h.data[2][0]).toBeCloseTo(0.5438906413);
            expect(h.data[3][0]).toBeCloseTo(0.5689194896);
            expect(h.data[4][0]).toBeCloseTo(0.5854765939);
            expect(h.data[5][0]).toBeCloseTo(0.5507330899);
            expect(h.data[6][0]).toBeCloseTo(0.5710559028);
        });

        it('after one step compute theta reg', async () => {
            await algorithm.step();
            const theta_reg = algorithm.computeTheataReg();
            expect(theta_reg).toBeCloseTo(3.299058878e-07);
        });

        it('after one step compute gradient', async () => {
            await algorithm.step();
            const gradient = algorithm.computeGradient(algorithm.computeH(algorithm.data.input));
            expect(gradient.rows).toBe(3);
            expect(gradient.columns).toBe(1);
            expect(gradient.data[0][0]).toBeCloseTo(0.1283314949);
            expect(gradient.data[1][0]).toBeCloseTo(-0.7965375157);
            expect(gradient.data[2][0]).toBeCloseTo(3.8148758696);
        });

        it('cost should decrease after a few iterations', async () => {
            const initial = algorithm.computeCost(algorithm.computeH(algorithm.data.input));
            for (let i = 0; i < 1000; ++i) {
                await algorithm.step();
            }
            const afterwards = algorithm.computeCost(algorithm.computeH(algorithm.data.input));
            expect(afterwards).toBeLessThan(initial);
        });
    });

});