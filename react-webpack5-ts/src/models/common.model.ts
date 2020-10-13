import {ISoulModel, ISoulDispatch} from "@c/utils/soul";

export interface ICommonState {
    date?: string,
}

export type ICommonDispatch = ISoulDispatch<ICommonState>;

/*
    ISoulModel看起来像dvaJS，区别是异步采用的不是redux-saga而是redux-thunk，
    所以异步Action要写到model之外，在派发阶段调用
 */
const commonModel: ISoulModel<ICommonState> = {
    namespace: "common",
    states: {},
    mutation: {
        setDate(state) {
            return {...state, date: new Date().toString()};
        }
    }
};

export function asyncSetDate(dispatch: ICommonDispatch) {
    setTimeout(() => {
        dispatch({type: "common/setDate"});
    }, 3000);
}

export default commonModel;
