import React, { useEffect } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Spinner from '../../../../layouts/spinner/Spinner.js';
import { Breadcrumb, Row, Card } from "react-bootstrap";
import ApproveAndReject from './ApproveAndReject';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Smalltag from '../../../SmallTag/smalltag.js';


function ApproveProduct() {
    const { year, num } = useParams();
    let reqNum = `REQ/${year}/${num}`
    const [info, set_info] = useState("")
    const [approve, set_approve] = useState("");
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    
    console.log("ok")
    useEffect(() => {
        // api/v1/productReqApproval?approvalFlag=R&rejectReason=xxxxx&reqNo=REQ%2F2023%2F41
        const getProductDeatail = async () => {
            axios.get(process.env.REACT_APP_BASE_URL + "/api/v1/prodreq/get?reqNo=" + reqNum).then((res) => {
                set_info(res.data.content)
                set_approve(res.data.content.approvalFlag)
                console.log(res.data.content.approvalFlag);
            })
        }
        getProductDeatail()
    }, [])

    const approveProd = async (e)=>{
        e.preventDefault()
        if(approve){
          const reason = document.getElementById("rejDtl")? document.getElementById("rejDtl").value: "";
          if(reason){
            setLoading(true)
            await axios.put(process.env.REACT_APP_BASE_URL+"/api/v1/productReqApproval?approvalFlag="+approve+"&rejectReason="+reason+"&reqNo="+reqNum)
            .then((res)=>{
                console.log(res.data);
                alert("Done")
                navigate(`${process.env.PUBLIC_URL}/newProduct`)
            })
            .catch((err)=> alert("Something Went wrong"))
            .finally(()=>{
                setLoading(false)
            })
          }else{
            alert("Please Give Reason")
          }
        }
        else{
          alert("Please Select Approve or Reject")
        }
      }


    return (
        <>
         <div className="page-header">
          <div>
            <h1 className="page-title">Product Control</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item" href="#">
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                Product Control
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
            <div className="main-body-pannel">
              
                <div className='right-pannel-div'>
                    <div className='right-pannel-div-inner'>

                    <div className='col-md-12'> 
                  <div id="main">
                    <div className="">
                      <div className="accordion" id="faq">

                        {info?
                        <>
                        <Accordion expanded={true}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography>Product Detail</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                <div className="">
                            

                                <div className="">
                                    <div className='row'>
                                        <div className="col-md-4">
                                            <div className="from-each-div">
                                                <p className="from-label-p">Product category</p>

                                                <select disabled className="form-control" value={info?.prodNature} id='natureOfCompany' >
                                                    <option value={""}>-- Select --</option>
                                                    <option value={"C"}>Civil</option>
                                                    <option value={"M"}>
Mechanical/Electrical
</option>

                                                </select>



                                            </div>
                                        </div>
                                        <div className="col-md-4">
                            <div className="from-each-div">
                                <p className="from-label-p">Product Name </p>
                                <input type="text" className="form-control" value={info?.prodDesc} disabled />
                            </div>
                        </div>
                        <div className='col-md-12 py-1'>
                                
                                    <textarea disabled value={info?.prodApplArea} style={{ minWidth: "100%", minHeight: "100px" }}
                                        id='pendingCourtCase'
                                        placeholder='Give detailes' className="form-control d-inline-block w-auto align-top courtCases" />
                            </div>
                        <div className="col-md-4">
                            <div className="from-each-div">
                                <p className="from-label-p">File(s) </p>
                                {
									info.fleDtls.map((file, i)=>(
                                        
										    <div style={{cursor:"pointer"}}>
                        <Smalltag handleClick={() =>
                                  window.open(
                                    process.env.REACT_APP_BASE_URL+file.fileUri,
                                    "_blank",
                                    
                                  )} fontAwsmIcon={"fa-solid fa-file"} lable={"File "+(i+1)} key={i}/>
                        </div>
                                  
									))
									}
                            </div>
                        </div>

                                    </div>

                                </div>
                           
                        </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                       
                        <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography>Approve/Rejection</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                <ApproveAndReject approve={approve} set_approve={set_approve} reasonData={info.rejectReason}/>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                       
                        </>
                        :
                        <Spinner />}

                    </div>
                    </div>
                    </div>
                    </div>
                    {
              
                        (info?.approvalFlag !== "A" && info?.approvalFlag !== "R") && <div className="col-md-12 text-right">
                <button onClick={approveProd} className="Enquiry-btn ml-auto mt-2 btn btn-primary">{loading ? 'Loading...' : 'Submit'}</button>
              </div>
             }

                    </div>

                </div>
            </div>
         
        </>
    )
}

export default ApproveProduct

