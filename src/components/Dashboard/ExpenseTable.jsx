import { Button, Table } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import DeleteEntryModal from "../modals/DeleteEntryModal";
import UpdateEntryModal from "../modals/UpdateEntryModal";

export default function ExpenseTable({ user, loadingUser, setUser }) {
  const [showEntryModal, setShowEntryModal] = useState(false);
  const entryHandler = () => setShowEntryModal(true);

  const closeEntryHandler = () => {
    setShowEntryModal(false);
    console.log("closed");
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteHandler = () => setShowDeleteModal(true);

  const closeDeleteHandler = () => {
    setShowDeleteModal(false);
    console.log("closed");
  };

  return (
    <>
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
          {user && user.length > 0 ? (
            <Table.Row key={1}>
              <Table.Cell>{"loading"}</Table.Cell>
              <Table.Cell>{"load213ing"}</Table.Cell>
              <Table.Cell>{"loading"}</Table.Cell>
              <Table.Cell>{"loading"}</Table.Cell>
              <Table.Cell>{"loading"}</Table.Cell>
            </Table.Row>
          ) : (
            !loadingUser &&
            [
              ...user.Expenses.sort(
                (a, b) => Date.parse(b.CreatedAt) - Date.parse(a.CreatedAt)
              ),
            ].map((item, key) => (
              <Table.Row
                css={{ textAlign: "center" }}
                key={key}
                onClick={() => console.log("does it work?")}
              >
                <Table.Cell>
                  {item.CreatedAt.split("T")[0].split("-").reverse().join("-")}
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>
                  <Button css={{ display: "inline" }} color="primary">
                    {item.label}
                  </Button>
                </Table.Cell>
                <Table.Cell>{item.expend_amount}</Table.Cell>
                <Table.Cell css={{ width: "50px" }}>
                  <button
                    type="button"
                    className="icon-btn update"
                    onClick={entryHandler}
                  >
                    <AiFillEdit className="icon" />
                  </button>
                  <button
                    type="button"
                    className="icon-btn delete"
                    onClick={deleteHandler}
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
        setUser={setUser}
      />
      <DeleteEntryModal
        visible={showDeleteModal}
        closeHandler={closeDeleteHandler}
        setShowDeleteModal={setShowDeleteModal}
        setUser={setUser}
      />
    </>
  );
}
