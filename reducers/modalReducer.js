const initState = {
  modalIsClosed: true,
  modalMessage: "",
};

const modalReducer = (state = initState, action) => {
  switch (action.type) {
    case "CLOSE_MODAL":
      return {
        ...state,
        modalIsClosed: action.payload.modalIsClosed,
        modalMessage: action.payload.modalMessage,
      };
    default:
      return { ...state };
  }
};

export default modalReducer;
