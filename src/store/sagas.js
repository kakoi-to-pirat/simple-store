import { takeEvery, put, call } from "redux-saga/effects";
import { increment, toLoading, toLoaded } from "./actions";
import { ASYNC_INCREMENT } from "./constants";

const loadCount = () =>
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1500));

function* workerInc() {
  yield put(toLoading());

  const count = yield call(loadCount);
  yield put(increment(count));

  yield put(toLoaded());
}

export function* watchInc() {
  yield takeEvery(ASYNC_INCREMENT, workerInc);
}

export default watchInc;
