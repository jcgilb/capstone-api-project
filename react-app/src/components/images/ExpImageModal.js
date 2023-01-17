import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ExpImage2 from "./ExpImage2";

function ExpImageModal() {
  const [showModal, setShowModal] = useState(false);

  const myStyles = {
    background: "none",
    boxSizing: "border-box",
    border: "1px solid white",
    padding: "6px",
    borderRadius: "3px",
    color: "white",
    fontSize: "14.5px",
  };

  return (
    <>
      <button style={myStyles} onClick={() => setShowModal(true)}>
        Choose
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ExpImage2 />
        </Modal>
      )}
    </>
  );
}

export default ExpImageModal;
