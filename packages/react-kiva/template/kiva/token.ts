interface ICancelToken {
    promise: Promise<any>,
    reason: string | null,
    isCancel: boolean
}

interface IExecutor {
    (executor: (message: any) => void): void
}

// 当一个类去实现一个接口的时候，它实际上是对实例部分做类型检查，constructor属于静态部分
interface ICancelTokenStatic {
    new(executor: IExecutor): void,

    source: () => {token: Promise<any>, cancel: (message: string | null) => void},
    task: <T>(promiseTask: Promise<T>, source: ICancelToken) => void
}

export class CancelToken implements ICancelToken {
    public promise: Promise<any>;
    public reason: string | null = null;
    public isCancel: boolean = false;

    constructor(executor: IExecutor) {
        if (typeof executor !== "function") {
            throw new TypeError("executor must be a function.");
        }
        let rejectPromise: (reason?: any) => void;
        this.promise = new Promise(function(resolve, reject) {
            rejectPromise = reject;
        });
        const token = this;
        executor(function(message) {
            if (token.reason || token.isCancel) {
                // Cancellation has already been requested
                return;
            }
            token.isCancel = true;
            token.reason = message;
            rejectPromise(token.reason);
        });
    }

    public static source(): {token: CancelToken, cancel: (message: string) => void} {
        let cancel: any;
        const token = new CancelToken(function(c) {
            cancel = c;
        });
        return {token: token, cancel};
    }

    public static task<T = any>(promiseTask: Promise<T>, token: CancelToken) {
        return Promise.race([promiseTask, token.promise]);
    };
}
