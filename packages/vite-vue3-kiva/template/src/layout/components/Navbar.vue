<template>
    <div class="navbar">
        <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>

        <div class="right-menu">
            <el-dropdown trigger="click">
                <div class="avatar-container right-menu-item hover-effect ">
                    <div class="avatar-wrapper">
                        <img
                            :src="avatar"
                            class="user-avatar"
                            alt="avatar"
                        >
                        <i class="el-icon-caret-bottom"/>
                    </div>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <span style="display:block;">登出</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import {useStore} from "@/store";
import {computed} from "vue";

const store = useStore();
const avatar = computed(() => store.state.user.avatar);
</script>

<style lang="less" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #FFFFFF;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, .025)
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5A5E66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background .3s;

                &:hover {
                    background: rgba(0, 0, 0, .025)
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
