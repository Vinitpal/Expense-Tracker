// react
import React from "react";
import { API_PATH } from "../../../Path";
import { useAppContext } from "../../../context/state";

// library
import axios from "axios";
import { Modal, Button, Text } from "@nextui-org/react";

const DeleteEntryModal = ({ visible, closeHandler, expenseID }) => {
  const { userID, setUser, fetchUser } = useAppContext();

  const deleteEntry = async () => {
    try {
      console.log(expenseID);
      const response = await axios.delete(`${API_PATH}/expense/${expenseID}`);

      const data = await fetchUser(userID);
      setUser(data);

      closeHandler();
    } catch (error) {
      console.log(error);
    }
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
          Are you sure you want to delete this{" "}
          <Text b size={18}>
            Entry?
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Footer justify="center">
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto color="success" onPress={() => deleteEntry()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteEntryModal;
