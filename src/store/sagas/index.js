import { all, spawn, takeEvery } from "redux-saga/effects";

import { ItensTypes } from "../ducks/itens";
import { addItem } from "./itens";

import { startWatchingNetworkConnectivity } from "./offline";

export default function* rootSaga() {
  yield all([
    spawn(startWatchingNetworkConnectivity),

    takeEvery(ItensTypes.ADD_ITEM_REQUEST, addItem),
  ]);
}
