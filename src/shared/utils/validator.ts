export const isValidDate = (value: string) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d{2}$/;
  if (!regex.test(value)) return false;

  const [day, month, year] = value.split(".").map((num) => parseInt(num, 10));
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
};
