const initState = {
  donateModalIsClosed: true,
};

const donateModalReducer = (state = initState, action) => {
  switch (action.type) {
    case "CLOSE_DONATE_MODAL":
      return {
        ...state,
        donateModalIsClosed: action.payload.donateModalIsClosed,
      };
    default:
      return { ...state };
  }
};

export default donateModalReducer;
