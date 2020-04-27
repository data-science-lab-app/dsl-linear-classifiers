import { AlgorithmPlugin, PluginOptions, PluginInputs, Option, RecorderService, PluginData, PluginDataInput, Matrix } from 'data-science-lab-core';
interface BinaryLogisticClassificationInput {
    regularization: boolean;
    input: Matrix.Matrix;
    output: Matrix.Matrix;
    theta: Matrix.Matrix;
    lambda: number;
    threshold: number;
    m: number;
    n: number;
    learningRate: number;
}
export declare class BinaryLogisticClassification extends AlgorithmPlugin {
    options: BinaryLogisticClassificationPluginOptions;
    inputs: BinaryLogisticClassificationPluginInputs;
    data: BinaryLogisticClassificationInput;
    recorder?: RecorderService;
    constructor();
    get m(): number;
    get n(): number;
    export(minimum: boolean): Promise<string>;
    import(json: string, minimal: boolean): Promise<BinaryLogisticClassification>;
    getInputs(): BinaryLogisticClassificationPluginInputs;
    getOptions(): BinaryLogisticClassificationPluginOptions;
    initialize(): void;
    finishTraining(): boolean;
    test(argument: {
        [id: string]: any[];
    }): {
        [id: string]: any[];
    };
    step(): Promise<void>;
    computeH(input: Matrix.Matrix): Matrix.Matrix;
    computeGradient(h: Matrix.Matrix): Matrix.Matrix;
    computeCost(h: Matrix.Matrix): number;
    computeTheataReg(): number;
    setRecorderService(recorder: RecorderService): void;
    setRegularization(reg: boolean): void;
    setLambda(lambda: number): void;
    setThreshold(threshold: number): void;
    setLearningRate(rate: number): void;
    setInput(pluginData: number[][]): void;
    setOutput(pluginData: number[][]): void;
    getTestingInputs(): {
        input: PluginDataInput[];
        output?: PluginDataInput[];
    };
}
declare class BinaryLogisticClassificationPluginOptions extends PluginOptions {
    classifier: BinaryLogisticClassification;
    state: number;
    constructor(classifier: BinaryLogisticClassification);
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
declare class BinaryLogisticClassificationPluginInputs extends PluginInputs {
    classifier: BinaryLogisticClassification;
    constructor(classifier: BinaryLogisticClassification);
    inputs(): PluginDataInput[];
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
}
export {};
