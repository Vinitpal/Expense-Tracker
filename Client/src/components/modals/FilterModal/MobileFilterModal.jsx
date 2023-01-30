import React from "react";
import { Modal, Button, Text, Collapse } from "@nextui-org/react";
import { allMonths, allPriceRanges } from "../../../util";
import { useAppContext } from "../../../context/state";

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
          className="filter-modal-body"
        >
          <Collapse.Group>
            {/* Month */}
            <Collapse title="Option A">
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
                // onClick={() => setCurrentMonth("Clear")}
                style={{
                  backgroundColor: "Clear" === currentMonth ? "#17c964" : "",
                  color: "Clear" === currentMonth ? "#ffffff" : "",
                }}
              >
                {"Clear Month Filter"}
              </div>
            </Collapse>

            {/* Label */}
            <Collapse title="Option B">
              {[...labelArr].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentLabel(item.name)}
                  style={{
                    backgroundColor:
                      item.name === currentLabel ? "#17c964" : "",
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

              {/* Price filter  */}
            </Collapse>
            <Collapse title="Option C">
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
                  backgroundColor:
                    "Clear" === currentPriceRange ? "#17c964" : "",
                  color: "Clear" === currentPriceRange ? "#ffffff" : "",
                }}
              >
                {"Clear Price Filter"}
              </div>
            </Collapse>
          </Collapse.Group>
        </Modal.Body>

        <Modal.Footer justify="center">
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            color="success"
            //   onPress={() => filterLabel()}
          >
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
