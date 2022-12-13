import React, { useState } from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import { HiOutlineCurrencyRupee } from "react-icons/hi";

const UpdateBalanceModal = ({
  visible,
  closeHandler,
  setUser,
  setShowBalanceModal,
}) => {
  const [newBalance, setBalance] = useState();

  const updateCurrentBalance = async () => {
    try {
      const body = { Balance: +newBalance };
      console.log(body);
      const response = await fetch(
        `http://localhost:8080/user/a038c272-c533-44d0-896c-a684974b4231`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      setUser(response.json());
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
          onChange={(e) => setBalance(e.target.value)}
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
        <Button auto color="success" onPress={updateCurrentBalance}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateBalanceModal;
