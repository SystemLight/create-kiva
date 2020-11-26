/*
    获取元素相对文档根元素Left绝对位置
 */
export function getElementLeft(element: HTMLElement): number {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent as HTMLElement;

    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent as HTMLElement;
    }

    return actualLeft;
}

/*
    获取元素相对文档窗口Left相对位置
 */
export function getElementViewLeft(element: HTMLElement): number {
    const actualLeft = getElementLeft(element);

    const elementScrollLeft = document.compatMode == "BackCompat" ?
        document.body.scrollLeft :
        document.documentElement.scrollLeft;

    return actualLeft - elementScrollLeft;
}

/*
    获取元素相对文档根元素Top绝对位置
 */
export function getElementTop(element: HTMLElement): number {
    let actualTop = element.offsetTop;
    let current = element.offsetParent as HTMLElement;

    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent as HTMLElement;
    }

    return actualTop;
}

/*
    获取元素相对文档窗口Top相对位置
 */
export function getElementViewTop(element: HTMLElement): number {
    const actualTop = getElementTop(element);

    const elementScrollTop = document.compatMode == "BackCompat" ?
        document.body.scrollTop :
        document.documentElement.scrollTop;

    return actualTop - elementScrollTop;
}

/*
    返回DOM结构，该DOM结构应当被应用到pre标签当中，并完善样式，
    该函数只负责生成高亮DOM结构
 */
export function syntaxJsonHighlight(json: object | string) {
    if (typeof json !== "string") {
        json = JSON.stringify(json, undefined, 2);
    }

    json = json
        .replace(/&/g, "&")
        .replace(/</g, "<")
        .replace(/>/g, ">");

    return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function(match) {
            let cls = "number";
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = "key";
                } else {
                    cls = "string";
                }
            } else if (/true|false/.test(match)) {
                cls = "boolean";
            } else if (/null/.test(match)) {
                cls = "null";
            }
            return "<span class=\"" + cls + "\">" + match + "</span>";
        }
    );
}

/*
    根据字符串查找对象值，字符串形式如a.b.0
 */
export function findKey(obj: object | Array<any>, key: string): any {
    const keyList = key.split(".") as Array<keyof typeof obj>;
    for (const k of keyList) {
        const val = obj[k];
        if (val) {
            obj = val;
        } else {
            return null;
        }
    }
    return obj;
}

/*
    判断元素是否符合空元素特征
 */
export function isNullValue(value: any) {
    if (value === "" || value === null || value === undefined) {
        return true;
    } else if (value instanceof Object) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return Object.keys(value).length === 0;
        }
    }
    return false;
}

/*
    字符串首字母大写
 */
export function title(content: string) {
    return content[0].toUpperCase() + content.slice(1, content.length);
}

/*
    实用程序功能，用于创建删除了某些字段的对象的浅表副本
    来源：https://github.com/benjycui/omit.js
 */
export function omit<T extends {} = any>(obj: T, fields: (keyof T)[]) {
    const shallowCopy = Object.assign({}, obj);
    for (let i = 0; i < fields.length; i += 1) {
        const key = fields[i];
        delete shallowCopy[key];
    }
    return shallowCopy;
}

/*
    获取屏幕DPI值
 */
export function getDPI() {
    const arrDPI = [];
    const tmpNode = document.createElement("div");
    tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
    document.body.appendChild(tmpNode);
    arrDPI[0] = parseInt(tmpNode.offsetWidth.toString());
    arrDPI[1] = parseInt(tmpNode.offsetHeight.toString());
    tmpNode.remove();
    return arrDPI;
}

/*
    生成uuid方法
 */
export function createUUID() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

const arrayMoveMutate = <ValueType>(array: ValueType[], from: number, to: number): void => {
    const startIndex = from < 0 ? array.length + from : from;

    if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = to < 0 ? array.length + to : to;

        const [item] = array.splice(from, 1);
        array.splice(endIndex, 0, item);
    }
};

/*
    将数组项移动到其他位置，Copy from: https://github.com/sindresorhus/array-move
 */
export const arrayMove = <ValueType>(array: ValueType[], from: number, to: number): ValueType[] => {
    array = [...array];
    arrayMoveMutate(array, from, to);
    return array;
};
