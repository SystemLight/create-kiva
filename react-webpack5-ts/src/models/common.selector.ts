import {createSelector} from "reselect";

import {IStates} from "./index";

export const dataSelector = createSelector<IStates, IStates["common"], {date?: string}>(
    (states) => {
        return states.common;
    },
    (state) => {
        return {date: state.date};
    }
);
