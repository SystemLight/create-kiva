export * from "./action";
export * from "./core";
export * from "./flutterDummy";
export * from "./interface";
export * from "./liveDummy";
export * from "./part";
export * from "./proDummy";
export * from "./render";
export * from "./utils";

/*
    Dummy表格：
        1. 最基础的表格控件，在antd-table基础上设置默认样式和属性

    LiveDummy表格：
        1. 拖拽列头进行列位置排序
        2. 自动添加行号和key值映射
        3. 外部可触发列隐藏功能
        4. 渲染操作列，提供两种渲染模式【折叠和展开】，操作列事件回传
        5. 单行点击，单行双击事件反馈

    FlutterDummy表格：
        1. 拖拽排序组件进行列位置排序
        2. 自动添加行号和key值映射
        3. 内部触发列隐藏功能，附带列隐藏操作组件
        4. 渲染操作列，提供两种渲染模式【折叠和展开】，操作列事件回传

    ProDummy表格：
        1. 拖拽排序组件进行列位置排序
        2. 自动添加行号和key值映射
        3. 内部触发列隐藏功能，附带列隐藏操作组件
        4. 表格内容可以直接编辑，支持自定义编辑控件
 */
