import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: "vittafl",
      storage: AsyncStorage,
      whitelist: ["itens"],
    },
    reducers
  );

  return persistedReducer;
};
