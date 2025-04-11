import type { ProColumns } from "@ant-design/pro-components";
import {
  DownloadOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { EditableProTable, ProFormRadio } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import {
  AppUser,
  createUserRequest,
  deleteUserRequest,
  fetchUserRequest,
  updateUserRequest,
} from "../redux/reducers/userReducer";
import { Button, message, Space, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../redux/reducers/reducers";
import * as XLSX from "xlsx";
import { Config } from "../aux/global";
import { fetchUserRoleRequest } from "../redux/reducers/userRoleReducer";
import { fetchStatusRequest } from "../redux/reducers/statusReducer";

const PageUser: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, pagination } = useSelector(
    (state: ReduxState) => state.user
  );
  const { user } = useSelector((state: ReduxState) => state.login);
  const { data: userRoleData } = useSelector(
    (state: ReduxState) => state.userRole
  );

  const { data: userStatusData } = useSelector(
    (state: ReduxState) => state.userStatus
  );
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [position, setPosition] = useState<"top" | "bottom" | "hidden">("top");
  const refreshData = () => {
    dispatch(fetchUserRequest({ page: 1, pageSize: Config.pageSize }));
    dispatch(fetchUserRoleRequest({ page: 1, pageSize: 100 }));
    dispatch(fetchStatusRequest({ page: 1, pageSize: 100 }));
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleTableChange = (newPage: number, newPageSize: number) => {
    dispatch(fetchUserRequest({ page: newPage, pageSize: newPageSize }));
  };

  const handleSave = (key: any, data: AppUser) => {
    if (data.uuid) {
      return dispatch(updateUserRequest(data));
    }
    dispatch(createUserRequest(data));
  };

  const handleDelete = (uuid: string) => {
    dispatch(deleteUserRequest(uuid));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TipoDeAeronaves");
    XLSX.writeFile(workbook, "tipodeaeronaves.xlsx");
  };

  const columns: ProColumns<AppUser>[] = [
    {
      title: "Usuario",
      dataIndex: "user",
      formItemProps: {
        rules: [{ required: true, message: "Este campo es obligatorio" }],
      },
      width: "15%",
      sorter: (a, b) => a.user.localeCompare(b.user),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      formItemProps: {
        rules: [{ required: false }],
      },
      width: "15%",
      sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
    },
    {
      title: "Rol",
      dataIndex: "roleId",
      valueType: "select",
      fieldProps: {
        options: userRoleData.map((item) => ({
          label: item.role,
          value: item.id,
        })),
      },
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: "Este campo es obligatorio" }],
        };
      },
      width: "15%",
      sorter: (a, b) => a.roleId - b.roleId,
    },
    {
      title: "Estado",
      dataIndex: "statusId",
      valueType: "select",
      fieldProps: {
        options: userStatusData.map((item) => ({
          label: item.status,
          value: item.id,
        })),
      },
      formItemProps: {
        rules: [
          { required: true, message: "Seleccionar un estado es obligatorio" },
        ],
      },
      width: "15%",
      sorter: (a, b) => a.statusId - b.statusId
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
      <EditableProTable<AppUser>
        rowKey="id"
        headerTitle="Usuarios"
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

export default PageUser;
