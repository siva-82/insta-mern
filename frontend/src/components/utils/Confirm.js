import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const Confirm = ({ showModal, handleCancel, deletePostHandler, data }) => {
  return (
    <Modal show={showModal} onHide={handleCancel}>
      <Modal.Header>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are You Sure to Delete this {data} </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={deletePostHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirm;
