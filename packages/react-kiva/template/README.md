# react-kiva

react-kiva是集成自动路由，状态管理，远程请求等功能的React PC端开发模板

## 效果展示

![主页](./public/demo/主页.png)

## 获取方法

```
mkdir app & cd app & npm create kiva i react-kiva
```

## 目录说明

#### 外层结构

|  文件名   | 作用  |
|  :----  | :----  |
| config  | APP核心配置功能 |
| kiva  | 包含内置核心组件、工具函数等，导入路径为kiva |
| public  | 静态文件 |
| src  | 业务源码核心撰写目录 |
| mocks.json  | 编写该文件来在开发时得到模拟数据 |
| package.json  | 前端工程化依赖管理配置文件 |
| pages.tree  | 约定路由目录结构构建配置 |
| webpack.config.js  | webpack核心配置文件 |

#### src结构

|  文件名   | 作用  |
|  :----  | :----  |
| assets  | 媒体资源 |
| components  | 公共组件库 |
| models  | 存放注册全局状态文件，这些文件底层是redux，上层是kiva状态模型 |
| pages  | 页面文件存放路径，该文件也是自动路由扫描目录 |
| services  | 公共服务库 |
| utils  | 实用工具 |
| app.tsx  | 项目核心入口文件 |
| global.less  | 全局样式文件，大部分时间建议使用style-components将样式集成到组件中 |

## 技术栈

#### 开发依赖

- [x] babel
- [x] typescript
- [x] webpack
- [x] eslint
- [ ] jest

#### 生产依赖

- [x] react
    - [ ] prop-types
    - [x] react-router-dom
    - [x] styled-components
- [x] redux
    - [x] react-redux
    - [x] redux-thunk
    - [x] reselect
- [x] antd
    - [x] @ant-design/icons
- [x] less
- [x] axios
- [x] qs
- [x] lodash

## 配置项目

#### 1. 自动路由

- 简述

使用 `pages.tree` 配置文件允许你用树形语法写配置，快速生成对应的路由页面骨架。

- 解决问题

该模板项目可以基于自动路由插件通过 `src/pages` 下目录生成路由表，但是大多时候我们仍然要很枯燥的一个一个创建目录文件， 这时候我们就可以通过 `pages.tree`
配置文件，书写一段类似windows下tree命令输出的内容格式，然后运行 `npm run gen` 快速搭建路由目录文件。

- 注意

1. npm run gen 并不会覆盖或者写入已经存在的目录或者文件，会主动跳过
2. pages.tree配置文件对缩进对齐并不是很敏感，只要是看上去那样就可以，所以注意缩进空格控制

配置示例：

```
example
    [users]
    edittable
    my
```

3. 优化路由生成，如果无需做路由UI嵌套时请尽量避免文件夹路径嵌套，对于上述路由页面生成优化写法应该是下列方式。

```
example.[users]
example.edittable
example.my
```

- 路由约定

1. src/pages 下文件结构被解析为路由
2. [] 包裹的名称认定为可选路由
3. .命名可以被转换成/，如example/foo.bar-->/example/foo/bar
4. 只有文件夹会被解析为路由URL节点，文件则不会
5. 父文件中想访问内部子文件夹，需要通过RouteView组件，并且文件夹嵌套的模式认定为也是UI的嵌套

- 排除规则

1. utils，components，models这些命名文件夹不会被扫描
2. 可以在webpack.config.js中配置自动路由忽略名称的参数

#### 2. 状态模型

- models文件夹中允许存放全局数据状态，即Redux

```javascript
// 如common文件夹下状态模型
const commonModel: ISoulModel<ICommonState> = {
    namespace: "common",
    state: {
        date: ""
    },
    mutation: {
        saveDate(state, action) {
            return {date: new Date().toString()};
        }
    },
    immer: {},
    // react-redux的dispatch无法派发到action，但是可以派发函数(redux-thunk)，
    // 如果想要派发到action需要使用kiva下的useSoulDispatach。
    // dispatch({type:"common/asyncSetDate"})

    // 注意：kiva的异步状态解决方案是redux-thunk，虽然命名上抄袭redux-saga但是并没有对其进行集成
    action: {
        async asyncDelay({put, take}, getState) {
            await delay(3000);
        },
        async asyncSetDate({put, take}, getState) {
            console.log(getState());
            await take({type: "common/asyncDelay"});
            put({type: "common/saveDate"});
        }
    }
};
```

- 启用约定模型自注册插件（默认启用），模型状态需要满足以下要求

