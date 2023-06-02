export const setLoader = (isLoading, message) => (dispatch) => {
  dispatch({
    type: "SET_LOADER",
    payload: {
      isLoading: isLoading,
      message: message,
    },
  });
};
