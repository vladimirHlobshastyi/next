const useFormattedDate = (dateValue: Date) => {
  const dateString = dateValue;
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const resultDate = `${day}.${month}.${year}`;
  return resultDate;
};

export default useFormattedDate;
