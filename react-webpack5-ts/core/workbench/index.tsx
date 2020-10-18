import React, {ComponentType, useState, DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";
import {Link} from "react-router-dom";
import {Layout} from "antd";
import {MenuFoldOutlined} from "@ant-design/icons";
import styled from "styled-components";

const {Sider, Header, Footer, Content} = Layout;

export interface IWorkbenchProps {
    children: ReactNode,
    topBar?: ReactNode,
    breadcrumb?: ReactNode,
    menus: ReactNode,
    footer?: ReactNode,
    logoUrl: string,
}

export interface IPseudoSiderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    siderWidth: number
}

export const WorkbenchLayout = styled(Layout)`
    min-height: 100vh;

    .logo {
        height: 45px;
        background: url("${({$logoUrl}: {$logoUrl: string}) => $logoUrl}") no-repeat 30% 0;
        background-size: auto 100%;
        margin: 15px;
    }

    .sider-fixed {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        height: 100%;
        overflow: auto;
        overflow-x: hidden;
        box-shadow: 2px 0 8px 0 rgba(29, 35, 41, .05);

        .ant-layout-sider-children {
          display: flex;
          flex-direction: column;
          height: 100%;

          & ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }

          & ::-webkit-scrollbar-thumb {
            background: hsla(0, 0%, 100%, .15);
            border-radius: 3px;
            -webkit-box-shadow: inset 0 0 5px rgba(37, 37, 37, .05);
          }

          & ::-webkit-scrollbar-track {
            background: hsla(0, 0%, 100%, .15);
            border-radius: 3px;
            -webkit-box-shadow: inset 0 0 5px rgba(37, 37, 37, .05);
          }
        }
    }

    .site-layout-header {
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
        height: 48px;
        line-height: 48px;

        & > .header-wrap {
          display: flex;
          padding: 0 16px;

          .header-placeholder {
            flex: 1 1 0;
          }
        }
    }

  .site-layout-background {
    background: #FFFFFF;
  }
`;

const PseudoSider: ComponentType<IPseudoSiderProps> = styled.div`
    overflow: hidden;
    width: ${(props: IPseudoSiderProps) => props.siderWidth}px;
    max-width: ${(props) => props.siderWidth}px;
    min-width:${(props) => props.siderWidth}px;
    flex: 0 0 ${(props) => props.siderWidth}px;
`;

/*
    中后台布局应用组件
 */
export function Workbench({logoUrl, breadcrumb, menus, topBar, children, footer}: IWorkbenchProps) {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <WorkbenchLayout $logoUrl={logoUrl}>
            <PseudoSider siderWidth={collapsed ? 80 : 200} />
            <Sider
                collapsible={true} collapsed={collapsed} onCollapse={(collapsed) => setCollapsed(collapsed)}
                trigger={<MenuFoldOutlined />} className={"sider-fixed"} collapsedWidth={80}
            >
                <Link to="/">
                    <div className="logo" style={{
                        backgroundPositionX: collapsed ? 4 : "30%"
                    }} />
                </Link>
                <div style={{flex: "1 1 0", overflow: "hidden auto"}}>{menus}</div>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background site-layout-header" style={{padding: 0}}>
                    <div className={"header-wrap"}>
                        <div className={"header-placeholder"} />
                        {topBar}
                    </div>
                </Header>
                <Content style={{margin: "0 16px"}}>
                    {breadcrumb}
                    <div className="site-layout-background" style={{minHeight: 380}}>
                        {children}
                    </div>
                </Content>
                <Footer style={{textAlign: "center"}}>{footer}</Footer>
            </Layout>
        </WorkbenchLayout>
    );
}

export * from "./breadcrumb";
export * from "./menus";
export * from "./interface";
