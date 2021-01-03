export interface IHTMLTweenElement extends HTMLElement {
    transform?: {[key: string]: any},
    animationTimer?: number,
}

export interface ITweenAttr {
}

export interface ITweenOptions {
    el: IHTMLTweenElement,
    attr: ITweenAttr,
    fx?: string,
    duration?: number,
    onStop?: () => void,
    onMove?: () => void,
}
