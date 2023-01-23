// react
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/state";

// library
import { Modal, Button, Text } from "@nextui-org/react";

const PriceFilterModal = ({
  visible,
  closeHandler,
  currentPriceRange,
  setCurrentPriceRange,
}) => {
  const { fetchUser } = useAppContext();

  const allPriceRanges = [
    {
      start: 0,
      end: 100,
      title: "₹0 - ₹100",
    },
    {
      start: 100,
      end: 500,
      title: "₹100 - ₹500",
    },
    {
      start: 500,
      end: 1000,
      title: "₹500 - ₹1000",
    },
    {
      start: 1000,
      end: 2000,
      title: "₹1K - ₹2K",
    },
    {
      start: 2000,
      end: 999999999,
      title: "₹2K+",
    },
  ];

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
            onClick={() => setCurrentPriceRange(item.title)}
            style={{
              backgroundColor:
                item.title === currentPriceRange ? "#17c964" : "",
              color: item.title === currentPriceRange ? "#ffffff" : "",
            }}
          >
            {item.title}
          </div>
        ))}
      </Modal.Body>

      <Modal.Footer justify="center">
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto color="success" onPress={() => filterPrice()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PriceFilterModal;
