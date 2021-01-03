import styles from "./Welcome.less";

import React, {PropsWithChildren} from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Card, Alert, Typography} from "antd";

/**
 * 代码展示区域组件
 * @param {ReactNode} children
 * @return {ReactNode} vDom
 */
function CodePreview({children}: PropsWithChildren<any>) {
    return (
        <pre className={styles.pre}>
            <code>
                <Typography.Text copyable>{children}</Typography.Text>
            </code>
        </pre>
    );
}

/*
    欢迎页面
 */
function Welcome() {
    return (
        <PageContainer>
            <Card>
                <Alert
                    message={"更快更强的重型组件，已经发布。"}
                    type="success" showIcon banner
                    style={{margin: -12, marginBottom: 24}}
                />
                <Typography.Text strong>
                    内容管理{" "}
                    <a
                        href="https://www.baidu.com"
                        rel="noopener noreferrer"
                        target="__blank"
                    >
                        欢迎使用
                    </a>
                </Typography.Text>
                <CodePreview>yarn add @ant-design/pro-table</CodePreview>
                <Typography.Text strong style={{marginBottom: 12}}>
                    数据展示{" "}
                    <a
                        href="https://www.baidu.com"
                        rel="noopener noreferrer"
                        target="__blank"
                    >
                        欢迎使用
                    </a>
                </Typography.Text>
                <CodePreview>yarn add @ant-design/pro-layout</CodePreview>
            </Card>
        </PageContainer>
    );
}

export default Welcome;
