import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/action/index";
import Spinner from "../../component/UI/Spinner/Spinner";
import User from "../../component/User/User";
import FloatingActionButton from "../../component/UI/FloatingActionButton/FloatingActionButton";
import AddUser from "./AddUser/AddUser";
import Modal from "../../component/UI/Modal/Modal";

class Users extends Component {
  state = {
    showAddUserModel: false,
  };
  componentDidMount() {
    this.props.onInitUser(this.props.token);
  }

  addUserAction = () => {
    this.setState({
      showAddUserModel: true,
    });
  };
  addUserCloseAction = () => {
    this.setState({
      showAddUserModel: false,
    });
  };

  render() {
    let tableBody = null;
    if (this.props.users) {
      tableBody = this.props.users.map((user) => (
        <User
          key={user._id}
          id={user._id}
          FirstName={user.firstName}
          LastName={user.lastName}
          Email={user.email}
        />
      ));
    }

    return (
      <div className="col-lg-10 m-auto col-sm">
        <Modal
          show={this.state.showAddUserModel}
          modalClosed={this.addUserCloseAction}
        >
          <AddUser />
          {console.log("asasa")}
        </Modal>

        {this.props.loading ? (
          <Spinner />
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        )}
        <FloatingActionButton clicked={this.addUserAction}>
          <i className="fas fa-plus"></i>
        </FloatingActionButton>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    users: state.user.users,
    loading: state.user.loading,
    error: state.user.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitUser: (token) => dispatch(actions.fetchUser(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
