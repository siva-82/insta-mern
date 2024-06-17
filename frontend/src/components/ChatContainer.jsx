import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

import { db, storage } from "../firebase";
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const [img, setImg] = useState(null);

  const [comment, setComment] = useState("");
  const [postId, setPostId] = useState("");


  const { userInfo: currentUser, isLoadingUser } = useSelector(
    (state) => state.auth
  );
  const { chatId, newUser } = useSelector((state) => state.auth);


  const refScroll = useRef();
  
  const getDate=(value)=>{
    const fireBaseTime = new Date(
      value.seconds * 1000 + value.nanoseconds / 1000000,
    );
    const date = fireBaseTime.toDateString();
    const atTime = fireBaseTime.toLocaleTimeString([],{ timeStyle: 'short' });
   return atTime
  }

  useEffect(() => {
    const uns = () => {
      const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    };
    chatId && uns();
  }, [chatId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: newMessage,
                senderId: currentUser?._id,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
      setImg(null);
    } else {
 
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: newMessage,
          senderId: currentUser?._id,
          date: Timestamp.now(),
        }),
      });
    }
    setImg(null);
    setNewMessage("");
  };


  useEffect(() => {
    refScroll.current?.scrollIntoView({ overscrollBehavior: "none" });
  }, [messages]);
  return (
    <>
      {!currentUser? (<div className="d-flex h-25 justify-content-center align-items-start" > Login to Start Chatting</div>):(
<>
<div className="h-100 d-flex flex-column justify-content-between">
{newUser && (
  <>
    <div className="mt-1">
      <hr
        style={{
          margin: "0",
          height: "2px",
          color: "grey",
          zIndex: "1",
        }}
      />

      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: "#6c757d",
          height: "50px",
          color: "white",
          border: "1px solid",
        }}
      >
        {!chatId ? (
          <div className="d-flex justify-content-center align-items-center" >
            Select a User to Chat
          </div>
        ) : (
          <div className="d-flex flex-column justify-content-start align-items-center"  style={{}}>
            <div  >
              You are Chatting with
            </div>
            <div className="d-flex  justify-content-start align-items-center">
              <img
                className="me-2"
                src="./logo192.png"
                alt=""
                style={{ height: "20px", width: "20px" }}
              ></img>
              <div      className="d-flex justify-cotent-center align-items-center"
                style={{
                  margin: "1px",
                  alignSelf: "center",
                  height: "25px",
                }}
              >
                {newUser.name}
              </div>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  </>
)}

<div
  style={{
    padding: "5px",
    marginTop: "2px",
    overflowY: "scroll",
    scrollbarWidth: "none",
    height: "250px",
  }}
>
  {currentUser &&
    messages?.map((message) => {
      return (
        <>
          <div
            ref={refScroll}
            className={`d-flex w-100 flex-column my-2 align-items-${
              message.senderId == currentUser?._id ? "end" : "start"
            }`}
          >
            <p
            className={`${
                  message.senderId == currentUser?._id ? "currentUser__chat" : "otherUser__chat"
                }`}
                style={{padding: "5px"}}
            >
              {message.text}
            </p>
            <div className={`text-muted ${message.senderId == currentUser?._id ? "currentUser__chatMessageTime":"otherUser__chatMessageTime"}`}>{getDate(message.date)}</div>

          </div>
        </>
      );
    })}
</div>
</div>
<form
className="d-flex justify-cotent-center align-items-center"
action=""
onSubmit={sendMessage}
>
<input
  id="contained-button-file"
  style={{ width: "-webkit-fill-available", height: "40px" }}
  type="text"
  placeholder="Type your message.."
  value={newMessage}
  required="true"
  onChange={(e) => setNewMessage(e.target.value)}
/>
<div className="d-flex my-3">
  {/* <input
  type="file"          
  id="file"
  
    value={null}
  onChange={(e) => setImg(e.target.files[0])}
/> */}
  <button onSubmit={sendMessage} className="btn btn-secondary"  style={{ borderRadius: "0px" }}>
    Send
  </button>
</div>
</form>
</>
      )}
    </>
  );
};

export default ChatContainer;
