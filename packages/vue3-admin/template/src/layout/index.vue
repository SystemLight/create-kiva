<template>
    <el-container class="full-height">
        <sidebar-layout />
        <el-container direction="vertical">
            <header-layout />
            <main-layout />
            <footer-layout />
        </el-container>
    </el-container>
</template>

<script setup>
import HeaderLayout from "./components/HeaderLayout";
import SidebarLayout from "./components/SidebarLayout/index";
import FooterLayout from "./components/FooterLayout";
import MainLayout from "./components/MainLayout";
</script>
