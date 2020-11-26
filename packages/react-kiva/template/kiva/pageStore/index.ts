// PageStore 整合localStorage实现多页消息订阅-派发
export class PageStore {
    public handlers: EventTarget = new EventTarget();

    constructor() {
        window.addEventListener("storage", this.__handler);
    }

    subscribe(key: string, callback: (e: CustomEvent) => void) {
        this.handlers.addEventListener(key, callback as any);
    }

    unsubscribe(key: string, callback: (e: CustomEvent) => void) {
        this.handlers.removeEventListener(key, callback as any);
    }

    __handler = (e: StorageEvent) => {
        e.key && localStorage.removeItem(e.key);
        this.handlers.dispatchEvent(new CustomEvent(e.key || "", {
            detail: JSON.parse(e.newValue || "{}")
        }));
    };

    destroy() {
        // @ts-ignore
        this.handlers = undefined;
        window.removeEventListener("storage", this.__handler);
    }

    static trigger<T extends {} = any>(key: string, value?: T) {
        localStorage.setItem(key, value ? JSON.stringify(value) : "{}");
    }
}