1. models下单个文件夹即认为是一个状态模型，文件夹中必须包含index.ts文件
2. index.ts必须导出两个变量
    - 默认导出状态模型，命名规则：[文件夹名称]Model
    - 状态接口，命名规则：I[文件夹名称，首字母大小]State

#### 3. 局部状态

- 解决问题

某些组件状态共享是存在范围的，并不需要扩大到全局，这时使用基于redux的soul状态模型就显得鸡肋了， 通过kiva提供的model高阶组件来将数据共享缩小，实际上是结合context和useReducer进行改写，注意
redux保存的状态不会在组件销毁时被销毁，soul提供dispatch("clear")方法用于销毁$开头命名的状态， model是组件级别的状态会自动同组件一同销毁状态数据，数据状态模型与soul保持几乎保持一致。

```javascript
import React from "react";

import {useModel, model, delay} from "kiva";
import {useTab} from "@@/utils";

function Hello1() {
    const {state, dispatch} = useModel();
    return <div onClick={() => dispatch({type: "changeData", payload: "hello1"})}>hello1 {state.data}</div>;
}

function Hello2() {
    const {state, dispatch} = useModel();
    return <div onClick={() => dispatch({type: "asyncChangeData", payload: "async hello2"})}>hello1 {state.data}</div>;
}

function Hello3() {
    const {state, dispatch} = useModel();
    return <div onClick={() => dispatch({type: "changeData", payload: "hello3"})}>hello1 {state.data}</div>;
}

export default model({
    state: {
        data: ""
    },
    mutation: {
        changeData(state, action) {
            return {...state, data: action.payload};
        }
    },
    immer: {},
    action: {
        async myDelay({put}, action) {
            await delay(3000);
            await put({type: "changeData", payload: action.payload});
        },
        async asyncChangeData({take}, action) {
            await take({type: "myDelay", payload: action.payload});
        }
    }
})(function () {
    useTab("我的");
    return (
        <div>
            <Hello1/>
            <Hello2/>
            <Hello3/>
        </div>
    );
});
```

#### 4. 数据模拟

