import * as actionTypes from "./actionType";
import * as apiList from "../apiList";
import axios from "axios";

// ------------------------------------
// fetch Room
// ------------------------------------

// +++++++++++++++++
// Fetch Room Start
// +++++++++++++++++

export const fetchRoomStart = () => {
  return {
    type: actionTypes.FETCH_ROOMS_START,
  };
};
// +++++++++++++++++
// Fetch Rom Success
// +++++++++++++++++

export const fetchRoomSuccess = (rooms) => {
  return {
    type: actionTypes.FETCH_ROOMS_SUCCESS,
    rooms: rooms,
  };
};

// +++++++++++++++++
// fetchRoom Fail
// +++++++++++++++++

export const fetchRoomFail = (error) => {
  console.log(error);
  return {
    type: actionTypes.FETCH_ROOMS_FAIL,
    error: error,
  };
};
// +++++++++++++++++
// Async function
// fetch rooms from web
// api call
// +++++++++++++++++

export const fetchRoom = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchRoomStart());
    axios({
      method: "get",
      url: apiList.getRoom + userId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          if (response.data["err"]) {
            dispatch(fetchRoomSuccess([]));
          } else dispatch(fetchRoomSuccess(response.data));
        } else {
          dispatch(fetchRoomFail("Something went wrong"));
        }
      })
      .catch((err) => {
        dispatch(fetchRoomFail(err));
      });
  };
};
// ------------------------------------
// Add Room
// ------------------------------------

// ++++++++++++++++++
// add room Init
// ++++++++++++++++++
export const addRoomInit = () => {
  return {
    type: actionTypes.ADD_ROOM_INIT,
  };
};

// +++++++++++++++++
// add ROom Start
// +++++++++++++++++

export const addRoomStart = () => {
  return {
    type: actionTypes.ADD_ROOM_START,
  };
};

// +++++++++++++++++
// add Room Success
// +++++++++++++++++

export const addRoomSuccess = (room) => {
  return {
    type: actionTypes.ADD_ROOM_SUCCESS,
    room: room,
  };
};
// +++++++++++++++++
// add ROom fail
// +++++++++++++++++

export const addRoomFail = (err) => {
  return {
    type: actionTypes.ADD_ROOM_FAIL,
    error: err,
  };
};
// +++++++++++++++++
// async function
// add room to database
// api call
// post request
// +++++++++++++++++

export const addRoom = (token, userId, name) => {
  return (dispatch) => {
    dispatch(addRoomStart());
    axios({
      method: "post",
      url: apiList.postRoom + userId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + token,
      },
      data: {
        name: name,
      },
    })
      .then((response) => {
        if (response.data.success) {
          const id = response.data.success._id;
          const name = response.data.success.name;
          const user = response.data.success.user;
          const room = {
            _id: id,
            name: name,
            user: user,
          };
          dispatch(addRoomSuccess(room));
        }
      })
      .catch(({ response }) => {
        if (response.status === 300) {
          dispatch(addRoomFail("Room Name already exists"));
        } else if (response.status === 500) {
          dispatch(addRoomFail("Internal error"));
        } else {
          dispatch(addRoomFail("SOmething went wrong"));
        }
      });
  };
};

// ------------------------------------
// Delete ROom
// ------------------------------------

export const deleteRoomStart = () => {
  return {
    type: actionTypes.DELETE_ROOM_START,
  };
};

export const deleteRoomSuccess = (id) => {
  return {
    type: actionTypes.DELETE_ROOM_SUCCESS,
    id: id,
  };
};
export const deleteRoomFail = (err) => {
  return {
    type: actionTypes.DELETE_ROOM_FAIL,
    error: err,
  };
};

export const deleteRoom = (token, roomId) => {
  return (dispatch) => {
    dispatch(deleteRoomStart());
    axios({
      method: "delete",
      url: apiList.deleteRoom + roomId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + token,
      },
    })
      .then((data) => {
        dispatch(deleteRoomSuccess(roomId));
      })
      .catch(({ response }) => {
        dispatch(deleteRoomFail("Unable to delete room"));
      });
  };
};

// ------------------------------------
// Edit Room
// ------------------------------------
export const editRoomStart = () => {
  return {
    type: actionTypes.EDIT_ROOM_START,
  };
};

export const editRoomSuccess = (room) => {
  return {
    type: actionTypes.EDIT_ROOM_SUCCESS,
    room: room,
  };
};

export const editRoomFail = (error) => {
  return {
    type: actionTypes.EDIT_ROOM_FAIL,
    error: error,
  };
};

export const editRoom = (token, roomName, roomId) => {};

// ------------------------------------
// EOF
// ------------------------------------
