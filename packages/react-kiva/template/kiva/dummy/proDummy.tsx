import "./proDummy.style.less";

import React, {useContext, useMemo, useState, useEffect, useRef} from "react";
import {Card, Popover, Space, Table, Tooltip, Checkbox, Form} from "antd";
import {TableComponents} from "rc-table/lib/interface";
import {TableProps} from "antd/es/table/Table";
import Icon, {SettingOutlined} from "@ant-design/icons";
import styled from "styled-components";

import {ReactComponent as DragIcon} from "./drag.svg";
import {AntTableTopBar} from "./part";
import {InputCell} from "./render";
import {arrayMove} from "../utils";
import {lineNumColumns, sorter, useMapDataSource} from "./utils";
import {
    IDummyColumn, IColumnSettingProps, ITitleProps,
    IProDummyProps, IProDummyBodyRowProps, IProDummyBodyCellProps
} from "./interface";

const ProDummyWrap = styled.div`
  .ant-table.ant-table-bordered > .ant-table-title {
    border: none;
  }

  thead.ant-table-thead {
    tr {
      th.ant-table-cell {
        background-color: #426CC9;
        color: #FFFFFF;
        cursor: pointer;
      }
    }
  }

  tbody.ant-table-tbody {
    tr.ant-table-row {
      td > .line-number {
        white-space: nowrap;
        font-weight: 500;
      }
    }

    tr.ant-table-row:hover {
      td {
        background-color: #A7BBEE;
        cursor: pointer;
      }
    }

    tr.dummy-odd-row {
      td {
        background-color: #E0E3DA;
      }
    }

    tr.dummy-even-row {
      td {
        background-color: #FFFFFF;
      }
    }

    tr.ant-table-row.ant-table-row-selected {
      td {
        background-color: #8EC0E4;
        color: #FFFFFF;
      }
    }
  }
`;

function ColumnSetting({columns, onVisibleChange, onOrderChange}: IColumnSettingProps) {
    const content = (
        <ul>
            {
                columns.map((v, i) => {
                    return (
                        <li
                            key={v.key} className={"column-setting-item"}
                            draggable={"true"} onDragOver={(e) => e.preventDefault()}
                            onDragStart={(e) => e.dataTransfer.setData("index", i.toString())}
                            onDrop={
                                (e) => {
                                    const source = Number(e.dataTransfer.getData("index"));
                                    const target = i;
                                    if (source !== target) {
                                        onOrderChange(source, target);
                                    }
                                }
                            }
                        >
                            <Space>
                                <Icon component={DragIcon} />
                                <Checkbox
                                    checked={!v.isHide}
                                    onChange={(e) => onVisibleChange(i, !e.target.checked)}
                                />
                                <span className={"column-setting-name"}>{v.title}</span>
                            </Space>
                        </li>
                    );
                })
            }
        </ul>
    );

    return (
        <Popover
            overlayClassName={"prodummy-column-setting-overlay"} title={"列设置"} content={content}
            trigger={"click"} placement={"bottomRight"}>
            <Tooltip title={"列设置"} trigger={"hover"}>
                <SettingOutlined style={{fontSize: 16}} />
            </Tooltip>
        </Popover>
    );
}

function Title({leftTitle, rightNode, ...restProps}: ITitleProps) {
    return (
        <AntTableTopBar>
            <div className="title-item-left">{leftTitle}</div>
            <div className="title-item-right">
                <Space>
                    {rightNode}
                    <ColumnSetting {...restProps} />
                </Space>
            </div>
        </AntTableTopBar>
    );
}

const EditableContext = React.createContext<any>(null);

function BodyRow(props: IProDummyBodyRowProps) {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
}

