# react-kiva

react-kiva是集成自动路由，状态管理，远程请求等功能的React PC端开发模板

## 举例效果

![主页](./public/demo/主页.png)

## 获取方法

```
https://github.com/SystemLight/react-kiva.git
npm install
npm run start
```

## 目录说明

#### 外层结构

|  文件名   | 作用  |
|  :----  | :----  |
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
| models  | 存放注册全局状态文件，这些文件底层是redux，上层是kiva状态模型 |
| pages  | 页面文件存放路径，该文件也是自动路由扫描目录 |
| config.tsx  | 项目配置文件，该文件仅当需要特殊配置项目时使用 |
| global.less  | 全局样式文件，大部分时间建议使用style-components将样式集成到组件中 |
| index.html  | SPA入口文件模板 |
| index.tsx  | 项目核心入口文件 |

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

#### 1. pages.tree-->快速生成页面骨架

- 简述

`pages.tree` 配置文件允许你一种树形语法书写配置，不同于yaml这种，这个配置项意在更加清晰合理配置目录结构，并生成该结构。

解决问题：

该模板项目基于约定路由可以通过pages/src下目录生成路由配置，但是大多时候我们仍然要很枯燥的一个一个构建该目录文件，
这时候我们就可以通过pages.tree配置文件，书写一段类似windows下tree输出的内容语法，看上去与即将生成的结构如此吻合。

- 举例：

这个语法看上去是这样的，通过缩进对其的方式来表示目录结构，因为目录结构就是看上去的这个样子， 之后通过npm run gen:pages，项目自动读取该配置文件，并在src/views生成这个看上去的目录结构。

注意：

1. npm run gen:views 并不会覆盖或者写入已经存在的目录或者文件，会主动跳过
2. pages.tree配置文件对缩进对齐并不是很敏感，只要是看上去那样就可以，所以注意缩进空格控制

```
example
    [users]
    edittable
    my
```

3. 优化路由生成，如果无需做路由嵌套时请尽量避免文件夹路径嵌套，对于上述路由页面生成优化写法应该是下列方式， 让他看起来更像JAVA的package，文件夹嵌套的写法更适合路由外包裹额外组件的场景。

```
example.[users]
example.edittable
example.my
```

#### 2. 自动路由生成

pages.tree在src/pages下生成了默认文件路径并附带index.tsx文件，这些文件可以通过路由访问到， 文件夹命名规则，[dirName]会被转换为可选路由，如example/[user]-->/example/:
user，.会被转换成/， 如example/foo.bar-->/example/foo/bar

排除规则：

1. utils，components，models这些命名文件夹不会被扫描
2. 可以在webpack.config.js中配置自动路由忽略名称的参数

#### 3. 路由组件嵌套

通过自动路由生成的布局可以通过<RouteView routes={qr.getRoute("example/my")}>组件进行路由嵌套，
getRoute方法需要参数，参数key值为当前文件所在路径，根目录代表src/pages目录路径下

#### 4. 数据状态模型

