import settings from "@/config/settings";

const title = settings.title || "vue3-admin";

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`;
    }
    return `${title}`;
}
