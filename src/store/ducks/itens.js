import { createReducer, createActions } from "reduxsauce";
import { markActionsOffline } from "redux-offline-queue";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  addItemRequest: ["itemName"],
  addItemSuccess: ["item"],
});

markActionsOffline(Creators, ["additemRequest"]);

export const ItensTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
});

/* Reducers */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_ITEM_REQUEST]: (state) => state.merge({ loading: true }),
  [Types.ADD_ITEM_SUCCESS]: (state, { item }) =>
    state.update("data", (data) => [...data, item]),
});
