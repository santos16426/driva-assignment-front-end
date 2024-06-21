export const parseValue = (value: string | number, type : string) => {
  if (type === "number") {
    return parseFloat(value as string);
  }
  return value;
};
