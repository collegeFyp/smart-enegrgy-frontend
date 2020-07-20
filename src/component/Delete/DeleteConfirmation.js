import React from "react";
import classes from "./DeleteConfirmation.module.css";

const DeleteDevice = (props) => (
  <div className={classes.DeleteDevice}>
    <div className={classes.DeleteDeviceTitle}>
      Are You sure You want to delete this device?
    </div>
    <div className={classes.DeleteDeviceChild}>
      <button className="btn btn-danger" onClick={props.conformDelete}>
        Delete
      </button>
      <button onClick={props.cancel} className="btn btn-warning">
        Cancel
      </button>
    </div>
  </div>
);
export default DeleteDevice;
