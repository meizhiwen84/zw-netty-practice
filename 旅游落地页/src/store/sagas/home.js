import { fork, take, call } from 'redux-saga/effects';

import * as types from '../types';
// import * as actions from '../actions';
// import * as selectors from '../selectors';
// import Toast from '../../components/toast';

import {} from '../actions/home';

import { getRisk } from '../../network';

//请求风控的接口
export function* reRisk() {
  while (true) {
    let { data: { deviceInfo, inviterId } } = yield take(types.REQUEST_RISK);
    try {
      yield call(getRisk, { deviceInfo, inviterId });
    } catch (e) {
    } finally {
    }
  }
}

export default function* root() {
  yield fork(reRisk);
}
