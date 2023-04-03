const initState = {
  indexOfCampaign: undefined,
};

const campaignSelectorReducer = (state = initState, action) => {
  switch (action.type) {
    case "CHOOSE_CAMPAIGN":
      return {
        ...state,
        indexOfCampaign: action.payload.indexOfCampaign,
      };
    default:
      return { ...state };
  }
};

export default campaignSelectorReducer;
