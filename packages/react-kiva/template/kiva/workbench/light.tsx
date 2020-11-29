import React, {memo, useMemo, useState} from "react";
import {Layout, Breadcrumb, Menu, Tabs} from "antd";
import {TabsProps} from "antd/es/tabs";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useLocation, useHistory, Link} from "react-router-dom";
import styled from "styled-components";

import {IBreadcrumbProps, IMenusProps, IWorkbenchProps} from "./interface";
import {getMenuItem} from "./utils";

const {Header, Content, Sider} = Layout;
const {TabPane} = Tabs;

const LightHeader = styled(Header)`
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 50px;
    padding: 0;
    background-color: #03A9F4;
    display: flex;

    .kiva-header__left{
        flex-shrink:0;

        .kiva-logo-section{
            float: left;
            box-shadow: 0 0 4px rgba(0,0,0,.26), 0 -1px 0 rgba(0,0,0,.02);
            padding-right: 5px;

            .kiva-logo{
                float: left;
                width: 40px;
                height: 40px;
                margin: 5px 11px;
            }

            .kiva-title{
                vertical-align: baseline;
                float: left;
                font-size: 20px;
                color: #FFFFFF;
                line-height: 50px;
            }
        }

        .kiva-toggle-btn{
            cursor: pointer;
            float: left;
            font-size: 20px;
            color: #FFFFFF;
            line-height: 50px;
            width: 50px;
            text-align: center;
        }

        & > .ant-breadcrumb{
            float: left;
            line-height: 50px;
            height: 50px;

            & > span:first-child>.ant-breadcrumb-link{
              font-weight: 600;
            }

            .ant-breadcrumb-link{
              color: #FFFFFF;
            }

            .ant-breadcrumb-separator{
              color: #FFFFFF;
            }
        }
    }

    .kiva-header__right{
        flex-grow:1;
        color: #FFFFFF;

        & > .ant-btn-group{
            float: right;

            .ant-btn.ant-btn-text{
                height: 50px;
                color: #FFFFFF;
                padding: 0 10px;
            }
        }
    }
`;

const LightPanel = styled(Layout)`
  height: 100vh;
  padding-top: 50px;

  & > .ant-layout-sider{
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: hsla(0,7%,9%,0.15);
      border-radius: 3px;
      -webkit-box-shadow: inset 0 0 5px rgba(37, 37, 37, .05);
    }

    &::-webkit-scrollbar-track {
      background: hsla(0, 0%, 100%, .15);
      border-radius: 3px;
      -webkit-box-shadow: inset 0 0 5px rgba(37, 37, 37, .05);
    }

  }

  .ant-layout-content.kiva-light{
    background-color: #F0F0F0;
    display: flex;
    flex-direction: column;

    & > .ant-tabs{
      .ant-tabs-nav{
        margin: 0;

        .ant-tabs-nav-wrap{
          padding: 4px 6px;
          background-color: #EBF1F6;
        }

        .ant-tabs-tab{
          color: #909399;
        }
      }
    }

    .kiva-content{
      height: 100%;
      flex-grow: 1;
      padding: 5px;
      background-color: #F0F0F0;
      overflow: hidden;

      & > .ant-card{
        height: 100%;
        display: flex;
        flex-direction: column;

        & > .ant-card-body{
          padding: 8px 12px;
          overflow-y: auto;
          flex-grow: 1;
        }
      }
    }
  }
`;

export const LightBreadcrumb = memo(function({items}: IBreadcrumbProps) {
    return (
        <Breadcrumb>
            {
                items.map((v, i) => (
                    <Breadcrumb.Item key={v.key}>{v.title}</Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
    );
}, (oldProps, newProps) => {
    return oldProps.items === newProps.items;
});

export const LightMenus = memo(function({navs}: IMenusProps) {
    const {pathname} = useLocation();
    const pathnameList = pathname.split("/");

    const items = useMemo(() => {
        return navs.map((v, i) => v.items ? (
            <Menu.SubMenu key={v.key} title={v.title} icon={v.icon}>
                {v.items.map((c, ci) => getMenuItem(c, ci, `/${v.path || v.key}/${c.key}`))}
            </Menu.SubMenu>
        ) : getMenuItem(v, i, `/${v.key}`));
    }, [navs]);

    return (
        <Menu
            defaultOpenKeys={pathnameList} selectedKeys={pathnameList}
            mode={"inline"} style={{height: "100%", borderRight: 0}}
        >
            {items}
        </Menu>
    );
}, (oldProps, newProps) => {
    return oldProps.navs === newProps.navs;
});

/*
    明亮系风格后台管理外层结构组件
 */
export function LightWorkbench({logoUrl, title, breadcrumb, menus, children, topBar, tabs = {}, onTabRemove}: IWorkbenchProps) {
    const [collapsed, setCollapsed] = useState(false);
    const {pathname} = useLocation();
    const history = useHistory();

    const handleSwitchRoute = (activeKey: string) => {
        history.push(activeKey);
    };

    const handleEditTabs: TabsProps["onEdit"] = (e, action) => {
        onTabRemove && onTabRemove(e as string);
    };

    return (
        <Layout>
            <LightHeader>
                <div className={"kiva-header__left"}>
                    <Link to="/">
                        <div className={"kiva-logo-section"}>
                            <div className={"kiva-logo"} style={{background: `url("${logoUrl}")`}} />
                            <div className={"kiva-title"}>{title}</div>
                        </div>
                    </Link>
                    <div className={"kiva-toggle-btn"} onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </div>
                    {breadcrumb}
                </div>
                <div className={"kiva-header__right"}>
                    {topBar}
                </div>
            </LightHeader>
            <LightPanel>
                <Sider width={200} theme={"light"} collapsed={collapsed}>
                    {menus}
                </Sider>
                <Layout>
                    <Content className="kiva-light">
                        <Tabs
                            type="editable-card" hideAdd={true} size={"small"} activeKey={pathname}
                            onChange={handleSwitchRoute} onEdit={handleEditTabs} destroyInactiveTabPane={false}
                        >
                            {Object.keys(tabs).map((key) => {
                                return (<TabPane key={key} tab={tabs[key].title} />);
                            })}
                        </Tabs>
                        <div className="kiva-content">
                            {children}
                        </div>
                    </Content>
                </Layout>
            </LightPanel>
        </Layout>
    );
}
