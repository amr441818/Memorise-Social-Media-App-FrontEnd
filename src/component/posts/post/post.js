import React, { useState } from "react";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../../actions/posts";
import { updateLikeCount } from "../../../actions/posts";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
const Post = ({ post, setCurrentId }) => {
  const [likes, setLikes] = useState(post.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?.sub || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const deletePostHandler = () => {
    dispatch(deletePost(post._id));
  };

  const updateLikeCountHandler = () => {
    dispatch(updateLikeCount(post._id));

    if (hasLikedPost) {
      setLikes(likes.filter((like) => like !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const Like = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes?.length > 2
            ? `You and ${likes?.length - 1} Others`
            : `${likes?.length} Like ${likes?.length === 2 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" /> &nbsp;
          {likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };
  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={`https://kind-jade-goshawk-slip.cyclic.app/${post.selectedFile}`}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {user?.result?.sub === post?.creator ||
          (user?.result?._id === post?.creator && (
            <Button
              className={classes.first}
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          ))}
      </div>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <div className={classes.details}>
          <Typography color="textSecondary" variant="body2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography variant="h5" className={classes.title} gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" component="p" color="textSecondary">
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          disabled={!user?.result}
          color="primary"
          onClick={updateLikeCountHandler}
        >
          <Like />
        </Button>
        {user?.result?.sub === post?.creator ||
          (user?.result?._id === post?.creator && (
            <Button size="small" color="primary" onClick={deletePostHandler}>
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          ))}
      </CardActions>
    </Card>
  );
};

export default Post;
