import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import { connect } from "react-redux";

function App({ user }) {
  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Switch>
            {/* sidebar */}

            <Route exact path="/">
              {/* chat area */}
              <Chat />
            </Route>

            <Route exact path="/room/:roomid">
              <Chat />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, null)(App);
