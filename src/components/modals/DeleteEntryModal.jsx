import React from "react";
import { Modal, Button, Text } from "@nextui-org/react";
import { API_PATH } from "../../Path";
import axios from "axios";
import { getUserData } from "../../util";

const DeleteEntryModal = ({
  user,
  visible,
  closeHandler,
  setUser,
  setShowDeleteModal,
  expenseID,
}) => {
  const deleteEntry = async () => {
    try {
      console.log(expenseID, user);
      const response = await axios.delete(`${API_PATH}/expense/${expenseID}`);
      setShowDeleteModal(false);

      const data = await getUserData(user.User_ID);
      setUser(data);
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
