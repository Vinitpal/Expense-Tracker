import { Table } from "@nextui-org/react";

export default function ExpenseTable() {
  const arr = [
    {
      time: "today",
      title: "biryani",
      label: "food",
      expenses: 200,
    },
    {
      time: "tomorrow",
      title: "chai",
      label: "food",
      expenses: 20,
    },
    {
      time: "today",
      title: "biryani",
      label: "food",
      expenses: 200,
    },
    {
      time: "today",
      title: "biryani",
      label: "food",
      expenses: 200,
    },
  ];

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
        {[...arr].map((item, key) => (
          <Table.Row key="key">
            <Table.Cell>{item.time}</Table.Cell>
            <Table.Cell>{item.title}</Table.Cell>
            <Table.Cell>{item.label}</Table.Cell>
            <Table.Cell>{item.expenses}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
