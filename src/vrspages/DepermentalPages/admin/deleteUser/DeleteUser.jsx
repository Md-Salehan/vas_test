import React, { useState,useEffect } from 'react';

import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom'
function DeleteUser() {
  const navigate = useNavigate()
  const location = useLocation()
  

    const [newUserArr, set_newUserArr] = useState([])
    const useremailid = useFormInput(location.state.from.emailId);
      const nameofUser = useFormInput(location.state.from.vendorName);
      const userType = useFormInput(location.state.from.userType);
    const usermobileno= useFormInput(location.state.from.mobileNo);
    const RegistaionNo=location.state.from.registrationNo;

  
    const [loading, setLoading] = useState(false);
      const [otpFlag, setsotpFlag] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    const [registerFlag, setRegisterFlag] = React.useState(false);
      const [OTP, setOTP] = React.useState({
          email: "xxx",
          mob: "xxx"
      })
  
  const getvendorFullName=(Name)=>
  {
    var member;
    switch (Name) {
      case 'N':
        member = "Convener of Committee";
        break;
      case 'H':
        member = "Chairman of Committee";
        break;
      case 'I':
        member = "Sub Committee member (for civil)";
        break;
        case 'C':
          member = "Committee member";
          break;
      case 'M':
        member = "Sub Committee member (for Mechanical)";
       
    }
    return member;
  }
  
    const [error, setError] = useState(null);
  
  
      
 
   
  
  
  
  const handleRegistration= async ()=>
      {
          const vendorObj = { 
              emailId: useremailid.value, 					
              vendorName:nameofUser.value,
              userType:userType.value,
        mobileNo:usermobileno.value,
        registrationNo:RegistaionNo,
        webSite: '', 
              officeAddress: '',
        landlineNo: ''
          }
              
          setLoading(true);
          await axios.delete(process.env.REACT_APP_BASE_URL+'/api/v1/registrations?registrationNo='+RegistaionNo).then(res => {
                  console.log(vendorObj);
              setMsg(res.data.msg)	
                 setLoading(false);
              setsotpFlag(false)
              setRegisterFlag(false)
              if(res.data.code === 0) 
              {
                  alert("Registered Delete successfully");
          useremailid.value='';			
          nameofUser.value='';
              userType.value='';
        usermobileno.value='';
        navigate(`${process.env.PUBLIC_URL}/admin/AddUser`)
              }
              
          }).catch(error => {
              setLoading(false);
              setMsg("Wrong credentials. Please check and try again");
          });
      }
   
  
  
  
  
   
                              
       
  
  
  
  
    return (
      <>
      
        <div className="main-body-pannel">
          
        </div>
        <div className='right-pannel-div'>
          <div className='right-pannel-div-inner mrgin-buttom-zero'>
            <div className="row inner-vendor">
            <div className='col-md-12'>
                              <table class="table w-100 table-bordered ">
                                  <thead className='table-header'>
                                      <tr>
                                          <th style={{ width: "10%" }}>Designation</th>
                                          <th style={{ width: "30%" }}>Name</th>
                                          <th style={{ width: "30%" }}>Email</th>
                                          <th style={{ width: "20%" }}>Mobile No</th>
                                          <th style={{ width: "10%" }}>Add</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {
                                          <tr>
  
                                              <td><select className="form-control" 
                              name='category' id='category'  {...userType}
                                  >
                                  <option value={""}>--Select--</option>
                                  <option value='C'>Committee member</option>
                                  <option value='H'>Chairman of Committee</option>
                  <option value='N'>Convener of Committee</option>
                  <option value='I'>Sub Committee member (for civil)</option>
                  <option value='M'>Sub Committee member (for Mechanical)</option>
                              </select></td>
                <td>
                <input className="form-control" type="text" {...nameofUser}  />
                </td>
                <td>
                <input className="form-control" type="email" {...useremailid} />
                </td>
                <td>
                <input className="form-control" type="number" {...usermobileno} />
                </td>
  
                                              <td>
                                                  <button style={{ width: "100%" }} type="button" class="btn btn-success" onClick={handleRegistration}><i className="fa-solid fa-pencil"></i></button>
                                              </td>
                                          </tr>
                                         
                                         
                                      }
                                       <tr>
   
                                          </tr>
                                  </tbody>
                              </table>
                          </div>
  
            </div>
           
                          <p style={{color: "red"}}>{msg}</p>
              {error && <><small style={{ color: 'green' }}>{error}</small><br /></>}
             
            <div className="row inner-vendor">
            <div className='col-md-12'>
            
                              
                          </div>
  
            </div>
  
          </div>
        </div>
     
      </>
    )
  }
  const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
  }
  export default DeleteUser