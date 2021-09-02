<template>
    <div class="login-body">
        <div class="login-container">
            <div class="head">
                <img class="logo" src="/src/assets/logo.svg" alt="logo" />
                <div class="name">
                    <div class="title">后台</div>
                    <div class="tips">后台管理系统</div>
                </div>
            </div>
            <el-form label-position="top" :rules="loginFormRules" :model="loginForm" ref="loginFormRef"
                     class="login-form">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model.trim="loginForm.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model.trim="loginForm.password" autocomplete="off" />
                </el-form-item>
                <el-button class="mt-3" style="width: 100%" type="primary" @click="handleSubmit">立即登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton
} from "element-plus";
import {Rules} from "async-validator";
import {reactive, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useStore} from "@/store";

const route = useRoute();
const router = useRouter();
const store = useStore();
const loginFormRef = ref();
const loginForm = reactive({});
const loginFormRules = reactive<Rules>({
    username: [
        {required: true, message: "填写用户名"}
    ],
    password: [
        {required: true, message: "填写密码"}
    ]
});

const handleSubmit = () => {
    loginFormRef.value.validate((isValidate: boolean, msg) => {
        if (isValidate) {
            store.dispatch("user/login", loginForm).then(() => {
                if (route.query["redirect"]) {
                    router.replace({path: route.query["redirect"]});
                }
            });
        }
    });
};

defineExpose({
    handleSubmit
});
</script>

<style scoped>
.login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #FFFFFF;
    /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
}

.login-container {
    width: 420px;
    height: 500px;
    background-color: #FFFFFF;
    border-radius: 4px;
    box-shadow: 0 21px 41px 0 rgba(0, 0, 0, 0.2);
}

.head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
}

.head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
}

.head .title {
    font-size: 28px;
    color: #1BAEAE;
    font-weight: bold;
}

.head .tips {
    font-size: 12px;
    color: #999999;
}

.login-form {
    width: 70%;
    margin: 0 auto;
}

::v-deep(.el-form--label-top .el-form-item__label) {
    padding: 0;
}

.login-form ::v-deep(.el-form-item) {
    margin-bottom: 12px;
}
</style>