function BodyCell({editable, children, dataIndex, record, onSave, onSetColWidth, editComponent, ...restProps}: IProDummyBodyCellProps) {
    const form = useContext(EditableContext);
    const [editing, setEditing] = useState(false);
    const editRef = useRef<any>(null);
    const wrapRef = useRef<any>(null);
    const initWrapRef = useRef<number>(0);

    useEffect(() => {
        // 保存初始宽度
        initWrapRef.current = wrapRef.current.offsetWidth;
    }, []);

    useEffect(() => {
        if (editing) {
            editRef.current.focus();
            onSetColWidth(dataIndex, initWrapRef.current);
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({[dataIndex]: record[dataIndex]});
    };

    const save = () => {
        form.validateFields().then((values: any) => {
            toggleEdit();
            onSave({...record, ...values});
        }).catch((errInfo: any) => {
            console.error("Save failed:", errInfo);
        });
    };

    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item noStyle={true} name={dataIndex}>
                {React.createElement(editComponent, {
                    onPressEnter: save, onBlur: save, ref: editRef
                })}
            </Form.Item>
        ) : (
            <div onClick={toggleEdit} style={{minHeight: 20}}>
                {children}
            </div>
        );
    }

    return <td {...restProps} ref={wrapRef}>{childNode}</td>;
}

const components: TableComponents<any> = {
    body: {
        row: BodyRow,
        cell: BodyCell
    }
};

const defaultProps: TableProps<any> = {
    bordered: true, size: "small", scroll: {x: "max-content"},
    rowClassName(record, index?: number) {
        return index ? index % 2 === 0 ? "dummy-even-row" : "dummy-odd-row" : "dummy-even-row";
    },
    pagination: {showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["20", "50", "100"]},
    components: components
};

/*
    ProDummy表格：
        1. 列排序
        2. 行号添加和key值映射
        3. 内部触发列隐藏功能，列排序功能
        4. 表格内容直接编辑，自定义编辑控件
 */
export function ProDummy<RecordType extends object = any>(
    {
        leftTitle, rightNode, initColumns, dataSource,
        mapKey, onSave, ...restProps
    }: IProDummyProps<RecordType>
) {
    const [pureColumns, setColumns] = useState<IDummyColumn<RecordType>[]>(initColumns);
    const columns = useMemo<IDummyColumn<RecordType>[]>(() => {
        let newColumns = [...pureColumns];

        newColumns = newColumns.filter((v) => !v.isHide);
        newColumns = newColumns.map(function (v, i) {
            if (v.isSort) {
                v.sortDirections = ["descend", "ascend"];
                v.sorter = (a: any, b: any) => sorter(a, b, v.dataIndex);
            }

            v.shouldCellUpdate = (record: RecordType, preRecord: RecordType) => {
                return record !== preRecord;
            };

            v.onCell = (record): any => ({
                editable: v.isEdit,
                dataIndex: v.dataIndex,
                index: i,
                record: record,
                onSave: onSave,
                editComponent: v.editComponent || InputCell,
                onSetColWidth(dataIndex: string, width: number) {
                    const index = pureColumns.findIndex((v) => v.dataIndex === dataIndex);
                    if (index !== -1 && !pureColumns[index].width) {
                        pureColumns[index].width = width;
                        setColumns([...pureColumns]);
                    }
                }
            });

            return v;
        });
        newColumns.unshift(lineNumColumns);

        return newColumns;
    }, [pureColumns, onSave]);
    const __dataSource = useMapDataSource<RecordType>(dataSource || [], mapKey);

    function onVisibleChange(index: number, isHide: boolean) {
        pureColumns[index].isHide = isHide;
        setColumns([...pureColumns]);
    }

    function onOrderChange(oldIndex: number, newIndex: number) {
        setColumns(arrayMove(pureColumns, oldIndex, newIndex));
    }

    const title = () => (
        <Title
            leftTitle={leftTitle} rightNode={rightNode} columns={pureColumns}
            onVisibleChange={onVisibleChange} onOrderChange={onOrderChange}
        />
    );

    return (
        <Card bodyStyle={{paddingTop: 0, paddingBottom: 0}}>
            <ProDummyWrap>
                <Table<RecordType>
                    {...defaultProps} {...restProps} columns={columns} dataSource={__dataSource} title={title}
                />
            </ProDummyWrap>
        </Card>
    );
}
