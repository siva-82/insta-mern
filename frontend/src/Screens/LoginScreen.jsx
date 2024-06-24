import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("john@gmail.com");
  const [password, setPassword] = useState("john");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo, isLoadingUser } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      if (res) {
        dispatch(setCredentials(res));
      }

      navigate("/Home");
    } catch (err) {
      console.log(" catch" + err?.data?.message || err);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="Password">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          className="mt-3 w-100 border-0"
          style={{ backgroundColor: "#0095F6" }}
        >
          Sign In{" "}
          {isLoading && (
            <Spinner
              className="mx-2"
              style={{ height: "25px", width: "25px" }}
              animation="border"
            />
          )}
        </Button>

        <Row className="py-3">
          <Col>
            Don't have an account? <Link to="/register">Sign up</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default Login;

// "server":{
//   "port":3000,
//   "proxy":{
//     "/api":{
//       "target":"http://localhost:5000",
//       "changeOrigin":"true"
//     }
//   }
// }
