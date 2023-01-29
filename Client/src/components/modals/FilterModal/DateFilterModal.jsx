// react
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/state";

// library
import moment from "moment";
import { Modal, Button, Text } from "@nextui-org/react";
import { allMonths } from "../../../util";

const DateFilterModal = ({
  visible,
  closeHandler,
  currentMonth,
  setCurrentMonth,
}) => {
  const { fetchUser } = useAppContext();

  const filterDate = async () => {
    // -> default month selected would be current month
    // -> modal will have all month lined up

    // when a month is selected and confirm is called then this function will fire
    // which will reconstruct the object according to newly selected month
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
            Month
          </Text>
        </Text>
      </Modal.Header>

      <Modal.Body
        css={{
          height: "200px",
        }}
        className="filter-modal-body"
      >
        {[...allMonths].map((item, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentMonth(item)}
            style={{
              backgroundColor: item === currentMonth ? "#17c964" : "",
              color: item === currentMonth ? "#ffffff" : "",
            }}
          >
            {item}
          </div>
        ))}
        <div
          onClick={() => setCurrentMonth("Clear")}
          style={{
            backgroundColor: "Clear" === currentMonth ? "#17c964" : "",
            color: "Clear" === currentMonth ? "#ffffff" : "",
          }}
        >
          {"Clear Month Filter"}
        </div>
      </Modal.Body>

      <Modal.Footer justify="center">
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto color="success" onPress={() => filterDate()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DateFilterModal;