```javascript
// common文件夹下状态模型
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

#### 5. 自注册状态模型

启用约定模型自注册插件（默认启用），模型状态需要满足以下要求

1. models下单个文件夹即认为是一个状态模型，同时包含index.ts文件
2. index.ts必须导出两个变量
    - 默认导出状态模型，命名规则：[文件夹名称]Model
    - 状态接口，命名规则：I[文件夹名称，首字母大小]State

#### 6. 局部状态管理

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
})(function() {
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

#### 7. mocks.json-->快速生成后端接口数据模拟

该文件用于声明mock数据，该对象key值为路由URL，暂不支持正则，
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

#### 8. 鉴权

kiva提供鉴权组件，支持两种配置模式

```javascript
// access组件第一个参数为@@access数据模型中的权限状态数据
// 这种使用方法同样适用于单组件而非页面路由组件
export default access("login")(
    function() {
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

第二种方式需要配合dynamic()函数，注册元信息处理插件才能使用

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

#### 9. 页组件元信息注册处理插件

要实现上述第二种页面鉴权功能光配置access挂载属性是没有意义的，还需要注册该元信息处理方式

```javascript
// src/config.tsx
dynamic.meta.use("access", function(component, args) {
    return {default: access(...args)(component)};
});
```

#### 10. 远程数据请求

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
interface IUseRemoteStateOptions<S, SS> {
    getConfig: string | AxiosRequestConfig | ((req: AxiosInstance, extra: any[]) => Promise<{data: any}>),
    setConfig?: string | AxiosRequestConfig | ((req: AxiosInstance, data: SS, extra: any[]) => Promise<any>),
    setAfter?: (data: any) => false | any[],
    key?: string,  // 返回数据索引具体值，如data={title:["标题"]}，想要获取标题可以设置为："title[0]"，参考lodash的get函数
    mapSetState?: (state: S) => void,
    auto?: boolean,
    autoInitExtra?: any[]
}
```

```javascript
// 最基础使用方法
const [state, setState] = useRemoteState("https://jsonplaceholder.typicode.com/todos/1");
return (<div>he{state?.title}o</div>);
```

## 定制项目

#### 1. 热更新HMR启用

webpack.config.js中启用hot参数index.js中监听模块变化，并执行替换逻辑 react-hot-loader提供热更新支持且无需再手写任何逻辑，默认项目不使用，需自行配置该功能

```
if (module.hot) { //告诉 webpack 接受热替换的模块
    module.hot.accept('./print.js', function() {
        // 当print.js模块变化时，执行的逻辑
        // 更新逻辑需要自己写
    })
}
```

#### 2. 预渲染

webpack.config.js中启用prerender-spa-plugin参数index.js中APP组件中添加下列方法

```
useEffect(function () {
    // 预渲染配置项
    document.dispatchEvent(new Event('pre-render'));
}, []);
```

## 运行时

#### QueryRoute对象

- QueryRoute#routes : 注册的路由对象IRoutes
- QueryRoute#getRoute(key)
    - key : 查找路由匹配对象，key等同于目录结构用.分割，根目录符号为$，例如根目录下的example路由-->$.example

#### Workbench 包裹型组件

1.DarkWorkBench

由于DarkWorkBench是早期工作台样式，特性实现上会比LightWorkbench较为简陋，支持可配置项更少。

```javascript
import React from "react";
import {useLocation} from "react-router-dom";
import {FullscreenOutlined} from "@ant-design/icons";

import {DarkWorkbench, DarkMenus, DarkBreadcrumb, useUrlBreadcrumbItems} from "kiva";

import {navs} from "config";
import {Button} from "antd";

export default function() {
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

2.LightWorkbench

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

export default function() {
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

#### ProDummy组件

可编辑表格，支持自定义列编辑控件，内置Input,InputNumber,Select,AsyncHydra，表格单元格编辑控件可自定义需要继承EditCell组件类

```typescript
import React, {useCallback, useState} from "react";

import {IDummyColumn, InputNumberCell, buildSelectCell, Page, ProDummy} from "kiva";

export const initColumns: IDummyColumn<any>[] = [
    {
        key: "name",
        dataIndex: "name",
        title: "名字",
        isSort: true,
        isEdit: true
    },
    {
        key: "age",
        dataIndex: "age",
        title: "年龄",
        isSort: true,
        isEdit: true,
        editComponent: InputNumberCell
    },
    {
        key: "sex",
        dataIndex: "sex",
        title: "性别",
        isSort: true,
        isEdit: true,
        editComponent: buildSelectCell([{label: "男", value: "男"}, {label: "女", value: "女"}])
    },
    {
        key: "grades",
        dataIndex: "grades",
        title: "成绩",
        isSort: true,
        isEdit: true
    }
];

export const initDataSource = [
    {
        name: "hello 1",
        age: 23,
        sex: "女",
        grades: 32
    },
    {
        name: "hello 2",
        age: 18,
        sex: "女",
        grades: 22
    },
    {
        name: "hello 3",
        age: 25,
        sex: "男",
        grades: 11
    }
];

export default function View() {
    const [dataSource, setDataSource] = useState(initDataSource);

    const handleSave = useCallback(function(record: any) {
        // 注意handleSave缓存有助于列重计算做优化，
        // 该示例中以name为key所有name列更新不会成功
        setDataSource((__datasource) => {
            return __datasource.map((d) => {
                if (d.name === record.name) {
                    return {...d, ...record};
                }
                return d;
            });
        });
    }, []);

    return (
        <Page>
            <ProDummy initColumns = {initColumns}
    dataSource = {dataSource}
    mapKey = {"name"}
    onSave = {handleSave}
    />
    < /Page>
)
    ;
}

View.title = View.tab = "测试组件";
```

## Kiva API

#### access

权限鉴定组件，配合dynamic.meta进行插件注册可以更好的对路由控制，同时access下组件也可以单独使用

#### ajax

网络资源请求处理包

#### bubble

悬浮按钮面板组件

#### condition

条件筛选组件

#### dragModal

可拖拽的antd Modal弹窗

#### dummy

高级封装的antd table组件

#### errorBoundary

错误边界处理组件

#### exhibit

配合poker使用的图片展示组件

#### hydra

配合poker使用的下拉框组件

#### model

局部数据状态注册包

#### pageStore

多窗口页面通信包

#### poker

拓展antd form组件，保存除form字段以外的其它数据，可注册数据获取设置规则

#### routeView

拓展的路由组件，让路由可以通过数据进行配置，同时也是自动路由核心组件

#### workbench

后台管理面板框组件包

#### soul

全局数据状态注册包，基于redux和redux-thunk

#### token

异步操作取消控制包

#### useHooks

实用React hooks工具包

#### utils

实用工具包
