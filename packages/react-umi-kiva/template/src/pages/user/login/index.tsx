import React from "react";
import {Link} from "umi";
import {message, Checkbox, Tabs} from "antd";
import {FormInstance} from "antd/lib/form/Form";
import {MailTwoTone, MobileTwoTone, UserOutlined, LockTwoTone} from "@ant-design/icons";
import ProForm, {ProFormCaptcha, ProFormText} from "@ant-design/pro-form";
import {SubmitterProps} from "@ant-design/pro-form/lib/components/Submitter";

import styles from "./style.less";

const submitter: SubmitterProps<{form?: FormInstance;}> = {
    searchConfig: {submitText: "登录"},
    submitButtonProps: {size: "large", style: {width: "100%"}},
    render: (_, dom) => dom.pop()
};

/*
    手机号登陆组件
 */
function PhonePanel() {
    return (
        <>
            <ProFormText
                fieldProps={{size: "large", prefix: <MobileTwoTone />}}
                name="id" placeholder="请输入手机号"
            />
            <ProFormCaptcha
                fieldProps={{size: "large", prefix: <MailTwoTone />}}
                captchaProps={{size: "large"}}
                name="captcha" placeholder="请输入验证码"
                onGetCaptcha={async () => {
                    message.success("验证码发送成功!");
                }}
            />
        </>
    );
}

/*
    用户密码登陆组件
 */
function PasswordPanel() {
    return (
        <>
            <ProFormText
                fieldProps={{size: "large", prefix: <UserOutlined style={{color: "#1890FF"}} />}}
                name="user" placeholder="请输入用户名"
            />
            <ProFormText.Password
                fieldProps={{size: "large", prefix: <LockTwoTone />}}
                name="password" placeholder="请输入密码"
            />
        </>

    );
}

function Login() {
    return (
        <div className={styles.main}>
            <ProForm submitter={submitter}>
                <Tabs defaultActiveKey={"phone"}>
                    <Tabs.TabPane key={"password"} tab={"账号密码登陆"}>
                        <PhonePanel />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={"phone"} tab={"手机号登陆"}>
                        <PasswordPanel />
                    </Tabs.TabPane>
                </Tabs>
                <div style={{marginBottom: 15}}>
                    <Checkbox>自动登录</Checkbox>
                    <a style={{float: "right"}}>忘记密码</a>
                </div>
            </ProForm>
            <div style={{marginTop: 15}}>
                <Link className={styles.register} to="/user/register">注册账户</Link>
            </div>
        </div>
    );
}

export default Login;
