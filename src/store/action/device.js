import * as actionTypes from "./actionType";
import * as apiList from "../apiList";
import axios from "axios";

// ------------------------------------------
// fetch device
// ------------------------------------------

export const fetchDeviceStart = () => {
  return {
    type: actionTypes.FETCH_DEVICES_START,
  };
};

export const fetchDeviceSuccess = (devices) => {
  return {
    type: actionTypes.FETCH_DEVICES_SUCCESS,
    devices: devices,
  };
};

export const fetchDeviceFail = (error) => {
  return {
    type: actionTypes.FETCH_DEVICES_FAIL,
    error: error,
  };
};

export const fetchDevice = (token, userId, roomID) => {
  return (dispatch) => {
    dispatch(fetchDeviceStart());
    axios({
      method: "get",
      url: apiList.getDevice + roomID,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + token,
      },
    })
      .then((response) => {
        if (response.status === 500) {
          dispatch(fetchDeviceFail("Server Error! Status 500"));
        }
        if (response.status === 200) {
          dispatch(fetchDeviceSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(fetchDeviceFail(err));
      });
  };
};

// ------------------------------------------
// device toggle
// ------------------------------------------

export const toggleDeviceStart = () => {
  return {
    type: actionTypes.TOGGLE_DEVICE_START,
  };
};
export const toggleDeviceSuccess = (deviceId) => {
  return {
    type: actionTypes.TOGGLE_DEVICE_SUCCESS,
    deviceId: deviceId,
  };
};

export const toggleDeviceFail = (err) => {
  return {
    type: actionTypes.TOGGLE_DEVICE_FAIL,
    error: err,
  };
};

export const toggleDevice = (token, deviceId, userId) => {
  return (dispatch) => {
    dispatch(toggleDeviceStart());
    axios({
      method: "put",
      url: apiList.changeDeviceStatus,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + token,
      },
      data: {
        deviceId: deviceId,
        userId: userId,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("success");
          dispatch(toggleDeviceSuccess(deviceId));
        }
        if (response.data.err) {
          dispatch(toggleDeviceFail(response.data.err));
        }
      })
      .catch((err) => {
        dispatch(toggleDeviceFail(err));
      });
  };
};

// ------------------------------------------
// edit device
// ------------------------------------------

export const editDeviceStart = () => {
  return {
    type: actionTypes.EDIT_DEVICE_START,
  };
};

export const editDeviceSuccess = (device) => {
  return {
    type: actionTypes.EDIT_DEVICE_SUCCESS,
    device: device,
  };
};

export const editDeviceFail = (err) => {
  return {
    type: actionTypes.EDIT_DEVICE_FAIL,
    error: err,
  };
};

export const editDevice = (token, deviceId, deviceName) => {
  console.log("i am here");

  return (dispatch) => {
    console.log(apiList.changeDeviceName + deviceId);

    dispatch(editDeviceStart());
    axios({
      method: "put",
      url: apiList.changeDeviceName + deviceId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + token,
      },
      data: {
        name: deviceName,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          dispatch(editDeviceSuccess(response.data));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(editDeviceFail(err));
      });
  };
};

// ------------------------------------------
// add Device
// ------------------------------------------
export const addDeviceStart = () => {
  return {
    type: actionTypes.ADD_DEVICE_START,
  };
};

export const addDeviceSuccess = (device) => {
  return {
    type: actionTypes.ADD_DEVICE_SUCCESS,
    device: device,
  };
};

export const addDeviceFail = (error) => {
  return {
    type: actionTypes.ADD_DEVICE_FAIL,
    error: error,
  };
};

// ++++++++++++++++++++++++
// async function
// add device to database
// Api call
// ++++++++++++++++++++++++

export const addDevice = (token, deviceName, roomId, userId) => {
  return (dispatch) => {
    dispatch(addDeviceStart());
    console.log(`${apiList.postDevice}${roomId}/${userId}`);
    axios({
      method: "post",
      url: `${apiList.postDevice}${roomId}/${userId}`,
      data: {
        device: deviceName,
      },
      headers: { Authorization: "Barer " + token },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          const id = response.data.device._id;
          const name = response.data.device.name;
          const device = {
            _id: id,
            name: name,
          };
          dispatch(addDeviceSuccess(device));
        }
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          console.log("status 500");
          dispatch(addDeviceFail("Internal Server Error"));
        }
        if (response.status === 400) {
          console.log(response);
        }
      });
  };
};

// ----------------
// delete Device
// ----------------
export const deleteDeviceStart = () => {
  return {
    type: actionTypes.DELETE_DEVICE_START,
  };
};

export const deleteDeviceSuccess = (id) => {
  return {
    type: actionTypes.DELETE_DEVICE_SUCCESS,
    deviceId: id,
  };
};

export const deleteDeviceFail = (err) => {
  return {
    type: actionTypes.DELETE_DEVICE_FAIL,
    err: err,
  };
};

// ++++++++++++++++++++
// Async function
// delete request
// +++++++++++++++++++
export const deleteDevice = (id, token) => {
  return (dispatch) => {
    dispatch(deleteDeviceStart());
    axios({
      method: "delete",
      url: apiList.deleteDevice + id,
      headers: { Authorization: "Barer " + token },
    })
      .then((response) => {
        dispatch(deleteDeviceSuccess(id));
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          console.log("status 500");
          dispatch(deleteDeviceFail("Internal Server Error"));
        }
        if (response.status === 400) {
          console.log(response);
        }
      });
  };
};

// ------------------------------------------
// empty error
// -----------------------------------------

export const emptyError = () => {
  return {
    type: actionTypes.DEVICE_ERROR_NULL,
  };
};
