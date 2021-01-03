/**
 * 匀速
 * @param {number} t - 当前运动帧
 * @param {number} b - 开始运动值
 * @param {number} c - 总计运动偏移值
 * @param {number} d - 运动总帧数
 * @return {number} 当前运动偏移值
 */
export function linear(t: number, b: number, c: number, d: number) {
    return c * t / d + b;
}

/**
 * 加速曲线
 * @param {number} t - 当前运动帧
 * @param {number} b - 开始运动值
 * @param {number} c - 总计运动偏移值
 * @param {number} d - 运动总帧数
 * @return {number} 当前运动偏移值
 */
export function easeIn(t: number, b: number, c: number, d: number) {
    return c * (t /= d) * t + b;
}

/**
 * 减速曲线
 * @param {number} t - 当前运动帧
 * @param {number} b - 开始运动值
 * @param {number} c - 总计运动偏移值
 * @param {number} d - 运动总帧数
 * @return {number} 当前运动偏移值
 */
export function easeOut(t: number, b: number, c: number, d: number) {
    return -c * (t /= d) * (t - 2) + b;
}

/**
 * 加速减速曲线
 * @param {number} t - 当前运动帧
 * @param {number} b - 开始运动值
 * @param {number} c - 总计运动偏移值
 * @param {number} d - 运动总帧数
 * @return {number} 当前运动偏移值
 */
export function easeBoth(t: number, b: number, c: number, d: number) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
    }
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

/**
 * 加加速曲线
 * @param {number} t - 当前运动帧
 * @param {number} b - 开始运动值
 * @param {number} c - 总计运动偏移值
 * @param {number} d - 运动总帧数
 * @return {number} 当前运动偏移值
 */
export function easeInStrong(t: number, b: number, c: number, d: number) {
    return c * (t /= d) * t * t * t + b;
}

/**
 * 减减速曲线
 * @param {number} t - 当前运动帧
 * @param {number} b - 开始运动值
 * @param {number} c - 总计运动偏移值
 * @param {number} d - 运动总帧数
 * @return {number} 当前运动偏移值
 */
export function easeOutStrong(t: number, b: number, c: number, d: number) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

/**
 * 加加速减减速曲线
 * @param {number} t - 当前运动帧
 * @param {number} b - 开始运动值
 * @param {number} c - 总计运动偏移值
 * @param {number} d - 运动总帧数
 * @return {number} 当前运动偏移值
 */
export function easeBothStrong(t: number, b: number, c: number, d: number) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
    }
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

/**
 * 回退加速（回退渐入）
 * @param {number} t - 当前运动帧
 * @param {number} b - 开始运动值
 * @param {number} c - 总计运动偏移值
 * @param {number} d - 运动总帧数
 * @param {number} s - 回缩的距离
 * @return {number} 当前运动偏移值
 */
export function backIn(t: number, b: number, c: number, d: number, s?: number) {
    if (typeof s == "undefined") {
        s = 1.70158;
    }
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
}

/**
 * 回退加速（回退渐出）
 * @param {number} t - 当前运动帧
 * @param {number} b - 开始运动值
 * @param {number} c - 总计运动偏移值
 * @param {number} d - 运动总帧数
 * @param {number} s - 回缩的距离
 * @return {number} 当前运动偏移值
 */
export function backOut(t: number, b: number, c: number, d: number, s?: number) {
    if (typeof s == "undefined") {
        s = 1.70158;
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}

/**
 * 回退加速
 * @param {number} t - 当前运动帧
 * @param {number} b - 开始运动值
 * @param {number} c - 总计运动偏移值
 * @param {number} d - 运动总帧数
 * @param {number} s - 回缩的距离
 * @return {number} 当前运动偏移值
 */
export function backBoth(t: number, b: number, c: number, d: number, s?: number) {
    if (typeof s == "undefined") {
        s = 1.70158;
    }
    if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    }
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
}

/**
 * 弹球减振（弹球渐入）
 * @param {number} t - 当前运动帧
 * @param {number} b - 开始运动值
 * @param {number} c - 总计运动偏移值
 * @param {number} d - 运动总帧数
 * @return {number} 当前运动偏移值
 */
export function bounceIn(t: number, b: number, c: number, d: number) {
    return c - bounceOut(d - t, 0, c, d) + b;
}

/**
 * 弹球减振（弹球渐出）
 * @param {number} t - 当前运动帧
 * @param {number} b - 开始运动值
 * @param {number} c - 总计运动偏移值
 * @param {number} d - 运动总帧数
 * @return {number} 当前运动偏移值
 */
export function bounceOut(t: number, b: number, c: number, d: number) {
    if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
    } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
    }
    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
}

/**
 * 弹球减振
 * @param {number} t - 当前运动帧
 * @param {number} b - 开始运动值
 * @param {number} c - 总计运动偏移值
 * @param {number} d - 运动总帧数
 * @return {number} 当前运动偏移值
 */
export function bounceBoth(t: number, b: number, c: number, d: number) {
    if (t < d / 2) {
        return bounceIn(t * 2, 0, c, d) * 0.5 + b;
    }
    return bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
}

export default {
    linear,
    easeIn, easeOut, easeBoth,
    easeInStrong, easeOutStrong,
    backIn, backOut, backBoth,
    bounceIn, bounceOut, bounceBoth
};
