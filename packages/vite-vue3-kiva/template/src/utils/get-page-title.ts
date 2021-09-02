import defaultSettings from "../setting";

const title = defaultSettings.title || "后台管理";

export default function getPageTitle(pageTitle: string | null) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`;
    }
    return `${title}`;
}
