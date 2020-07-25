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
    userGroup: [],
    addFormToggle :false,
  };
  componentDidMount() {
    this.getUserGroup();
  }

  getUserGroup = () => {
    Axios.get(`${API_URL}/usergroup/group_name/Group1`)
      .then((res) => {
        console.log(res.data);
        this.setState({ userGroup: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderGroupMember = () => {
    const { userGroup } = this.state;
    return userGroup.map((val) => {
      return (
        <>
          <tr>
            <td>{val.groupName}</td>
            <td>{val.maker["username"]}</td>
            <td>{val.checker["username"]}</td>
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
                <th>User Group Name</th>
                <th>Maker</th>
                <th>Checker</th>
              </tr>
            </thead>
            <tbody>{this.renderGroupMember()}</tbody>
          </Table>
          <h6 
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
          
        }
        </div>
      </>
    );
  }
}

export default ViewUser;
