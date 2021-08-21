import {Notify} from "vant";

export const defaultAvatarURL = require("@/assets/logo.png");

export function omit(obj, fields) {
    let shallowCopy = {...obj};
    for (let i = 0; i < fields.length; i++) {
        let key = fields[i];
        delete shallowCopy[key];
    }
    return shallowCopy;
}

export function responseErrorMessage(err, defaultMsg) {
    if (err.response && err.response.data.msg) {
        Notify({type: "danger", message: err.response.data.msg});

    } else {
        Notify({type: "danger", message: defaultMsg});
    }
}

export function throttle(fn, wait) {
    let flag = false;
    return function(...args) {
        if (!flag) {
            flag = true;
            setTimeout(function() {
                fn(...args);
                flag = false;
            }, wait);
        }
    };
}

export function debounce(fn, wait) {
    let timer = null;
    return function(...args) {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            fn(...args);
        }, wait);
    };
}
