import type { ProColumns } from "@ant-design/pro-components";
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from "@ant-design/pro-components";
import React, { useState } from "react";

interface DataSourceType {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  update_at?: number;
  children?: DataSourceType[];
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const PageTwo: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [position, setPosition] = useState<"top" | "bottom" | "hidden">(
    "bottom"
  );
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "Activity Name",
      dataIndex: "title",
      tooltip: "Read-only, use form.getFieldValue to get the value",
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1
              ? [{ required: true, message: "This item is required" }]
              : [],
        };
      },
      // The first row is not allowed to be edited
      editable: (text, record, index) => {
        return index !== 0;
      },
      width: "15%",
    },
    {
      title: "Activity Name 2",
      dataIndex: "readonly",
      tooltip: "Read-only, use form.getFieldValue to get the value",
      readonly: true,
      width: "15%",
    },
    {
      title: "State",
      key: "state",
      dataIndex: "state",
      valueType: "select",
      valueEnum: {
        all: { text: "All", status: "Default" },
        open: {
          text: "Unsolved",
          status: "Error",
        },
        closed: {
          text: "Solved",
          status: "Success",
        },
      },
    },
    {
      title: "Description",
      dataIndex: "decs",
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || "", "title"]) === "Not fun") {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: "Activity time",
      dataIndex: "created_at",
      valueType: "date",
    },
    {
      title: "Operation",
      valueType: "option",
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          Editar
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          Eliminar
        </a>,
      ],
    },
  ];
  const defaultData = [
    {
      id: 624748504,
      title: "Activity Name 1",
      readonly: "Activity Name 1",
      decs: "This activity is really fun",
      state: "open",
      created_at: 1590486176000,
      update_at: 1590486176000,
    },
    {
      id: 624691229,
      title: "Activity Name 2",
      readonly: "Activity Name 2",
      decs: "This activity is really fun",
      state: "closed",
      created_at: 1590481162000,
      update_at: 1590481162000,
    },
  ];

  const [dataSource, setDataSource] =
    useState<readonly DataSourceType[]>(defaultData);

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="Editable table"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          position !== "hidden"
            ? {
                position: position as "top",
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: "Add to top",
                value: "top",
              },
              {
                label: "Add to bottom",
                value: "bottom",
              },
              {
                label: "hide",
                value: "hidden",
              },
            ]}
          />,
        ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="Table data" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: "100%",
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};

export default PageTwo;
