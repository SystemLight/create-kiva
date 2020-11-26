import {createAccessModel} from "kiva";

// 创建accessModel数据状态模型，配合access组件进行访问鉴权
const accessModel = createAccessModel({
    login: false
});

accessModel.mutation = {
    setLogin(state) {
        return {...state, login: true};
    }
};

export type IAccessState = typeof accessModel.state;

export default accessModel;
