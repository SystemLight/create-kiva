<template>
    <el-header class="header">

        <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="right-menu">
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <img
                        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                        alt="avatar"
                        class="user-avatar"
                    >
                </div>

                <template #dropdown>
                    <el-dropdown-menu slot="dropdown">
                        <router-link to="/">
                            <el-dropdown-item>应用面板</el-dropdown-item>
                        </router-link>
                        <router-link to="/">
                            <el-dropdown-item>个人信息</el-dropdown-item>
                        </router-link>
                        <a target="_blank" href="https://github.com/SystemLight">
                            <el-dropdown-item>Github</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided>
                            <span style="display:block;">登出</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<style lang="scss" scoped>
@use "../../styles/mixin";

.header {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #FFFFFF;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    @include mixin.clearfix();

    .breadcrumb {
        line-height: 50px;
        float: left;
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
            }
        }
    }
}
</style>
