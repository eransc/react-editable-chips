export const setSelectedOptions = (node) => {
  return {
    type: "options/setSelectedOptions",
    payload: node,
  };
};
