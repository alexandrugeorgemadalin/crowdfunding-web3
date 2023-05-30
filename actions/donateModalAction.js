export const closeDonateModal = (donateModalIsClosed) => (dispatch) => {
  dispatch({
    type: "CLOSE_DONATE_MODAL",
    payload: {
      donateModalIsClosed: donateModalIsClosed,
    },
  });
};
