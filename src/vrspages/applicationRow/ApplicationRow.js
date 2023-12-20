import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import moment from "moment/moment";
function ApplicationRow({prodName, sno, ApplicationList, appTyp}) {

    const [tableList, set_tableList] = useState([])
    let userType = localStorage.getItem("userType")
    useEffect(() => {
        let arr = ApplicationList.filter((application)=>{
            return prodName === application.productName && application.submittedFlag ==="Y" && (appTyp === "AL" ? true : application.checkStatus === appTyp)
        })
        set_tableList(arr)

    },[ApplicationList,prodName, appTyp])

    const getApplicationStatus = (status)=>{
        if(status === "P") return "Pending"
        if(status === "A") return "Accepted"
        if(status === "R") return "Rejected"
        if(status === "N") return "Pending"
        return "Error"
    }

  return (
    tableList.length !== 0 && <div className="card mrgn-btm-5">
                                    <div id={"faqhead"+sno}>
                                        <Link style={{display: "flex"}} to="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target={"#faq"+sno}
                                        aria-expanded="true"  aria-controls={"faq"+sno}>
                                        <table className="w-100">
                                          <thead  >
                                            <tr>
                                              
                                              <th style={{width: "70%", textAlign:"left"}}>{prodName}</th>
                                              
                                              <th style={{width: "30%", textAlign:"left"}}>{tableList.length}</th>
                                            </tr>
                                          </thead>
                                        </table>

                                        </Link>
                                    </div>
                      
                          
                                    <div id={"faq"+sno} className="collapse" aria-labelledby={"faqhead"+sno} data-parent="#faq">
                                        <div className="card-body">
                          <div className='row'>
                          <table className='table w-100 table-bordered dta-tabl new-dtatable'>
                          <thead  >
                                            <tr>
                                              <th>Application No.</th>
                                              
                                              <th>Submit Date</th>
                                              <th>Status</th>
                                              <th>Download</th>
                                              <th>Visit</th>
                                              {/* {userType === "H" && <th>Convener</th>} */}
                                            </tr>
                                          </thead>
                            <tbody>
                              {
                                tableList.map((item, index)=>(
                                
                                <tr key={index}>
                                    <td>{item.applicationNo}</td>
                                    
                                    <td>{item.submittedDate?moment(item.submittedDate).format('DD/MM/YYYY'): "-- --"}</td>

                                    <td>{getApplicationStatus(item.checkStatus)}</td>

                                    <td>{<Link to={`${process.env.PUBLIC_URL}/VendorApplication/`+item.applicationNo}>Click</Link>}
                                </td>
                                    <td><Link to={`${process.env.PUBLIC_URL}/viewApplication/`+item.applicationNo}>Click</Link></td>
                                    {/* {userType === "H" && <td><Link>Assign</Link></td>} */}
                                </tr>
                              
                                ))
                              }
                            </tbody>
                          </table>
                
                          </div>
                                        </div>
                                    </div>
                    </div>
  )
}

export default ApplicationRow