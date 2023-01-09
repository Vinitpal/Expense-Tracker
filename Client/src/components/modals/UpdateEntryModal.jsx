import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { API_PATH } from "../../Path";
import axios from "axios";
import { getExpenseData, getUserData } from "../../util";

const UpdateEntryModal = ({
  user,
  setUser,
  visible,
  closeHandler,
  expenseID,
  setShowEntryModal,
}) => {
  const [title, setTitle] = useState();
  const [label, setLabel] = useState();
  const [expendAmount, setExpendAmount] = useState();
  const [expenseData, setExpenseData] = useState();

  const fetchExpenseData = async () => {
    const data = await getExpenseData(expenseID);
    console.log(data);
    setExpenseData(data);
  };

  useEffect(() => {
    fetchExpenseData();
  }, [expenseID]);

  const updateEntry = async () => {
    try {
      // create new expense api call
      const body = JSON.stringify({
        title,
        label,
        expend_amount: +expendAmount,
      });
      console.log(body);

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      const response = await axios.put(
        `${API_PATH}/expense/${expenseID}`,
        body,
        { mode: "cors" },
        { headers }
      );

      console.log("working, response: ", response.data);

      // refetch and show updated data
      const data = await getUserData(user.User_ID);
      fetchExpenseData();
      setUser(data);

      // close modal
      setShowEntryModal(false);
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
            Entry?
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
          value={expenseData ? expenseData.title : "title"}
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
          value={expenseData ? expenseData.label : "label"}
        />
        {/* Enter Expenses */}
        <Input
          bordered
          fullWidth
          onChange={(e) => setExpendAmount(Math.abs(e.target.value))}
          color="primary"
          type={"number"}
          label="Expenses"
          value={expenseData ? expenseData.expend_amount : "Expend Amount"}
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
