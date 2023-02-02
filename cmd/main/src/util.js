export const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const allPriceRanges = [
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

export const capitalize = (str) => {
  const value = str.charAt(0).toUpperCase() + str.slice(1);
  return value;
};
