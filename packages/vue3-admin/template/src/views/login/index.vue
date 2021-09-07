<template>
    <div class="login-container">
        <el-form
            ref="formRef"
            :model="form"
            :rules="formRules"
            class="login-form"
            autocomplete="off"
            label-position="left"
        >

            <div class="title-container">
                <h3 class="title">登录</h3>
            </div>

            <el-form-item prop="username">
                <el-input
                    v-model="form.username"
                    placeholder="填写用户名"
                    name="username"
                    type="text"
                    autocomplete="off"
                />
            </el-form-item>

            <el-form-item prop="password">
                <el-input
                    v-model="form.password"
                    type="password"
                    placeholder="填写密码"
                    name="password"
                    autocomplete="off"
                />
            </el-form-item>

            <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script setup>
import {ref, reactive} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useStore();
// 参考：https://github.com/yiminghe/async-validator#usage
const formRules = {
    username: [
        {required: true, trigger: "blur", message: "用户名是必须的"}
    ],
    password: [
        {required: true, trigger: "blur", message: "密码是必须的"}
    ]
};
const formRef = ref();
const form = reactive({
    username: "",
    password: ""
});

const handleLogin = () => {
    formRef.value.validate((isValidate, message) => {
        if (isValidate) {
            store.dispatch("user/login", form).then(() => {
                const redirect = route.query["redirect"];
                if (redirect) {
                    router.replace(redirect);
                } else {
                    router.replace("/");
                }
            });
        }
    });
};

defineExpose({
    handleLogin
});
</script>

<style lang="less" scoped>
@bg: #2D3A4B;
@dark_gray: #889AA4;
@light_gray: #EEEEEE;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: @bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                color: @light_gray;
                margin: 0 auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }

        .login-btn {
            width: 100%;
            margin-bottom: 30px;
        }
    }
}
</style>
