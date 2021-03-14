import React, {PropsWithChildren} from "react";
import {Layout, Row, Col} from "antd";
import styled from "styled-components";

import {IDesignWorkBenchProps} from "./interface";

const {Content, Sider} = Layout;

export const IconBtn = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;

  & > span{
    flex: 1 1 auto;

    &:first-of-type{
      font-size: 18px;
      margin-bottom: 6px;
    }
  }
`;

export const IconBtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;

  ${IconBtn}{
    margin-right: 25px;
  }
`;

const DesignLayout = styled(Layout)`
  min-height: 100vh;

  .design-header{
    overflow-y:hidden;
    height: 68px;
    background-color: #FFFFFF;
    padding:0;
    cursor: pointer;
    box-shadow: 0 2px 4px 0 hsla(0,0%,68.2%,.5);

    .ant-row.ant-row-middle{
      height: 68px;
    }

    .design-title{
      padding-left: 26px;
      color: #333333;
      font-weight: 600;
      font-size: 16px;
    }
  }

  .design-left-sider, .design-right-sider{
    box-shadow: 0 2px 4px 0 hsla(0,0%,68.2%,.5);
  }

  .ant-layout-content{
    .design-body{
      padding: 15px;
      height: 100%;
    }
  }
`;

export function DesignWorkBench({left, right, children, title, headerBtn1, headerBtn2, headerBtn3}: PropsWithChildren<IDesignWorkBenchProps>) {
    return (
        <DesignLayout>
            <div className="design-header">
                <Row align={"middle"}>
                    <Col span={3}>
                        <p className="design-title">{title}</p>
                    </Col>
                    <Col span={7}>
                        {headerBtn1}
                    </Col>
                    <Col span={7}>
                        {headerBtn2}
                    </Col>
                    <Col span={7}>
                        {headerBtn3}
                    </Col>
                </Row>
            </div>
            <div style={{height: 3}} />
            <Layout>
                <Sider theme={"light"} className="design-left-sider" width={260}>
                    {left}
                </Sider>
                <Content>
                    <div className="design-body">
                        {children}
                    </div>
                </Content>
                <Sider theme={"light"} className="design-right-sider" width={300}>
                    {right}
                </Sider>
            </Layout>
        </DesignLayout>
    );
}
