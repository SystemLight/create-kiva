<template>
    <el-dropdown trigger="click" v-if="isLogin">
        <template #default>
            <div class="avatar">
                <div class="avatar-icon">
                    <img
                        :src="userInfo.avatar || defaultAvatarURL"
                        alt="avatar"
                    >
                </div>
                <span class="avatar-text">{{ userInfo.name }}</span>
            </div>
        </template>
        <template #dropdown>
            <el-dropdown-menu>
                <slot />
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <div class="login" v-else>
        <span class="custom-text-btn" @click="$router.push('/login')">登录</span>
    </div>
</template>

<script>
import {defaultAvatarURL} from "@/utils";

export default {
    name: "UserNavIcon",
    props: [
        "isLogin",
        "userInfo"
    ],
    setup() {
        return {
            defaultAvatarURL
        };
    }
};
</script>

<style lang="less" scoped>
@import "../../styles/var.less";

.avatar {
    cursor: pointer;
    display: flex;
    align-items: center;

    .avatar-icon {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        overflow: hidden;

        img {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
    }

    .avatar-text {
        margin-left: 5px;
        font-size: 15px;
        color: @color-text-2;
    }
}

.login {
    cursor: pointer;
}
</style>
