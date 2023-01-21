// react
import { API_PATH } from "../../Path";
import React, { useState } from "react";
import { useAppContext } from "../../context/state";

// library
import axios from "axios";
import { Modal, Input, Button, Text } from "@nextui-org/react";

const AddEntryModal = ({ visible, closeHandler }) => {
  const [title, setTitle] = useState();
  const [label, setLabel] = useState();
  const [expendAmount, setExpendAmount] = useState();

  const { user, setUser, fetchUser } = useAppContext();

  const addEntry = async () => {
    try {
      // create new expense api call
      const body = JSON.stringify({
        title,
        label,
        expend_amount: +expendAmount,
        User_ID: user.User_ID,
      });
      console.log(body);

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      const response = await axios.post(
        `${API_PATH}/expense`,
        body,
        { mode: "cors" },
        { headers }
      );

      console.log("working, response: ", response.data);

      // refetch and show updated data
      const data = await fetchUser();
      setUser(data);

      // close modal
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
          Add new{" "}
          <Text b size={18}>
            Entry
          </Text>
        </Text>
      </Modal.Header>

      <Modal.Body>
        {/* Enter New Title */}
        <Input
          bordered
          fullWidth
          onChange={(e) => {
            const str = e.target.value;
            const value = str.charAt(0).toUpperCase() + str.slice(1);
            setTitle(value);
          }}
          color="primary"
          type={"text"}
          label="Title"
          placeholder="Enter new title"
        />
        {/* Enter New Label */}
        <Input
          bordered
          fullWidth
          onChange={(e) => {
            const str = e.target.value;
            const value = str.charAt(0).toUpperCase() + str.slice(1);
            setLabel(value);
          }}
          color="primary"
          type={"text"}
          label="Label"
          placeholder="Enter new label"
        />
        {/* Enter Expenses */}
        <Input
          bordered
          fullWidth
          onChange={(e) => setExpendAmount(Math.abs(e.target.value))}
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
        <Button auto color="success" onPress={() => addEntry()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEntryModal;
