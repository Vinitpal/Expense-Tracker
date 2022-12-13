import { Button, Table } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function ExpenseTable() {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingUser(true);
      const res = await fetch(
        `http://localhost:8080/user/a038c272-c533-44d0-896c-a684974b4231`
      );
      const data = await res.json();
      console.log(
        data.Expenses.sort(
          (a, b) => Date.parse(a.CreatedAt) - Date.parse(b.CreatedAt)
        )
      );
      console.log(
        data.Expenses[0].CreatedAt.split("T")[0].split("-").reverse().join("-")
      );
      setUser(data);
      setLoadingUser(false);
    };

    fetchUser();
  }, []);

  return (
    <Table
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="single"
    >
      <Table.Header>
        <Table.Column>TIME</Table.Column>
        <Table.Column>TITLE</Table.Column>
        <Table.Column>LABEL</Table.Column>
        <Table.Column>EXPENSES</Table.Column>
      </Table.Header>
      <Table.Body>
        {user && user.length > 0 ? (
          <Table.Row key={1}>
            <Table.Cell>{"loading"}</Table.Cell>
            <Table.Cell>{"load213ing"}</Table.Cell>
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
            <Table.Row key={key}>
              <Table.Cell>
                {item.CreatedAt.split("T")[0].split("-").reverse().join("-")}
              </Table.Cell>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>
                <Button color="primary">{item.label}</Button>
              </Table.Cell>
              <Table.Cell>{item.expend_amount}</Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  );
}
