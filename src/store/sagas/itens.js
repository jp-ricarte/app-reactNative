import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import ItensActions from "../ducks/itens";

export function* addItem(data) {
  const response = yield call(api.post, `/create`, data);

  yield put(ItensActions.addItemSuccess(response.data));
}
