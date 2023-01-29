// react
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/state";

// library
import { Button, Table } from "@nextui-org/react";

// icons
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

// components
import DeleteEntryModal from "../modals/EntryModal/DeleteEntryModal";
import UpdateEntryModal from "../modals/EntryModal/UpdateEntryModal";

const FilterTable = ({ user, expenses, loadingUser }) => {
  // console.log("checking table", user, expenses, loadingUser);

  const { getLabelColor } = useAppContext();

  const [showEntryModal, setShowEntryModal] = useState(false);
  const entryHandler = () => setShowEntryModal(true);
  const closeEntryHandler = () => {
    setShowEntryModal(false);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteHandler = () => setShowDeleteModal(true);
  const closeDeleteHandler = () => {
    setShowDeleteModal(false);
  };

  const [selectedID, setSelectedID] = useState(null);

  // useEffect(() => {
  //   expenses.map((expenseItem, idx) =>
  //     [...user.Expenses]
  //       .sort((a, b) => Date.parse(b.CreatedAt) - Date.parse(a.CreatedAt))
  //       .filter((item) => {
  //         console.log(
  //           "check",
  //           expenseItem.CreatedAt.split("T")[0],
  //           item.CreatedAt.split("T")[0]
  //         );
  //         return (
  //           expenseItem.CreatedAt.split("T")[0] === item.CreatedAt.split("T")[0]
  //         );
  //       })
  //       .map((item, key) => {
  //         console.log(key);
  //       })
  //   );
  // }, []);

  return (
    <>
      {[...expenses].map((expenseItem, idx) => (
        <>
          <h2
            style={{ color: "rgba(0, 0, 0, 0.6)" }}
            className="expense-table-title"
          >
            {expenseItem.date.split("-").reverse().join("-")}
          </h2>
          <Table
            bordered
            css={{
              height: "auto",
              width: "auto",
            }}
            selectionMode="single"
            aria-label="Table for expenses by the user"
          >
            <Table.Header>
              <Table.Column align="center">TITLE</Table.Column>
              <Table.Column align="center">LABEL</Table.Column>
              <Table.Column align="center">EXPENSES</Table.Column>
              <Table.Column align="center">MODIFY</Table.Column>
            </Table.Header>
            <Table.Body
              css={{
                zIndex: 1,
              }}
            >
              {loadingUser ? (
                <Table.Row css={{ textAlign: "center" }} key={1}>
                  <Table.Cell> </Table.Cell>
                  <Table.Cell>Loading</Table.Cell>
                  <Table.Cell> </Table.Cell>
                  <Table.Cell> </Table.Cell>
                </Table.Row>
              ) : (
                [...expenseItem.Expenses].map((item, key) => (
                  <Table.Row css={{ textAlign: "center" }} key={key}>
                    <Table.Cell>
                      {item.title.length > 12
                        ? item.title.slice(0, 12) + "..."
                        : item.title}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        css={{ display: "inline", bg: getLabelColor(item) }}
                      >
                        {item.label}
                      </Button>
                    </Table.Cell>
                    <Table.Cell>{"₹" + item.expend_amount}</Table.Cell>
                    <Table.Cell>
                      <button
                        type="button"
                        className="icon-btn update"
                        onClick={() => {
                          setSelectedID(item.Expense_ID);
                          entryHandler();
                        }}
                      >
                        <AiFillEdit className="icon" />
                      </button>
                      <button
                        type="button"
                        className="icon-btn delete"
                        onClick={() => {
                          setSelectedID(item.Expense_ID);
                          deleteHandler();
                        }}
                      >
                        <AiFillDelete className="icon" />
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </>
      ))}
      <UpdateEntryModal
        visible={showEntryModal}
        closeHandler={closeEntryHandler}
        expenseID={selectedID}
      />

      <DeleteEntryModal
        visible={showDeleteModal}
        closeHandler={closeDeleteHandler}
        expenseID={selectedID}
      />
    </>
  );
};

export default FilterTable;
