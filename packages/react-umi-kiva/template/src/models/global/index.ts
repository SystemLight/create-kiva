import {IDvaModel} from "@/interface/model";

const GlobalModel: IDvaModel<IGlobalState> = {
    namespace: "global",
    state: {
        name: "SystemLight"
    },
    reducers: {
        save(state, action) {
            return {...state, ...action.payload};
        }
    },
    effects: {},
    subscriptions: {}
};

export interface IGlobalState {
    name: string;
}

export default GlobalModel;
