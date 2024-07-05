import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../Screens/Home.css";
import { useDeletePostMutation } from "../slices/postSlice";
import { useSendCommentMutation } from "../slices/postSlice";
import Confirm from "./utils/Confirm";
import { useNavigate } from "react-router-dom";
import { Offcanvas, Spinner } from "react-bootstrap";

const Post = ({ post }) => {
  const { userInfo, isLoadingUser } = useSelector((state) => state.auth);
  const [deletePost, { isError: deleteError, isLoading: deletePostLoading }] =
    useDeletePostMutation() || {};
  const [sendComment, { isError: commentError, isLoading: commentLoading }] =
    useSendCommentMutation() || {};

  const [deletePostId, setDeletePostId] = useState();
  const [showModal, setShowModal] = useState(false);

  const [comment, setComment] = useState();

  const handleCancel = () => setShowModal(false);

  const navigate = useNavigate();

  const deleteHandler = (p) => {
    setDeletePostId(p);
    setShowModal(true);
  };

  const deletePostHandler = () => {
    setShowModal(false);
    console.log("deletePostData", deletePostId);
    try {
      const res = deletePost(deletePostId);
      console.log("delete res", res);
    } catch (error) {}
  };
  const editHandler = (e) => {
    e.preventDefault();
    navigate(`/updatePost/${e.target.getAttribute("value")}`);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const commentData = {
      postId: e.target.value,
      comment,
      userName: userInfo.name,
      userId: userInfo._id,
    };
    console.log("commentdata :", commentData);

    try {
      const res = await sendComment(commentData);
      console.log("Comment Res", res);
      // console.log("submitHandler res try" + res);
    } catch (err) {
      console.log(err?.data?.message || err);
    }
    setComment("");
  };

  return (
    <div>
      {showModal && (
        <Confirm
          showModal={showModal}
          data={"Post"}
          handleCancel={handleCancel}
          deletePostHandler={deletePostHandler}
        />
      )}

      <div className=" ">
        <div className="post__nameField">
          <div className="post__avatarName">
            <img src={post.image} alt="" className="post__avatar"></img>
            <h3>{post.name}</h3>
          </div>
          {post?.user === userInfo?._id && (
            <div className="post__modify">
              <div
                className="post__edit"
                value={post._id}
                onClick={editHandler}
              >
                Edit
              </div>
              <div
                className="post__delete"
                value={post}
                onClick={() => deleteHandler(post._id)}
              >
                {!deletePostLoading ? (
                  "Delete"
                ) : (
                  <div class="deleting">...</div>
                )}
              </div>
            </div>
          )}
        </div>
        <p>{post.description}</p>
        <p>{post.title}</p>
        <img className="post__image" src={post.image}></img>
        {/* <Link to={'/updatePost/'+post._id}  style={{ textDecoration: 'none'}}>button</Link> */}

        <div
          style={{
            width: "-webkit-fill-available",
            marginTop: "5px",
          }}
        >
          <form
            className="d-flex justify-cotent-center align-items-center"
            action=""
            onSubmit={handleComment}
          >
            <input
              style={{ width: "100%" }}
              className="me-2"
              type="text"
              placeholder="Comment"
              value={comment}
              required="true"
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              className="btn btn-secondary"
              style={{ borderRadius: "0px" }}
              value={post._id}
              onClick={handleComment}
            >
              {!commentLoading ? (
                "Send"
              ) : (
                <Spinner
                  className="mx-3 h-1 spinner-grow text-light"
                  style={{ height: "20px", width: "20px" }}
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
