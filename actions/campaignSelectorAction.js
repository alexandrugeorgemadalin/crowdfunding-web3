export const campaignSelector = (indexOfCampaign) => (dispatch) => {
  dispatch({
    type: "CHOOSE_CAMPAIGN",
    payload: {
      indexOfCampaign: indexOfCampaign,
    },
  });
};
