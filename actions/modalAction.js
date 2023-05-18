export const closeModal = (modalIsClosed) => (dispatch) => {
  dispatch({
    type: "CLOSE_MODAL",
    payload: {
      modalIsClosed: modalIsClosed,
    },
  });
};
