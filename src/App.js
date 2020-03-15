import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Homepage from "./pages/Homepage";
import MyProfilePage from "./pages/MyProfilePage";
import GeneralProfilePg from "./pages/GeneralProfilePg";
import MainNav from "./components/MainNav";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("jwt") !== null
  );

  return (
    <div>
      <ToastContainer />;
      <MainNav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/profile" component={MyProfilePage} />
        <Route path="/users/:id" component={GeneralProfilePg} />
        <Route exact path="/Homepage" component={Homepage} />
        <Route exact path="/" component={Homepage} />
      </Switch>
    </div>
  );
};

export default App;
