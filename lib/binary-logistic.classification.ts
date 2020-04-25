import { AlgorithmPlugin, PluginOptions, PluginInputs, Option, CheckboxOption, RecorderService, PluginData, PluginDataInput, Matrix, NumberOption } from 'data-science-lab-core';
import { sigmoid, subtract, log } from './classification.helpers';

interface BinaryLogisticClassificationInput {
    regularization: boolean;
    input: Matrix.Matrix;
    output: Matrix.Matrix;
    theta: Matrix.Matrix;
    lambda: number;
    threshold: number;
    m: number,
    n: number,
    learningRate: number,
}

export class BinaryLogisticClassification extends AlgorithmPlugin {

    options: BinaryLogisticClassificationPluginOptions;
    inputs: BinaryLogisticClassificationPluginInputs;

    data: BinaryLogisticClassificationInput;
    recorder?: RecorderService;

    constructor() {
        super();

        this.options = new BinaryLogisticClassificationPluginOptions(this);
        this.inputs = new BinaryLogisticClassificationPluginInputs(this);
        this.data = { regularization: false, lambda: 0, threshold: 0.5, learningRate: 0.1 } as BinaryLogisticClassificationInput;
    }

    get m(): number {
        return this.data.m;
    }

    get n(): number {
        return this.data.n;
    }

    export(minimum: boolean): string {
        if (minimum) {
            return JSON.stringify({
                threshold: this.data.threshold,
                theta: this.data.theta,
                m: this.data.m,
                n: this.data.n
            })
        } else {
            return JSON.stringify(this.data); 
        }
    }

    import(json: string, minimal: boolean): BinaryLogisticClassification {
        const data = JSON.parse(json) as BinaryLogisticClassificationInput;
        if (minimal) {
            this.data.threshold = data.threshold;
            this.data.theta = data.theta;
            this.data.m = data.m;
            this.data.n = data.n;
        } else {
            this.data = data;
        }
        return this;
    }

    getInputs() {
        return this.inputs;
    }

    getOptions() {
        return this.options;
    }

    initialize() {
        this.data.theta = Matrix.zeros(this.n, 1);
    }

    finishTraining() {
        return false;
    }


    test(argument: {
        [id: string]: any[];
    }): {[id: string]: any[]} {
        const argumentInput = argument['input'] as number[];
        let input = Matrix.construct(1, this.n, (row, column) => {
            if (column === 0) {
                return 1;
            }
            return argumentInput[column - 1];
        });

        const h = this.computeH(input);

        const answer = h.data[0][0];
        return {
            'output': [answer > this.data.threshold ? 1 : 0] 
        }
    }

    async step(): Promise<void> {
        const h = this.computeH(this.data.input);

        const theata_reg = this.computeTheataReg();
        const cost = this.computeCost(h) + theata_reg; 

        const gradient = this.computeGradient(h);
        
        this.data.theta = Matrix.subtract(this.data.theta, Matrix.multiply(gradient, this.data.learningRate)); 

        this.recorder?.record([
            {
                label: 'Cost',
                value: cost,
                description: "The average difference between expected and actual output"
            },
        ])
    }

    computeH(input: Matrix.Matrix): Matrix.Matrix {
        return sigmoid(Matrix.multiply(input, this.data.theta));
    }

    computeGradient(h: Matrix.Matrix): Matrix.Matrix {
        const lhs = Matrix.multiply(Matrix.transpose(this.data.input), Matrix.subtract(h, this.data.output));
        const gradient = Matrix.multiply(lhs, (1.0 / this.m))

        if (this.data.regularization) {
            const coefficient = this.data.lambda / this.m;
            return Matrix.map(gradient, (value, row, _) => {
                if (row === 0) {
                    return value;
                } else {
                    return value + coefficient * this.data.theta.data[row][0];
                }
            });
        }
        return gradient;
    }

