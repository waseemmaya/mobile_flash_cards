export const getFullDate = (date) => {
  let dateResult = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  return JSON.stringify(dateResult);
};
