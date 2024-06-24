import React from "react";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom';
import { useEditPostMutation } from "../slices/postSlice";

import FormContainer from "./FormContainer";
import { useNavigate } from "react-router-dom";

const FormUpdate = ({ singlePost }) => {
  const {
    _id: id,
    title: initialTitle,
    image: initialImage,
    description: initialDescription,
    user,
  } = singlePost;
  // console.log(id,initialTitle,initialImage,initialDescription)
  const [image, setImage] = useState(initialImage);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const navigate = useNavigate();

  const imgHandle = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const [editPost, { isError, isLoading }] = useEditPostMutation() || {};

  const submitPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("user", user);
    formData.append("description", description);

    for (let [key, value] of formData) {
      console.log("formdataloop", `${key}: ${value}`);
    }

    try {
      const res = await editPost({ id: id, data: formData });

      console.log("submitHandler res try" + JSON.stringify(res));
    } catch (err) {
      console.log("submitHandler res catch" + e?.data?.message || err);
    }

    navigate("/Home");
  };

  return (
    <FormContainer>
      <h1>POST Update</h1>
      <Form onSubmit={submitPost}>
        <Form.Group className="my-2" controlId="description">
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="image">
          <Form.Control
            type="file"
            //   value={image}
            placeholder="choose image"
            onChange={imgHandle}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          className="mt-3 w-100 border-0"
          style={{ backgroundColor: "#0095F6" }}
        >
          {!isLoading ? (
            "Post"
          ) : (
            <Spinner
              className="mx-3 h-1 spinner-border text-light"
              style={{ height: "20px", width: "20px" }}
            />
          )}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default FormUpdate;
