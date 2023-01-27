// react
import { API_PATH } from "../../../Path";
import React, { useState } from "react";
import { useAppContext } from "../../../context/state";

// library
import axios from "axios";
import { Modal, Input, Button, Text, Dropdown } from "@nextui-org/react";
import { capitalize } from "../../../util";

const AddEntryModal = ({ visible, closeHandler, label, setLabel }) => {
  const [title, setTitle] = useState();
  const [newLabel, setNewLabel] = useState("");
  const [expendAmount, setExpendAmount] = useState();

  const { user, setUser, fetchUser, labelArr, setLabelArr, fetchLabel } =
    useAppContext();

  console.log(label.currentKey);

  const addEntry = async () => {
    try {
      // create new expense api call
      const body = JSON.stringify({
        title,
        label: label.currentKey === "AddLabel" ? newLabel : label.currentKey,
        expend_amount: +expendAmount,
        User_ID: user.User_ID,
      });
      console.log(body);

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      if (newLabel !== "") {
        const createLabel = await axios.post(
          `${API_PATH}/label`,
          JSON.stringify({ name: newLabel }),
          { mode: "cors" },
          { headers }
        );
        console.log("working, response: ", createLabel.data);
        setNewLabel("");
      }

      const response = await axios.post(
        `${API_PATH}/expense`,
        body,
        { mode: "cors" },
        { headers }
      );

      console.log("working, response: ", response.data);

      // refetch and show updated data
      const data = await fetchUser();
      const labelData = await fetchLabel();
      setUser(data);
      setLabelArr(labelData);

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

        {/* Enter New Label */}

        <p className="label-heading">Label</p>
        {label.currentKey === "AddLabel" ? (
          <Input
            aria-label="label"
            bordered
            fullWidth
            onChange={(e) => {
              const value = capitalize(e.target.value);
              setNewLabel(value);
            }}
            color="primary"
            type={"text"}
            placeholder="Enter new label"
          />
        ) : (
          <Dropdown>
            <Dropdown.Button
              bordered
              color="primary"
              css={{ tt: "capitalize" }}
            >
              {label}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Dynamic Actions"
              selectionMode="single"
              selectedKeys={label}
              onSelectionChange={setLabel}
            >
              {[...labelArr].map((item, idx) => (
                <Dropdown.Item key={capitalize(item.name)}>
                  {capitalize(item.name)}
                </Dropdown.Item>
              ))}
              <Dropdown.Item key="AddLabel" withDivider color="success">
                Add New Label
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}

        {/* ---- */}
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
