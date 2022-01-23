import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import eventsSaga from './events/saga';


export default function* rootSaga(getState) {
    yield all([
        authSaga(),
        eventsSaga()
    ]);
}
