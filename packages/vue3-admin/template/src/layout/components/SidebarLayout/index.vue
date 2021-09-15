<template>
    <el-aside class="sidebar-container has-logo" :width="variables.sideBarWidth">
        <div class="sidebar-logo-container">
            <router-link key="collapse" class="sidebar-logo-link" to="/">
                <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                    alt="logo"
                    class="sidebar-logo"
                >
                <h1 class="sidebar-title">后台管理系统</h1>
            </router-link>
        </div>

        <el-scrollbar wrap-class="scrollbar-wrapper">
            <sidebar-menu />
        </el-scrollbar>
    </el-aside>
</template>

<script setup>
import variables from "../../../styles/variables.scss";
import SidebarMenu from "./Menu";
</script>

<style lang="scss" scoped>
@use "../../../styles/mixin";
@use "../../../styles/variables";

.sidebar-container {
    transition: width 0.28s;
    width: variables.$sideBarWidth;
    height: 100%;
    background-color: variables.$menuBg;
    overflow: hidden;

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

    ::v-deep(.el-scrollbar) {
        height: 100%;
    }

    &.has-logo {
        ::v-deep(.el-scrollbar) {
            height: calc(100% - 50px);
        }
    }

    ::v-deep(.scrollbar-wrapper) {
        overflow-x: hidden !important;

        a {
            display: inline-block;
            width: 100%;
            overflow: hidden;
        }

        .el-menu {
            border: none;
            height: 100%;
            width: 100%;
        }

        & .el-sub-menu .el-menu-item {
            min-width: variables.$sideBarWidth;
            background-color: variables.$subMenuBg !important;

            &:hover {
                background-color: variables.$subMenuHover !important;
            }
        }
    }
}
</style>
