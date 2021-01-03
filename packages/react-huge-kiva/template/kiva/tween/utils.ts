import {IHTMLTweenElement} from "./interface";

export const transformAttr = [
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "skewX",
    "skewY"
];

export const normalAttr = [
    "width",
    "height",
    "left",
    "top",
    "right",
    "bottom",
    "marginBottom",
    "marginleft",
    "marginRight",
    "marginTop",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "paddingBottom"
];

/**
 * 拓展DOM元素transform属性值
 * @param {IHTMLTweenElement} el
 * @param {string} attr
 * @param {any} val
 * @return {null | undefined | any}
 */
export function setTransform(el: IHTMLTweenElement, attr: string, val?: any) {
    el.transform = el.transform || {};
    if (val === undefined) {
        return el.transform[attr];
    }

    el.transform[attr] = val;

    let transformVal = "";
    for (const s in el.transform) {
        if (el.transform.hasOwnProperty(s)) {
            switch (s) {
                case "rotate":
                case "rotateX":
                case "rotateY":
                case "rotateZ":
                case "skewX":
                case "skewY":
                    transformVal += s + "(" + el.transform[s] + "deg) ";
                    break;
                case "translateX":
                case "translateY":
                case "translateZ":
                    transformVal += s + "(" + el.transform[s] + "px) ";
                    break;
                case "scale":
                case "scaleX":
                case "scaleY":
                    transformVal += s + "(" + el.transform[s] + ") ";
                    break;
            }
        }
    }
    el.style.transform = transformVal.trim();
}

/**
 * 设置CSS
 * @param {IHTMLTweenElement} el
 * @param {object | string} attr
 * @param {any} val
 * @return {any}
 */
export function css(el: IHTMLTweenElement, attr: object | string, val?: any) {
    if (typeof attr == "object") {
        for (const s in attr) {
            if (attr.hasOwnProperty(s)) {
                css(el, s, attr[s]);
            }
        }
        return;
    }

    if (transformAttr.indexOf(attr) >= 0) {
        return setTransform(el, attr, val);
    }

    if (val === undefined) {
        val = getComputedStyle(el)[attr];
        return normalAttr.indexOf(attr) >= 0 || !isNaN(val) ? parseFloat(val) : val;
    } else {
        if (attr === "opacity") {
            el.style[attr] = val;
            el.style.filter = "alpha(opacity=" + (val * 100) + ")";
        } else if (normalAttr.indexOf(attr) >= 0) {
            el.style[attr] = val + "px";
        } else if (attr === "zIndex") {
            el.style[attr] = Math.round(val).toString();
        } else {
            el.style[attr] = val;
        }
    }
}
