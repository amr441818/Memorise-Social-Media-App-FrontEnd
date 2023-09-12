import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AUTH, LOGOUT } from "../../constants/acionTypes";
import { singInAction, signUpAction } from "../../actions/auth";
import {
  Avatar,
  Paper,
  Typography,
  Container,
  Button,
  Grid,
} from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { authActons } from "../../store/auth-slice";

import LockOutliendIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-oauth-google";
import jwt_decode from "jwt-decode";
import useStyles from "./styles";
import Input from "./Input";
const initalState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initalState);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const classes = useStyles();
  const { errors } = useSelector((state) => state.auth);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setSignUp((prevSignUp) => !prevSignUp);
    setShowPassword(false);
  };
  const onSuccessHandler = async (res) => {
    const result = jwt_decode(res?.credential);
    const token = res?.credential;
    // dispatch({ type: AUTH, data: { result, token } });
    dispatch(authActons.addAuthData({ result, token }));
    navigate("/");
    console.log(result);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (signUp) {
      dispatch(signUpAction(formData, navigate));
    } else {
      dispatch(singInAction(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Container component="main" maxWidth="xs">
      {errors ? (
        <div>
          <Alert className={classes.error} severity="error">
            {errors?.message}
          </Alert>
        </div>
      ) : (
        ""
      )}

      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutliendIcon />
        </Avatar>
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <Grid container spacing={2}>
            {signUp && (
              <>
                <Input
                  name="firstName"
                  label="firstName"
                  onChangeHandler={handleChange}
                  autoFocus
                  half
                />

                <Input
                  required
                  name="lastName"
                  label="lastName"
                  onChangeHandler={handleChange}
                  autoFocus
                  half
                />
              </>
            )}
            <Input
              name="email"
              type="email"
              label="E-Mail"
              autoFocus
              onChangeHandler={handleChange}
            />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              label="password"
              autoFocus
              onChangeHandler={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {signUp && (
              <>
                <Input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  label="Confirm Password"
                  autoFocus
                  onChangeHandler={handleChange}
                  handleShowPassword={handleShowPassword}
                />
              </>
            )}
            <Grid item md={12} sm={6}>
              <GoogleLogin
                // render={(renderProps) => (
                //   <Button

                className={classes.googleButton}
                //     fullWidth
                //     color="primary"
                //     onClick={renderProps.onClick}
                //     disabled={renderProps.disabled}
                //     startIcon={<Icon />}
                //     variant="contained"
                //   ></Button>
                // )}
                onSuccess={(response) => onSuccessHandler(response)}
                onError={() => console.log("error")}
                coockiePolicy="single_host_origin"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            className={classes.submit}
            variant="contained"
            color="primary"
          >
            {signUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              {signUp
                ? "alredy have an  account? Sign in"
                : "Do not have an accont? Sign Up"}{" "}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Auth;
