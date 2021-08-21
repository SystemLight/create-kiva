<template>
    <div class="home-wrap">
        <h1 class="home-title">vue3-mobile-kiva2</h1>
        <h2 class="home-title_desc">组件演示</h2>
        <link-list :items="items" />
    </div>
</template>

<script>
import {reactive} from "vue";

import LinkList from "@/components/LinkList.vue";

export default {
    name: "home",
    components: {
        LinkList
    },
    setup() {
        const items = reactive([
            {
                text: "音频组件",
                href: "/music-play-demo"
            }
        ]);

        return {
            items
        };
    }
};
</script>

<style lang="less" scoped>
.home-wrap {
    padding: 45px 30px;

    .home-title {
        font-size: 32px;
        color: #323233;
        margin-bottom: 16px;
    }

    .home-title_desc {
        margin: 0 0 40px;
        color: rgba(69, 90, 100, 0.6);
        font-size: 14px;
    }
}
</style>
