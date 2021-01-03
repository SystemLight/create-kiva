import React, {useMemo} from "react";

import {jsonHighlight} from "@/utils";
import styles from "./style.less";

/**
 * JSON字符串高亮显示组件
 * @param {any} data
 * @return {React.ReactNode} vNode
 */
function JsonHighlight({data}: {data?: object | string}) {
    const showData = useMemo(() => {
        if (data) {
            return jsonHighlight(data);
        } else {
            return "";
        }
    }, [data]);

    return (<pre className={styles.highlight} dangerouslySetInnerHTML={{__html: showData}} />);
}

export default JsonHighlight;
