import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { HelpersEvents } from "../../Helpers";

import { REQUEST_EVENTS } from './constants';

import { requestEventsSuccess } from './actions';

const helpersEvents = new HelpersEvents();

function* requestEvents() {
   try {
      const response = yield call(helpersEvents.GetEvents);
      yield put(requestEventsSuccess(response.data));
   } catch (error) {
      //yield put(requestFailed(error)); 
   }
}

export function* buscar_eventos() {
   yield takeEvery(REQUEST_EVENTS, requestEvents);
}

function* eventsSaga() {
   yield all([
      fork(buscar_eventos)
   ]);
}

export default eventsSaga;
