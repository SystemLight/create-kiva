import React from "react";
import {Link} from "umi";
import {Result, Button} from "antd";

import styles from "./style.less";

const actions = (
    <div className={styles.actions}>
        <a>
            <Button size="large" type="primary">查看邮箱</Button>
        </a>
        <Link to="/">
            <Button size="large">返回首页</Button>
        </Link>
    </div>
);

function RegisterResult() {
    return (
        <Result
            className={styles.registerResult}
            status="success"
            title={
                <div className={styles.title}>
                    你的账户注册成功
                </div>
            }
            subTitle={"激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"}
            extra={actions}
        />
    );
}

export default RegisterResult;
