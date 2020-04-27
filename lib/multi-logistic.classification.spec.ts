import { MultiLogisticClassification } from './multi-logistic.classification';
import { Matrix, AlgorithmPlugin } from 'data-science-lab-core';


/*
5| 1 1
4| 1
3|       2 2
2| 3     2
1| 3 3
------------
#  1 2 3 4 5

*/


describe('Multi Logistic Classification Tests', () => {
    let algorithm: MultiLogisticClassification;

    const testingInput = {
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
    }

    beforeEach(() => {
        algorithm = new MultiLogisticClassification();
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
            rows: 9,
            columns: 3,
            data: [
                [1, 1, 5],
                [1, 1, 4],
                [1, 2, 5], // 1
                [1, 4, 3],
                [1, 4, 2],
                [1, 5, 3], // 2
                [1, 1, 2],
                [1, 1, 1],
                [1, 2, 1], // 3
            ]
        });
        expect(algorithm.m).toEqual(9);
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

    it('options should return false for no more', () => {
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
        expect(algorithm.getOptions().noMore()).toBeFalsy();
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

    it('options should return more for regularization and lambda', () => {
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

    it('options auto detect should have labels', async () => {
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
        await algorithm.getOptions().executeCommand('autoDetect');
        expect(algorithm.getOptions().labels).toEqual([1, 2, 3]);
    });

    it('options auto detect should ask for confirmation', async () => {
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
        await algorithm.getOptions().executeCommand('autoDetect');
        expect(algorithm.getOptions().options().length).toBe(2);
    });

    it('options auto detect should be done after confirmation', async () => {
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
        await algorithm.getOptions().executeCommand('autoDetect');
        await algorithm.getOptions().executeCommand('yes');
        expect(algorithm.data.labels).toEqual([1, 2, 3]);
        expect(algorithm.getOptions().noMore()).toBeTruthy();
    });

    it('options auto detect should go for manual after incorrect', async () => {
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
        await algorithm.getOptions().executeCommand('autoDetect');
        await algorithm.getOptions().executeCommand('no');
        expect(algorithm.getOptions().noMore()).toBeFalsy();
    });


    it('options manual should have labels', async () => {
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
        await algorithm.getOptions().executeCommand('manual');
        expect(algorithm.getOptions().options().length).toEqual(1);
    });

    it('options manual should be done after input', async () => {
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
        await algorithm.getOptions().executeCommand('manual');
        algorithm.getOptions().submit({
            'labels': "4, 1, 2, 3, 3, 3"
        });
        expect(algorithm.data.labels).toEqual([1, 2, 3, 4]);
        expect(algorithm.getOptions().noMore()).toBeTruthy();
    });

    describe('after all inputs', () => {

        beforeEach(async (done) => {
            algorithm.getInputs().submit(testingInput);
            algorithm.getOptions().submit({
                'regularization': true,
                'threshold': 0.5,
                'learningRate': 0.1
            });
            algorithm.getOptions().submit({
                'lambda': 0.3
            });
            await algorithm.getOptions().executeCommand('autoDetect');
            await algorithm.getOptions().executeCommand('yes');
            algorithm.initialize();
            done();
        });

        it('computeHs should return array of Matrx', () => {
            const Hs = algorithm.computeHs(algorithm.data.input);
            expect(Hs.length).toBe(3);
            expect(Hs[0].rows).toBe(9);
            expect(Hs[0].columns).toBe(1);
        });

        it('testing after iterations should get all right', async () => {
            for (let i = 0; i < 1000; ++i) {
                await algorithm.step();
            }
            for (let i = 0; i < testingInput.output.examples.length; ++i) {
                const actual = algorithm.test(
                    { 'input': testingInput.input.examples[i] }
                );
                expect(actual.output).toEqual(testingInput.output.examples[i]);
            }
        });

        it('export and import without minimial should be able to train', async () => {
            const json = await algorithm.export(false);
            let newAlgorithm = await (new MultiLogisticClassification()).import(json, false);
            for (let i = 0; i < 1000; ++i) {
                await newAlgorithm.step();
            }
            for (let i = 0; i < testingInput.output.examples.length; ++i) {
                const actual = newAlgorithm.test(
                    { 'input': testingInput.input.examples[i] }
                );
                expect(actual.output).toEqual(testingInput.output.examples[i]);
            }
        });

        it('testing about export minimal should still work', async () => {
            for (let i = 0; i < 1000; ++i) {
                await algorithm.step();
            } 
            const json = await algorithm.export(true);
            let newAlgorithm = await (new MultiLogisticClassification()).import(json, true);
            for (let i = 0; i < testingInput.output.examples.length; ++i) {
                const actual = newAlgorithm.test(
                    { 'input': testingInput.input.examples[i] }
                );
                expect(actual.output).toEqual(testingInput.output.examples[i]);
            }
        });


    });



});