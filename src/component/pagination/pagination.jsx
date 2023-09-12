import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import makeStyles from "./styles";
import { getPosts } from "../../actions/posts";
const paginate = ({ page }) => {
  const classes = makeStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts(page));
  }, [page]);
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={posts.numberOfPages}
      page={posts.page}
      // variant="outliend"
      // color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default paginate;
