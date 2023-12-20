import React, { useEffect, useState } from 'react';


import ApplicationTable from '../ApplicationTable/ApplicationTable';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../../layouts/spinner/Spinner';
import { Breadcrumb } from "react-bootstrap";
import {
  Col, Row, Card, Button, Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
function DepartmentalDashboard() {
  const [civil_ProductList, set_civil_ProductList] = useState([])
  const [me_ProductList, set_me_ProductList] = useState([])
  const [showC, set_showC] = useState(true)
  const [showME, set_showME] = useState(false)
  const [assign, set_assign] = useState("")
  const [loading, setLoading] = useState(false);
  const [appTyp, set_appTyp] = useState("AL");
  const userType = localStorage.getItem("userType")

  useEffect(() => {
    const getCivilProdList = async () => {
      await axios.get(process.env.REACT_APP_BASE_URL + "/api/v1/products/{prodCategory}?prodCategory=C").then((res) => {
        set_civil_ProductList(res.data.content)
      }).catch((err) => {
        console.log(err);
      })
    }
    const getMEProdList = async () => {
      await axios.get(process.env.REACT_APP_BASE_URL + "/api/v1/products/{prodCategory}?prodCategory=M").then((res) => {
        set_me_ProductList(res.data.content)
      }).catch((err) => {
        console.log(err);
      })
    }
    getCivilProdList()
    getMEProdList()


  }, [])

  const getUserType = (type) => {
    if (type === "H") return "Committee Chairman"
    if (type === "C") return "Committee member"
    if (type === "N") return "Committee Convener"
    if (type === "I") return "Sub Committee Member (Civil)"
    if (type === "M") return "Sub Committee Member (Mechanical)"
    if (type === "A") return "Admin"
    return ""
  }

  const [civilApplications, set_civilApplications] = useState([])
  const [me_Applications, set_me_Applications] = useState([])
  useEffect(() => {
    const getAllCivilApplication = async () => {
      await axios.get(process.env.REACT_APP_BASE_URL + "/api/v1/vendorList?prodCategory=C").then((res) => {
        set_civilApplications(res.data.content)
      }).catch((err) => {
        console.log(err);
      })
    }
    const getAllMechanicalApplications = async () => {
      await axios.get(process.env.REACT_APP_BASE_URL + "/api/v1/vendorList?prodCategory=M").then((res) => {
        set_me_Applications(res.data.content)
      }).catch((err) => {
        console.log(err);
      })
    }

    const getConvenerStatus = async () => {
      await axios.get(process.env.REACT_APP_BASE_URL + "/api/v1/systemCtl").then((res) => {
        set_assign(res.data.content.assignWitdrawFlag)
        localStorage.setItem("ConvenorStatus", res.data.content.assignWitdrawFlag)
      }).catch((err) => {
        console.log(err);
      })
    }
    getAllCivilApplication();
    getAllMechanicalApplications()
    getConvenerStatus()
  }, [])

  const handleConvenor = async () => {
    if (window.confirm("Are you sure?")) {
      const obj = {
        assignWitdrawFlag: assign === "A" ? "W" : "A",
        assignWithdrawDate: "2023-07-29T16:39:52.551Z"
      }

      setLoading(true)
      await axios.put(process.env.REACT_APP_BASE_URL + "/api/v1/systemCtl", obj).then((res) => {
        localStorage.setItem("ConvenorStatus", obj.assignWitdrawFlag)
        set_assign(obj.assignWitdrawFlag)
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false)
      })
    }

  }




  let c_pcount = 0
  let me_pcount = 0
  let c_ecount = 0
  let me_ecount = 0
  let c_a_count = 0
  let me_a_count = 0
  let c_r_count = 0
  let me_r_count = 0
  const cal_SubmitedNum = (arr) => {
    console.log(arr);
    let num = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].submittedFlag === "Y") {
        num++;
        if (arr[i].productCategory === "C" && (arr[i].checkStatus === "P" || arr[i].checkStatus === "N")) c_pcount++
        if (arr[i].productCategory === "M" && (arr[i].checkStatus === "P" || arr[i].checkStatus === "N")) me_pcount++

        if (arr[i].productCategory === "C" && arr[i].checkStatus === "A") c_a_count++
        if (arr[i].productCategory === "M" && arr[i].checkStatus === "A") me_a_count++
        if (arr[i].productCategory === "C" && arr[i].checkStatus === "R") c_r_count++
        if (arr[i].productCategory === "M" && arr[i].checkStatus === "R") me_r_count++
      }
    }
    return num
  }

  const handle_show_ME = (type)=>{
    set_showC(false); 
    set_showME(true); 
    set_appTyp(type);
  }
  const handle_show_Civil = (type)=>{
    set_showC(true); 
    set_showME(false); 
    set_appTyp(type);
  }
  return (
    <>

      <div className="page-header">
        <div>
          <h1 className="page-title">{"Departmental User ( " + getUserType(userType) + " )"}</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Departmental Dashboard
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          {/*  <Link
            to={`${process.env.PUBLIC_URL}/BillList`}
            className="btn btn-success btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Button
          </Link> */}
        </div>
      </div>


      <div className=''>
        <div className=''>
          <div className='row '>
            {/*                 <div className='col-md-12'><h1 class="page-heading mb-3 text-left">{"Depertmental User ( "+getUserType(userType)+" )"}</h1></div> */}
            <div className='col-md-4'>
              <div className="each-dash-boardbox three-border bg-light">
                <Card className="card bg-info img-card box-info-shadow" style={{ minHeight: '142px' }}>
                  <Card.Body className="">


                    <div className='head-box text-white'>
                      <h2 class="card-title mb-0">Applications</h2>
                      <br></br>

                    </div>
                    <div className='inner-data-box'>
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='head-product text-center'>
                            <div className='row'>
                              <div className='col-md-12'>
                                <div className='head-product text-center'>
                                  <div class="row">
                                    <div class="col-md-4 border-right">
                                      <div onClick={() => handle_show_Civil("AL")} class="head-product text-center">
                                        <Link to="#"><h3 style={{ fontSize: "0.8rem", color: "#ffffff" }}>Civil</h3><h2 style={{ color: "#ffffff" }}>{cal_SubmitedNum(civilApplications)}</h2></Link>
                                      </div>
                                    </div>
                                    <div class="col-md-8">
                                      <div onClick={() => handle_show_ME("AL")} class="head-product text-center">
                                        <Link to="#">
                                          <h3 style={{ fontSize: "0.8rem", color: "#ffffff" }}>Mechanical/Electrical</h3>
                                          <h2 style={{ color: "#ffffff" }}>{cal_SubmitedNum(me_Applications)}</h2>
                                        </Link>
                                      </div
                                      ></div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>


                  </Card.Body>
                </Card>
              </div>
            </div>
            <div className='col-md-4'>
              <div className="each-dash-boardbox four-border">
                <Card className="card bg-secondary img-card box-primary-shadow" style={{ minHeight: '142px' }}>
                  <Card.Body className="">

                    <div className='head-box text-white'>
                      <h2 class="card-title mb-0">Pending Applications</h2>
                      <br></br>
                    </div>
                    <div className='inner-data-box'>
                      <div className='row'>
                        <div class="col-md-4 border-right">
                          <div onClick={() => handle_show_Civil("N")} class="head-product text-center">
                            <Link to="#"><h3 style={{ fontSize: "0.8rem", color: "#ffffff" }}>Civil</h3>
                              <h2 style={{ color: "#ffffff" }}>{c_pcount}</h2></Link>
                          </div>
                        </div>
                        <div class="col-md-8">
                          <div onClick={() => handle_show_ME("N")} class="head-product text-center">
                            <Link to="#">
                              <h3 style={{ fontSize: "0.8rem", color: "#ffffff" }}>Mechanical/Electrical</h3>
                              <h2 style={{ color: "#ffffff" }}>{me_pcount}</h2>
                            </Link>
                          </div></div>
                      </div>
                    </div>


                  </Card.Body>
                </Card>
              </div>
            </div>
            <div className='col-md-4'>
              <div className="each-dash-boardbox five-border">
                <Card className="card bg-success img-card box-primary-shadow" style={{ minHeight: '142px' }}>
                  <Card.Body className="">



                    <div className='head-box text-white'>
                      <h4 class="card-title mb-0">Enlisted Vendors</h4>
                      <br></br>
                    </div>
                    <div className='inner-data-box'>
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='head-product text-center'>
                            <div class="row">
                              <div class="col-md-5 border-right">
                                <div class="head-product text-center box">
                                  <Link to="#"><h3 style={{ fontSize: "0.8rem", color: "#ffffff" }}>Civil</h3>
                                    <h6 onClick={() => handle_show_Civil("A")} style={{ color: "#ffffff" }}>Approved: {c_a_count}</h6>
                                    <h6 onClick={() => handle_show_Civil("R")} style={{ color: "#ffffff" }}>Rejected: {c_r_count}</h6>
                                  </Link>

                                </div>
                              </div>
                              <div class="col-md-7">
                                <div class="head-product text-center">
                                  <Link to="#">
                                    <h3 style={{ fontSize: "0.8rem", color: "#ffffff" }}>Mechanical/Electrical</h3>
                                    <h6 onClick={() => handle_show_ME("A")} style={{ color: "#ffffff" }}>Approved: {me_a_count}</h6>
                                    <h6 onClick={() => handle_show_ME("R")} style={{ color: "#ffffff" }}>Rejected: {me_r_count}</h6>
                                  </Link>
                                </div
                                ></div>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>


                  </Card.Body>
                </Card>

              </div>
            </div>
            <div>
              {(userType === "A" || userType === "H") &&
                <div className='bg-light' style={{ margin: "20px 0 20px 0" }}>
                  <table className="table w-100 table-bordered" style={{ backgroundColor: "rgba(220, 53, 69, 0.1)" }} >
                    <thead >
                      <tr>
                        <th style={{ width: "80%" }}>

                          Covener
                        </th>
                        <th style={{ width: "20%" }}>
                          {assign === "A" ?
                            <button onClick={handleConvenor} style={{ width: "100%", outline: "none" }} type="button" className="btn btn-danger xxx">{loading ? 'Loading...' : 'Withdrawal'}</button>
                            :
                            <button onClick={handleConvenor} style={{ width: "100%", outline: "none" }} type="button" className="btn btn-primary xxx">{loading ? 'Loading...' : 'Assign'}</button>}
                        </th>
                      </tr>
                    </thead>

                  </table></div>
              }
            </div>
          </div>

        </div>
        <div>
          {showC && <ApplicationTable appTyp={appTyp} lable={"Applications for Civil"} ApplicationList={civilApplications} productList={civil_ProductList} />}

          {showME && <ApplicationTable appTyp={appTyp} lable={"Applications for Mechanical/Electrical"} ApplicationList={me_Applications} productList={me_ProductList} />}
        </div>
      </div>

    </>
  );
}

export default DepartmentalDashboard;
