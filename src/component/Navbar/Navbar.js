import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import useStyles from "./styles";
// import memories from "../../images/memories.png";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import { useDispatch } from "react-redux";
// import { LOGOUT } from "../../constants/acionTypes";
import { authActons } from "../../store/auth-slice";
const Navbar = ({ setUserHandler }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // it will get our location
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logOutHandler = () => {
    // localStorage.removeItem("profile");
    dispatch(authActons.logout());
    setUser(null);
    setUserHandler(null);
    navigate("/auth");
  };
  useEffect(() => {
    const token = user?.token;
    //jwt...
    if (token) {
      const decodedData = decode(token);

      if (decodedData.exp * 1000 < new Date().getTime()) logOutHandler();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
          <img src={memoriesText} alt="icon" height="45" />

          <img
            className={`${classes.image}`}
            src={memoriesLogo}
            alt="memorize"
            height="40"
          />
        </Link>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.picture}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                className={classes.logout}
                onClick={logOutHandler}
              >
                logout
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/auth"
            >
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
