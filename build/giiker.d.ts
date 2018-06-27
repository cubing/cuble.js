declare class GiiKerEvent {
    latestMove: any;
    timeStamp: number;
    stateStr: string;
}
export declare class GiikerCube {
    private listeners;
    private _originalValue;
    private cubeCharacteristic;
    private cubeService;
    private server;
    private device;
    connect(): Promise<void>;
    giikerMoveToAlgMove(face: number, amount: number): {
        type: string;
        base: string;
        amount: number;
    };
    onCubeCharacteristicChanged(event: any): void;
    addEventListener(listener: () => GiiKerEvent): void;
}
export {};
