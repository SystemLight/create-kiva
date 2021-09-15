<template>
    <div class="errpage-container">
        <el-button
            icon="el-icon-arrow-left"
            class="pan-back-btn"
            @click="back"
        >
            返回
        </el-button>
        <el-row>
            <el-col :span="12">
                <h1 class="text-jumbo">
                    Oops!
                </h1>
                gif来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a> 页面
                <h2>你没有权限去该页面</h2>
                <h6>如有不满请联系你领导</h6>
                <ul class="list-unstyled">
                    <li>或者你可以去:</li>
                    <li class="link-type">
                        <router-link to="/dashboard">
                            回首页
                        </router-link>
                    </li>
                    <li class="link-type">
                        <a href="https://www.taobao.com/">随便看看</a>
                    </li>
                </ul>
            </el-col>
            <el-col :span="12">
                <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import {useRouter, useRoute} from "vue-router";
import errGif from "@/assets/401_images/401.gif";

const router = useRouter();
const route = useRoute();

const back = () => {
    if (route.query.noGoBack) {
        router.push({path: "/dashboard"});
    } else {
        router.go(-1);
    }
};

defineExpose({
    back
});
</script>

<style lang="scss" scoped>
.errpage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;

    .pan-back-btn {
        background: #008489;
        color: #FFFFFF;
        border: none !important;
    }

    .text-jumbo {
        font-size: 60px;
        font-weight: 700;
        color: #484848;
    }

    .list-unstyled {
        font-size: 14px;

        li {
            padding-bottom: 5px;
        }

        a {
            color: #008489;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>
