import React, {CSSProperties, ReactElement, useContext, useEffect, useRef, useState} from "react";
import {Form, Input} from "antd";
import {TableComponents} from "rc-table/lib/interface";

import {IDummyBodyCellProps} from "./interface";
import {TableProps} from "antd/es/table";
import {Dummy} from "./index";

const EditableContext = React.createContext<any>({});

export interface IDummyEditBodyRowProps<RecordType = any> {
    children?: ReactElement | ReactElement[],
    className?: string,
    style?: CSSProperties,
    "data-row-key"?: string,
    onSave: (record: RecordType) => void,
}

export function DummyEditBodyRow({onSave, ...restProps}: IDummyEditBodyRowProps) {
    const [form] = Form.useForm();

    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={{form, onSave}}>
                <tr {...restProps} />
            </EditableContext.Provider>
        </Form>
    );
}

export function DummyEditBodyCell({columns, record, children, ...restProps}: IDummyBodyCellProps) {
    const {form, onSave} = useContext(EditableContext);
    const inputRef = useRef<any>(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue(record);
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            onSave({...record, ...values});
        } catch (errInfo) {
            console.error("Save failed:", errInfo);
        }
    };

    let childNode = children;
    if (columns?.isEdit) {
        childNode = editing ? (
            <Form.Item style={{margin: 0}} name={columns.dataIndex}>
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div style={{padding: "5px 24px 5px 12px", cursor: "pointer"}} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
}

const phantomComponents: TableComponents<any> = {
    body: {
        row: DummyEditBodyRow,
        cell: DummyEditBodyCell
    }
};

export interface IEditDummyProps<RecordType> extends TableProps<RecordType> {
    onSave?: (record: RecordType) => void,
}

export function EditDummy<RecordType extends object = any>({onSave, ...restProps}: IEditDummyProps<RecordType>) {
    const onRow = (): IDummyEditBodyRowProps => ({
        onSave(saveRecord) {
            onSave && onSave(saveRecord);
        }
    });

    return (<Dummy<RecordType> components={phantomComponents} onRow={onRow} {...restProps} />);
}
