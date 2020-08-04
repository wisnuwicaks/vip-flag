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

    subcodeChart: {
      labels: ["Upgrade", "Downgrade"],
      datasets: [
        {
          label: "SubCode",
          backgroundColor: ["#00A6B4", "#6800B4"],
          // hoverBackgroundColor: ["#003350", "#35014F"],
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
    let labelSubCodeCount = {};
    let labelSubCodeArr = [];
    let subCodeQtyArr = [];
    let colorSubCode = [];

    let updownData = [0, 0];
    Axios.get(`${API_URL}/cifapprove/all_approved`)
      .then((res) => {
        this.setState({ cifApproved: res.data });
        res.data.forEach((val) => {
          let { cfvipc } = val;

       

          if (val.cfvipi.toUpperCase() == "Y") {
            updownData[0] += 1;
            if (!labelSubCodeCount.hasOwnProperty(cfvipc)) {
              labelSubCodeArr.push(cfvipc.toString());
              labelSubCodeCount[cfvipc] = 1;
              colorSubCode.push("#"+
                Math.floor(Math.random() * 16777215).toString(16)
              );
            } else {
              labelSubCodeCount[cfvipc] += 1;
            }
          } else {
            updownData[1] += 1;
          }
        });

        for (let keyLabel in labelSubCodeCount) {
          subCodeQtyArr.push(labelSubCodeCount[keyLabel]);
        }
        console.log("ini label subcount");
        console.log(labelSubCodeCount);
        console.log(colorSubCode);
        console.log(subCodeQtyArr);
        console.log(labelSubCodeArr);

        this.setState({
          subcodeChart: {
            labels: labelSubCodeArr,
            datasets: [
              {
                label: "Subcode Quantity",
                backgroundColor: colorSubCode,
                data: subCodeQtyArr,
              },
            ],
          },
        });

        // console.log(updownData);
        this.setState({
          downgradeUpgrade: {
            ...this.state.downgradeUpgrade,
            datasets: [
              {
                label: "DowngradeUpgrade",
                backgroundColor: ["#BD000A", "#FFFDD"],
                hoverBackgroundColor: ["#003350", "#35014F"],
                data: updownData,
              },
            ],
          },
        });
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
              width={100}
              height={30}
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
          <div className="pt-5">

          </div>
            <Pie
              data={this.state.subcodeChart}
              width={100}
              height={30}
              options={{
                title: {
                  display: true,
                  text: "Subcode Upgrade",
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
