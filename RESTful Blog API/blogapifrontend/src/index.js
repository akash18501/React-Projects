import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Single from "./components/Single";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Header />
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/posts/:slug" component={Single} />
      </Switch>
      <Footer />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
