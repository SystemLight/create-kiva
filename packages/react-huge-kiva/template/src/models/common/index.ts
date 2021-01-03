import {ISoulModel, ITabs} from "kiva";

// 注意：如果启用约定状态自注册插件，命名需要满足以下规则
const commonModel: ISoulModel<ICommonState> = {
    namespace: "common",
    state: {
        tabs: {}
    },
    mutation: {
        addTabs(state, action: {type: string, payload?: {key: string, data: any}}) {
            if (action.payload) {
                const {tabs} = state;
                const {payload: {key, data}} = action;
                const tabItem = tabs[key];
                if (!tabItem) {
                    state.tabs = {...tabs, [key]: data};
                }
            }
            return state;
        },
        removeTabs(state, action: {payload?: string}) {
            const {payload} = action;
            if (payload) {
                delete state.tabs[payload];
                state.tabs = {...state.tabs};
            }
            return state;
        }
    }
};

export interface ICommonState {
    tabs: ITabs
}

export default commonModel;
