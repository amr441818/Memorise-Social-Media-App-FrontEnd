import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

import { TextField, Paper, Button, Typography } from "@material-ui/core";
import Alert from "@mui/material/Alert";

const Form = ({ id, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  let disabled = true;
  const [isLogedIn, setIsLogedIn] = useState(true);
  const user = JSON.parse(localStorage.getItem("profile"));
  const post = useSelector((state) =>
    id ? state.posts.posts.find((post) => post._id === id) : null
  );
  const { errors } = useSelector((state) => state.posts);
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);
  const classes = useStyles();
  const handleChange = (e) => {
    if ([e.target.name] === "tags") {
      setPostData({ ...postData, [e.target.name]: e.target.value.split(",") });
    } else {
      setPostData({ ...postData, [e.target.name]: e.target.value });
    }
  };
  if (
    postData.title &&
    postData.message &&
    postData.tags &&
    postData.selectedFile
  ) {
    disabled = false;
  }
  const submitHandler = (e) => {
    e.preventDefault();

    if (!user?.result?.name) {
      setIsLogedIn(false);
    }
    console.log(postData.tags);
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("message", postData.message);
    formData.append("tags", postData.tags);
    formData.append("image", postData.selectedFile);
    formData.append("name", user?.result?.name);

    if (id) {
      dispatch(updatePost(id, formData, navigate));
    } else {
      dispatch(createPost(formData, navigate));
    }
    if (!post) {
      clear();
    }
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (isLogedIn) {
    return (
      <div>
        <Paper elevation={6} className={classes.paper}>
          {errors ? (
            <div>
              <Alert className={classes.error} severity="error">
                {errors?.message}
              </Alert>
            </div>
          ) : (
            ""
          )}
          <form
            autoComplete="off"
            noValidate
            className={`${classes.form} ${classes.root}`}
            onSubmit={submitHandler}
          >
            <Typography variant="h6">
              {id ? "Editing" : "Creating"} a memory{" "}
            </Typography>

            <TextField
              name="title"
              variant="outlined"
              label="title"
              fullWidth
              value={postData.title}
              onChange={handleChange}
            />
            <TextField
              name="message"
              variant="outlined"
              label="message"
              fullWidth
              value={postData.message}
              onChange={handleChange}
            />
            <TextField
              name="tags"
              variant="outlined"
              label="tags"
              fullWidth
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(",") })
              }
            />
            <div className={classes.fileInput}>
              <input
                name="image"
                type="file"
                onChange={(e) =>
                  setPostData({ ...postData, selectedFile: e.target.files[0] })
                }
              />
              {/* <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  setPostData({ ...postData, selectedFile: base64 });
                }}
              /> */}
            </div>
            <Button
              className={classes.buttonSubmit}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={disabled}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={clear}
              fullWidth
            >
              Clear
            </Button>
          </form>
        </Paper>
      </div>
    );
  } else {
    return (
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h6">
          Please sign in to create a memorise and like other memorises....
        </Typography>
      </Paper>
    );
  }
};

export default Form;
