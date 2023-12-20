import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Breadcrumb, Row, Card } from "react-bootstrap";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Spinner from "../../layouts/spinner/Spinner";

import HeaderCard from ".././cards/HeaderCard";
import GeneralInfoCard from ".././cards/GeneralInfoCard";

import ManufacturingFacilityCard from ".././cards/ManufacturingFacilityCard";
import TestingFacilities from ".././cards/TestingFacilities";
import FinancialInfo from ".././cards/FinancialInfo";
import MarketingNetwork from ".././cards/MarketingNetwork";
import AfterSaleService from ".././cards/AfterSaleService";
import PerformanceReliability from ".././cards/PerformanceReliability";
import moment from "moment";

function EditPage() {
  const { year, num } = useParams();
  let applicationNum = `APP/${year}/${num}`;
  localStorage.setItem("applicationNo", applicationNum);
  const [productCode, setProductCode] = useState("");
  const navigate = useNavigate();
  const [info, set_info] = useState(null);
  const [activeDate, set_activeDate] = useState({
    from: "",
    to : "",
    today: new Date().getTime()
  })
  const getActiveDate = async ()=>{
    await axios.get(process.env.REACT_APP_BASE_URL+"/api/v1/ActivePeriod").then((res)=>{
      
      set_activeDate({
        ...activeDate,
        from: new Date(res.data.content.fromDate).getTime(),
        to: new Date(res.data.content.toDate).getTime()
      })
    }) 
    
}
useEffect(() => {
      
  getActiveDate()

}, [])

  const submitApplicaton = async () => {
    //sa

    if (!submitCond.MF) {
      alert("Plese fill Manufacturing Facility");
    } else {
      if (
        window.confirm(
          "Are you sure? After submission you cannot edit the application!"
        )
      ) {
        await axios
          .put(
            process.env.REACT_APP_BASE_URL +
              "/api/v1/submit?appNo=" +
              localStorage.getItem("applicationNo")
          )
          .then((res) => {
            if (res.data.code === 0) {
              alert("submitted Successfully");
              navigate(`${process.env.PUBLIC_URL}/Dashboard`);
            }
          });
      }
    }
  };
  useEffect(() => {
    const get_All_info_by_ApplicationNum = async () => {
      await axios
        .get(
          process.env.REACT_APP_BASE_URL +
            "/api/v1/allInfo/appNo?applicationNo=" +
            applicationNum
        )
        .then((res) => {
          set_info(res.data.content);
          console.log(res.data.content);
        });
    };
    get_All_info_by_ApplicationNum();
  }, [applicationNum]);

  const [submitCond, setSubmitCond] = useState({
    category: true,
    product: true,
    GI: false,
    MF: info?.manufacture?.applicationNo ? true : false,
  });
  useEffect(() => {
    setSubmitCond({
      ...submitCond,
      MF: info?.manufacture?.applicationNo ? true : false,
    });
  }, [info]);

  return (
    info && (
      <>
        <div className="page-header">
          <div>
            <h1 className="page-title">Edit Application</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item" href="#">
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                Edit Application
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
        <div className="card bg-light">
          <div className="card-body">
            
            {info ? (
              <div className="right-pannel-div">
                <div className="right-pannel-div-inner mrgin-buttom-zero">
               
                  <div className="row">
                
                    <HeaderCard
                      info={info?.generalInfo}
                      vDeatail={info?.vendorDtls}
                      applicationNum={applicationNum}
                      disabled={true}
                     
                    />
                  
                    <div className="col-md-12">
                      <div id="main">
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
                                <GeneralInfoCard mode={2} info={info?.generalInfo} vendorInfo={info.vendorDtls}  />
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
                                  <ManufacturingFacilityCard
                                    mode={2}
                                    submitCond={submitCond}
                                    info={info?.manufacture}
                                    setSubmitCond={setSubmitCond}
                                  />
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
                                  <TestingFacilities
                                    mode={2}
                                    info={info?.testing}
                                  />
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
                                  <FinancialInfo
                                    mode={2}
                                    info={info?.finance}
                                  />
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
                                  <MarketingNetwork
                                    mode={2}
                                    info={info?.marketing}
                                  />
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
                                <Typography>After Sales Service</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                  <AfterSaleService
                                    mode={2}
                                    info={info?.serviceCeter}
                                  />
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
                                  <PerformanceReliability
                                    mode={2}
                                    info={info?.performance}
                                  />
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                          <div className="col-md-12 text-right">
                            {activeDate.today < activeDate.toDate &&<button
                              onClick={submitApplicaton}
                              className="Enquiry-btn ml-auto mt-2 btn btn-primary"
                            >
                              Submit
                            </button>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </>
    )
  );
}

export default EditPage;
