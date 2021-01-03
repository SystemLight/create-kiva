import {ITweenOptions, IHTMLTweenElement} from "./interface";
import {css, setTransform} from "./utils";
import motion from "./motion";

/**
 * JS补间动画支持库
 * @param {ITweenOptions} options
 */
export function tween(options: ITweenOptions) {
    const el = options.el;
    const attr = options.attr;
    const fx = options.fx || "linear";
    const duration = options.duration || 400;

    if (el.animationTimer) {
        return;
    }

    let t = 0;// 当前行驶帧数
    const b = {}; // 开始位置
    const c = {}; // 总帧数

    let maxC = 0;
    for (const s in attr) {
        if (attr.hasOwnProperty(s)) {
            b[s] = css(el, s);
            c[s] = attr[s] - b[s];
            maxC = Math.max(maxC, Math.abs(c[s]));
        }
    }

    const d = Math.ceil(duration / (1000 / 60)); // 总帧数

    function move() {
        el.animationTimer = requestAnimationFrame(function() {
            t++;
            if (t > d) {
                el.animationTimer = 0;
                options.onStop && options.onStop();
            } else {
                for (const s in attr) {
                    if (attr.hasOwnProperty(s)) {
                        css(el, s, motion[fx](t, b[s], c[s], d));
                        options.onMove && options.onMove();
                    }
                }
                move();
            }
        });
    }

    move();
}

function stop(el: IHTMLTweenElement) {
    if (el.animationTimer) {
        cancelAnimationFrame(el.animationTimer);
    }
    el.animationTimer = 0;
}

tween.stop = stop;
tween.css = css;
tween.setTransform = setTransform;
