import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Smalltag from '../../../vrspages/SmallTag/smalltag'
import { Breadcrumb } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';




function NewProduct() {
    let convenorStatus = localStorage.getItem("ConvenorStatus")
    const navigate = useNavigate();
    const [newProdArr, set_newProdArr] = useState([])
    useEffect(() => {
      const fetch_AllNewProd = async ()=>{
          await axios.get(process.env.REACT_APP_BASE_URL+"/api/v1/prodreq/all").then((res)=>{
            set_newProdArr(res.data.content)
          })
          
      }
      fetch_AllNewProd()
    }, [])
    console.log(newProdArr);
    const getProductStatus = (status)=>{
        if(status === "A") return "Accepted"
        if(status === "R") return "Rejected"
        return "Pending"
      }

  return (
    <>
         {/*  <Header /> */}

         <div className="page-header">
        <div>
          <h1 className="page-title">Product Request</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Product Request
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
         

          <div className="">
         {/*  <DepartmentalSidebar convenor={convenorStatus} /> */}
            <div className=''>
              <div className=''>
                  
                <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                      <div className='card-body'>
                <table class="table table-responsive w-100 table-bordered">
                  <thead className=''>
                    <tr >
                      <th >Sl No.</th>
                      <th >Vendor Registration No</th>
                      <th>Product Category <br></br>(Civil/Mechanical/Electrical)</th>
                      <th>Product Name</th>
                      <th>Area of application</th>
                      <th>Download Files</th>
                      <th>Status</th>
                      <th>Visit</th>
                      </tr>
                      </thead>
                      <tbody>
                          {
                            newProdArr.map((item, index)=>(
                              <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.regNo}</td>
                                <td>{item.prodNature === "C"? "Civil": "Mechanical/Electrical"}</td>
                                <td>{item.prodDesc}</td>
                                <td>{item.prodApplArea}</td>
                                <td>{
									item.fleDtls.map((file, i)=>(
                    
                    <Smalltag handleClick={() =>
                                  window.open(
                                    process.env.REACT_APP_BASE_URL+file.fileUri,
                                    "_blank",
                                    
                                  )}
                                  fontAwsmIcon={"fa-solid fa-file"}
                                        lable={"File "} key={i}/>
                                    
									))
									}</td>
                  <td>
                    {getProductStatus(item.approvalFlag)}
                  </td>
                                <td><Link to={`${process.env.PUBLIC_URL}/productApprroval/`+item.reqNo}>visit</Link></td>
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
  )
}

export default NewProduct