import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../api";

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    const logoutuser = async () => {
      axiosInstance
        .post("user/logout/", {
          refresh_token: localStorage.getItem("refresh_token"),
        })
        .then((response) => {
          console.log("hello world what the fuck");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          axiosInstance.defaults.headers["Authorization"] = null;
          history.push("/login");
        })
        .catch((error) => {
          console.log("error is while logging out", error);
        });
    };
    logoutuser();
  });
  return <div></div>;
};

export default Logout;
