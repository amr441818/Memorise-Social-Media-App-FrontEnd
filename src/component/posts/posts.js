import React from "react";
import Post from "./post/post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state?.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return "no posts found";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      alignItems="stretch"
      spacing={3}
      container
    >
      {posts?.map((post) => (
        <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
