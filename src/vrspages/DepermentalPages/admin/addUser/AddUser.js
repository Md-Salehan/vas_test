import React, { useState,useEffect } from 'react'

import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb, Row, Card } from "react-bootstrap";
import axios from 'axios';



function AddUser() {

  const [newUserArr, set_newUserArr] = useState([])
  const useremailid = useFormInput('');
	const nameofUser = useFormInput('');
	const userType = useFormInput('');
  const usermobileno= useFormInput('');

  useEffect(() => {
    const fetch_AllNewProd = async ()=>{
        await axios.get(process.env.REACT_APP_BASE_URL+"/api/v1/registrationAllDetails").then((res)=>{
          set_newUserArr(res.data.content.filter(x=>x.userType!='V'))
        })
        
    }
    fetch_AllNewProd()
  }, []);
console.log(newUserArr);

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

  const [data, set_data] = useState([
    {
        type: "C",
        name: "ddddd",
        email: "hhhh",
        password: "90998",
        edit: false
    },
    {
      type: "I",
      name: "cgtfhv",
      email: "hhhh@gmail",
      password: "90998",
      edit: false
  },
  {
    type: "H",
    name: "ddgtrrddd",
    email: "hh@hh",
    password: "90998",
    edit: false
},
    
]);
 



const handleRegistration= async ()=>
	{
		const vendorObj = { 
			emailId: useremailid.value, 					
			vendorName:nameofUser.value,
			userType:userType.value,
      mobileNo:usermobileno.value,
      webSite: '', 
			officeAddress: '',
      landlineNo: ''
		}
			
        setLoading(true);
        await axios.post(process.env.REACT_APP_BASE_URL+'/api/v1/registration', vendorObj).then(res => {
				console.log(vendorObj);
			setMsg(res.data.msg)	
		   	setLoading(false);
			setsotpFlag(false)
			setRegisterFlag(false)
			if(res.data.code === 0) 
			{
				alert("Registered successfully");
        useremailid.value='';			
		nameofUser.value='';
			userType.value='';
      usermobileno.value='';
			
			}
			
        }).catch(error => {
            setLoading(false);
            setMsg("Wrong credentials. Please check and try again");
        });
	}
  const ValidateOTP_register = async (e)=>{
		e.preventDefault()
		const validateObj = {
			emailId: useremailid.value,
			emailIdOtp: document.getElementById("EmailOTP").value,
			mobileNo: usermobileno.value,
			mobileNoOtp: document.getElementById("MobileOTP").value
		}

		try {
			const res = await axios.post(process.env.REACT_APP_BASE_URL+"/token/api/validate/regOtp", validateObj)
			
			console.log(res.data);
			console.log(validateObj);
			//register
			await handleRegistration()

		} catch (err) {
			console.log(err);
			
		}
	
	}

  

  const generateOTP = async (e)=>{
    setMsg('');	
		e.preventDefault()
		if(userType.value && nameofUser.value &&  usermobileno.value && useremailid.value){
			const gObj = {
				emailId: useremailid.value,
				mobileNo: usermobileno.value
			}
			setLoading(true)
			await axios.post(process.env.REACT_APP_BASE_URL+"/token/api/generate/regOtp", gObj ).then((res)=>{
				setsotpFlag(true)
				setLoading()
				//setMsg("Otp sent to your registered mobile number and email. check your mobile and email. Mobile OTP : "+ res.data.content.mobileNoOtp +" Email OTP :  "+ res.data.content.emailIdOtp )
				setMsg("Otp sent to your registered mobile number and email. check your mobile and email.")
				console.log(+ res.data.content.emailIdOtp)
			}).catch((err)=>{
				console.log(err);
			})
			
		}
		else{
			setMsg("Please fill all the feilds");
		}
	  }
  const OtpResults = () => (
	<>
    <td>Enter Mobile OTP</td>
    <td><input type="text" id="MobileOTP" className="form-control"  name='MobileOTP' required /></td>
    <td>Enter Email OTP</td>
    <td><input type="text" id="EmailOTP" className="form-control"  name='EmailOTP' required /></td>
    <td><button onClick={ValidateOTP_register}  className="Enquiry-btn ml-auto mt-2 bg-important color-wh-important" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button> </td>
    
    </>
		
							
	  )




  return (
    <>
    
<div className="page-header">
        <div>
          <h1 className="page-title">User</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className = "breadcrumb-item" href = "#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              User
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
      <div className='right-pannel-div'>
        <div className='right-pannel-div-inner mrgin-buttom-zero'>
          <div className="card inner-vendor">
          <div className='card-body'>
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
                                                <button style={{ width: "100%" }} type="button" class="btn btn-success" onClick={generateOTP}> <FontAwesomeIcon icon={faPlus} /></button>
                                            </td>
                                        </tr>
                                       
                                       
                                    }
                                     <tr>
  {otpFlag &&	<OtpResults />}	
                                        </tr>
                                </tbody>
                            </table>
                            <p style={{color: "red"}}>{msg}</p>
            {error && <><small style={{ color: 'green' }}>{error}</small><br /></>} 
            </div>

          </div>
         
					
           
          <div className="card inner-vendor">
          <div className='card-body'>
          <table className="table w-100 table-bordered dta-table">
                  <thead>
                    <tr>
                      <th>Users</th>
                      <th style={{ width: "30%" }}>
                        {/* <div className='dflex'>
                        <input style={{ width: "80%" }} type='text' />
                        <button style={{ width: "20%" }} type="button" class="btn btn-success"><i className="fa-solid fa-plus"></i></button>
                        </div> */}
                        <select className="form-control" 
							name='category' id='category'
								>
								<option value={""}>All</option>
								<option value='C'>Committee member</option>
								<option value='H'>Chairman of Committee</option>
                <option value='N'>Convener of Committee</option>
                <option value='I'>Sub Committee member (for civil)</option>
                <option value='M'>Sub Committee member (for Mechanical)</option>
							</select>
                      </th>
                      </tr>
                      </thead>
                      </table>
                            <table class="table w-100 table-bordered ">
                                <thead className='table-header'>
                                    <tr>
                                        <th style={{ width: "10%" }}>Designation</th>
                                        <th style={{ width: "30%" }}>Name</th>
                                        <th style={{ width: "30%" }}>Email</th>
                                        <th style={{ width: "20%" }}>Mobile</th>
                                        <th style={{ width: "10%" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                      newUserArr.map((data, index) =>
                                      

                                    
                                      //  if(data.userType!=='V')
                                      //  {
                                        <tr  key={index}>
                                          <td>{getvendorFullName(data.userType)}</td>
                                          <td>{data.vendorName}</td>
                                          <td>{data.emailId}</td>
                                          <td>{data.mobileNo}</td>
                                          <td>
                                          <Link 
                                          to={`${process.env.PUBLIC_URL}/admin/EditUser`}
                                          state={{ from: data }}
                                          > <FontAwesomeIcon icon={faPen} /></Link> ||
                                        <Link 
                                          to={`${process.env.PUBLIC_URL}/admin/DeleteUser`}
                                          state={{ from: data }}
                                          > <FontAwesomeIcon icon={faTrash} /></Link>
                                          </td>

                                        </tr>
                                    // }
                                                                      
                                    )  

                                       
                                    }
                                </tbody>
                            </table>
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
export default AddUser