import React from "react";

import { Link } from "react-router-dom";

const room = (props) => {
  return (
    <div className="col-sm-10 col-md-5 col-lg-4">
      <div className="my-4 mx-2 card ">
        <div className="card-header">
          {" "}
          {!props.roomName ? "Room Name" : props.roomName.toUpperCase()}
        </div>
        <span className="text-muted">Device status</span>
        <div className="card-body d-flex flex-row flex-wrap justify-content-around">
          <div>
            <i className="fas fa-lightbulb m-2 text-warning"></i>
            {props.on}
          </div>

          <div>
            <i className="far fa-lightbulb m-2 text-warning"></i>
            {props.down}
          </div>
        </div>
        <Link
          className="btn btn-block btn-dark"
          to={`/devices/${props.id}/${props.userId}`}
        >
          View Devices
        </Link>
        {props.on === 0 && props.down === 0 ? (
          <div
            className="btn btn-block btn-danger"
            onClick={() => {
              props.delete(props.id);
            }}
          >
            Delete Device
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default room;
