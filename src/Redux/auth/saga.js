import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { HelpersUser } from "../../Helpers";

import { RETRIVE_USER, RETRIVE_TOKEN } from './constants';

import { retrive_user_sucess, retrive_token_sucess } from './actions';

const helpersUser = new HelpersUser();

function* retriveUser(){
   try {
      const response = yield call(helpersUser.GetUser);
      yield put(retrive_user_sucess(response));
   } catch (error) {
      yield put(apiError(error));
   }
}

function* retriveToken(){
   try {
      const response = yield call(helpersUser.GetToken);
      yield put(retrive_token_sucess(response));
   } catch (error) {
      yield put(apiError(error));
   }
}

export function* buscar_user() {
   yield takeEvery(RETRIVE_USER, retriveUser);
}

export function* buscar_token() {
   yield takeEvery(RETRIVE_TOKEN, retriveToken);
}


function* authSaga() {
   yield all([
      fork(buscar_user),
      fork(buscar_token),
   ]);
}

export default authSaga;