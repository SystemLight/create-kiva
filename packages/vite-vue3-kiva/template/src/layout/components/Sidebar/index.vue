<template>
    <div class="has-logo">
        <logo :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :unique-opened="false"
                :collapse-transition="false"
                background-color="#304156"
                text-color="#bfcbd9"
                active-text-color="#409EFF"
                mode="vertical"
            >
                <sidebar-men-item />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import {computed, ref, onMounted} from "vue";
import {useStore} from "@/store";
import {useRoute} from "vue-router";
import Logo from "./Logo.vue";
import SidebarMenItem from "./SidebarMenItem.vue";

const route = useRoute();
const store = useStore();
const isCollapse = computed(() => {
    return !store.state.app.sidebar.opened;
});
const activeMenu = computed(() => {
    return route.meta.activeMenu;
});
</script>
