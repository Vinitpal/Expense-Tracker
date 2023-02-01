// react
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/state";

// library
import { Modal, Button, Text } from "@nextui-org/react";
import { allPriceRanges } from "../../../util";

const PriceFilterModal = ({
  visible,
  closeHandler,
  currentPriceRange,
  setCurrentPriceRange,
}) => {
  const { fetchUser } = useAppContext();

  const filterPrice = async () => {
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
            Price Range
          </Text>
        </Text>
      </Modal.Header>

      <Modal.Body
        css={{
          height: "200px",
        }}
        className="filter-modal-body"
      >
        {[...allPriceRanges].map((item, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentPriceRange(item)}
            style={{
              backgroundColor:
                item.title === currentPriceRange.title ? "#17c964" : "",
              color: item.title === currentPriceRange.title ? "#ffffff" : "",
            }}
          >
            {item.title}
          </div>
        ))}
        <div
          onClick={() => setCurrentPriceRange("Clear")}
          style={{
            backgroundColor: "Clear" === currentPriceRange ? "#17c964" : "",
            color: "Clear" === currentPriceRange ? "#ffffff" : "",
          }}
        >
          {"Clear Price Filter"}
        </div>
      </Modal.Body>

      <Modal.Footer justify="center">
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto color="success" onPress={closeHandler}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PriceFilterModal;
