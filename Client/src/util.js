export const getUserData = async (id) => {
  const userData = await fetch(`http://localhost:8080/user/${id}`);
  const data = await userData.json();
  return data;
};

export const getExpenseData = async (id) => {
  const expenseData = await fetch(`http://localhost:8080/expense/${id}`);
  const data = await expenseData.json();
  return data;
};
