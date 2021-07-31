<template>
    <div class="body">
        <el-card class="custom-login-card">
            <div class="normal-title">
                <span>登录 / 注册</span>
            </div>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
                <el-form-item prop="phone">
                    <el-input placeholder="请输入手机号" v-model="loginForm.phone">
                        <template #suffix>
                            <i class="el-icon-user el-input__icon"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <send-sms-item v-model="loginForm.code" :phone-value="loginForm.phone" />
                </el-form-item>
                <el-form-item>
                    <div>
                        <el-button type="primary"
                                   :loading="loginBtnLoading"
                                   @click="handleLogin"
                        >
                            登录/注册
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";

import {responseErrorMessage} from "@/utils";
import SendSmsItem from "@/components/SendSmsItem";

const loginFormRules = {
    phone: [
        {required: true, message: "请输入手机号码", trigger: "blur"},
        {type: "string", pattern: /^\d{11}$/, message: "错误的手机号码", trigger: "blur"}
    ],
    code: [
        {required: true, message: "请输入短信验证码", trigger: "blur"},
        {len: 6, message: "请输入6位验证码", trigger: "blur"}
    ]
};

export default {
    name: "login",
    components: {
        SendSmsItem
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        const loginBtnLoading = ref(false);
        const loginFormRef = ref(null);
        const loginForm = ref({
            phone: null,
            code: null
        });
        const handleLogin = () => {
            if (loginBtnLoading.value === true) {
                return;
            }

            loginFormRef.value.validate((isValid) => {
                if (isValid) {
                    loginBtnLoading.value = true;
                    store.dispatch("auth/loginAsync", loginForm.value).then(() => {
                        if (route.query.next) {
                            router.replace(route.query.next);
                        } else {
                            router.replace("/");
                        }
                    }).catch((err) => {
                        responseErrorMessage(err, "登录失败");
                    }).finally(() => {
                        loginBtnLoading.value = false;
                    });
                } else {
                    return false;
                }
            });
        };

        return {
            loginBtnLoading,
            loginFormRef,
            loginForm,
            loginFormRules,
            handleLogin
        };
    }
};
</script>

<style lang="less" scoped>
@import "../../styles/var.less";

.body {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: url("../../assets/login_background.svg") no-repeat 0 0;
    background-size: cover;
}

.custom-login-card {
    width: 500px;
    margin: 100px auto;

    .normal-title {
        text-align: center;
        margin-top: 25px;
        margin-bottom: 40px;
        font-size: 24px;
        font-weight: 600;

        a, span {
            cursor: pointer;
            text-decoration: none;
            padding: 10px;
            color: #969696;

            &:first-child {
                border-bottom: 3px solid #999999;
            }
        }

        b {
            padding: 0 15px;
        }
    }

    .title {
        text-align: center;
        margin-bottom: 15px;
    }
}
</style>
