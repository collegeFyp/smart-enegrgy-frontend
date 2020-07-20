// export const baseUrl = "https://smart-energy-project.herokuapp.com/";

export const baseUrl = "http://localhost:3000/";

export const loginUrl = baseUrl + "api/auth/login";
export const signInUrl = baseUrl + "api/auth/signup";
export const getRoom = baseUrl + "api/admin/room/"; //include user id in url api/admin/room/userid
export const postRoom = baseUrl + "api/admin/room/"; //include user id in url api/admin/room/userid
export const getDevice = baseUrl + "api/admin/device/"; //include roo, id in url api/admin/room/roomId
export const postDevice = baseUrl + "api/admin/device/"; //include roomId and userId in url/api/admin/roomId/userId
export const getRole = baseUrl + "api/admin/role";
export const postRole = baseUrl + "api/admin/role";
export const getUser = baseUrl + "api/admin/user";

// put request
export const changeDeviceStatus = baseUrl + "api/admin/device/";
export const changeDeviceName = baseUrl + "api/admin/device/"; // include deviceId at last
// delete requests
export const deleteRoom = baseUrl + "api/admin/room/"; //include room id in url
export const deleteDevice = baseUrl + "api/admin/device/"; //include device id in url
