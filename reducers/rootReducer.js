import { combineReducers } from "redux";

import campaignSelectorReducer from "./campaignSelectorReducer";

const rootReducer = combineReducers({
  indexOfCampaign: campaignSelectorReducer,
});

export default rootReducer;
