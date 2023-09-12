import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { MuiChipsInput } from "mui-chips-input";
import Form from "../form/form";
import Posts from "../posts/posts";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import Paginate from "../pagination/pagination";
import { useNavigate, useLocation } from "react-router-dom";
const Home = () => {
  const [curruntId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);
  // to  access the url stirngs and parameters

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  // const onDeleteHandler = (deleteTag) => {
  //   setTags(tags.filter((tag) => tag !== deleteTag));
  // };
  const onAddHandler = (newTag) => {
    console.log(newTag);
    setTags(newTag);
  };
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const searchPost = () => {
    if (searchTerm.trim() || tags) {
      // dispatch the search post
      dispatch(getPostsBySearch({ search: searchTerm, tags: tags.join(",") }));

      navigate(
        `/posts/search?searchQuery=${searchTerm || "none"}&tags=${tags.join(
          ","
        )}`
      );
    } else {
      navigate("/");
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      // search requests
      searchPost();
    }
  };
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              position="static"
              color="inherit"
              className={classes.appBarSearch}
            >
              <TextField
                name="search"
                label="Search Memorise"
                variant="outlined"
                fullWidth
                // onkeypress={handleKeyPress}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MuiChipsInput
                style={{ margin: "10px 0" }}
                label="Search Tags"
                variant="outlined"
                onChange={onAddHandler}
                value={tags}
              />
              <Button
                variant="contained"
                className={classes.searchButton}
                onClick={searchPost}
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form id={curruntId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
