import "./style.less";

import React from "react";

import {ReactComponent as FolderIcon} from "./assets/folder.svg";
import {ReactComponent as FileIcon} from "./assets/file.svg";
import {ReactComponent as PreviewIcon} from "./assets/preview.svg";
import {IDirectoryProps, IFolderRowProps, IFileRowProps} from "./interface";

function HeadRow() {
    return (
        <tr>
            <th />
            <th>文件名</th>
            <th>修改时间</th>
            <th>大小</th>
            <th>操作</th>
        </tr>
    );
}

function FolderRow({item, onClickFolder}: IFolderRowProps) {
    const handleClick = () => {
        onClickFolder && onClickFolder(item);
    };

    return (
        <tr onClick={handleClick}>
            <td>
                <i className="kiva__directory-icon"><FolderIcon /></i>
            </td>
            <td>
                文件夹
            </td>
            <td>
                2020-08-10 12:23
            </td>
            <td>-</td>
            <td />
        </tr>
    );
}

function FileRow({item, onPreview}: IFileRowProps) {
    const handleClick = () => {
        onPreview && onPreview(item);
    };

    return (
        <tr>
            <td>
                <i className="kiva__directory-icon"><FileIcon /></i>
            </td>
            <td>
                文件
            </td>
            <td>
                2020-08-10 12:23
            </td>
            <td>12.5KB</td>
            <td>
                <i onClick={handleClick} style={{fontSize: 22}}><PreviewIcon /></i>
            </td>
        </tr>
    );
}

export function Directory({data, onClickFolder, onPreview}: IDirectoryProps) {
    const renderData = (data.map((item) => {
        if (item.type === "folder") {
            return (<FolderRow key={item.key} item={item} onClickFolder={onClickFolder} />);
        } else {
            return (<FileRow key={item.key} item={item} onPreview={onPreview} />);
        }
    }));

    return (
        <div className="kiva__directory-table">
            <table>
                <colgroup>
                    <col width={60} />
                    <col width={"auto"} />
                    <col width={180} />
                    <col width={120} />
                    <col width={120} />
                </colgroup>
                <thead><HeadRow /></thead>
                <tbody>{renderData}</tbody>
            </table>
        </div>
    );
}
