import React from "react";
import classes from "./Device.module.css";

const Device = (props) => {
  let switchDOM = (
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (!props.loading) {
    switchDOM = (
      <label className={classes.Switch}>
        <input
          type="checkbox"
          checked={props.checked}
          onChange={props.onClicked}
        />
        <span className={classes.Slider + " " + classes.Round}></span>
      </label>
    );
  }

  const DeviceClasses = [classes.Device];
  if (props.checked) {
    DeviceClasses.push(classes.Active);
  }

  return (
    <div className={DeviceClasses.join(" ")}>
      <div className={classes.Name}>{props.name}</div>
      <div className="d-flex justify-content-around">
        <div className="btn btn-dark" onClick={props.onChangeName}>
          Change Name
        </div>
        <div className="btn btn-danger" onClick={props.onDelete}>
          Delete Device
        </div>
        {switchDOM}
      </div>
    </div>
  );
};

export default Device;
