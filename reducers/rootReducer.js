import { combineReducers } from "redux";

import campaignSelectorReducer from "./campaignSelectorReducer";
import modalReducer from "./modalReducer";
import donateModalReducer from "./donateModalReducer";
import donateLoaderReducer from "./donateLoaderReducer";

const rootReducer = combineReducers({
  indexOfCampaign: campaignSelectorReducer,
  modalIsClosed: modalReducer,
  donateModalIsClosed: donateModalReducer,
  donateIsLoading: donateLoaderReducer,
});

export default rootReducer;
