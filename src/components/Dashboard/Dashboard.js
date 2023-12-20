import React, { useState } from 'react';//
import { useLocation, Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger,Tooltip } from "react-bootstrap";
import { useEffect } from 'react';
import axios from 'axios';
import moment from "moment/moment";
import { Breadcrumb, Row, Card } from "react-bootstrap";

// import { getUser, getMethod, getFreq } from '../Common/Common';

function Dashboard() {
    const [allApplication, set_AllApplication] = useState([])
    const [activeDate, set_activeDate] = useState({
      from: "",
      to : "",
      today: new Date().getTime()
    })
    const getActiveDate = async ()=>{
      await axios.get(process.env.REACT_APP_BASE_URL+"/api/v1/ActivePeriod").then((res)=>{
        console.log(new Date(res.data.content.fromDate).getTime());
        set_activeDate({
          ...activeDate,
          from: new Date(res.data.content.fromDate).getTime(),
          to: new Date(res.data.content.toDate).getTime()
        })
      })
      
  }
  const fetchAllApplication = async ()=>{
    await axios.get(process.env.REACT_APP_BASE_URL+"/api/v1/generalinformation/{registration_number}?regNo="+localStorage.getItem("registrationNo")).then((res)=>{
      console.log(res.data.content)
      set_AllApplication(res.data.content)
    })
    
}
    useEffect(() => {
      
      getActiveDate()
      fetchAllApplication()

    }, [])
    // console.log(allApplication, localStorage.getItem("registrationNo"));

    const getApplicationStatus = (status)=>{
      if(status === "P") return "Pending"
      if(status === "A") return "Approved"
      if(status === "R") return "Rejected"
      return "Pending"
    }

    const columns=[
      {
        name: "S.NO",
        selector: row => [row.rowNo],
        sortable: true,
        cell:row=><span className="text-muted fs-15 fw-semibold text-center">{row.rowNo}</span>
      },
      
      
      {
        
        name: "APPLICATION NO.",
        selector: row => [row.applicationNo],
        sortable: true,
        cell:row=><span className="text-muted fs-15 fw-semibold text-center">{row.applicationNo}</span>
      },
      {
        name: "APPLICATION DATE",
        selector: row => [row.submittedDate],
        sortable: true,
        cell:row=><span className="text-muted fs-15 fw-semibold">{(moment(row.submittedDate).format('DD/MM/YYYY'))}</span>
      },
      {
        name: "PRODUCT CATEGORY",
        selector: row => [row.productCategory],
        sortable: true,
        cell:row=><span className="text-muted fs-15 fw-semibold">{row.productCategory}</span>
      },
      {
        name: "PRODUCT",
        selector: row => [row.productName],
        sortable: true,
        cell:row=><span className="text-muted fs-15 fw-semibold">{row.productName}</span>
      },
      {
        name: "SUBMISSION STATUS",
        selector: row => [row.submittedFlag==="N"? "Not Submitted": "Submitted"],
        sortable: true,
        cell: row=><span className={`text-${row.color} fs-15 fw-semibold`}>{row.submittedFlag==="N"? "Not Submitted": "Submitted"}</span>
      },
      {
        name: "APPLICATION STATUS",
        selector: row => [getApplicationStatus(row.checkStatus)],
        sortable: true,
        cell: row=><span className={`text-${row.color} fs-15 fw-semibold`}>{getApplicationStatus(row.checkStatus)}</span>
      },
      {
        name: "ACTION",
        selector: row => [row.action],
        sortable: true,
        cell: row =><span className="">
        <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
        <Link to="#"className="btn btn-primary btn-sm rounded-11 me-2" ><i><svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"/></svg></i></Link>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
        <Link to="#" className="btn btn-danger btn-sm rounded-11"><i><svg className="table-delete" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg></i></Link>
        </OverlayTrigger>
    </span>
      },
    ]
 
    let data= allApplication;
    const tableDatas = {
      columns,
      data,
    };
   let i=1;


    return (
        <>


<div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Dashboard
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
        <div style={{padding:"10px", borderRadius: "15px"}} className='col-md-12 bg-white pd-15'>
                      <b className='imp-msg'>{`Portal will be active from ${moment(activeDate.from).format('DD/MM/YYYY')}  to  ${moment(activeDate.to).format('DD/MM/YYYY')}` }</b>
                
                      {/* <p><b> Application Submitted on Date : {(moment(info?.generalInfo?.applicationDate).format('DD/MM/YYYY'))}</b></p> */}
               

              </div>
        </div>
      </div>
        
          <div className="main-body-pannel">
          
            <div className='right-pannel-div'>
              <div className='right-pannel-div-inner'>
                  
                <div className=''>
                <div className=' inner-vendor'>
                
                <div >
                <div className='card'>
                 

{/* <DataTableExtensions {...tableDatas}>
          <DataTable 
          columns={columns}  
          data={data}
          noHeader
          defaultSortField="APPLICATION NO" 
          defaultSortAsc={false}
          striped={true}
          center={true}
          persistTableHead
          pagination
          highlightOnHover />
          </DataTableExtensions> */}
                  

                <table className="table table-responsive w-100 table-bordered dta-table">
                  <thead>
                    <tr>
                      <th >Sl No.</th>
                      <th >Application No</th>
                      <th >Date of Application</th>
                      <th >Product Category <br></br>(Civil/Mechanical/ Electrical)</th>
                      <th>Product</th>
                      <th>Submission Status </th>
                      <th >Application Status </th>
                      <th style={{width: '5px'}}>Edit</th>
                      <th>Download</th>
                      </tr>
                      </thead>
                      <tbody>
                          {
                            allApplication.map((item, index)=>(
                              <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.applicationNo}</td>
                                <td>{item.applicationDate?moment(item.submittedDate).format('DD/MM/YYYY'): "-- --"}</td>
                                <td>{item.productCategory === "C"? "Civil": "Mechanical/Electrical"}</td>
                                <td>{item.productName}</td>
                                <td >{item.submittedFlag==="N"? "Not Submitted": "Submitted"}</td>
                                <td>{getApplicationStatus(item.checkStatus)}</td>
                                <td>{item.submittedFlag==="N" && <Link to={`${process.env.PUBLIC_URL}/EditApplication/`+item.applicationNo}>Edit</Link>}
                                </td>
                                <td>{item.submittedFlag==="Y" && <Link to={`${process.env.PUBLIC_URL}/VendorApplication/`+item.applicationNo}>Download</Link>}
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                    </table>
                   
                    </div>
                  </div>
                 
                  </div>
                  </div>
                
                
              </div>
            </div>
          </div>
          
        </>
    );
}

export default Dashboard;
