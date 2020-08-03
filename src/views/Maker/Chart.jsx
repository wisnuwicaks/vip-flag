import React, { Component } from "react";
import "../Main.css";
import "./CifReport.css";

import { connect } from "react-redux";
import Axios from "axios";

import { API_URL } from "../../constants/API";

import { Pie, Doughnut } from "react-chartjs-2";

class Chart extends Component {
  state = {
    downgradeUpgrade: {
      labels: ["Upgrade", "Downgrade"],
      datasets: [
        {
          label: "DowngradeUpgrade",
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#003350", "#35014F"],
          data: [65, 59],
        },
      ],
    },

    cifApproved: [],
    activePage: 1,
  };
  componentDidMount() {
    this.writeLog();
    // this.state.downgradeUpgrade.datasets[0].data[0]=100
    
    this.getCifList();
    console.log(this.state.downgradeUpgrade.datasets[0].data);

  }

  writeLog = () => {
    Axios.post(`${API_URL}/audit_access/accesslog`, {
      userId: this.props.user.userId,
      actionDescription: "Accessing Chart Menu succeeded",
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getCifList = () => {
    let updownData=[0,0]
    Axios.get(`${API_URL}/cifapprove/all_approved`)
      .then((res) => {
        this.setState({ cifApproved: res.data });
        res.data.forEach(val => {
          if(val.cfvipi.toUpperCase()=="Y"){
            // this.state.downgradeUpgrade.datasets[0].data[0]+=1
            updownData[0]+=1
          }
          else{
            // this.state.downgradeUpgrade.datasets[0].data[1]+=1

            updownData[1]+=1
          }
        });
        // console.log(updownData);
        this.setState({downgradeUpgrade:{
          ...this.state.downgradeUpgrade,
          datasets:[
            {
              label: "DowngradeUpgrade",
              backgroundColor: ["#BD000A", "#FFFDD"],
              hoverBackgroundColor: ["#003350", "#35014F"],
              data: updownData,
            },
           
          ]
          }
         

          
        })
        // this.state.downgradeUpgrade.datasets[0].data=updownData

      })
      .catch((err) => {
        console.log("ini err");
        console.log(err);
      });
  };

  renderCifList = () => {};

  render() {
    return (
      <>
        <div className="main-header">
          {/* <h5>Upload Log {this.props.cif.cifData.length}</h5> */}
          <h5>Chart Report</h5>
        </div>
        <div className="main-body">
          <div className="main-body-show-body">
            <Pie
              data={this.state.downgradeUpgrade}
              options={{
                title: {
                  display: true,
                  text: "Perbandingan Upgrade dan Downgrade",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cif: state.cif,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
