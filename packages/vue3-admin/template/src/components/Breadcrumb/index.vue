<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
                <span
                    v-if="item.redirect==='noRedirect'||index===levelList.length-1"
                    class="no-redirect"
                >
                    {{ item.meta.breadcrumb }}
                </span>
                <a v-else @click.prevent="handleLink(item)">{{ item.meta.breadcrumb }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup>
import {compile} from "path-to-regexp";
import {ref, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const levelList = ref([]);

const isDashboard = (r) => {
    const name = r && r.meta.breadcrumb;
    if (!name) {
        return false;
    }
    return name.trim().toLocaleLowerCase() === "主页".toLocaleLowerCase();
};

const pathCompile = (path) => {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const {params} = route;
    let toPath = compile(path);
    return toPath(params);
};

const handleLink = (item) => {
    const {redirect, path} = item;
    if (redirect) {
        router.push(redirect);
        return;
    }
    router.push(pathCompile(path));
};

watchEffect(() => {
    let matched = route.matched.filter(item => item.meta && item.meta.breadcrumb);
    const first = matched[0];

    // 判断第一个是否为首页，不是主页添加主页
    if (!isDashboard(first)) {
        matched = [{path: "/dashboard", meta: {breadcrumb: "主页"}}].concat(matched);
    }

    levelList.value = matched.filter((item) => item.meta && item.meta.breadcrumb !== false);
});

defineExpose({
    handleLink
});
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
        color: #97A8BE;
        cursor: text;
    }
}
</style>
