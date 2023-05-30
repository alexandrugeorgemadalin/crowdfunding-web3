export const setDonateLoader = (donateIsLoading) => (dispatch) => {
  dispatch({
    type: "SET_DONATE_LOADER",
    payload: {
      donateIsLoading: donateIsLoading,
    },
  });
};
