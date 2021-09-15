<template>
    <el-menu
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :default-active="active"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
    >

        <router-link to="/dashboard">
            <el-menu-item index="/dashboard">主页</el-menu-item>
        </router-link>

        <el-sub-menu index="trial">
            <template #title>
                <span>测试</span>
            </template>
            <router-link to="/trial/transition">
                <el-menu-item index="/trial/transition">transition</el-menu-item>
            </router-link>
        </el-sub-menu>

    </el-menu>
</template>

<script setup>
import variables from "../../../styles/variables.scss";
import {computed} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const active = computed(() => route.path);
</script>
