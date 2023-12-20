import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
 import Header from '../Header/Header';
 import Sidebar from '../Sidebar/Sidebar';
 import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
// import { getUser, getMethod, getFreq } from '../Common/Common';

function Dashboard() {
    const [allApplication, set_AllApplication] = useState([])
    useEffect(() => {
      const fetchAllApplication = async ()=>{
          await axios.get(process.env.REACT_APP_BASE_URL+"/VendorSys/api/v1/generalinformation/{registration_number}?registration_number="+localStorage.getItem("registrationNo")).then((res)=>{
            set_AllApplication(res.data.content)
          })
          
      }
      fetchAllApplication()
    }, [])
    // console.log(allApplication, localStorage.getItem("registrationNo"));

    const getApplicationStatus = (status)=>{
      if(status === "P") return "Pending"
      if(status === "A") return "Accepted"
      if(status === "R") return "Rejected"
      return "Pending"
    }
    return (
        <>
          <Header></Header>
          <div className="main-body-pannel">
            <Sidebar></Sidebar>
            <div className='right-pannel-div'>
              <div className='right-pannel-div-inner'>
                  <div className='row'>
                    <div className='col-md-12'>
                    
                    </div>
                </div>
                <div className='row inner-vendor'>
                
                <div className='col-md-12'>
                <table class="table w-100 table-bordered dta-table">
                  <thead>
                    <tr>
                      <th >Sl No.</th>
                      <th >Application No</th>
                      <th >Date of Application</th>
                      <th>Product Category <br></br>(Civil/Mechanical/Electrical)</th>
                      <th>Product</th>
                      <th>Submission Status </th>
                      <th>Application Status </th>
                      <th>Download</th>
                      </tr>
                      </thead>
                      <tbody>
                          {
                            allApplication.map((item, index)=>(
                              <tr>
                                <td>{index+1}</td>
                                <td>{item.applicationNo}</td>
                                <td>{item.applicationDate}</td>
                                <td>ERROR</td>
                                <td>{item.productName}</td>
                                <td>{item.submittedFlag==="N"? "Not Submitted": "Submitted"}</td>
                                <td>{getApplicationStatus(item.checkStatus)}</td>
                                <td>{item.submittedFlag==="N"?
                                  <p>Click</p>
                                  :
                                  <a href='#'>Click</a>
                                  }
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
          <Footer></Footer>
        </>
    );
}

export default Dashboard;
