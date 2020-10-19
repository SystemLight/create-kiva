import React, {memo} from "react";

export const MemoText = memo(function() {
    return (<div>永不更新</div>);
}, () => true);
