import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";

import {IDispatch, ITabs} from "kiva";
import {IStates} from "@/models";

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
        dispatch({type: "common/removeTabs", payload: key});
    };

    return [tabs, onTabRemove];
}

export function useTab(title: string) {
    const {pathname} = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: "common/addTabs", payload: {key: pathname, data: {title: title}}});
    }, []);
}
