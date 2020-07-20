import React, { Component } from "react";
import Device from "../../component/Device/Device";
import { connect } from "react-redux";
import * as actions from "../../store/action/index";
import Spinner from "../../component/UI/Spinner/Spinner";
import FloatingActionButton from "../../component/UI/FloatingActionButton/FloatingActionButton";
import Modal from "../../component/UI/Modal/Modal.js";
import ChangeDeviceName from "../Devices/ChangeDeviceName/ChangeDeviceName";
import DeleteConfirmation from "../../component/Delete/DeleteConfirmation";

class Devices extends Component {
  state = {
    deleteDevice: false,
    deleteDeviceId: null,
    loadingDeviceId: null,
    changeNameModal: false,
    device: null,
    edit: false,
  };

  actionButtonClicked = () => {
    this.setState({
      changeNameModal: true,
      edit: false,
    });
  };
  actionChangeNameClicked = (device) => {
    this.setState({
      device: device,
      changeNameModal: true,
      edit: true,
    });
  };
  actionChangeNameClose = () => {
    this.setState({
      changeNameModal: false,
      device: null,
      edit: false,
    });
  };

  deleteDeiceAction = (id) => {
    console.log("delete");
    this.setState({
      deleteDeviceId: id,
      deleteDevice: true,
    });
  };
  deleteDeviceReleaseAction = (id) => {
    this.setState({
      deleteDeviceId: null,
      deleteDevice: false,
    });
  };

  confirmDelete = () => {};

  userId = this.props.match.params.userId;
  roomId = this.props.match.params.roomId;
  componentDidMount() {
    this.props.onInitDevice(this.props.token, this.userId, this.roomId);
  }
  toggleButtonHandler = (action, deviceId) => {
    this.setState({
      loadingDeviceId: deviceId,
    });
    this.props.onToggle(this.props.token, this.userId, deviceId);
  };

  render() {
    let deviceScreen = <Spinner />;
    if (this.props.error && !this.props.loading) {
      deviceScreen = <div>{this.props.error}</div>;
    }
    if (this.props.devices) {
      deviceScreen = this.props.devices.map((device) => {
        let loading = false;
        if (device._id === this.state.loadingDeviceId && this.props.loading) {
          loading = true;
        }
        if (this.props.error) {
          // alert(this.props.error);
          this.props.emptyError();
        }
        return (
          <Device
            onDelete={() => this.deleteDeiceAction(device._id)}
            key={device._id}
            loading={loading}
            checked={device.status}
            name={device.name}
            onClicked={(action) => this.toggleButtonHandler(action, device._id)}
            onChangeName={() => this.actionChangeNameClicked(device)}
          />
        );
      });
    }
    return (
      <div className="col-lg-10 col-sm-9 m-auto">
        {deviceScreen}

        <Modal
          show={this.state.deleteDevice}
          modalClosed={this.deleteDeviceReleaseAction}
        >
          <DeleteConfirmation
            cancel={this.deleteDeviceReleaseAction}
            conformDelete={this.conformDelete}
          />
        </Modal>
        <Modal
          show={this.state.changeNameModal}
          modalClosed={this.actionChangeNameClose}
        >
          <ChangeDeviceName
            device={this.state.device}
            edit={this.state.edit}
            roomId={this.props.match.params.roomId}
            userId={this.props.match.params.userId}
          />
        </Modal>

        <FloatingActionButton clicked={this.actionButtonClicked}>
          <i className="fas fa-plus"></i>
        </FloatingActionButton>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    devices: state.device.devices,
    loading: state.device.loading,
    error: state.device.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitDevice: (token, userId, roomId) =>
      dispatch(actions.fetchDevice(token, userId, roomId)),
    onToggle: (token, userId, deviceId) => {
      dispatch(actions.toggleDevice(token, deviceId, userId));
    },
    emptyError: () => {
      dispatch(actions.emptyError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
