import React, {PropsWithChildren} from "react";
import {SelectLang, Link} from "umi";
import {DefaultFooter} from "@ant-design/pro-layout";
import {FooterProps} from "@ant-design/pro-layout/lib/Footer";
import {GithubOutlined} from "@ant-design/icons";

import logo from "@/assets/logo.svg";
import styles from "./style.less";

const copyRight: FooterProps = {
    copyright: "2020 后台管理系统",
    links: [
        {
            key: "baidu",
            title: "百度一下",
            href: "https://www.baidu.com",
            blankTarget: true
        },
        {
            key: "github",
            title: <GithubOutlined />,
            href: "https://github.com/ant-design/ant-design-pro",
            blankTarget: true
        },
        {
            key: "Ant Design",
            title: "Ant Design",
            href: "https://ant.design",
            blankTarget: true
        }
    ]
};

function UserLayout({children}: PropsWithChildren<any>) {
    return (
        <div className={styles.container}>
            <div className={styles.lang}>
                <SelectLang />
            </div>
            <div className={styles.content}>
                <div className={styles.top}>
                    <div className={styles.header}>
                        <Link to="/">
                            <img alt="logo" className={styles.logo} src={logo} />
                            <span className={styles.title}>登陆系统</span>
                        </Link>
                    </div>
                    <div className={styles.desc}>
                        欢迎登陆后台管理系统
                    </div>
                </div>
                {children}
            </div>
            <DefaultFooter {...copyRight} />
        </div>
    );
}

export default UserLayout;
