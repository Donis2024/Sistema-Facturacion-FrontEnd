import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Space,
  Dropdown,
  Avatar,
  ConfigProvider,
  theme,
  Card,
  Form,
  App as AntdApp,
} from "antd";
import {
  AppstoreOutlined,
  CloudSyncOutlined,
  FileDoneOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "./react-router-dom";
import LoginPage from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { LoginState, logout } from "./redux/reducers/loginReducer";
import PageAircraftType from "./pages/PageAircraftType";
import PageCustomer from "./pages/PageCustomer";
import PageAircraft from "./pages/PageAircraft";
import PageItinerary from "./pages/PageItinerary";
import PageService from "./pages/PageService";
import PageUser from "./pages/PageUser";
import PageUserRole from "./pages/PageUserRole";
import PageUserPrivilege from "./pages/PageUserPrivilege";
import PageHome from "./pages/PageHome";
import { IPublicClientApplication } from "@azure/msal-browser";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

const { Header, Sider, Content } = Layout;

type AppProps = {
  pca: IPublicClientApplication;
};

const App: React.FC<any> = ({ pca }: AppProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const loginState: LoginState = useSelector((state: any) => state.login);
  const dispatch = useDispatch();
  const { instance } = useMsal();

  const location = useLocation(); // Para resaltar dinámicamente el menú

  const userMenu = (pca: any) => (
    <MsalProvider instance={pca}>
      <Menu>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Configuraciones
        </Menu.Item>
        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
          onClick={() => {
            dispatch(logout());
            pca.logoutRedirect();
          }}
        >
          Cerrar Sesión
        </Menu.Item>
      </Menu>
    </MsalProvider>
  );

  // if (!loginState.isAuthenticated && location.pathname !== "/login") {
  //   // Redirigir al login si no está autenticado
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <MsalProvider instance={pca}>
      <AntdApp>
        <Layout style={{ minHeight: "100vh" }}>
          <AuthenticatedTemplate>
            {/* {loginState.isAuthenticated && [ */}
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              // style={{
              //   padding: "50px 0px",
              // }}
            >
              <Form style={{ height: "50px" }}>
                {!collapsed && (
                  <h3 style={{ textAlign: "left", padding: "0 10px" }}>
                    Billing App
                  </h3>
                )}
              </Form>
              <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                defaultOpenKeys={["module1"]}
              >
                <Menu.SubMenu
                  key="catalog"
                  title="Catálogos"
                  icon={<UnorderedListOutlined />}
                >
                  <Menu.Item key="/appcustomer">
                    <Link to="/appcustomer">Clientes</Link>
                  </Menu.Item>
                  <Menu.Item key="/appaircraft">
                    <Link to="/appaircraft">Areonaves</Link>
                  </Menu.Item>
                  <Menu.Item key="/appaircrafttype">
                    <Link to="/appaircrafttype">Tipos de Arenaves</Link>
                  </Menu.Item>
                  <Menu.Item key="/appitinerary">
                    <Link to="/appitinerary">Itinerarios</Link>
                  </Menu.Item>
                  <Menu.Item key="/appservice">
                    <Link to="/appservice">Servicios</Link>
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  key="admin"
                  title="Administracion"
                  icon={<LockOutlined />}
                >
                  <Menu.Item key="/appuser">
                    <Link to="/appuser">Usuarios</Link>
                  </Menu.Item>
                  <Menu.Item key="/appuserrole">
                    <Link to="/appuserrole">Roles</Link>
                  </Menu.Item>
                  <Menu.Item key="/appuserprivilege">
                    <Link to="/appuserprivilege">Privilegios</Link>
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  key="module2"
                  title="Contratos"
                  icon={<SafetyCertificateOutlined />}
                ></Menu.SubMenu>
                <Menu.SubMenu
                  key="module1"
                  title="Tarifario"
                  icon={<ProfileOutlined />}
                ></Menu.SubMenu>
                <Menu.SubMenu
                  key="module3"
                  title="Pre-facturación"
                  icon={<FileDoneOutlined />}
                ></Menu.SubMenu>

                <Menu.SubMenu
                  key="module5"
                  title="Sincronización"
                  icon={<CloudSyncOutlined />}
                ></Menu.SubMenu>
              </Menu>
            </Sider>
          </AuthenticatedTemplate>
          {/* ]} */}

          <Layout>
            {/* {loginState.isAuthenticated && ( */}
            <AuthenticatedTemplate>
              <Header
                style={{
                  padding: "0 16px",
                  // background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{ fontSize: "16px" }}
                />
                <Space>
                  <Dropdown overlay={userMenu(pca)} trigger={["click"]}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Avatar icon={<UserOutlined />} />
                      <span
                        style={{ marginLeft: "8px" }}
                      >{`${loginState.user?.firstName} ${loginState.user?.lastName}`}</span>
                    </div>
                  </Dropdown>
                </Space>
              </Header>
            </AuthenticatedTemplate>
            {/* )} */}
            <Content
              style={{
                margin: "16px",
                // background: "#fff",
                padding: "16px",
              }}
            >
              <AuthenticatedTemplate>
                <Routes>
                  <>
                    <Route
                      path="/appaircrafttype"
                      element={<PageAircraftType />}
                    />
                    <Route path="/appcustomer" element={<PageCustomer />} />
                    <Route path="/appaircraft" element={<PageAircraft />} />
                    <Route path="/appitinerary" element={<PageItinerary />} />
                    <Route path="/appservice" element={<PageService />} />

                    <Route path="/appuser" element={<PageUser />} />
                    <Route path="/appuserrole" element={<PageUserRole />} />
                    <Route path="/home" element={<PageHome />} />
                    <Route
                      path="/appuserprivilege"
                      element={<PageUserPrivilege />}
                    />

                    <Route
                      path="/login"
                      element={<Navigate to="/home" replace />}
                    />
                    <Route
                      path="/redirect"
                      element={<Navigate to="/home" replace />}
                    />
                    <Route path="/" element={<Navigate to="/home" replace />} />
                  </>
                </Routes>
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
              </UnauthenticatedTemplate>

              {/* <Routes>
                {loginState.isAuthenticated ? (
                  <>
                    <Route
                      path="/appaircrafttype"
                      element={<PageAircraftType />}
                    />
                    <Route path="/appcustomer" element={<PageCustomer />} />
                    <Route path="/appaircraft" element={<PageAircraft />} />
                    <Route path="/appitinerary" element={<PageItinerary />} />
                    <Route path="/appservice" element={<PageService />} />

                    <Route path="/appuser" element={<PageUser />} />
                    <Route path="/appuserrole" element={<PageUserRole />} />
                    <Route
                      path="/appuserprivilege"
                      element={<PageUserPrivilege />}
                    />

                    <Route
                      path="/login"
                      element={<Navigate to="/appaircrafttype" replace />}
                    />
                    <Route
                      path="/"
                      element={<Navigate to="/appaircrafttype" replace />}
                    />
                  </>
                ) : (
                  <Route path="/login" element={<LoginPage />} />
                )}
              </Routes> */}
            </Content>
          </Layout>
        </Layout>
      </AntdApp>
    </MsalProvider>
  );
};

export default App;
