// react and components
import React from "react";
import { useAppContext } from "../../../context/state";
import { allMonths, allPriceRanges } from "../../../util";

// lib
import { BiCoinStack } from "react-icons/bi";
import { MdLabelOutline } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { Modal, Button, Text, Collapse } from "@nextui-org/react";

const MobileFilterModal = ({
  visible,
  closeHandler,
  currentMonth,
  currentLabel,
  currentPriceRange,
  setCurrentMonth,
  setCurrentLabel,
  setCurrentPriceRange,
}) => {
  const { labelArr } = useAppContext();

  return (
    <>
      <Modal
        fullScreen
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Select{" "}
            <Text b size={18}>
              Filter
            </Text>
          </Text>
        </Modal.Header>

        <Modal.Body
          css={{
            height: "200px",
          }}
          className="filter-modal-body-mobile"
        >
          {/*----- Month -----*/}
          <Collapse
            shadow
            bordered
            title={currentMonth === "Clear" ? "Month" : currentMonth}
            contentLeft={
              <AiOutlineCalendar
                style={{ fontSize: "1.2rem", marginBottom: "2px" }}
              />
            }
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
                {item.slice(0, 3)}
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
          </Collapse>

          {/*----- Label -----*/}
          <Collapse
            shadow
            bordered
            title={currentLabel === "Clear" ? "Label" : currentLabel}
            contentLeft={
              <MdLabelOutline
                style={{ fontSize: "1.2rem", marginBottom: "2px" }}
              />
            }
          >
            {[...labelArr].map((item, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentLabel(item.name)}
                style={{
                  backgroundColor: item.name === currentLabel ? "#17c964" : "",
                  color: item.name === currentLabel ? "#ffffff" : "",
                }}
              >
                {item.name}
              </div>
            ))}
            <div
              onClick={() => setCurrentLabel("Clear")}
              style={{
                backgroundColor: "Clear" === currentLabel ? "#17c964" : "",
                color: "Clear" === currentLabel ? "#ffffff" : "",
              }}
            >
              {"Clear Label Filter"}
            </div>
          </Collapse>

          {/*----- Price filter  -----*/}
          <Collapse
            shadow
            bordered
            title={
              currentPriceRange === "Clear"
                ? "Price Range"
                : currentPriceRange.title
            }
            contentLeft={
              <BiCoinStack
                style={{ fontSize: "1.2rem", marginBottom: "2px" }}
              />
            }
          >
            {[...allPriceRanges].map((item, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentPriceRange(item)}
                style={{
                  backgroundColor:
                    item.title === currentPriceRange.title ? "#17c964" : "",
                  color:
                    item.title === currentPriceRange.title ? "#ffffff" : "",
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
          </Collapse>
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
      {/* dropdown */}
      {/* inside it we have list of options in row & column to select */}
    </>
  );
};

export default MobileFilterModal;
