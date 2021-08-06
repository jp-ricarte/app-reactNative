import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";

import createStore from "./createStore";
import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";
import persistReducer from "./persistReducers";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(persistReducer(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
