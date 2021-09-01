<template>
    <div class="login-body">
        <div class="login-container">
            <div class="head">
                <img class="logo" src="/src/assets/logo.svg" alt="logo" />
                <div class="name">
                    <div class="title">清源</div>
                    <div class="tips">后台管理系统</div>
                </div>
            </div>
            <el-form label-position="top" :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%" type="primary" @click="submitForm">立即登录</el-button>
                </el-form-item>
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
import {reactive, ref} from "vue";

const ruleForm = reactive({});
const rules = ref([]);

const submitForm = () => {
    console.log("submitForm");
};

defineExpose({
    submitForm
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
</style>

<style>
.el-form--label-top .el-form-item__label {
    padding: 0;
}

.login-form .el-form-item {
    margin-bottom: 12px;
}
</style>
