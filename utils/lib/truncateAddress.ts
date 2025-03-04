export const truncateAddress = (str: string, a = 2, b = 5) => {
  if (!str || str.length < 10) return "";
  const start = str.slice(0, a);
  const end = str.slice(-b);
  return `${start}...${end}`;
};
