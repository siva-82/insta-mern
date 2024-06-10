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

  // const [chatId,setChatId]=useState('')
  const { userInfo: currentUser, isLoadingUser } = useSelector(
    (state) => state.auth
  );
  const { chatId, newUser } = useSelector((state) => state.auth);
  const [users] = useState([
    "6649f547c39c0fb7fd9c015c",
    "664cb30368daa91ee2604156",
    "6505df9ce542653ac739fcf8",
    "6616679951b5b24cd741507a",
    "664cb1e5e0e1279fcea7efd6",
  ]);

  const refScroll = useRef();

  console.log("newUser", newUser);
  console.log("currentUser", currentUser?._id);
  console.log("chatId", chatId);
  console.log("newMessage", newMessage);
  console.log("chatId", chatId);

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
    console.log("sendMEssage");
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      console.log("uploadTask", uploadTask);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
          console.log("uploadTask err", error);
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
      console.log("else");
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
  console.log("imgggggggggggg", img);
  console.log("messagesssssss", messages);

  useEffect(() => {
    refScroll.current?.scrollIntoView({ overscrollBehavior: "none" });
  }, [messages]);
  return (
    <>
      <div className="h-100 d-flex flex-column justify-content-between">
        {/* {users.map((u)=><div  onClick={handleSelectUser}>{u}</div>)} */}
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
                    className={`d-flex w-100 flex-column  align-items-${
                      message.senderId == currentUser?._id ? "end" : "start"
                    }`}
                  >
                    <p
                      style={{
                        color: "white",
                        padding: "5px",
                        borderRadius: "5px",
                        background: `${
                          message.senderId == currentUser?._id ? "blue" : "red"
                        }`,
                      }}
                    >
                      {message.text}
                    </p>
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
          <button className="btn btn-secondary"  style={{ borderRadius: "0px" }}>
            Send{" "}
          </button>
        </div>
      </form>
    </>
  );
};

export default ChatContainer;