配置 `mocks.json` 快速生成后端接口数据模拟， 该文件用于声明mock数据，该对象key值为路由URL，路由不支持正则，
value值为mock语法，语法规范参考这里：[点击](https://github.com/nuysoft/Mock/wiki/Syntax-Specification)

```
{
  "/helloMock": {
    "list|1-10": [
      {
        "id|+1": 1
      }
    ]
  }
}
```

#### 5. 组件鉴权

- HOC组件鉴权

```javascript
// access组件第一个参数为@@access数据模型中的权限状态数据
// 这种使用方法同样适用于单组件而非页面路由组件
export default access("login")(
    function () {
        return (
            <div>
                <RouteView routes={qr.getRoute("example.other")} after={
                    () => <h1 style={{textAlign: "center"}}>访问组件：src\pages\example.other\index.tsx</h1>
                }/>
            </div>
        );
    }
);
```

- 注册路由元信息处理插件后才能使用的路由鉴权

```javascript
// 这种配置仅适用于路由组件中且启动自动路由或者手动调用dynamic()配置路由
export default function View() {
    return (
        <div>
            <RouteView routes={qr.getRoute("example.other")} after={
                () => <h1 style={{textAlign: "center"}}>访问组件：src\pages\example.other\index.tsx</h1>
            }/>
        </div>
    );
}

View.access = ["login"];
```

#### 6. 路由插件

要实现上述第二种页面鉴权功能光配置access挂载属性是没有意义的，还需要注册该元信息处理方式

```javascript
// config/index.tsx
dynamic.meta.use("access", function (component, args) {
    return {default: access(...args)(component)};
});
```

#### 7. 远程请求

kiva提供多种数据请求方式，并且拥有全局处理错误和局部处理错误配置项，基于Axios，并且当组件销毁时自动取消请求。

- useAxios() : hooks创建Axios实例对象

```javascript
const {run} = useAxios({
    service(req) {
        return req.get("https://jsonplaceholder.typicode.com/todos/1");
    }
});
```

- useRequest() : useAxios的语法糖hooks

```javascript
const {run} = useRequest("https://jsonplaceholder.typicode.com/todos/1");
```

- useRemoteState(options:IUseRemoteStateOptions | string) : 提供一种直接绑定远程数据的useState()模式

useRemoteState配置参数可以很复杂也可以很简单这取决于如何使用它应用于何种场景下，它的初衷是提供访问远程数据如同本地状态数据一样进行绑定

```typescript
export interface IUseRemoteStateOptions<S = any, SS = any> {
    auto?: boolean,
    autoInitExtra?: any[],
    key?: string,
    getConfig: string | AxiosRequestConfig | ((req: AxiosInstance, extra: any[]) => Promise<{ data: any }>),
    setConfig?: string | AxiosRequestConfig | ((req: AxiosInstance, sState: SS, extra: any[]) => Promise<any>),
    setAfter?: (sData: any, sState: SS, extra: any[]) => false | any[],
    mapSetState?: (state: S) => void,
    onError?: (e: any, stage: "set" | "get") => void
}
```

```javascript
// 基础使用
const [state, setState] = useRemoteState("https://jsonplaceholder.typicode.com/todos/1");
return (<div>he{state?.title}o</div>);
```

#### 8. HMR热更新

webpack.config.js中启用hot参数index.js中监听模块变化。

```
if (module.hot) { //告诉 webpack 接受热替换的模块
    module.hot.accept('./print.js', function() {
        // 当print.js模块变化时，执行的逻辑
        // 更新逻辑需要自己写
    })
}
```

#### 9. 预渲染

webpack.config.js中启用prerender-spa-plugin参数index.js中APP组件中添加下列方法

```
// webpack.config.js
安装配置：prerender-spa-plugin

// app.tsx
useEffect(function () {
    // 预渲染配置项
    document.dispatchEvent(new Event('pre-render'));
}, []);
```

## API参考

#### kiva.DarkWorkbench : 暗色主题工作台

```javascript
import React from "react";
import {useLocation} from "react-router-dom";
import {Button} from "antd";
import {FullscreenOutlined} from "@ant-design/icons";

import {navs} from "config";
import {DarkWorkbench, DarkMenus, DarkBreadcrumb, useUrlBreadcrumbItems} from "kiva";

export default function () {
    const {pathname} = useLocation();
    const breadcrumbItems = useUrlBreadcrumbItems(pathname, navs);
    return (
        <DarkWorkbench
            menus={<DarkMenus navs={navs}/>} logoUrl={"/dark-logo.png"}
            breadcrumb={<DarkBreadcrumb items={breadcrumbItems}/>}
            topBar={
                <Button.Group>
                    <Button type={"text"}>
                        <FullscreenOutlined style={{fontSize: 16}}/>
                    </Button>
                    <Button type={"text"}>
                        <FullscreenOutlined style={{fontSize: 16}}/>
                    </Button>
                    <Button type={"text"}>
                        <FullscreenOutlined style={{fontSize: 16}}/>
                    </Button>
                </Button.Group>
            }
        >
            hello DarkWorkbench
        </DarkWorkbench>
    );
}
```

#### kiva.LightWorkbench : 亮色主题工作台

```javascript
import React, {memo} from "react";
import {useLocation} from "react-router-dom";
import {Button, Alert} from "antd";
import {FullscreenOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";

import {
    LightWorkbench, LightMenus, LightBreadcrumb,
    useUrlBreadcrumbItems, RouteView, R404Page
} from "kiva";
import {navs, qr} from "config";
import {useTabs} from "@/models/common/hooks";

const welcomeRoute = {
    key: "welcome",
    path: "/admin",
    exact: true,
    component: memo(() => (
        <div style={{padding: 15}}>
            <Alert message="后台管理" description="欢迎使用后台管理系统 !" type="info"/>
        </div>
    ), () => true)
};

export default function () {
    const {pathname} = useLocation();
    const breadcrumbItems = useUrlBreadcrumbItems(pathname, navs);
    const [tabs, onTabRemove] = useTabs(pathname);

    const topBar = (
        <Button.Group>
            <Button type={"text"} style={{fontSize: 20, border: 0}}>
                <UserOutlined/>
            </Button>
            <Button type={"text"} style={{fontSize: 20, border: 0}}>
                <SettingOutlined/>
            </Button>
            <Button type={"text"} style={{fontSize: 20, border: 0}}>
                <FullscreenOutlined/>
            </Button>
        </Button.Group>
    );

    return (
        <LightWorkbench
            menus={<LightMenus navs={navs}/>} logoUrl={"/light-logo.png"}
            tabs={tabs} onTabRemove={onTabRemove}
            breadcrumb={<LightBreadcrumb items={breadcrumbItems}/>}
            topBar={topBar}
        >
            <RouteView before={welcomeRoute} routes={qr.getRoute("admin")} after={R404Page}/>
        </LightWorkbench>
    );
}
```

#### 更多内容 : 待编写...

# 更新日志V1.2.14

- 路由元信息类型增加注释说明
