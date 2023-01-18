import { Button, Table } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { getUserData } from "../../util";
import DeleteEntryModal from "../modals/DeleteEntryModal";
import UpdateEntryModal from "../modals/UpdateEntryModal";

export default function ExpenseTable({ user, loadingUser, setUser }) {
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState(null);
  const entryHandler = () => setShowEntryModal(true);
  const deleteHandler = () => setShowDeleteModal(true);

  const closeEntryHandler = () => {
    setShowEntryModal(false);
    console.log("closed");
  };

  const closeDeleteHandler = () => {
    setShowDeleteModal(false);
    console.log("closed");
  };

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
      >
        <Table.Header>
          <Table.Column align="center">TIME</Table.Column>
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
              <Table.Row css={{ textAlign: "center" }} key={key}>
                <Table.Cell>
                  {item.CreatedAt.split("T")[0].split("-").reverse().join("-") +
                    " | " +
                    item.CreatedAt.split("T")[1].split("+")[0]}
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>
                  <Button css={{ display: "inline" }} color="primary">
                    {item.label}
                  </Button>
                </Table.Cell>
                <Table.Cell>{item.expend_amount}</Table.Cell>
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
        setShowEntryModal={setShowEntryModal}
        expenseID={selectedID}
        user={user}
        setUser={setUser}
      />
      <DeleteEntryModal
        visible={showDeleteModal}
        closeHandler={closeDeleteHandler}
        setShowDeleteModal={setShowDeleteModal}
        expenseID={selectedID}
        user={user}
        setUser={setUser}
      />
      <div className="show-all-expenses">
        <p>
          Click here to view all expenses
          <div class="arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </p>
      </div>
    </>
  );
}
