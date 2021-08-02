import { persistStore } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import persistReducer from "./persistReducers";
import rootReducer from "./ducks";
import rootSaga from "./sagas";

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

const store = createStore(
  persistReducer(rootReducer),
  applyMiddleware(...middlewares)
);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };
