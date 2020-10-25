import * as types from '../types';

const initState = {};

const home = (state = initState, action) => {
  switch (action.type) {
    case types.RECEIVE_CREDITS: {
      return {
        ...state,
        credits: action.data
      };
    }

    default:
      return state;
  }
};

export default home;
