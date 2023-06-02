const initState = {
  isLoading: false,
  loaderMessage: "",
};

const loaderReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LOADER":
      return {
        ...state,
        isLoading: action.payload.isLoading,
        loaderMessage: action.payload.message,
      };
    default:
      return { ...state };
  }
};

export default loaderReducer;
