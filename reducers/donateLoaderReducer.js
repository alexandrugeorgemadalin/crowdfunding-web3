const initState = {
  donateIsLoading: false,
};

const donateLoaderReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_DONATE_LOADER":
      return {
        ...state,
        donateIsLoading: action.payload.donateIsLoading,
      };
    default:
      return { ...state };
  }
};

export default donateLoaderReducer;
