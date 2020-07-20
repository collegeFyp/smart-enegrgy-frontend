import * as actionTypes from '../action/actionType';
import { updateObject } from '../utility';
const initialState = {
  loading:false,
  users: null,
  error:null,
};

const fetchUserStart = ( state, action )=>{
  return updateObject( state, { loading: true } );
}
const fetchUserSuccess = ( state, action ) => {
  return updateObject(state,{users:action.users,loading:false})
  
}
const fetchUserFail = ( state, action ) => {
  return updateObject( state, { error: action.error, users: null,loading:false } );
}
const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.FETCH_USER_START: return fetchUserStart( state, action );
    case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess( state, action );
    case actionTypes.FETCH_USER_FAIL: return fetchUserFail( state, action );
    default: return state;
  }
};

export default reducer;
