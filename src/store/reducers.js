const initialState = {
  subscription: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "options/setSelectedOptions":
      return { subscription: { selectedOptions: action.payload } };
    default:
      return state;
  }
};
