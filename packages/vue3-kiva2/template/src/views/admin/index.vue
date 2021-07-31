<template>
    <container :navbar="navbar">
        <template #menu-items>
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">内容1</el-menu-item>
            <el-menu-item index="3">内容2</el-menu-item>
        </template>
        <template #user-nav>
            <user-nav :user-info="userInfo" :is-login="false">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
            </user-nav>
        </template>
        <template #default>
            <router-view />
        </template>
        <template #footer-nav>
            <footer-text-nav>
                工单管理 ©2021-2030
            </footer-text-nav>
        </template>
    </container>
</template>

<script>
import {defaultAvatarURL} from "@/utils";
import Container from "@/components/Container/index.vue";
import UserNav from "@/components/Container/UserNav.vue";
import FooterTextNav from "@/components/Container/FooterTextNav.vue";

export default {
    name: "admin",
    components: {
        UserNav,
        FooterTextNav,
        Container
    },
    setup() {
        const userInfo = {
            name: "测试用户",
            avatar: defaultAvatarURL
        };

        const navbar = {
            icon: defaultAvatarURL,
            text: "测试标题"
        };

        return {
            navbar,
            userInfo,
            defaultAvatarURL
        };
    }
};
</script>
