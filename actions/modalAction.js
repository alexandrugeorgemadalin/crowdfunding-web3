export const closeModal = (modalIsClosed, message) => (dispatch) => {
  dispatch({
    type: "CLOSE_MODAL",
    payload: {
      modalIsClosed: modalIsClosed,
      modalMessage: message,
    },
  });
};
