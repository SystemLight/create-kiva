<template>
    <div>
        <div class="sidebar-logo-container">
            <router-link class="sidebar-logo-link" to="/">
                <img src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png" class="sidebar-logo"
                     alt="logo">
                <h1 class="sidebar-title">后台管理</h1>
            </router-link>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="route.meta&&route.meta.activeMenu"
                :unique-opened="false"
                :collapse-transition="false"
                background-color="#304156"
                text-color="#bfcbd9"
                active-text-color="#409EFF"
                mode="vertical"
            >
                <sidebar-menu-item />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script setup>
import SidebarMenuItem from "./SidebarMenuItem.vue";
import {useRouter, useRoute} from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<style lang="less" scoped>
.sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #2B2F3A;
    text-align: center;
    overflow: hidden;

    & .sidebar-logo-link {
        height: 100%;
        width: 100%;

        & .sidebar-logo {
            width: 32px;
            height: 32px;
            vertical-align: middle;
            margin-right: 12px;
        }

        & .sidebar-title {
            display: inline-block;
            margin: 0;
            color: #FFFFFF;
            font-weight: 600;
            line-height: 50px;
            font-size: 14px;
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            vertical-align: middle;
        }
    }
}

.scrollbar-wrapper {
    .el-menu {
        border-right: none;
    }
}
</style>
