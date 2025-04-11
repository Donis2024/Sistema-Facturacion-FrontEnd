import { useEffect, useState } from "react";

// Msal imports
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import {
  InteractionStatus,
  InteractionType,
  InteractionRequiredAuthError,
  AccountInfo,
} from "@azure/msal-browser";
import { loginRequest } from "../authConfig";
import { callMsGraph } from "../utils/MsGraphApiCall";
import { useDispatch } from "react-redux";
import { loginRequest as loginRequestReducer } from "../redux/reducers/loginReducer";


// Sample app imports

// Material-ui imports
interface LoginProps {}

export type GraphData = {
  displayName: string;
  jobTitle: string;
  mail: string;
  businessPhones: string[];
  officeLocation: string;
};

const ProfileContent = () => {
  const { instance, inProgress } = useMsal();
  const [graphData, setGraphData] = useState<null | GraphData>(null);
  const dispatch = useDispatch();

  const handleLogin = (response: any) => {
    console.log(response);
    setGraphData(response);
    dispatch(
        loginRequestReducer({
        username: "d365fo.developer9@insyss.com",
        password: "@5AJ)Kd)]T*T.d9?",
      })
    );
  };

  useEffect(() => {
    if (!graphData && inProgress === InteractionStatus.None) {
      callMsGraph()
        .then((response) => handleLogin(response))
        .catch((e) => {
          if (e instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect({
              ...loginRequest,
              account: instance.getActiveAccount() as AccountInfo,
            });
          }
        });
    }
  }, [inProgress, graphData, instance]);

  return <div>{graphData ? <h3>graphData.displayName </h3> : null}</div>;
};

const Login: React.FC<LoginProps> = () => {
  const { instance, inProgress } = useMsal();
  const [graphData, setGraphData] = useState<null | GraphData>(null);

  const authRequest = {
    ...loginRequest,
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      // errorComponent={ErrorComponent}
      // loadingComponent={Loading}
    >
      <ProfileContent />
    </MsalAuthenticationTemplate>
  );
};

export default Login;
