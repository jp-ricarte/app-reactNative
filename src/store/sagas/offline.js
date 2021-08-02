import { put, take, call } from "redux-saga/effects";
import NetInfo from "@react-native-community/netinfo";
import { OFFLINE, ONLINE } from "redux-offline-queue";
import { eventChannel } from "redux-saga";

export function* startWatchingNetworkConnectivity() {
  const channel = eventChannel((emitter) => {
    const unsubscribe = NetInfo.addEventListener(emitter);
    return () => unsubscribe();
  });
  try {
    while (true) {
      const state = yield take(channel);
      if (state.isConnected) {
        yield put({ type: ONLINE });
      } else {
        yield put({ type: OFFLINE });
      }
    }
  } finally {
    channel.close();
  }
}
