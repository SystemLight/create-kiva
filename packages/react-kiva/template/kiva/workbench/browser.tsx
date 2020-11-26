import styled from "styled-components";

/*
    系统主要内容部分Wrap组件，Browser风格
 */
export const Browser = styled.div`
  border-top: 28px solid #E6E6E6;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 1px 5px 0 rgba(0,0,0,.28);
  min-height: 360px;
  height: 100%;
  position: relative;
  background-color: #FFFFFF;

  & > .browser-body{
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &:before{
    content: "";
    position: absolute;
    top: -19px;
    left: 12px;
    display: block;
    border-radius: 50%;
    width: 11px;
    height: 11px;
    background-color: #FF4444;
    box-shadow: 0 0 0 #FF4444, 21px 0 0 #99BB33, 42px 0 0 #FFBB55;
  }

  &:after{
    content: "";
    position: absolute;
    top: -23px;
    left: 78px;
    border-radius: 3px;
    width: calc(100% - 95px);
    height: 16px;
    background-color: #FFFFFF;
  }
`;
