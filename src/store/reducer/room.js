import * as actionTypes from "../action/actionType";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  rooms: null,
  error: null,
  addRoomLoading: false,
};

const fetchRoomStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchRoomSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    rooms: action.rooms,
    error: null,
  });
};

const fetchRoomFail = (state, action) => {
  console.log(action.error);
  return updateObject(state, {
    loading: false,
    rooms: null,
    error: action.error,
  });
};

const addRoomStart = (state, action) => {
  return updateObject(state, {
    addRoomLoading: true,
  });
};

const addRoomSuccess = (state, action) => {
  let newRooms = [...state.rooms];
  newRooms.push(action.room);
  return updateObject(state, {
    rooms: newRooms,
    addRoomLoading: false,
  });
};

const addRoomFail = (state, action) => {
  console.log(action.error);
  return updateObject(state, {
    addRoomLoading: false,
    devices: null,
    error: action.error,
  });
};

// +++++++++++++++++++
// add room
// +++++++++++++++++++
// const addRoom = ()

const deleteRoomStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const deleteRoomSuccess = (state, action) => {
  let newDevice = [...state.rooms];
  for (let i in newDevice) {
    if (newDevice[i]._id === action.id) {
      newDevice.splice(i, 1);
      console.log(newDevice);
      // delete that index element
    }
  }
  return updateObject(state, {
    loading: false,
    rooms: newDevice,
  });
};

const deleteRoomFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const addRoomInit = (state, action) => {
  console.log("yes");
  return updateObject(state, {
    loading: false,
    error: null,
    addRoomLoading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ROOMS_START:
      return fetchRoomStart(state, action);
    case actionTypes.FETCH_ROOMS_SUCCESS:
      return fetchRoomSuccess(state, action);
    case actionTypes.FETCH_ROOMS_FAIL:
      return fetchRoomFail(state, action);
    case actionTypes.ADD_ROOM_START:
      return addRoomStart(state, action);
    case actionTypes.ADD_ROOM_SUCCESS:
      return addRoomSuccess(state, action);
    case actionTypes.DELETE_ROOM_START:
      return deleteRoomStart(state, action);
    case actionTypes.ADD_ROOM_FAIL:
      return addRoomFail(state, action);
    case actionTypes.ADD_ROOM_INIT:
      return addRoomInit(state, action);
    case actionTypes.DELETE_ROOM_SUCCESS:
      return deleteRoomSuccess(state, action);
    case actionTypes.DELETE_ROOM_FAIL:
      return deleteRoomFail(state, action);
    default:
      return state;
  }
};

export default reducer;
