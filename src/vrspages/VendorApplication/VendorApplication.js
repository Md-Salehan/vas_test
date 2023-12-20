import React, { useEffect, useRef, useState } from 'react';
//import { useLocation, Link } from 'react-router-dom';
// import Header from '../Header/Header';
// import Sidebar from '../Sidebar/Sidebar';
// import Footer from '../Footer/Footer';
// import Smalltag from '../SmallTag/smalltag';
import moment from "moment/moment";
import { useReactToPrint } from 'react-to-print';

// import GeneralInformationView from './GeneralInformationView';
// import TestingFacilitiesView from './TestingFacilitiesView';
// import ManufacturingFacilityView from './ManufacturingFacilityView';
// import FinancialInformationView from './FinancialInformationView';
// import MarketingNetworkView from './MarketingNetworkView';
// import AfterSalesServicerView from './AfterSalesServiceView';
// import PerformanceReliabilityView from './PerformanceReliabilityView';
import axios from 'axios';
// import { event } from 'jquery';
// import { Await } from 'react-router-dom';
 import { useNavigate, useParams } from 'react-router-dom';


// import { getUser, getMethod, getFreq } from '../Common/Common';

function VendorApplication() {
  const userType = localStorage.getItem("userType")
  const printPDF = useRef()
//print function
function handlePrint(){
  console.log("kk");
  let body = document.getElementById("body")?.innerHTML;
  let printArea = document.getElementById("printArea")?.innerHTML;
  document.getElementById("body").innerHTML = printArea;
    window.print();
  document.getElementById("body").innerHTML = body;

  //window.location.reload(true);

 }

  const {  year, num } = useParams();
  let applicationNum = `APP/${year}/${num}`
  const [info, setInfo] = useState(null)
 
 //const navigate = useNavigate()
  let useType = localStorage.getItem("userType")
  useEffect(() => {
    const get_All_info_by_ApplicationNum = async ()=>{
        await axios.get(process.env.REACT_APP_BASE_URL+"/api/v1/allInfo/appNo?applicationNo="+applicationNum).then((res)=>{
          setInfo(res.data.content)
          console.log("data",res.data.content);
          console.log(info);
        })
    }
    
    get_All_info_by_ApplicationNum()

  }, [])

  const getFilesCount = (fileList, fileType)=>{
    let count=0;
    for (let i=0; i<fileList?.length; i++) {
      if (fileList [i].fileTypeCode === fileType){
          count++;
        }
    }
    return count;
    
  }


  const getFinYearCode = (arr, indx)=>{
      if (indx >= arr.length)
          return "NA";
      else return arr[indx].finYearCode;
    
  }

  const getAnnualTurnover = (arr, indx)=>{
    if (indx >= arr.length)
        return 0;
    else return arr[indx].annualTurnover;
  
}

const getAnnualTurnoverGovt = (arr, indx)=>{
  if (indx >= arr.length)
      return 0;
  else return arr[indx].annualTurnoverGovt;

}
const getAnnualTurnoverPvt = (arr, indx)=>{
  if (indx >= arr.length)
      return 0;
  else return arr[indx].annualTurnoverPvt;

}
const getAnnualTurnoverProduct = (arr, indx)=>{
  if (indx >= arr.length)
      return 0;
  else return arr[indx].annualTurnoverProduct;

}
const getNetAsset = (arr, indx)=>{
  if (indx >= arr.length)
      return 0;
  else return arr[indx].netAsset;

}
const getInventories = (arr, indx)=>{
  if (indx >= arr.length)
      return 0;
  else return arr[indx].inventories;

}
const getCurrentLiabilities = (arr, indx)=>{
  if (indx >= arr.length)
      return 0;
  else return arr[indx].currentLiabilities;

}
 
  const decodeFullForm = (shortForm)=>{
   
      if (shortForm==='Y') return "Yes";
      if (shortForm==='N') return "No";
      if (shortForm==='C') return "Civil";
      if (shortForm==='M') return "Mechanical / Electrical";
      return  shortForm;  
  }
  
  const decodeApplicationType = (shortForm)=>{
   
    if (shortForm==='N') return "New Enlistment";
    if (shortForm==='R') return "Renewal";
    return  shortForm;  
  }
  const decodeNatureOfCompany = (shortForm)=>{
   
    if (shortForm==='1') return "Sole Proprietorship";
    if (shortForm==='2') return "Partnership";
    if (shortForm==='3') return "Private Limited";
    if (shortForm==='4') return "Public Sector";
    return  shortForm;  
  }
  const decodeCategoryOfUnit = (shortForm)=>{
   
    if (shortForm==='1') return "Micro";
    if (shortForm==='2') return "Small";
    if (shortForm==='3') return "Medium";
    if (shortForm==='4') return "Large";
    return  shortForm;  
  }
  const decodeMonth = (shortForm)=>{
   
    if (shortForm===1) return "January";
    if (shortForm===2) return "February";
    if (shortForm===3) return "March";
    if (shortForm===4) return "April";
    if (shortForm===5) return "May";
    if (shortForm===6) return "June";
    if (shortForm===7) return "July";
    if (shortForm===8) return "August";
    if (shortForm===9) return "September";
    if (shortForm===10) return "October";
    if (shortForm===11) return "November";
    if (shortForm===12) return "December";
    return  shortForm;  
}

const printtable = useReactToPrint({
  content: () => printPDF.current,
  onBeforePrint: ()=>{
    //document.getElementById('print-btn').style.display= "inline-block"
  },
  onBeforeGetContent: ()=>{
    //document.getElementById('print-btn').style.display= "none"
    
  },
  documentTitle: "all-applications"
});
  return (
    info &&
    <>
    <div id="body" >
<div ref={printPDF} className="main-body-pannel mt-5">
        
        
        <div className='right-pannel-div'>
          <div className='right-pannel-div-inner mrgin-buttom-zero' id='printArea'>
            <div className="row inner-vendor ">
            <div className='col-md-12 ' >


              <h2 className="text-center mb-4">Application Form Submitted for Enlistment of Vendor</h2>
              <div style={{padding:"10px", borderRadius: "15px"}} className='col-md-12 bg-white pd-15'>
                <b className='vend-name'> Vendor Name : {info?.vendorDtls?.vendorName}</b>
                <p><b> Registration No : {info?.vendorDtls?.registrationNo}</b></p>
                <p><b> Application No : {info?.generalInfo?.applicationNo}</b></p>
                <p><b> Product Category applied for : {decodeFullForm(info?.generalInfo?.productCategory)}</b></p>
             {/*<p><b> Product applied for : {info?.generalInfo?.productName}, (Product Code: {info?.generalInfo?.productCode})</b></p> */}
                <p><b> Application Submitted on Date : {(moment(info?.generalInfo?.applicationDate).format('DD/MM/YYYY'))}</b></p>
               

              </div>
            <div className='row inner-vendor' >
              <div className='col-md-12 mt-5' >
               
                {/* <GeneralInformationView  /> */}

                <table className="table w-100 table-bordered dta-table bg-white">
                                <thead>
                                    <tr>
                                        <td colSpan={12}><b>Part A: General Information</b></td>
                                    </tr>
                                    <tr>
                                        <th >SL No.</th>
                                        <th >Particulars</th>
                                        <th >Description/ details filled in by the Vendor</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Whether applied for
                                            New Enlistment or Renewal
                                        </td>
                                        <td>{decodeApplicationType(info?.generalInfo?.applicationType)}</td>
                                    </tr>
                                    <tr>
                                        <td><b>2</b></td>
                                        <td><b>Name of Vendor & Items</b></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>2.1</td>
                                        <td>Name of the Vendor</td>
                                        <td>{info?.vendorDtls?.vendorName}</td>
                                    </tr>
                                    <tr>
                                        <td>2.2</td>
                                        <td>Descriptive Name of Item(s)</td>
                                        <td>{info?.generalInfo?.productName}, (Product Code: {info?.generalInfo?.productCode})</td>
                                    </tr>
                                    <tr>
                                        <td>2.3</td>
                                        <td>Brand Name of Item(s)</td>
                                        <td>{info?.generalInfo?.brandName}</td>
                                    </tr>
                                    <tr>
                                        <td><b>3</b></td>
                                        <td><b>Communication Details</b></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>3.1</td>
                                        <td>Registered Office  Address</td>
                                        <td>{info?.vendorDtls?.officeAddress}</td>
                                    </tr>
                                    <tr>
                                        <td>3.2</td>
                                        <td>Telephone Landline</td>
                                        <td>{info?.vendorDtls?.landLineNo}</td>
                                    </tr>
                                    <tr>
                                        <td>3.3</td>
                                        <td>Mobile</td>
                                        <td>{info?.vendorDtls?.mobileNo}</td>
                                    </tr>
                                    <tr>
                                        <td>3.4</td>
                                        <td>E-mail</td>
                                        <td>{info?.vendorDtls?.emailId}</td>
                                    </tr>
                                    <tr>
                                        <td>3.5</td>
                                        <td>Web Address</td>
                                        <td>{info?.vendorDtls?.webSite}</td>
                                    </tr>
                                    <tr>
                                        <td><b>4</b></td>
                                        <td><b>Company/Enterprise Details</b></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>4.1</td>
                                        <td>Nature of Company: Whether Sole
                                            Proprietorship, Partnership, Private Ltd or Public Sector?</td>
                                        <td>{decodeNatureOfCompany(info?.generalInfo?.natureOfCompany)+" :  "+ getFilesCount(info?.generalInfo?.fileDtls, "01") + " Attachment(s)"}</td>
                                    </tr>
                                    <tr>
                                        <td>4.2</td>
                                        <td>
                                            Category of the Unit: Whether Micro, Small, Medium or Large enterprise
                                        </td>
                                        <td>{decodeCategoryOfUnit(info?.generalInfo?.categoryOfUnit)+" :  " + getFilesCount(info?.generalInfo?.fileDtls, "02") + " Attachment(s)"}</td>
                                    </tr>
                                    <tr>
                                        <td>4.3</td>
                                        <td>GST  Registration Number: Name of State/UT:
                                            State-wise GSTIN:
                                            (Copy of Registration Certificate to be attached)</td>
                                        <td>{info?.generalInfo?.gstNo}<br></br>
                                        {info?.generalInfo?.gstState}<br></br>
                                        {getFilesCount(info?.generalInfo?.fileDtls, "03") + " Attachment(s)"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4.4</td>
                                        <td>
                                            Income Tax PAN
                                        </td>
                                        <td>{info?.generalInfo?.pan}<br></br>
                                        {getFilesCount(info?.generalInfo?.fileDtls, "04") + " Attachment(s)"}</td>
                                    </tr>
                                    <tr>
                                        <td>4.5</td>
                                        <td>Year of establishment of Factory</td>
                                        <td>{info?.generalInfo?.estbYear}</td>
                                    </tr>
                                   
                                </tbody>
                            </table>
              {/*   <ManufacturingFacilityView /> */}
              <table className="table w-100 table-bordered dta-table bg-white">

<thead>
  <tr>
    <td colspan="12"><b>Part B: Manufacturing Facility</b></td>
  </tr>
  <tr>
    <th >Sl No.</th>
    <th >Particulars</th>
    <th >Description/details filled in by the Vendor</th>

  </tr>
</thead>
<tbody>
  <tr>

    <td><b>5</b></td>
    <td><b>Factory Details</b></td>
    <td></td>
  </tr>
  <tr>

    <td>5.1</td>
    <td>Factory Address</td>
    <td>{info?.manufacture?.factoryAddress}</td>
  </tr>
  <tr>

    <td>5.2</td>
    <td>Telephone Landline</td>
    <td>{info?.manufacture?.landLineNo}</td>
  </tr>
  <tr>

    <td>5.3</td>
    <td>E-mail Address</td>
    <td>{info?.manufacture?.emailId}</td>
  </tr>
  <tr>

    <td>5.4</td>
    <td>Month & Year of Commencement of production</td>
    <td>{decodeMonth(info?.manufacture?.prodStartMonth) +", " +info?.manufacture?.prodStartYear}</td>
  </tr>
  <tr>

    <td>5.5</td>
    <td>Present Factory Loading</td>
    <td>{info?.manufacture?.factLoad}%</td>
  </tr>
  <tr>

    <td>5.6</td>
    <td>Yearly Production Capacity</td>
    <td>{info?.manufacture?.yearlyProductionCapacity}</td>
  </tr>
  <tr>

    <td>5.7</td>
    <td>Manufacturing Range:
      Item wise List of different sizes and classes with production capacities to be attached as separate sheet
    </td>
    <td>{getFilesCount(info?.manufacture?.fileDtls, "06") + " Attachment(s)"}</td>
  </tr>
  <tr>

    <td>5.8</td>
    <td>Adequacy of Manufacturing Facilities: List of major machinery installed for production to be attached as separate sheet (with certification)</td>
    <td>{getFilesCount(info?.manufacture?.fileDtls, "07") + " Attachment(s)"}</td>
  </tr>
  <tr>

    <td>5.9</td>
    <td>Details of Engineers & other technical staffs engaged to be attached as separate sheet</td>
    <td>{getFilesCount(info?.manufacture?.fileDtls, "08") + " Attachment(s)"}</td>
  </tr>
  <tr>
    <td colSpan={12}>Name of contact person(s) in Factory with Mobile(s)</td>
   
  </tr>
 
<tr>
<td colSpan={12}>
<table className='bg-white'>
              <thead>
                <th>SL No</th>
                <th>5.10. Name of contact person(s) in Factory  </th>
                <th>5.11. Mobile(s)</th>
                
              </thead>

              <tbody>
              {
                           info?.manufacture?.contactDtls?.map((item, index)=>(
                      
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{item.contactPerson}</td>
                              <td>{item.contactMobileNo}</td>
                              
                              </tr>
                           
                            ))
                          }
                
              </tbody>
              </table>
            </td>


</tr>
</tbody>



</table>

              {/*  {info?.testing?.applicationNo &&  <TestingFacilitiesView info={info?.testing}/>} */}
               {info?.testing?.applicationNo &&  <table className="table w-100 table-bordered dta-table bg-white">
        <thead>
          <tr >
            <td colSpan={12}><b>Part C: Testing Facilities & Quality Control</b></td>
          </tr>
          <tr>
            <th>SL No.</th>
            <th>Particulars</th>
            <th>Description/details filled in by the Vendor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>6</b></td>
            <td><b>In-House Testing Facilities Available</b></td>
            <td></td>
          </tr>

          <tr>
            <td>6.1</td>
            <td>
              Whether in-House Testing Labs are accredited by NABL/Other Govt
              Institution?
            </td>
            <td>{decodeFullForm(info?.testing?.inHouseTestFlag) + " : " + getFilesCount(info?.testing?.fileDtls, "09") + " Attachment(s)"}</td>
          </tr>

          <tr>
            <td>6.2</td>
            <td>Name of in-house tests carried out on raw material</td>
            <td>{info?.testing?.inHouseTestNameRM}</td>
          </tr>

          <tr>
            <td>6.3</td>
            <td>Name of in-house tests carried out on products</td>
            <td>{info?.testing?.inHouseTestNameProd}</td>
          </tr>

          <tr>
            <td>6.4</td>
            <td>
              Details of in-House Testing Facilities available as per BIS/Other
              Standards (Separate sheet(s) may be attached if necessary)
            </td>
            <td></td>
          </tr>

          <tr>
           
            <td colSpan={12}>
              <table className="table w-100 table-bordered dta-table bg-white">
              <thead>
                <th>SL No</th>
                <th>Test</th>
                <th>Testing Frequency</th>
                <th>Equipment with Capacities</th>
                <th>Nos</th>
                <th>Make & Year</th>
                <th>Validity of Calibration</th>
              </thead>

              <tbody>
              {
                           info?.testing?.testsDtls?.map((item, index)=>(
                            item.testMode === "I" && 
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{item.testName}</td>
                              <td>{item.testFrequency}</td>
                              <td>{item.testEquip}</td>
                              <td>{item.noOfTest}</td>
                              <td>{item.makeYear}</td>
                              <td>{item.validityOfCalibration}</td>
                              
                              </tr>
                           
                            ))
                          }
                
              </tbody>
              </table>
            </td>
           
          </tr>

          <tr>
            <td><b>7</b></td>
            <td><b>Details of Tests carried out through outsourced Labs</b></td>
            <td></td>
          </tr>
          <tr>
            <td>7.1</td>
            <td>
              Whether the outsourced Labs are accredited by NABL/Other Govt
              Institution?
            </td>
            <td>{decodeFullForm(info?.testing?.outSourceTestFlag) + " : " + getFilesCount(info?.testing?.fileDtls, "10") + " Attachment(s)"}</td>
          </tr>
          <tr>
            <td>7.2</td>
            <td>Name of Test carried out from outsourced Labs on raw material</td>
            <td>{info?.testing?.outSourceTestNameRM}</td>
          </tr>

          <tr>
            <td>7.3</td>
            <td>Name of Test carried out from outsourced Labs on Products</td>
            <td>{info?.testing?.outSourceTestNameProd}</td>
          </tr>

          <tr>
            <td>7.4</td>
            <td>
              Details of Tests carried out from outsourced Labs (Separate
              sheet(s) may be attached if necessary)
            </td>
            <td></td>
          </tr>
          <tr>
           
           <td colSpan={12}>
             <table className="table w-100 table-bordered dta-table bg-white">
             <thead>
             
               <th>SL No</th>
               <th>Lab Name</th>
             <th>Lab Address</th>
               <th>Test</th>
               <th>Testing Frequency</th>
               <th>Nos</th>
               <th>Validity of Calibration</th>
             </thead>

             <tbody>
             {
                          info?.testing?.testsDtls?.map((item, index)=>(
                           item.testMode === "O" && 
                           <tr key={index}>
                             <td>{index+1}</td>
                             <td>{item.testlab}</td>
                             <td>{item.testlabAddress}</td>
                             <td>{item.testName}</td>
                             <td>{item.testFrequency}</td>
                             <td>{item.noOfTest}</td>
                             <td>{item.validityOfCalibration}</td>
                             
                             </tr>
                          
                           ))
                         }
               
             </tbody>
             </table>
           </td>
          
         </tr>
          <tr>
            <td>8</td>
            <td>
              System of NCR (Non-Conformity Report) Disposal and details of
              Corrective Actions (Separate Sheet to be attached along with copy
              of NCR, if any)
            </td>
            <td>{decodeFullForm(info?.testing?.systemOfNCR) + " : " + getFilesCount(info?.testing?.fileDtls, "11") + " Attachment(s)"}</td>
          </tr>

          <tr>
            <td>9</td>
            <td>
              System of Identification & Traceability of materials & processed
              components (Separate Sheet to be attached)
            </td>
            <td>{decodeFullForm(info?.testing?.systemOfdentification) + " : " + getFilesCount(info?.testing?.fileDtls, "12") + " Attachment(s)"}</td>
          </tr>

          <tr>
            <td>10</td>
            <td>
              Testing & Inspection carried out as per STI (System of Testing and
              Inspection) of related IS Standard/International Standards
              (Procedure & Records in this regard to be attached as separate
              sheet(s))
            </td>
            <td>{decodeFullForm(info?.testing?.stiFlag) + " : " + getFilesCount(info?.testing?.fileDtls, "13") + " Attachment(s)"}</td>
          </tr>

          <tr>
            <td>11</td>
            <td>
              BIS/International License Number (Copy of the certificate(s) to be
              attached)
            </td>
            <td>{info?.testing?.bisLicenseNo}<br></br> {getFilesCount(info?.testing?.fileDtls, "14") + " Attachment(s)"}</td>
          </tr>

          <tr>
            <td>11.1</td>
            <td>Validity of License (SL No 10)</td>
            <td>{info?.testing?.bisLicenseValidity}</td>
          </tr>

          <tr>
            <td>12</td>
            <td>
              ISO-9001:2005 Certificate [Quality Management System] (if any)
              (Copy of the certificate to be attached)
            </td>
            <td>{decodeFullForm(info?.testing?.isoCertificate9001) + " : " + getFilesCount(info?.testing?.fileDtls, "15") + " Attachment(s)"}</td>
          </tr>

          <tr>
            <td>13</td>
            <td>
              ISO-17025 Certificate [Testing and Calibration] (if any) (Copy of
              the certificate to be attached)
            </td>
            <td>{decodeFullForm(info?.testing?.isoCertificate17025) + " : " + getFilesCount(info?.testing?.fileDtls, "16") + " Attachment(s)"}</td>
          </tr>
        </tbody>
      </table>}


                {/* <FinancialInformationView /> */}
             {info?.finance?.applicationNo && <table className="table w-100 table-bordered dta-table bg-white">
        <thead>
          <tr>
            <td colSpan={12}>
              <b>Part D: Financial Information</b>
            </td>
          </tr>
          <tr>
            <th rowspan={2} className="text-center">Sl No.</th>
            <th rowspan={2} className="text-center">Particulars</th>
            <th colspan={8}>
              Description/details filled in by the Vendor
            </th>
          </tr>
          <tr>
            <th>Year 1: {getFinYearCode (info.finance.findtl, 0)}</th>
            <th>Year 2: {getFinYearCode (info.finance.findtl, 1)}</th>
            <th>Year 3: {getFinYearCode (info.finance.findtl, 2)}</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>14</td>
            <td>
              As per Last 3 (three) Years audited Balance Sheet (attach report)
            </td>
             
            <td>{getFilesCount(info?.finance?.fileDetails, "17") + " Attachment(s)"}</td>
            <td>{getFilesCount(info?.finance?.fileDetails, "18") + " Attachment(s)"}</td>
            <td>{getFilesCount(info?.finance?.fileDetails, "19") + " Attachment(s)"}</td>
            <td></td>
          </tr>
          <tr>
            <td>14.1</td>
            <td>Annual Turnover</td>
            <td>{getAnnualTurnover(info.finance.findtl, 0)!==0? getAnnualTurnover(info.finance.findtl, 0):"NA"}</td>
            <td>{getAnnualTurnover(info.finance.findtl, 1)!==0? getAnnualTurnover(info.finance.findtl, 1):"NA"}</td>
            <td>{getAnnualTurnover(info.finance.findtl, 2)!==0? getAnnualTurnover(info.finance.findtl, 2):"NA"}</td>
            <td>{info.finance.findtl.length===0? "NA": Math.round((Number(getAnnualTurnover(info.finance.findtl, 0))+Number(getAnnualTurnover(info.finance.findtl, 1))+Number(getAnnualTurnover(info.finance.findtl, 2)))/info.finance.findtl.length)}</td>
          </tr>
         <tr>
            <td>14.1.1</td> 
            <td>In Govt Sector</td>
            <td>{getAnnualTurnoverGovt(info.finance.findtl, 0)!==0? getAnnualTurnoverGovt(info.finance.findtl, 0):"NA"}</td>
            <td>{getAnnualTurnoverGovt(info.finance.findtl, 1)!==0? getAnnualTurnoverGovt(info.finance.findtl, 1):"NA"}</td>
            <td>{getAnnualTurnoverGovt(info.finance.findtl, 2)!==0? getAnnualTurnoverGovt(info.finance.findtl, 2):"NA"}</td>
            <td>{info.finance.findtl.length===0? "NA": Math.round((Number(getAnnualTurnoverGovt(info.finance.findtl, 0))+Number(getAnnualTurnoverGovt(info.finance.findtl, 1))+Number(getAnnualTurnoverGovt(info.finance.findtl, 2)))/info.finance.findtl.length)}</td>
          </tr>
          <tr>
            <td>14.1.2</td>
            <td>In Private Sector</td>
            <td>{getAnnualTurnoverPvt(info.finance.findtl, 0)!==0? getAnnualTurnoverPvt(info.finance.findtl, 0):"NA"}</td>
            <td>{getAnnualTurnoverPvt(info.finance.findtl, 1)!==0? getAnnualTurnoverPvt(info.finance.findtl, 1):"NA"}</td>
            <td>{getAnnualTurnoverPvt(info.finance.findtl, 2)!==0? getAnnualTurnoverPvt(info.finance.findtl, 2):"NA"}</td>
            <td>{info.finance.findtl.length===0? "NA": Math.round((Number(getAnnualTurnoverPvt(info.finance.findtl, 0))+Number(getAnnualTurnoverPvt(info.finance.findtl, 1))+Number(getAnnualTurnoverPvt(info.finance.findtl, 2)))/info.finance.findtl.length)}</td>
          </tr>
           <tr>
            <td>14.2</td>
            <td>Turnover for the Specific Product</td>
            <td>{getAnnualTurnoverProduct(info.finance.findtl, 0)!==0? getAnnualTurnoverProduct(info.finance.findtl, 0):"NA"}</td>
            <td>{getAnnualTurnoverProduct(info.finance.findtl, 1)!==0? getAnnualTurnoverProduct(info.finance.findtl, 1):"NA"}</td>
            <td>{getAnnualTurnoverProduct(info.finance.findtl, 2)!==0? getAnnualTurnoverProduct(info.finance.findtl, 2):"NA"}</td>
            <td>{info.finance.findtl.length===0? "NA": Math.round((Number(getAnnualTurnoverProduct(info.finance.findtl, 0))+Number(getAnnualTurnoverProduct(info.finance.findtl, 1))+Number(getAnnualTurnoverProduct(info.finance.findtl, 2)))/info.finance.findtl.length)}</td>
          </tr>
          <tr>
            <td>14.3</td>
            <td>Net Current Assets</td>
            <td>{getNetAsset(info.finance.findtl, 0)!==0? getNetAsset(info.finance.findtl, 0):"NA"}</td>
            <td>{getNetAsset(info.finance.findtl, 1)!==0? getNetAsset(info.finance.findtl, 1):"NA"}</td>
            <td>{getNetAsset(info.finance.findtl, 2)!==0? getNetAsset(info.finance.findtl, 2):"NA"}</td>
            <td>{info.finance.findtl.length===0? "NA": Math.round((Number(getNetAsset(info.finance.findtl, 0))+Number(getNetAsset(info.finance.findtl, 1))+Number(getNetAsset(info.finance.findtl, 2)))/info.finance.findtl.length)}</td>
          </tr>
           <tr>
            <td>14.3.1</td>
            <td>Inventories</td>
            <td>{getInventories(info.finance.findtl, 0)!==0? getInventories(info.finance.findtl, 0):"NA"}</td>
            <td>{getInventories(info.finance.findtl, 1)!==0? getInventories(info.finance.findtl, 1):"NA"}</td>
            <td>{getInventories(info.finance.findtl, 2)!==0? getInventories(info.finance.findtl, 2):"NA"}</td>
            <td>{info.finance.findtl.length===0? "NA": Math.round((Number(getInventories(info.finance.findtl, 0))+Number(getInventories(info.finance.findtl, 1))+Number(getInventories(info.finance.findtl, 2)))/info.finance.findtl.length)}</td>
          </tr>
         <tr>
            <td>14.4</td>
            <td>Current Liabilities</td>
            <td>{getCurrentLiabilities(info.finance.findtl, 0)!==0? getCurrentLiabilities(info.finance.findtl, 0):"NA"}</td>
            <td>{getCurrentLiabilities(info.finance.findtl, 1)!==0? getCurrentLiabilities(info.finance.findtl, 1):"NA"}</td>
            <td>{getCurrentLiabilities(info.finance.findtl, 2)!==0? getCurrentLiabilities(info.finance.findtl, 2):"NA"}</td>
            <td>{info.finance.findtl.length===0? "NA": Math.round((Number(getCurrentLiabilities(info.finance.findtl, 0))+Number(getCurrentLiabilities(info.finance.findtl, 1))+Number(getCurrentLiabilities(info.finance.findtl, 2)))/info.finance.findtl.length)}</td>
          </tr> 
        </tbody>
      </table>}

               {/*  <MarketingNetworkView /> */}
               {info?.marketing?.applicationNo &&   <table className="table w-100 table-bordered dta-table bg-white">
    
    <thead>
      <tr>
        <td colspan="12"><b>Part E:  Marketing Network (Availability in Market)</b></td>
      </tr>
      <tr>
      <th >Sl. No.</th>
        <th >Dealers/Distributors</th>
        <th >Location</th>
        <th >Address</th>
        <th >Mobile</th>

      </tr>
    </thead>
    <tbody>
    {
                           info?.marketing?.mrkList?.map((item, index)=>(
                      
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{item.dealerDistributerName}</td>
                              <td>{item.location}</td>
                              <td>{item.address}</td>
                              <td>{item.contactNumber}</td>
                              </tr>
                           
                            ))
                          }
     
      

    </tbody>



  </table>}

               {/*  <AfterSalesServicerView /> */}

               {info?.serviceCeter?.applicationNo &&    <table className="table w-100 table-bordered dta-table bg-white">

<thead>
    <tr>
        <td colspan="12"><b>Part F:  After Sales Service</b></td>
    </tr>
    <tr>
        <th >SL No</th>
        <th >Particulars</th>
        <th >Description/details filled in by the Vendor</th>

    </tr>
</thead>
<tbody>
    
  
     <tr>

        <td>15.1</td>
        <td>Number of After Sales Service Centers available in India</td>
        <td>{info?.serviceCeter?.noOfServiceCenter}</td>
    </tr>
    <tr>

        <td>15.2</td>
        <td>Location and Communication Details (Address, Telephone, Mobile Numbers, E-mail etc) of After Sales Service Centers</td>
        <td></td>
    </tr>
    <tr>
        <td colSpan={12}>
        <table className="table w-100 table-bordered dta-table bg-white">
        <thead>
                <th>Sl. No.</th>
                <th>Service Center Name</th>
                <th>Service Center Address</th>
                <th>Service Center Mobile No.</th>
                <th>Service Center LandLine No.</th>
                <th>Service Center Email Id</th>
                
               
              </thead>

              <tbody>



        {
           info?.serviceCeter?.vendorServiceCenterDetails?.map((item, index)=>(
            item.serviceCenterType === "1" && 
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.serviceCenterName}</td>
              <td>{item.address}</td>
              <td>{item.serviceCenterMobileNo}</td>
              <td>{item.landLineNo}</td>
              <td>{item.serviceCenterEmail}</td>
              </tr>
           
            ))
          }
          </tbody>
        </table>

        </td>
    </tr>
    <tr>

        <td>15.3</td>
        <td>Number of Floating service Unit</td>
        <td>{info?.serviceCeter?.floatingServiceIndia}</td>
    </tr>
    <tr>

        <td>15.4</td>
        <td>Details of Floating Service Units, if available in West Bengal</td>
        <td></td>
    </tr>
    <tr>
        <td colSpan={12}>
        <table className="table w-100 table-bordered dta-table bg-white">
        <thead>
                <th>Sl. No.</th>
                <th>Service Center Name</th>
                <th>Service Center Address</th>
                <th>Service Center Mobile No.</th>
                <th>Service Center LandLine No.</th>
                <th>Service Center Email Id</th>
                
               
              </thead>

              <tbody>



        {
           info?.serviceCeter?.vendorServiceCenterDetails?.map((item, index)=>(
            item.serviceCenterType === "2" && 
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.serviceCenterName}</td>
              <td>{item.address}</td>
              <td>{item.serviceCenterMobileNo}</td>
              <td>{item.landLineNo}</td>
              <td>{item.serviceCenterEmail}</td>
              </tr>
           
            ))
          }
          </tbody>
        </table>

        </td>
    </tr>



</tbody>



</table>}
{/* {info?.serviceCeter?.applicationNo &&  <PerformanceReliabilityView />} */}

{info?.performance?.applicationNo &&  <table className="table w-100 table-bordered dta-table bg-white">
                <thead>
                    <tr>
                        <td colSpan={12}>Part G: Performance Reliatibility</td>
                    </tr>
                    <tr>
                        <th >SL No</th>
                        <th >Particulars</th>
                        <th >Description/details filled in by the Vendor</th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>16.1</td>
                        <td>Approval of Statutory and/or other
                            Inspection Agency
                            (Copies to be  attached)

                        </td>
                        <td>{decodeFullForm(info?.performance?.approvalFlag) + " : " + getFilesCount(info?.performance?.fileDtls, "20") + " Attachment(s)"}</td>
                    </tr>
                   <tr>
<td colSpan={12}>
<table className='bg-white'>
              <thead>
                <th>SL No</th>
                <th>Name of Certificate Issuing Organization	  </th>
                <th>Uploaded File(s)</th>
                
              </thead>

              <tbody>
              {
                           info?.performance?.fileDtls?.map((item, index)=>(
                            item.fileTypeCode === "20" && 
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{item.fileDescription}</td>
                              <td>Yes</td>
                              </tr>
                           
                            )) 
                          }
                
              </tbody>
              </table>
            </td>


</tr>
                    <tr>
                        <td>16.2</td>
                        <td>Whether enlisted as approved Vendor
                            in any Govt, Govt Undertaking or in
                            Public Sector bodies
                            (Copies such approval to be  attached)
                        </td>
                        <td>{decodeFullForm(info?.performance?.approvedVendor) + " : " + getFilesCount(info?.performance?.fileDtls, "21") + " Attachment(s)"}</td>
                    </tr>
                   <tr>
<td colSpan={12}>
<table className='bg-white'>
              <thead>
                <th>SL No</th>
                <th>Name of the Organization</th>
                <th>Uploaded File(s)</th>
                
              </thead>

              <tbody>
              {
                           info?.performance?.fileDtls?.map((item, index)=>(
                            item.fileTypeCode === "21" && 
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{item.fileDescription}</td>
                              <td>Yes</td>
                              </tr>
                           
                            )) 
                          }
                
              </tbody>
              </table>
            </td>


</tr>
                    <tr>
                        <td>16.3</td>
                        <td>Performance Reports from clients
                            (Copies such reports to be  attached)
                        </td>
                        <td>{decodeFullForm(info?.performance?.performanceReport) + " : " + getFilesCount(info?.performance?.fileDtls, "22") + " Attachment(s)"}</td>
                    </tr>
                   <tr>
<td colSpan={12}>
<table className='bg-white'>
              <thead>
                <th>SL No</th>
                <th>Name of the Client </th>
                <th>Uploaded File(s)</th>
                
              </thead>

              <tbody>
              {
                           info?.performance?.fileDtls?.map((item, index)=>(
                            item.fileTypeCode === "22" && 
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{item.fileDescription}</td>
                              <td>Yes</td>
                              </tr>
                           
                            )) 
                          }
                
              </tbody>
              </table>
            </td>


</tr>
                    <tr>
                        <td>16.4</td>
                        <td>Whether the ISI Certification Mark License ever suspended/cancelled. If yes, give  details with reason.</td>
                        <td>{decodeFullForm(info?.performance?.isiFlag)}</td>
                    </tr>
                    <tr>
                      <td colSpan={12}>
                  <table className="table w-100 table-bordered dta-table bg-white">
                    <tbody>
                  <tr>
                        
                        <td><b>Details with reason:</b> <br></br>{info?.performance?.isiCancellationReason} </td>
                        </tr>
                        </tbody>
                     </table>
                     </td>
                    </tr>
                    
                    <tr>
                        <td>16.5</td>
                        <td>Records of pending Court Cases/Litigations/Arbitration issues with WBPHED or any other Govt. organisations</td>
                        <td>{decodeFullForm(info?.performance?.pendingCourtCaseFlag)} </td>
                    </tr>
                    <tr>
                      <td colSpan={12}>
                  <table className='table w-100 table-bordered dta-table bg-white'>
                  <tbody>
                  <tr>
                       
                        <td><b>Details of Court Cases:</b> <br></br>{info?.performance?.pendingCourtCase} </td>
                        </tr>
                        </tbody>
                     </table>
                     </td>
                    </tr>
                   
                </tbody>
            </table> }

              </div>
               
            </div>

 
          {/* print button */}
 
        </div>
    </div>
    </div>
</div>
</div>
<div className='text-center'> 
          <button id='print-btn' className='btn btn-outline-primary' onClick={printtable} >Print</button>
          </div> 
</div>
    </>
  );
}

export default VendorApplication;

//components/VendorApplation