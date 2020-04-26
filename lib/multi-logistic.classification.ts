import { AlgorithmPlugin, Matrix, PluginInputs, PluginOptions, PluginDataInput, RecorderService, PluginData, NumberOption, Option, CheckboxOption, CommandOption, TextOption } from "data-science-lab-core";
import { sigmoid, log, subtract } from "./classification.helpers";

interface MultiLogisticClassificationInput {
    regularization: boolean;
    input: Matrix.Matrix;
    output: Matrix.Matrix;
    thetas: Matrix.Matrix[];
    lambda: number;
    threshold: number;
    m: number;
    n: number;
    learningRate: number;
    labels: number[];
}

export class MultiLogisticClassification extends AlgorithmPlugin {
    options: MultiLogisticClassificationPluginOptions;
    inputs: MultiLogisticClassificationPluginInputs;

    data: MultiLogisticClassificationInput;
    recorder?: RecorderService;

    constructor() {
        super();

        this.options = new MultiLogisticClassificationPluginOptions(this);
        this.inputs = new MultiLogisticClassificationPluginInputs(this);

        this.data = { regularization: false, lambda: 0, threshold: 0.5, learningRate: 0.1 } as MultiLogisticClassificationInput;
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
                thetas: this.data.thetas,
                labels: this.data.labels,
                m: this.data.m,
                n: this.data.n
            })
        } else {
            return JSON.stringify(this.data);
        }
    }

    import(json: string, _: boolean): MultiLogisticClassification {
        const data = JSON.parse(json) as MultiLogisticClassificationInput;
        this.data = data;
        return this;
    }

    getInputs() {
        return this.inputs;
    }

    getOptions() {
        return this.options;
    }

    setInput(pluginData: number[][]) {
        this.data.input = Matrix.make(pluginData.map((value) => [1, ...value]));
        this.data.n = this.data.input.columns;
        this.data.m = this.data.input.rows;
    }

    setOutput(pluginData: number[][]) {
        this.data.output = Matrix.make(pluginData);
    }

    initialize() {
        this.data.thetas = this.data.labels.map(() => Matrix.zeros(this.n, 1));
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

        const Hs = this.computeHs(input);

        let max = 0;
        for (let i = 1; i < Hs.length; ++i) {
            if (Hs[i].data[0][0] > Hs[max].data[0][0]) {
                max = i;
            }
        }
        return {
            'output': [this.data.labels[max]]
        }
    }

    async step(): Promise<void> {
        const Hs = this.computeHs(this.data.input);
        const theta_regs = this.computeThetaRegs();

        const costs = this.computeCosts(Hs).map((value, index) => value + theta_regs[index]);

        const gradients = this.computeGradients(Hs);

        this.data.thetas = this.data.thetas.map((theta, index) => 
            Matrix.subtract(theta, Matrix.multiply(gradients[index], this.data.learningRate))
        );

        this.recorder?.record(
            costs.map((value, index) => ({
                label: `Cost for ${this.data.labels[index]}`,
                value,
                description: `The average difference between expected and actual output`
            }))
        )
    }

    computeHs(input: Matrix.Matrix): Matrix.Matrix[] {
        return this.data.thetas.map((value) => sigmoid(Matrix.multiply(input, value)));
    }

    computeCosts(Hs: Matrix.Matrix[]): number[] {
        return this.data.labels.map((label, index) => {
            const output = Matrix.map(this.data.output, (value) => {
                return value === label ? 1 : 0;
            });
            const h = Hs[index];
            const lhs = Matrix.columnMultiply(Matrix.multiply(output, -1.0), log(h));
            const rhs = Matrix.columnMultiply(subtract(1.0, output), log(subtract(1, h)));
            let temp = Matrix.sum(Matrix.subtract(lhs, rhs));
            return temp * (1.0 / this.m);
        });
    }

    computeGradients(Hs: Matrix.Matrix[]): Matrix.Matrix[] {
        return this.data.labels.map((label, index) => {
            const output = Matrix.map(this.data.output, (value) => {
                return value === label ? 1 : 0;
            });
            const h = Hs[index];

            const lhs = Matrix.multiply(Matrix.transpose(this.data.input), Matrix.subtract(h, output));
            const gradient = Matrix.multiply(lhs, (1.0 / this.m))

            if (this.data.regularization) {
                const coefficient = this.data.lambda / this.m;
                return Matrix.map(gradient, (value, row, _) => {
                    if (row === 0) {
                        return value;
                    } else {
                        return value + coefficient * this.data.thetas[index].data[row][0];
                    }
                });
            }

            return gradient;
        });
    }

    computeThetaRegs(): number[] {
        if (this.data.regularization) {
            const coefficient = this.data.lambda / (2.0 * this.m);
            this.data.thetas.map((value) => {
                let sum = 0.0;
                for (let i = 1; i < value.rows; ++i) {
                    sum += value.data[i][0] * value.data[i][0];
                }
                return coefficient * sum;
            });
        }
        return this.data.labels.map(() => 0.0);
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

    autoDetect(): number[] {
        const list = Array.from(new Set(this.data.output.data.map((value) => value[0])));
        list.sort((a, b) => a - b);
        return list;
    }

    setLabels(labels: number[]) {
        const list = Array.from(new Set(labels));
        list.sort((a, b) => a - b);
        this.data.labels = list;
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

class MultiLogisticClassificationPluginInputs extends PluginInputs {
    constructor(public classifier: MultiLogisticClassification) {
        super();
    }

    inputs(): PluginDataInput[] {
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
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        if (inputs['input'] === undefined) {
            throw new Error(`Multi Logistic Classification's submit expecting plugin data with key input`);
        } else {
            this.classifier.setInput(inputs['input'].examples);
        }
        if (inputs['output'] === undefined) {
            throw new Error(`Multi Logistic Classification's submit expecting plugin data with key output`);
        } else {
            this.classifier.setOutput(inputs['output'].examples);
        }
    }
}

class MultiLogisticClassificationPluginOptions extends PluginOptions {
    state: number;
    labels: number[];

    constructor(public classifier: MultiLogisticClassification) {
        super();
        this.state = 1;
        this.labels = [];
    }

    submit(inputs: { [id: string]: any; }): void {
        switch (this.state) {
            case 1:
                this.classifier.setThreshold(inputs['threshold']);
                this.classifier.setLearningRate(inputs['learningRate']);

                const regularization = (inputs['regularization'] as boolean);
                if (regularization) {
                    this.state = 2;
                    this.classifier.setRegularization(regularization);
                } else {
                    this.state = 3;
                }
                break;
            case 2:
                this.classifier.setLambda(inputs['lambda']);
                this.state = 3;
                break;
            case 5:
                this.classifier.setLabels(JSON.parse(`[${inputs['labels']}]`));
                this.state = 6;
                break;
            default:
                throw new Error(`Multi Logistic Classification in invalid state.`);
        }
    }

    async executeCommand(id: string): Promise<void> {
        switch (this.state) {
            case 3:
                if (id === 'autoDetect') {
                    this.labels = this.classifier.autoDetect();
                    this.state = 4;
                } else if (id === 'manual') {
                    this.state = 5;
                } else {
                    throw new Error(`Multi Logistic Classification got invalid command: ${id}`);
                }
                break;
            case 4:
                if (id === 'yes') {
                    this.classifier.setLabels(this.labels);
                    this.state = 6;
                } else if (id === 'no') {
                    this.state = 5;
                } else {
                    throw new Error(`Multi Logistic Classification got invalid command: ${id}`);
                }
                break;
            default:
                throw new Error(`Multi Logistic Classification in invalid state`)
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
            case 3:
                return [
                    new CommandOption({
                        id: 'autoDetect',
                        command: 'Auto Detect',
                        label: 'Detect the number of labels in output features',
                    }),
                    new CommandOption({
                        id: 'manual',
                        command: 'Input Labels',
                        label: 'Manually type the set of labels'
                    })
                ];
            case 4:
                return [
                    new CommandOption({
                        id: 'yes',
                        command: 'Yes',
                        label: `Are these labels ${this.labels} correct?`,
                    }),
                    new CommandOption({
                        id: 'no',
                        command: 'No',
                        label: 'Incorrect. Will go to manual input when click',
                    }),
                ]
            case 5:
                return [
                    new TextOption({
                        id: 'labels',
                        label: 'Input Label List. (example input: 1,2,3,4)',
                        min: 1,
                        pattern: '([ ]*[0-9]+[ ]*)(,[ ]*[0-9]+[ ]*)+'
                    })
                ]
            default:
                throw new Error(`Multi Logistic Classification in invalid state.`)
        }
    }

    noMore(): boolean {
        return this.state === 6;
    }
}




