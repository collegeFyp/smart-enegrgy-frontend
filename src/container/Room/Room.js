import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/action/index";
import Spinner from "../../component/UI/Spinner/Spinner";
import Room from "../../component/Room/Room";
import FloatingActionButton from "../../component/UI/FloatingActionButton/FloatingActionButton";
import Modal from "../../component/UI/Modal/Modal";
import AddRoom from "./AddRoom/AddRoom";
class Rooms extends Component {
  state = {
    addRoom: false,
    edit: false,
  };
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.props.onInitRoom(this.props.token, userId);
  }

  openAddRoomModel = (edit) => {
    this.setState({
      addRoom: true,
      edit: edit,
    });
  };
  closeAddRoomModel = () => {
    this.setState({
      addRoom: false,
    });
  };
  onDeleteRoom = (roomId) => {
    this.props.onDeleteRoom(this.props.token, roomId);
  };

  render() {
    let roomBody = <Spinner />;
    if (this.props.rooms && !this.props.loading) {
      roomBody = this.props.rooms.map((room) => (
        <Room
          key={room._id}
          roomName={room.name}
          down={room.off}
          on={room.on}
          userId={this.props.match.params.userId}
          id={room._id}
          delete={this.onDeleteRoom}
        />
      ));
    }
    return (
      <div className="col d-flex flex-wrap">
        {roomBody}

        <Modal show={this.state.addRoom} modalClosed={this.closeAddRoomModel}>
          <AddRoom
            userId={this.props.match.params.userId}
            modalClosed={this.closeAddRoomModel}
          />
        </Modal>

        <FloatingActionButton
          clicked={() => {
            this.props.onInitAddRom();
            this.openAddRoomModel(false);
          }}
        >
          <i className="fas fa-plus"></i>
        </FloatingActionButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    rooms: state.rooms.rooms,
    loading: state.rooms.loading,
    error: state.rooms.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitRoom: (token, userId) => dispatch(actions.fetchRoom(token, userId)),
    onInitAddRom: () => dispatch(actions.addRoomInit()),
    onDeleteRoom: (token, roomId) =>
      dispatch(actions.deleteRoom(token, roomId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
