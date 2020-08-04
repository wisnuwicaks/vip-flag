import React from "react";
import { API_URL } from "../../constants/API";
import { connect } from "react-redux";
import Axios from "axios";
import { Table, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import swal from "sweetalert";

class ViewUser extends React.Component {
  state = {
    users: [],
    addFormToggle :false,
  };
  componentDidMount() {
    this.getusers();
  }

  getusers = () => {
    Axios.get(`${API_URL}/users/all_users`)
      .then((res) => {
        console.log(res.data);
        this.setState({ users: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderListUser = () => {
    const { users } = this.state;
    return users.map((val,idx) => {
      return (
        <>
          <tr>
          <td>{idx+1}</td>
            <td>{val.userId}</td>
            <td>{val.username}</td>
            <td>{val.email}</td>
            <td>{val.firstName}</td>
            <td>{val.lastName}</td>
            <td>{val.lastEntry}</td>
            <td>{val.userRole["roleName"]}</td>
            <td>{val.userRole["id"]}</td>

          </tr>
        </>
      );
    });
  };

  renderAddForm=()=>{
    const {addFormToggle}=this.state
    if(!addFormToggle){
      return <>
      
      </>
    }

    return(
      <>
          <div className="row">
            <div className="col-2">
              Group 1
            </div>
            <div className="col-5">

            </div>
            <div className="col-5">

            </div>
          </div>
      </>
    )


  }
  render() {
    return (
      <>
        <div className="main-header">
          <h5>View User</h5>
        </div>
        <div className="main-body p-4">
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Last Entry</th>
                <th>Role Name</th>
                <th>Role ID</th>

              </tr>
            </thead>
            <tbody>{this.renderListUser()}</tbody>
          </Table>
          {/* <h6 
          onClick={()=>this.setState({addFormToggle:!this.state.addFormToggle})}
          style={{cursor:"pointer"}}>
            <Badge>
              <FontAwesomeIcon icon={faPlusSquare} />
              {"  "}
              Add Group Member
            </Badge>
          </h6>
          {
          
          this.renderAddForm()
          
        } */}
        </div>
      </>
    );
  }
}

export default ViewUser;
