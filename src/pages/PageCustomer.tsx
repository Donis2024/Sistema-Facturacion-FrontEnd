import type { ProColumns } from "@ant-design/pro-components";
import {
  DownloadOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { EditableProTable, ProFormRadio } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import {
  AppCustomer,
  createCustomerRequest,
  deleteCustomerRequest,
  fetchCustomerRequest,
  updateCustomerRequest,
} from "../redux/reducers/customerReducer";
import { Button, Space, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../redux/reducers/reducers";
import * as XLSX from "xlsx";
import { Config } from "../aux/global";

const PageCustomer: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, pagination } = useSelector(
    (state: ReduxState) => state.customer
  );
  const { user } = useSelector((state: ReduxState) => state.login);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [position, setPosition] = useState<"top" | "bottom" | "hidden">("top");
  const refreshData = () => {
    dispatch(fetchCustomerRequest({ page: 1, pageSize: Config.pageSize }));
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleTableChange = (newPage: number, newPageSize: number) => {
    dispatch(fetchCustomerRequest({ page: newPage, pageSize: newPageSize }));
  };

  const handleSave = (key: any, data: AppCustomer) => {
    if (data.uuid) {
      return dispatch(updateCustomerRequest(data));
    }
    dispatch(createCustomerRequest(data));
  };

  const handleDelete = (uuid: string) => {
    dispatch(deleteCustomerRequest(uuid));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TipoDeAeronaves");
    XLSX.writeFile(workbook, "tipodeaeronaves.xlsx");
  };

  const columns: ProColumns<AppCustomer>[] = [
    {
      title: "Modificado",
      dataIndex: "updateDate",
      valueType: "dateTime",
      readonly: true,
    },
    {
      title: "Operación",
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
        <Popconfirm
          placement="top"
          title={text}
          description={`Desea borrar el registro`}
          okText="Yes"
          cancelText="No"
          onConfirm={() => {
            handleDelete(record.uuid);
          }}
          icon={<QuestionCircleOutlined />}
        >
          <a key="delete">Borrar</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<AppCustomer>
        rowKey="id"
        headerTitle="Clientes"
        pagination={{
          pageSize: pagination.pageSize,
          showPrevNextJumpers: true,
          onChange: handleTableChange,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          position !== "hidden"
            ? {
                position: position as "top",
                record: () =>
                  ({
                    id: (Math.random() * 1000000).toFixed(0),
                    createDate: new Date().toISOString(),
                    updateBy: user!.username,
                    updateDate: new Date().toISOString(),
                    uuid: "",
                    version: 0,
                  } as any),
              }
            : false
        }
        loading={loading}
        toolBarRender={() => [
          <Space>
            <Button
              key="export"
              icon={<DownloadOutlined />}
              onClick={exportToExcel}
              size="large"
            >
              Exportar
            </Button>
            <Button
              key="refresh"
              icon={<ReloadOutlined />}
              onClick={refreshData}
              size="large"
            >
              Refrescar
            </Button>
          </Space>,
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: "Arriba",
                value: "top",
              },
              {
                label: "Abajo",
                value: "bottom",
              },
              {
                label: "Ocultar",
                value: "hidden",
              },
            ]}
          />,
        ]}
        columns={columns}
        request={async () => ({
          data: data,
          total: pagination.totalItems,
          success: true,
        })}
        value={data}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: async (rowKey, data, _row) => {
            handleSave(rowKey, data);
          },
          onChange: setEditableRowKeys,
          actionRender: (row, config, defaultDom) => [
            defaultDom.save,
            defaultDom.cancel,
          ],
        }}
      />
    </>
  );
};

export default PageCustomer;
