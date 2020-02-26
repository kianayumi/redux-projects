import _ from 'lodash';

import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      //mapKeys creates object from action.payload (list of streams), keys are
      //indiv IDs (2nd arg) ; spread bc want new object with everything
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      //don't need to specify which ID to delete bc dispatch action's payload is ID
      //.omit() creates new state obj (1st arg, no need to spread) without the ID
      //specified by payload (2nd arg)
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
