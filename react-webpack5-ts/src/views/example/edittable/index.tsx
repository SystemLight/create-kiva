import React from "react";
import {Button, Divider} from "antd";
import styled from "styled-components";

import {DummyPhantom} from "@c/components/dummy";
import {useDummyDataSource} from "@c/components/dummy/utils";
import {imageRender, decimalRender, useRowSelection, cacheWrap} from "@c/components/dummy/part";
import {
    IDummyColumns, IDummyRecord
} from "@c/components/dummy/interface";
import {useObserved} from "@c/utils/useHooks";

interface IRecord extends IDummyRecord {
    name: string,
    img: string,
    size: number
}

const globalColumns: IDummyColumns<IRecord> = cacheWrap([
    {
        key: "img",
        dataIndex: "img",
        title: "图像",
        width: 50,
        render: imageRender()
    },
    {
        key: "name",
        dataIndex: "name",
        title: "姓名",
        isEdit: true
    },
    {
        key: "size",
        dataIndex: "size",
        title: "位置",
        render: decimalRender(2)
    }
]);

const SWrap = styled.div`
    width: 1080px;
    margin: 0 auto;
    padding-top: 15px;
`;

export default function EditTablePage() {
    useObserved("EditTablePage");

    const [sourceDataSource, dataSource, setDataSource] = useDummyDataSource<IRecord>("name");
    const [selectedRows, setSelectedRows, rowSelection] = useRowSelection<IRecord>();

    const handleFillData = () => {
        setDataSource([
            {
                name: "SystemLight",
                img: "https://tse2-mm.cn.bing.net/th/id/OIP.EOpnmccTJnoqN9qrDdhPEQHaLG?pid=Api&rs=1",
                size: 1
            },
            {
                name: "Lisys",
                img: "https://tse2-mm.cn.bing.net/th/id/OIP.EOpnmccTJnoqN9qrDdhPEQHaLG?pid=Api&rs=1",
                size: 2
            },
            {
                name: "kirito",
                img: "https://tse2-mm.cn.bing.net/th/id/OIP.EOpnmccTJnoqN9qrDdhPEQHaLG?pid=Api&rs=1",
                size: 3
            }
        ]);
    };

    return (
        <SWrap>
            <Button onClick={handleFillData}>填充数据</Button>
            <Divider />
            <DummyPhantom<IRecord>
                defaultColumns={globalColumns} dataSource={dataSource}
                rowSelection={rowSelection}
                onSave={(record) => {
                    console.log(record);
                }}
            />
        </SWrap>
    );
}
