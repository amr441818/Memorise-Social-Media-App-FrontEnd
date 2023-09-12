import {
  FETCH_ALL,
  UPDATE,
  CREATE,
  DELETE,
  UPDATELIKES,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT,
  ERROR,
} from "../constants/acionTypes";
import { postsActons } from "../store/posts-slice";
import * as api from "../api/posts";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch(postsActons.startLoading());
    const { data } = await api.fetchAllPosts(page);
    dispatch(postsActons.fetchAll(data));
    // dispatch({ type: FETCH_ALL, payload: data });
    dispatch(postsActons.endLoading());
  } catch (error) {
    console.log(error);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch(postsActons.startLoading());
    const { data } = await api.fetchAllPost(id);
    dispatch(postsActons.fetchSinglePost(data));
    // dispatch({ type: FETCH_POST, payload: data });
    dispatch(postsActons.endLoading());
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch(postsActons.startLoading());
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch(postsActons.fetchPostsWithSearch(data));
    dispatch(postsActons.endLoading());
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch(postsActons.startLoading());
    const { data } = await api.createPost(post);
    // console.log(response);
    navigate(`/posts/${data._id}`);
    dispatch(postsActons.createPost(data));
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response
        ? error.response.data
        : "something went wrong, we are fixning it!",
    });
  }
};
export const updatePost = (id, updatedPost, navigate) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
    const { data } = await api.updatePost(id, updatedPost);
    dispatch(postsActons.updatePost(data));
    navigate("/");
    // dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch(postsActons.deletePost(id));
  } catch (error) {
    console.log(error);
  }
};
export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch(postsActons.addComment(data));
    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
export const updateLikeCount = (id) => async (dispatch) => {
  try {
    const { data } = await api.updateLikeCount(id);
    dispatch(postsActons.updateLikes(data));
  } catch (error) {
    console.log(error);
  }
};
