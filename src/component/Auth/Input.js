import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({
  half,
  name,
  onChangeHandler,
  label,
  type,
  autoFocus,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        required
        onChange={onChangeHandler}
        type={type}
        label={label}
        variant="outlined"
        fullWidth
        autoFocus={autoFocus}
        InputProps={
          name === "password"
            ? {
                endadorenment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : {}
        }
      />
    </Grid>
  );
};

export default Input;
