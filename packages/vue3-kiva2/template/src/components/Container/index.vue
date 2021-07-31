<template>
    <div class="container">
        <div class="header">
            <div class="wrap">
                <div class="navbar">
                    <div class="navbar-brand" @click="$router.push('/')">
                        <div class="navbar-icon">
                            <img :src="navbar.icon" alt="navbar">
                        </div>
                        <span class="navbar-text">{{ navbar.text }}</span>
                    </div>
                    <div class="navbar-menu">
                        <el-menu class="custom-header-menu" :default-active="activeName" mode="horizontal">
                            <slot name="menu-items" />
                        </el-menu>
                    </div>
                </div>
                <div class="user-bar">
                    <slot name="user-nav" />
                </div>
            </div>
        </div>
        <div class="main">
            <div class="wrap">
                <div class="content">
                    <slot name="default" />
                </div>
            </div>
        </div>
        <div class="footer">
            <slot name="footer-nav" />
        </div>
    </div>
</template>

<script>
import {useRoute} from "vue-router";
import {computed} from "vue";

export default {
    name: "Container",
    props: [
        "navbar"
    ],
    setup() {
        const route = useRoute();

        return {
            activeName: computed(() => route.name)
        };
    }
};
</script>

<style lang="less" scoped>
@import "../../styles/var.less";
@import "../../styles/mixin.less";

.container {
    background-color: @color-shallow-grey;
    min-width: 1080px;

    .wrap {
        width: @container-size;
        margin: 0 auto;
    }

    .header {
        height: 50px;
        padding: 0;
        background-color: #FFFFFF;
        box-shadow: 0 2px 3px rgb(0 0 0 / 4%);

        .wrap {
            .clear_fix();

            .navbar {
                float: left;
                display: flex;
                justify-content: flex-start;

                .navbar-brand {
                    padding: 5px;
                    display: flex;
                    margin-right: 20px;
                    cursor: pointer;
                    height: 50px;
                    box-sizing: border-box;
                    align-items: center;

                    .navbar-icon {
                        height: 100%;
                        overflow: hidden;

                        img {
                            height: 100%;
                            width: auto;
                        }
                    }

                    .navbar-text {
                        margin-left: 5px;
                        font-size: @font-size-2;
                        font-weight: 600;
                        color: #E2675C;
                    }
                }

                .navbar-menu {
                    .custom-header-menu {
                        ::v-deep(.el-menu-item,.el-submenu,.el-submenu > .el-submenu__title) {
                            height: 50px;
                            line-height: 50px;
                        }
                    }
                }
            }

            .user-bar {
                margin-right: 35px;
                float: right;
                display: flex;
                align-items: center;
                height: 50px;
            }
        }
    }

    .main {
        padding: 0;
        min-height: calc(100vh - 151px);

        .content {
            padding: 15px;
        }
    }

    .footer {
        height: 50px;
        margin-top: 50px;
        background-color: #FFFFFF;
        border-top: 1px solid #D6D6D6;
    }
}
</style>
