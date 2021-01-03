import React from "react";
import {Dropdown, Menu, Spin, Tooltip, Avatar} from "antd";
import {LogoutOutlined, QuestionCircleOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Settings as ProSettings} from "@ant-design/pro-layout";
import {ConnectProps, SelectLang, history} from "umi";

import styles from "./style.less";
import HeaderSearch from "./HeaderSearch";

export interface GlobalHeaderRightProps extends Partial<ConnectProps>, Partial<ProSettings> {
    theme?: ProSettings["navTheme"] | "realDark";
}

const currentUser = {
    name: "SystemLight",
    avatar: "https://pic4.zhimg.com/v2-bd8ac878e4886e6e41c8accd0b10625f_is.jpg"
};

/*
    用户头像下拉选项
 */
const menuHeaderDropdown = (
    <Menu selectedKeys={[]}>
        <Menu.Item key="center">
            <UserOutlined />个人中心
        </Menu.Item>
        <Menu.Item key="settings">
            <SettingOutlined />个人设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={() => history.push("/user")}>
            <LogoutOutlined />退出登录
        </Menu.Item>
    </Menu>
);

/*
    用户头像
 */
function AvatarDropdown() {
    return currentUser && currentUser.name ? (
        <Dropdown overlayClassName={styles.container} overlay={menuHeaderDropdown}>
            <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
                <span>{currentUser.name}</span>
            </span>
        </Dropdown>
    ) : (
        <span className={`${styles.action} ${styles.account}`}>
            <Spin size="small" style={{marginLeft: 8, marginRight: 8}} />
        </span>
    );
}

/*
    全局基础布局，右边菜单栏
 */
function RightContent(props: GlobalHeaderRightProps) {
    const {theme, layout} = props;
    let className = styles.right;

    if (theme === "dark" && layout === "top") {
        className = `${styles.right}  ${styles.dark}`;
    }

    return (
        <div className={className}>
            <HeaderSearch className={`${styles.action} ${styles.search}`} placeholder="站内搜索" options={[]} />
            <Tooltip title="使用文档">
                <a
                    style={{color: "inherit"}}
                    target="_blank"
                    href="https://www.baidu.com"
                    rel="noopener noreferrer"
                    className={styles.action}
                >
                    <QuestionCircleOutlined />
                </a>
            </Tooltip>
            <AvatarDropdown />
            <SelectLang className={styles.action} />
        </div>
    );
}

export default RightContent;
