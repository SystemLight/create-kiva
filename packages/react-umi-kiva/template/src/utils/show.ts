/**
 * 返回DOM结构，该DOM结构应当被应用到pre标签当中，并完善样式，
 * 该函数只负责生成高亮DOM结构
 * @param {Object | string} json
 * @return {string} result
 */
export function jsonHighlight(json: object | string) {
    if (typeof json !== "string") {
        json = JSON.stringify(json, undefined, 2);
    }

    json = json
        .replace(/&/g, "&")
        .replace(/</g, "<")
        .replace(/>/g, ">");

    return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function(match) {
            let cls = "number";
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = "key";
                } else {
                    cls = "string";
                }
            } else if (/true|false/.test(match)) {
                cls = "boolean";
            } else if (/null/.test(match)) {
                cls = "null";
            }
            return "<span class=\"" + cls + "\">" + match + "</span>";
        }
    );
}
