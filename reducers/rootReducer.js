import { combineReducers } from "redux";

import campaignSelectorReducer from "./campaignSelectorReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  indexOfCampaign: campaignSelectorReducer,
  modalIsClosed: modalReducer,
});

export default rootReducer;
