import { combineReducers } from "redux";

import { reducer as offline } from "redux-offline-queue";
import { reducer as itens } from "./itens";

export default combineReducers({
  offline,
  itens,
});
