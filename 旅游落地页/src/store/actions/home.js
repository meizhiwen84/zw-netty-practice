import * as types from '../types';

export const requestRisk = data => {
  return {
    type: types.REQUEST_RISK,
    data
  };
};
