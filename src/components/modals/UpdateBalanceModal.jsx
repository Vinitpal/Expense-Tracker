import React, { useState } from "react";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { API_PATH } from "../../Path";
import axios from "axios";

const UpdateBalanceModal = ({
  visible,
  closeHandler,
  setUser,
  setShowBalanceModal,
}) => {
  const [newBalance, setBalance] = useState();

  const updateCurrentBalance = async () => {
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
            Balance
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          onChange={(e) => setBalance(Math.abs(e.target.value))}
          color="primary"
          type={"number"}
          placeholder="Enter new amount"
          contentLeft={<HiOutlineCurrencyRupee />}
          contentLeftStyling={true}
        />
      </Modal.Body>
      <Modal.Footer justify="center">
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto color="success" onPress={() => updateCurrentBalance()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateBalanceModal;
