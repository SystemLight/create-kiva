import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";

import {IDispatch, ITabs} from "kiva";
import types from "@/models/common/types";
import {IStates} from "@/models";

/**
 * 注册动态Tabs到组件中
 * @param {string} pathname
 * @return {any}
 */
export function useTabs(pathname: string): [ITabs, (key: string) => void] {
    const history = useHistory();
    const tabs = useSelector<IStates, ITabs>((state) => state.common.tabs);
    const dispatch = useDispatch<IDispatch>();

    const onTabRemove = (key: string) => {
        if (key === pathname) {
            const keys = Object.keys(tabs);
            const index = keys.indexOf(pathname) - 1;
            if (index > -1) {
                history.replace(keys[index]);
            } else {
                history.replace("/");
            }
        }
        dispatch({type: types.COMMON_REMOVE_TABS, payload: key});
    };

    return [tabs, onTabRemove];
}

/**
 * 通知redux进行tabs更新
 * @param {string} title
 */
export function useTab(title: string) {
    const {pathname} = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: types.COMMON_ADD_TABS, payload: {key: pathname, data: {title: title}}});
    }, []);
}
