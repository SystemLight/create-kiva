import React from "react";
import {Link, history} from "umi";
import ProForm, {ProFormText, ProFormCaptcha} from "@ant-design/pro-form";

import styles from "./style.less";
import {Button, message} from "antd";

function Register() {
    const handleRegistry = () => {
        history.push("/user/register-result");
    };

    return (
        <div className={styles.main}>
            <h3>注册</h3>
            <ProForm size={"large"} submitter={false}>
                <ProFormText placeholder={"邮箱"} />
                <ProFormText.Password placeholder={"至少6位密码，区分大小写"} />
                <ProFormText.Password placeholder={"确认密码"} />
                <ProFormText placeholder={"手机号"} fieldProps={{addonBefore: "+86"}} />
                <ProFormCaptcha
                    placeholder={"验证码"}
                    onGetCaptcha={async () => {
                        message.success("验证码发送成功");
                    }}
                />
            </ProForm>
            <div>
                <Button size="large" className={styles.submit} type="primary" onClick={handleRegistry}>
                    注册
                </Button>
                <Link className={styles.login} to="/user/login">
                    使用已有账户登录
                </Link>
            </div>
        </div>
    );
}

export default Register;
