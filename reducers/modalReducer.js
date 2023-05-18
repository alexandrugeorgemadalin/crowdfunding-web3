const initState = {
  modalIsClosed: true,
};

const modalReducer = (state = initState, action) => {
  switch (action.type) {
    case "CLOSE_MODAL":
      return {
        ...state,
        modalIsClosed: action.payload.modalIsClosed,
      };
    default:
      return { ...state };
  }
};

export default modalReducer;
