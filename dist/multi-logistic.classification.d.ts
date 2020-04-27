import { AlgorithmPlugin, Matrix, PluginInputs, PluginOptions, PluginDataInput, RecorderService, PluginData, Option } from "data-science-lab-core";
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
export declare class MultiLogisticClassification extends AlgorithmPlugin {
    options: MultiLogisticClassificationPluginOptions;
    inputs: MultiLogisticClassificationPluginInputs;
    data: MultiLogisticClassificationInput;
    recorder?: RecorderService;
    constructor();
    get m(): number;
    get n(): number;
    export(minimum: boolean): Promise<string>;
    import(json: string, _: boolean): Promise<MultiLogisticClassification>;
    getInputs(): MultiLogisticClassificationPluginInputs;
    getOptions(): MultiLogisticClassificationPluginOptions;
    setInput(pluginData: number[][]): void;
    setOutput(pluginData: number[][]): void;
    initialize(): void;
    finishTraining(): boolean;
    test(argument: {
        [id: string]: any[];
    }): {
        [id: string]: any[];
    };
    step(): Promise<void>;
    computeHs(input: Matrix.Matrix): Matrix.Matrix[];
    computeCosts(Hs: Matrix.Matrix[]): number[];
    computeGradients(Hs: Matrix.Matrix[]): Matrix.Matrix[];
    computeThetaRegs(): number[];
    setRecorderService(recorder: RecorderService): void;
    setRegularization(reg: boolean): void;
    setLambda(lambda: number): void;
    setThreshold(threshold: number): void;
    setLearningRate(rate: number): void;
    autoDetect(): number[];
    setLabels(labels: number[]): void;
    getTestingInputs(): {
        input: PluginDataInput[];
        output?: PluginDataInput[];
    };
}
declare class MultiLogisticClassificationPluginInputs extends PluginInputs {
    classifier: MultiLogisticClassification;
    constructor(classifier: MultiLogisticClassification);
    inputs(): PluginDataInput[];
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
}
declare class MultiLogisticClassificationPluginOptions extends PluginOptions {
    classifier: MultiLogisticClassification;
    state: number;
    labels: number[];
    constructor(classifier: MultiLogisticClassification);
    submit(inputs: {
        [id: string]: any;
    }): void;
    executeCommand(id: string): Promise<void>;
    options(): Option[];
    noMore(): boolean;
}
export {};
