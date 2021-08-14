import {ElMessage} from "element-plus";

export const defaultAvatarURL = require("@/assets/logo.png").default;

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
        ElMessage({
            type: "error",
            showClose: true,
            message: err.response.data.msg
        });
    } else {
        ElMessage({
            type: "error",
            showClose: true,
            message: defaultMsg
        });
    }
}
