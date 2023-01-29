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

const ExpenseTable = () => {
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
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState(null);
  const { user, labelArr, loadingUser, getLabelColor } = useAppContext();

  const navigate = useNavigate();
  console.log(labelArr);

  useEffect(() => {
    // calculating today's expenses
    if (!loadingUser) {
      const date = new Date().toJSON().slice(0, 10);

      const todaysExpenses = user.Expenses.filter(
        (item) => item.CreatedAt.split("T")[0] === date
      );

      console.log(date, user.Expenses);
      console.log(todaysExpenses);

      setExpenses(todaysExpenses);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [loadingUser, user]);

  return (
    <>
      <h2 className="expense-table-title">Todays Expenses: </h2>
      <Table
        bordered
        css={{
          height: "auto",
          width: "auto",
        }}
        selectionMode="single"
        aria-label="Table for expenses by the user"
        className="expense-table-container"
      >
        <Table.Header>
          <Table.Column align="center" className="time-column">
            TIME
          </Table.Column>
          <Table.Column align="center" className="title-column">
            TITLE
          </Table.Column>
          <Table.Column align="center" className="label-column">
            LABEL
          </Table.Column>
          <Table.Column align="center">EXPENSES</Table.Column>
          <Table.Column align="center">MODIFY</Table.Column>
        </Table.Header>
        <Table.Body
          css={{
            zIndex: 1,
          }}
        >
          {(loading && !expenses) || expenses.length === 0 ? (
            <Table.Row css={{ textAlign: "center" }} key={1}>
              <Table.Cell> </Table.Cell>
              <Table.Cell> </Table.Cell>
              <Table.Cell> No Entry added today </Table.Cell>
              <Table.Cell> </Table.Cell>
              <Table.Cell> </Table.Cell>
            </Table.Row>
          ) : (
            [
              ...expenses.sort(
                (a, b) => Date.parse(b.CreatedAt) - Date.parse(a.CreatedAt)
              ),
            ].map((item, key) => (
              <Table.Row
                className="sadsad"
                css={{ textAlign: "center" }}
                key={key}
              >
                <Table.Cell aria-label="time-row">
                  {item.CreatedAt.split("T")[0].split("-").reverse().join("-") +
                    " | " +
                    item.CreatedAt.split("T")[1].split("+")[0]}
                </Table.Cell>
                <Table.Cell>
                  {item.title.length > 12
                    ? item.title.slice(0, 12) + "..."
                    : item.title}
                </Table.Cell>
                <Table.Cell className="label-row">
                  <Button
                    css={{
                      display: "inline",
                      bg: getLabelColor(item),
                    }}
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

      <div className="show-all-expenses">
        <p onClick={() => navigate("/all-expenses")}>
          Click here to view all expenses
        </p>
      </div>
    </>
  );
};

export default ExpenseTable;
