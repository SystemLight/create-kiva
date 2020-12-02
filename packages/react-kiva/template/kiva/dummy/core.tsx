import React from "react";
import {Table} from "antd";
import {TableProps} from "antd/lib/table/Table";
import styled from "styled-components";

const DummyWrap = styled.div`
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

const defaultProps: TableProps<any> = {
    bordered: true, size: "small", scroll: {x: "max-content"},
    rowClassName(record, index?: number) {
        return index ? index % 2 === 0 ? "dummy-even-row" : "dummy-odd-row" : "dummy-even-row";
    }
};

export function Dummy<RecordType extends object = any>(props: TableProps<RecordType>) {
    return (
        <DummyWrap>
            <Table<RecordType> {...defaultProps} {...props} />
        </DummyWrap>
    );
}
