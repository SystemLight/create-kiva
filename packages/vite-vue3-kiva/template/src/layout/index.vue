<template>
    <div :class="classObj" class="app-wrapper">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        <sidebar class="sidebar-container" />
        <div class="main-container">
            <navbar />
            <app-main />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Navbar from "./components/Navbar.vue";
import AppMain from "./components/AppMain.vue";
import {computed} from "vue";
import {useStore} from "@/store";
import Sidebar from "./components/Sidebar/index.vue";

const store = useStore();
const device = computed(() => store.state.app.device);
const sidebar = computed(() => store.state.app.sidebar);
const classObj = computed(() => {
    return {
        hideSidebar: !store.state.app.sidebar.opened,
        openSidebar: store.state.app.sidebar.opened,
        withoutAnimation: store.state.app.sidebar.withoutAnimation,
        mobile: store.state.app.device === "mobile"
    };
});

const handleClickOutside = () => {
};

defineExpose({
    handleClickOutside
});
</script>

<style lang="less" scoped>
@import "../styles/mixin.less";
@import "../styles/var.less";

.app-wrapper {
    .clear_fix();

    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}

.drawer-bg {
    background: #000000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - @sideBarWidth);
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px)
}

.mobile .fixed-header {
    width: 100%;
}
</style>
