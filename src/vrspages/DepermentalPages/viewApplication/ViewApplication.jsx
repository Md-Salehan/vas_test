import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Row, Card } from "react-bootstrap";
import axios from 'axios';

// Components
import HeaderCard from '../../cards/HeaderCard';
import GeneralInfoCard from '../../cards/GeneralInfoCard';
import ManufacturingFacilityCard from '../../cards/ManufacturingFacilityCard';
import MarketingNetwork from '../../cards/MarketingNetwork';
import AfterSaleService from '../../cards/AfterSaleService';
import PerformanceReliability from '../../cards/PerformanceReliability';
import TestingFacilities from '../../cards/TestingFacilities';
import FinancialInfo from '../../cards/FinancialInfo';
import ApproveAndReject from '../../cards/ApproveAndReject';

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


function ViewApplication() {
  const userType = localStorage.getItem("userType")
  const ConvenorStatus = localStorage.getItem("ConvenorStatus")
  const [disabledStatus, set_disabledStatus] = useState(false)
  const [approve, set_approve] = useState("");
  const [loading, setLoading] = useState(false);
  const {  year, num } = useParams();
  let applicationNum = `APP/${year}/${num}`
  const [info, set_info] = useState(null)
  const navigate = useNavigate()

  const get_disableStatus = (checkStatus)=>{
    // (userType!=="H" || userType!=="N" || userType!=="A") || (res.data.content.generalInfo?.checkStatus==="A" || res.data.content.generalInfo?.checkStatus==="R")
    if(userType==="H" || ConvenorStatus==="A" || userType==="A"){

      if(checkStatus === "A" || checkStatus === "R"){
        set_disabledStatus(true)
      }
      else set_disabledStatus(false)
    }else{
      set_disabledStatus(true)
    }
  }
  useEffect(() => {
    const get_All_info_by_ApplicationNum = async ()=>{
        await axios.get(process.env.REACT_APP_BASE_URL+"/api/v1/allInfo/appNo?applicationNo="+applicationNum).then((res)=>{
          set_info(res.data.content)

          get_disableStatus(res.data.content.generalInfo?.checkStatus)

          set_approve(res.data.content?.generalInfo?.checkStatus)

          if(res.data.content?.generalInfo?.checkStatus === "R")document.getElementById("rejDtl").value = res.data.content?.generalInfo?.rejectionreason
        })
    }
    
    get_All_info_by_ApplicationNum()

  }, [])
  //api/v1/approvalApp?appNo=APP%2F2023%2F211&checkStatus=A&rejectionreason=ssssss
  const approveApplication = async (e)=>{
    e.preventDefault()
    if(approve !== "N" && approve ){
      const reason = document.getElementById("rejDtl")? document.getElementById("rejDtl").value: "";
      console.log(approve);
      if(reason){
        setLoading(true)
        await axios.put(process.env.REACT_APP_BASE_URL+"/api/v1/approvalApp?appNo="+applicationNum+"&checkStatus="+approve+"&rejectionreason="+reason)
        .then((res)=>{
            console.log(res.data);
            alert("Done")
            navigate(`${process.env.PUBLIC_URL}/DepartmentalDashboard`)
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
    info && <>


<div className="page-header">
          <div>
            <h1 className="page-title">Application Detail</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item" href="#">
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                Application Detail
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
         
         
          <div className='card'>
            <div className='card-body'>
					    <div className="row">
                <HeaderCard  info={info?.generalInfo} vDeatail={info?.vendorDtls} applicationNum={applicationNum} disabled={true} />
                <div className='col-md-12'> 
                  <div id="">
                    <div className="">
                      <div className="accordion py-2" id="faq">
                      <Accordion defaultExpanded="true">
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{backgroundColor:"#eaedf7", marginTop:"20px"}}
                              >
                                <Typography>General Information</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                {info?.generalInfo && <GeneralInfoCard mode={1} info={info?.generalInfo} vendorInfo={info.vendorDtls}  />}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                       
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{backgroundColor:"#eaedf7", marginTop:"20px"}}
                              >
                                <Typography>Manufacturing Facility</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                {info?.manufacture && <ManufacturingFacilityCard mode={1} info={info?.manufacture} /> }
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                style={{backgroundColor:"#eaedf7", marginTop:"20px"}}
                              >
                                <Typography>
                                  Testing Facilities & Quality Control
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                {info?.testing && <TestingFacilities mode={1} info={info?.testing} />}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                        

                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                                style={{backgroundColor:"#eaedf7", marginTop:"20px"}}
                              >
                                <Typography>Finanacial Information</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                {info?.finance && <FinancialInfo mode={1} info={info?.finance} />}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>


                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4a-content"
                                id="panel4a-header"
                                style={{backgroundColor:"#eaedf7", marginTop:"20px"}}
                              >
                                <Typography>
                                  Marketing Network(Availabilty in Market)
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                {info?.marketing &&<MarketingNetwork mode={1} info={info?.marketing} />}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                      

                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4a-content"
                                id="panel4a-header"
                                style={{backgroundColor:"#eaedf7", marginTop:"20px"}}
                              >
                                <Typography>
                                  After Sale Service
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                {info?.serviceCeter && <AfterSaleService mode={1} info={info?.serviceCeter} />}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4a-content"
                                id="panel4a-header"
                                style={{backgroundColor:"#eaedf7", marginTop:"20px"}}
                              >
                                <Typography>Performance Reliability</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                {info?.performance && <PerformanceReliability mode={1} info={info?.performance} />}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                       
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4a-content"
                                id="panel4a-header"
                                style={{backgroundColor:"#eaedf7", marginTop:"20px"}}
                              >
                                <Typography>Approve and Rejection</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                {info?.generalInfo && <ApproveAndReject  disabledStatus={disabledStatus} 
                                reasonData={info?.generalInfo?.rejectionreason} approve={approve} set_approve={set_approve} />}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                    
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
              {console.log('====================================', disabledStatus)
              }
             {
              info?.generalInfo && !disabledStatus &&
              <div className="col-md-12 text-right">
                <button onClick = {approveApplication} className="Enquiry-btn mr-3 mt-2 btn btn-secondary mx-1">Submit</button>
              </div>
             }
             
              
            </div> 
          </div>
        
        </>
  )
}

export default ViewApplication