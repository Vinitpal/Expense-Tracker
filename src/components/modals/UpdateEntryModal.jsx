import React, { useState } from "react";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { API_PATH } from "../../Path";
import axios from "axios";

const UpdateEntryModal = ({
  visible,
  closeHandler,
  setUser,
  setShowBalanceModal,
}) => {
  const [newBalance, setBalance] = useState();

  const updateEntry = async () => {
    try {
      const body = JSON.stringify({ Balance: +newBalance });
      console.log(body);

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      const response = await axios.put(
        `${API_PATH}/user/a038c272-c533-44d0-896c-a684974b4231`,
        body,
        { mode: "cors" },
        { headers }
      );

      console.log("working, response: ", response.data);
      setUser(response.data);
      setShowBalanceModal(false);
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
          Update your{" "}
          <Text b size={18}>
            Entry
          </Text>
        </Text>
      </Modal.Header>

      <Modal.Body>
        {/* Enter New Title */}
        <Input
          clearable
          bordered
          fullWidth
          //   onChange={(e) => setBalance(e.target.value)}
          color="primary"
          type={"text"}
          label="Title"
          placeholder="Enter new title"
        />
        {/* Enter New Label */}
        <Input
          clearable
          bordered
          fullWidth
          //   onChange={(e) => setBalance(e.target.value)}
          color="primary"
          type={"text"}
          label="Label"
          placeholder="Enter new label"
        />
        {/* Enter Expenses */}
        <Input
          clearable
          bordered
          fullWidth
          //   onChange={(e) => setBalance(e.target.value)}
          color="primary"
          type={"number"}
          label="Expenses"
          placeholder="Enter new expend amount"
        />
      </Modal.Body>
      <Modal.Footer justify="center">
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto color="success" onPress={() => updateEntry()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateEntryModal;
