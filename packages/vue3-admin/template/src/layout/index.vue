<template>
    <div class="app-wrapper">
        <sidebar class="sidebar-container" />
        <div class="main-container">
            <navbar />
            <app-main />
        </div>
    </div>
</template>

<script setup>
import Navbar from "./components/Navbar";
import AppMain from "./components/AppMain";
import Sidebar from "./components/Sidebar";
</script>

<style lang="less" scoped>
@import "../styles/variables.less";
@import "../styles/mixin.less";

.app-wrapper {
    .clear_fix();

    position: relative;
    height: 100%;
    width: 100%;

    .sidebar-container {
        transition: width 0.28s;
        width: @side-bar-width !important;
        background-color: @menu-bg;
        height: 100%;
        position: fixed;
        font-size: 0;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
    }

    .main-container {
        min-height: 100%;
        transition: margin-left .28s;
        margin-left: @side-bar-width;
        position: relative;
    }
}
</style>
