import {ISoulModel, ISoulDispatch} from "@c/soul";
import {createSelector} from "reselect";

import {IStates} from "@/models";

export interface ICommonState {
    $example: string,
    hello?: boolean
}

export type ICommonDispatch = ISoulDispatch<ICommonState>;

const commonModel: ISoulModel<ICommonState> = {
    namespace: "common",
    state: {
        $example: ""
    },
    mutation: {
        saveDate2Example(state, action) {
            state.$example = new Date().toString();
            return {$example: new Date().toString()};
        }
    },
    immer: {}
};

export const exampleSelector = createSelector<IStates, ICommonState, string>(
    (states) => {
        return states.common;
    },
    (state) => {
        return state.$example;
    }
);

export function asyncSetDate(dispatch: ICommonDispatch) {
    setTimeout(function() {
        dispatch({type: "common/saveDate2Example"});
    }, 3000);
}

export default commonModel;
