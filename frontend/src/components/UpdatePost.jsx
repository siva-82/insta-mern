import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import "../Screens/Home.css";
import { useAddPostMutation, useGetSinglePostQuery } from "../slices/postSlice";
import FormUpdate from "./FormUpdate";

const PostUpload = () => {
  const { userInfo, isLoadingUser } = useSelector((state) => state?.auth);

  const { id } = useParams();
  const { data: post, isLoading } = useGetSinglePostQuery(id);
  const navigate = useNavigate();

  return (
    <>
      <div className="app__header">
        <img
          onClick={() => navigate("/home")}
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />

        {userInfo?.userName ? (
          // <div onClick={() => auth.signOut()}>Logout</div>
          <div className="app__loginContainer">
            <div>{userInfo.userName}</div>
            <div id="logout" className="pointerCursor">
              Logout
            </div>
          </div>
        ) : (
          <div className="app__loginContainer">
            {/* <div onClick={() => setOpen(true)}>Login</div>
            <div onClick={() => setRegisterOpen(true)}>Sign Up</div> */}
            <div className="pointerCursor" onClick={() => navigate("/")}>
              Login
            </div>
            <div
              className="pointerCursor"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </div>
          </div>
        )}
      </div>
      {post && !isLoading && <FormUpdate singlePost={post} />}
    </>
  );
};

export default PostUpload;
