// react
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/state";

// library
import { Modal, Button, Text } from "@nextui-org/react";

const LabelFilterModal = ({
  visible,
  closeHandler,
  currentLabel,
  setCurrentLabel,
}) => {
  const { fetchUser, labelArr } = useAppContext();

  const allLabels = ["Food", "Shopping", "Petrol", "Studies"];

  const filterLabel = async () => {
    console.log("checking");
  };

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Pick a{" "}
          <Text b size={18}>
            Label
          </Text>
        </Text>
      </Modal.Header>

      <Modal.Body
        css={{
          height: "200px",
        }}
        className="filter-modal-body"
      >
        {[...labelArr].map((item, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentLabel(item.name)}
            style={{
              backgroundColor: item.name === currentLabel ? "#17c964" : "",
              color: item.name === currentLabel ? "#ffffff" : "",
            }}
          >
            {item.name}
          </div>
        ))}
      </Modal.Body>

      <Modal.Footer justify="center">
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto color="success" onPress={() => filterLabel()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LabelFilterModal;
