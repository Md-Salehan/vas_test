import React, { useRef, useState } from "react";

import { useEffect } from "react";
import axios from "axios";
import Spinner from "../../../layouts/spinner/Spinner";
import moment from "moment/moment";
import { Breadcrumb, Row, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { TableToExcelReact } from "table-to-excel-react";

import { useReactToPrint } from "react-to-print";
let convenorStatus = localStorage.getItem("ConvenorStatus");
function AllApplication() {
  const printPDF = useRef();
  const [civilApplications, set_civilApplications] = useState([]);
  const [me_Applications, set_me_Applications] = useState([]);
  const [allApplication, set_allApplication] = useState([]);
  const [dateMsg, set_dateMsg] = useState("");
  const [from, set_from] = useState(null);
  const [to, set_to] = useState(null);
  useEffect(() => {
    const getAllCivilApplication = async () => {
      await axios
        .get(
          process.env.REACT_APP_BASE_URL + "/api/v1/vendorList?prodCategory=C"
        )
        .then((res) => {
          set_civilApplications([...res.data.content]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getAllMechanicalApplications = async () => {
      await axios
        .get(
          process.env.REACT_APP_BASE_URL + "/api/v1/vendorList?prodCategory=M"
        )
        .then((res) => {
          set_me_Applications(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllCivilApplication();
    getAllMechanicalApplications();
  }, []);

  useEffect(() => {
    set_allApplication(
      [...civilApplications, ...me_Applications].filter((item) => {
        return item.submittedFlag === "Y";
      })
    );
  }, [civilApplications, me_Applications]);


  console.log("ok");

  const getApplicationStatus = (status) => {
    if (status === "P") return "Pending";
    if (status === "A") return "Accepted";
    if (status === "R") return "Rejected";
    if (status === "N") return "Pending";
    return "Error";
  };

  const filterApplication = () => {
    if (from && to) {
      let err = 1000 * 60 * 60 * 5 + 1000 * 60 * 30;
      let hr23_min59_sec59_miSec999 =
        1000 * 60 * 60 * 23 + 1000 * 60 * 59 + 1000 * 59 + 999;
      let start = new Date(from).getTime() - err;
      let end = new Date(to).getTime() - err + hr23_min59_sec59_miSec999;

      if (start <= end) {
        set_allApplication(
          [...allApplication].filter((item) => {
            let subDate = new Date(item.submittedDate).getTime();
            console.log(subDate >= start && subDate <= end);
            return subDate >= start && subDate <= end;
          })
        );
      } else {
        alert("START date must be lesser than END date");
      }
    } else {
      alert("Please select both date");
    }
  };

  const printtable = useReactToPrint({
    content: () => printPDF.current,
    onBeforePrint: () => {
      document.querySelector(".printTable").style.color = "white";
      document.querySelector(".dateMsg").innerHTML = "";
    },
    onBeforeGetContent: () => {
      document.querySelector(".printTable").style.color = "black";
      if (from && to) {
        document.querySelector(
          ".dateMsg"
        ).innerHTML = `All Application: From [${moment(from).format(
          "DD/MM/YYYY"
        )}] To [${moment(to).format("DD/MM/YYYY")}]`;
      } else {
        document.querySelector(
          ".dateMsg"
        ).innerHTML = `All Application: Till date [${moment(new Date()).format(
          "DD/MM/YYYY"
        )}]`;
      }
    },
    documentTitle: "all-applications",
  });

  return (
    <>

<div className="page-header">
        <div>
          <h1 className="page-title">All Application</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              All Applications
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
        <TableToExcelReact
                          table="table-to-xls"
                          fileName={`Applications`}
                          sheet="sheet 1"
                        >
                          <div className="py-2"></div>
                          <button type="button" class="btn btn-primary">
                            Download
                          </button>
                        </TableToExcelReact>
        </div>
      </div>


      <div className="bg-light">
        
                
                <div className="" >
                <table class="table w-100 table-responsive " >
                  <thead className="" style={{ width: "1000px", }} >
                    <tr >
                      <th >From</th>
                      <th >To</th>
                      <th>Apply</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      <tr>
                        <td>
                          <input
                            value={from}
                            className="form-control"
                            type="date"
                            onChange={(e) => set_from(e.target.value)}
                            pattern="\d{4}-\d{2}-\d{2}"
                          />
                        </td>
                        <td>
                          <input
                            value={to}
                            onChange={(e) => set_to(e.target.value)}
                            className="form-control"
                            type="date"
                          />
                        </td>

                        <td>
                          <button
                            onClick={filterApplication}
                            style={{ width: "100%" }}
                            type="button"
                            class="btn btn-success"
                          >
                          <FontAwesomeIcon icon={faArrowRight} />
                          </button>
                        </td>
                        <td>
                        
                        </td>
                      </tr>
                      
                    }
                  </tbody>
                </table>
                </div>
              </div>

      <div className="main-body-pannel">
        <div className="right-pannel-div">
          <div className="right-pannel-div-inner">
            <div className="inner-vendor">
             
               
            </div>

            {allApplication.length ? (
              <div className="inner-vendor">
                <div className="card" ref={printPDF}>
                  <div className="card-body">
                  <p className="dateMsg">{dateMsg}</p>

                  <table id="table-to-xls" class="table w-100 table-bordered">
                    <thead className="printTable">
                      <tr>
                        <th>Application Number</th>
                        <th>Submit Date</th>
                        <th>Vendor Name </th>
                        <th>Product Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allApplication.map((item, i) => (
                        <tr key={i}>
                          <td>{item?.applicationNo}</td>
                          <td>
                            {item?.submittedDate
                              ? moment(item.submittedDate).format("DD/MM/YYYY")
                              : "-- --"}
                          </td>
                          <td>{item?.vendorName}</td>
                          <td>{item?.productName}</td>

                          <td>{getApplicationStatus(item?.checkStatus)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: "150px" }}>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllApplication;
