import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import { useAddPostMutation } from "../slices/postSlice";

const PostUpload = () => {
  const { userInfo, isLoadingUser } = useSelector((state) => state?.auth);

  const [addPost, { isError, isLoading }] = useAddPostMutation() || {};

  const [description, setDescription] = useState("earth");
  const [title, setTitle] = useState();
  const [image, setImage] = useState();

  const imgHandle = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("userName", userInfo.name);
    formData.append("email", userInfo.email);
    formData.append("userId", userInfo._id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const res = await addPost(formData).unwrap();
      console.log(res);
    } catch (err) {
      console.log(" catch" + e?.data?.message || err);
    }
  };

  return (
    <FormContainer>
      <h1>POST</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="description">
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="description">
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="image">
          <Form.Control
            type="file"
            placeholder="choose image"
            onChange={imgHandle}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          className="mt-3 w-100 border-0"
          style={{ backgroundColor: "#0095F6" }}
        >
          Post
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PostUpload;
