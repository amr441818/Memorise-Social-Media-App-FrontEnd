import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Container } from "@material-ui/core";

import Navbar from "./component/Navbar/Navbar";
import Home from "./component/Home/Home";
import PostDetails from "./component/postDetails/PostDetails";

import Auth from "./component/Auth/Auth";
import { GoogleOAuthProvider } from "react-oauth-google";
const App = () => {
  const [user, setUser] = useState(null);
  return (
    <GoogleOAuthProvider clientId="573408926864-9gaogi3btevg2ma5s8qff8ahmfme7bdh.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar setUserHandler={setUser} />
          <Routes>
            <Route path="/" exact element={<Navigate to="/posts" />} />
            <Route path="/posts" exact element={<Home />} />
            <Route path="/posts/search" exact element={<Home />} />
            <Route path="/posts/:id" exact element={<PostDetails />} />
            <Route
              path="/auth"
              element={user?.result ? <Navigate to="/" /> : <Auth />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};
export default App;
