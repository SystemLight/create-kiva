import React from 'react';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

function App() {
    return (
        <React.StrictMode>
            <ConfigProvider locale={zhCN} componentSize="middle">
                <h1>Hello React-kiva2</h1>
            </ConfigProvider>
        </React.StrictMode>
    );
}

export default App;
