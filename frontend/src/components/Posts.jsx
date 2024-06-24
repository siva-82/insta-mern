import React from "react";
import Post from "./Post";
import Comments from "./Comments";
import { Container, Row } from "react-bootstrap";

const Posts = ({ post }) => {
  return (
    <>
      <Container>
        <Row className=" post">
          {post && <Post post={post} />}
          <Comments comments={post?.comments} />
        </Row>
      </Container>
    </>
  );
};

export default Posts;
