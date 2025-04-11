import type { ProColumns } from "@ant-design/pro-components";
import {
  DownloadOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { EditableProTable, ProFormRadio } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import {
  AppUserRole,
  createUserRoleRequest,
  deleteUserRoleRequest,
  fetchUserRoleRequest,
  updateUserRoleRequest,
} from "../redux/reducers/userRoleReducer";
import { Button, message, Space, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../redux/reducers/reducers";
import * as XLSX from "xlsx";
import { Config } from "../aux/global";

const PageUserRole: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, pagination } = useSelector(
    (state: ReduxState) => state.userRole
  );
  const { user } = useSelector((state: ReduxState) => state.login);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [position, setPosition] = useState<"top" | "bottom" | "hidden">("top");
  const refreshData = () => {
    dispatch(fetchUserRoleRequest({ page: 1, pageSize: Config.pageSize }));
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleTableChange = (newPage: number, newPageSize: number) => {
    dispatch(fetchUserRoleRequest({ page: newPage, pageSize: newPageSize }));
  };

  const handleSave = (key: any, data: AppUserRole) => {
    if (data.uuid) {
      return dispatch(updateUserRoleRequest(data));
    }
    dispatch(createUserRoleRequest(data));
  };

  const handleDelete = (uuid: string) => {
    dispatch(deleteUserRoleRequest(uuid));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TipoDeAeronaves");
    XLSX.writeFile(workbook, "tipodeaeronaves.xlsx");
  };

  const columns: ProColumns<AppUserRole>[] = [
    {
      title: "Rol",
      dataIndex: "role",
      formItemProps: {
        rules: [{ required: true, message: "Este campo es obligatorio" }],
      },
      width: "20%",
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      formItemProps: {
        rules: [{ required: true, message: "Este campo es obligatorio" }],
      },
      width: "25%",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
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
      <EditableProTable<AppUserRole>
        rowKey="id"
        headerTitle="Roles"
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

export default PageUserRole;
