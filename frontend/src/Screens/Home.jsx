import { useEffect, useState } from "react";
import { useGetPostsQuery } from "../slices/postSlice";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Offcanvas, Row, Spinner } from "react-bootstrap";
import "./Home.css";
import ChatContainer from "../components/ChatContainer";
import ChatUserContainer from "../components/ChatUserContainer";

import { useAddPostMutation } from "../slices/postSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logoutCredentials } from "../slices/authSlice";
import Posts from "../components/Posts";


// import { db } from '../firebase';
// import firebase from 'firebase';
const Home = () => {
  const { userInfo, isLoadingUser } = useSelector((state) => state.auth);
  const { data: posts, isError, isLoading } = useGetPostsQuery() || {};
  const [addPost, { isError: postError, isLoading: sendPostLoading }] =
    useAddPostMutation() || {};

  const [logout, { isError: logoutError, isLoading: logoutLoading }] =
    useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [image, setImage] = useState();

  // console.log("post", posts);

  
  // useEffect(() => {
  //   db.collection('posts')
  //     .orderBy('timestamp', 'desc')
  //     .onSnapshot((snapshot) => {
  //       setPsts(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           post: doc.data(),
  //         }))
  //       );
  //     });
  // }, []);
  

 
  const logoutHandler = async () => {
    console.log("logoutHandler");
    try {
      const res = await logout();
      console.log("logoutres", res);
      dispatch(logoutCredentials());
      navigate("/home");
    } catch (error) {}
  };
  const sendPost = async (e) => {
    e.preventDefault();
    console.log("sendPost");

    //https://www.youtube.com/watch?v=e0A_WcITwFE&ab_channel=CodeWithYousaf

    let formData = new FormData();
    formData.append("userName", userInfo.name);
    formData.append("email", userInfo.email);
    formData.append("userId", userInfo._id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    // addPost(formData)

    // for (let [key, value] of formData) {
    //     console.log("formdataloop",`${key}: ${value}`)
    //   }
    try {
      const res = await addPost(formData).unwrap();
      console.log(res);
      // console.log("submitHandler res try" + res);
    } catch (err) {
      console.log(err?.data?.message || err);
    }
    setTitle("");
    setDescription("");
    setImage(null);
  };

 
  return (
    <>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        <div style={{}}>
          <form
            className="d-flex justify-cotent-center align-items-center"
            action=""
            onSubmit={sendPost}
          >
            <input
              className="me-2"
              type="text"
              placeholder="Title"
              value={title}
              required="true"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="me-2"
              type="text"
              placeholder="Description"
              value={description}
              required="true"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
            <div className="d-flex my-3">
              <input
                id="input"
                className="me-2"
                type="file"
                required="true"
                value={null}
                onChange={(e) => setImage(e.target.files[0])}
              />{" "}
            </div>
            <button
              className="btn btn-secondary"
              style={{ borderRadius: "0px" }}
            >
               {!sendPostLoading ? (
                "Post"
              ) : (
                <Spinner
                  className="mx-3 h-1 spinner-border text-light"
                  style={{ height: "20px", width: "20px" }}
                />
              )}
            </button>
          </form>
        </div>
        {userInfo?.userName ? (
          // <div onClick={() => auth.signOut()}>Logout</div>
          <div className="app__loginContainer">
            <div>{userInfo.userName}</div>
            <div id="logout" className="pointerCursor" onClick={logoutHandler}>
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
  

      <div
        className="  position-fixed end-0"
        style={{ height: "-webkit-fill-available", width: "300px" }}
      >
        <div
          className=" h-100 d-flex flex-column justify-content-between align-self-end"
          style={{
            borderLeft: "1px solid lightgray",
            width: "100% ",
            overflowY: "scroll",
            scrollbarWidth: "thin",
          }}
        >
          <div>
            <ChatUserContainer />
          </div>
          <ChatContainer />
        </div>
      </div>

      <div className="">
        <div className="">
          {!isLoading &&
            posts?.length > 0 &&
            posts?.slice(0).reverse().map((post) => (
                <>  
                <Posts post={post}/>
                </>
              ))}
           
        </div>
      </div>
    </>
  );
};

export default Home;
