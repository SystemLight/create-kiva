import React from "react";

import {Page, Directory} from "kiva";
import {IDirectoryData} from "kiva/directory/interface";

const data: IDirectoryData[] = [
    {key: "1", type: "folder", name: "文件夹1"},
    {key: "2", type: "folder", name: "文件夹2"},
    {key: "3", type: "folder", name: "文件夹3"},
    {key: "4", type: "folder", name: "文件夹4"},
    {key: "5", type: "file", name: "文件1.txt"}
];

export default function View() {
    return (
        <Page>
            <Directory data={data} />
        </Page>
    );
}

View.title = View.tab = "测试";
