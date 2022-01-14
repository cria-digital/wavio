import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { HelpersUser } from "../../Helpers";

import { RETRIVE_USER } from './constants';

import { retrive_user_sucess } from './actions';

const helpersUser = new HelpersUser();

function* retriveUser(){
   try {
      const response = yield call(helpersUser.GetUser);
      yield put(retrive_user_sucess(response));
      //console.log('resposta '+ JSON.stringify(response.data))
   } catch (error) {
      yield put(apiError(error));
   }
}

export function* buscar_user() {
   yield takeEvery(RETRIVE_USER, retriveUser);
}


function* authSaga() {
   yield all([
      fork(buscar_user),
   ]);
}

export default authSaga;