    computeCost(h: Matrix.Matrix): number {
        const lhs = Matrix.columnMultiply(Matrix.multiply(this.data.output, -1.0), log(h));
        const rhs = Matrix.columnMultiply(subtract(1.0, this.data.output), log(subtract(1, h)));

        let temp = Matrix.sum(Matrix.subtract(lhs, rhs));

        return temp * (1.0 / this.m);        
    }

    computeTheataReg(): number {
        if (this.data.regularization) {
            const coefficient = this.data.lambda / (2.0 * this.m);
            let sum = 0.0;
            for (let i = 1; i < this.data.theta.rows; ++i) {
                sum += this.data.theta.data[i][0] * this.data.theta.data[i][0];
            }
            return coefficient * sum;
        }
        return 0.0;
    }

    setRecorderService(recorder: RecorderService) {
        this.recorder = recorder;
    }

    setRegularization(reg: boolean) {
        this.data.regularization = reg;
    }

    setLambda(lambda: number): void {
        this.data.lambda = lambda;
    }

    setThreshold(threshold: number) {
        this.data.threshold = threshold;
    }

    setLearningRate(rate: number) {
        this.data.learningRate = rate;
    }

    setInput(pluginData: number[][]) {
        this.data.input = Matrix.make(pluginData.map((value) => [1, ...value]));
        this.data.n = this.data.input.columns;
        this.data.m = this.data.input.rows;
    }

    setOutput(pluginData: number[][]) {
        this.data.output = Matrix.make(pluginData);
    }

    getTestingInputs(): { input: PluginDataInput[], output?: PluginDataInput[] } {
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
        }
    }

}

class BinaryLogisticClassificationPluginOptions extends PluginOptions {
    state: number;

    constructor(public classifier: BinaryLogisticClassification) {
        super();
        this.state = 1;
    }

    submit(inputs: { [id: string]: any; }): void {
        if (this.state === 1) {
            this.classifier.setThreshold(inputs['threshold']);
            this.classifier.setLearningRate(inputs['learningRate']);

            const regularization = (inputs['regularization'] as boolean);
            if (regularization) {
                this.state = 2;
                this.classifier.setRegularization(regularization);
            } else {
                this.state = 3;
            }
        } else {
            this.classifier.setLambda(inputs['lambda']);
            this.state = 3;
        }
    }

    options(): Option[] {
        switch (this.state) {
            case 1:
                return [
                    new NumberOption({
                        id: 'threshold',
                        label: 'Choose a threshold for classification (0.5 recommended)',
                        min: 0,
                        max: 1,
                        step: 0.001
                    }),
                    new CheckboxOption({
                        id: 'regularization',
                        label: 'Use regularization?'
                    }),
                    new NumberOption({
                        id: 'learningRate',
                        label: 'Learning rate (a number too high the algorithm may diverage, too low and the algorithm will take a long time to train)',
                        min: 0,
                        max: 1,
                        step: 0.001
                    })
                ];
            case 2:
                return [
                    new NumberOption({
                        id: 'lambda',
                        label: 'Choose a lambda for regularization (too high causes underfitting, too low causes overfitting)',
                        min: 0,
                        step: 0.1
                    })
                ];
            default:
                throw new Error(`Binary Logistic Classification in invalid state.`)
        }
    }

    noMore(): boolean {
        return this.state === 3;
    }

}

class BinaryLogisticClassificationPluginInputs extends PluginInputs {
    constructor(public classifier: BinaryLogisticClassification) {
        super();
    }

    inputs(): PluginDataInput[] {
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
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        if (inputs['input'] === undefined) {
            throw new Error(`Binary Logistic Classification's submit expecting plugin data with key input`);
        } else {
            this.classifier.setInput(inputs['input'].examples);
        }
        if (inputs['output'] === undefined) {
            throw new Error(`Binary Logistic Classification's submit expecting plugin data with key output`);
        } else {
            this.classifier.setOutput(inputs['output'].examples);
        }
    }
}


