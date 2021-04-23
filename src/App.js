import React, { useState, useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import axios from "axios";
import env from "react-dotenv";

Amplify.configure({
  Auth: {
    region: env.AWS_REGION,
    userPoolId: env.AWS_USER_POOL_ID,
    userPoolWebClientId: env.AWS_USER_POOL_WEB_CLIENT_ID,
  },
});

const awsApi = axios.create({
  baseURL: env.API_URL,
});

const App = () => {
  const [publicData, setPublicData] = useState({});
  const [privateData, setPrivateData] = useState({});
  const [createdData, setCreatedData] = useState({});
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    const fetchJwt = async () => {
      setJwt((await Auth.currentSession()).idToken.jwtToken);
    };

    fetchJwt();
  }, []);

  const onClickNoAuth = async () => {
    const response = await awsApi.get("/");
    setPublicData(response.data);
  };

  const onClickAuth = async () => {
    const response = await awsApi.get("/admin", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    setPrivateData(response.data);
  };

  const onClickCreateData = async () => {
    const response = await awsApi.post("/save");
    setCreatedData(response.data);
  };

  return (
    <div>
      <h3>{JSON.stringify(publicData)}</h3>
      <br />
      <button onClick={onClickNoAuth}>Get Public AWS Data</button>
      <br />
      <br />
      <h3>{JSON.stringify(privateData)}</h3>
      <br />
      <button onClick={onClickAuth}>Get Private AWS Data</button>
      <br />
      <br />
      <h3>{JSON.stringify(createdData)}</h3>
      <br />
      <button onClick={onClickCreateData}>Create Private AWS Data</button>
      <br />
      <br />
      <AmplifySignOut />
    </div>
  );
};

export default withAuthenticator(App);
