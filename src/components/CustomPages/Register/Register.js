import React, { useState } from 'react';
import { Card } from "react-bootstrap";
import {  Link, generatePath, useNavigate } from "react-router-dom";
import * as custompagesswitcherdata from "../../../data/Switcher/Custompagesswitcherdata"

import axios from 'axios';

import Countdown from "react-countdown";
export default function Register() {
  const navigate = useNavigate()
	const [loading, setLoading] = useState({
		register: false,
		generate_otp: false
	});
	const [otpFlag, setsotpFlag] = React.useState(false)
	const [OTP, setOTP] = React.useState({
		email: "xxx",
		mob: "xxx"
	})
	const [msg, setMsg] = React.useState("")
	
	const [registerFlag, setRegisterFlag] = React.useState(false)
	const [validationFlag, setValidationFlag] = React.useState(false)
	const [resendOtpFlag, set_resendOtpFlag] = React.useState(false)
	const nameofVendor = useFormInput('');
    const registeredOfficeAddress = useFormInput('');
	const landlineNo = useFormInput('');
    const mobileNo = useFormInput('');	
	const emailid = useFormInput('');
	const websiteAddress= useFormInput('');
	const [error, setError] = useState(null);

	const Completionist = () => {
		set_resendOtpFlag(true);
		setMsg('Previous OTP got expired, please click on "Resend OTP" button to get new one')
	}

	// Renderer callback with condition
	const renderer = ({minutes, seconds, completed }) => {
	if (completed) {
		// Render a complete state
		return <Completionist />;
	} else {
		// Render a countdown
		return (
		<span>
			{minutes}:{seconds}
		</span>
		);
	}
	};

	const handleRegistration= async ()=>
	{

		const vendorObj = { 
			emailId: emailid.value, 
			landlineNo: landlineNo.value , 
			mobileNo: mobileNo.value, 
			webSite: websiteAddress.value, 
			officeAddress: registeredOfficeAddress.value,
			vendorName:nameofVendor.value,
			userType:"V",
		}
			
        setLoading({
			...loading,
			register: true
		});
        await axios.post(process.env.REACT_APP_BASE_URL+'/api/v1/registration', vendorObj).then(res => {
				console.log(vendorObj);
			setMsg(res.data.msg)	
		   	setLoading(false);
			setsotpFlag(false)
			setRegisterFlag(false)
			if(res.data.code === 0) 
			{
				alert("Registered successfully");
				navigate(`${process.env.PUBLIC_URL}/login/vendor`)
			}
			
        }).catch(error => {
            setLoading(false);
            setMsg("Wrong credentials. Please check and try again");
        }).finally(()=>{
			setLoading({
				...loading,
				register: false
			});
		});
		console.log("register");
	}

	const ValidateOTP_register = async (e)=>{
		e.preventDefault()
		const validateObj = {
			emailId: emailid.value,
			emailIdOtp: document.getElementById("EmailOTP").value,
			mobileNo: mobileNo.value,
			mobileNoOtp: document.getElementById("MobileOTP").value
		}
		await axios.post(process.env.REACT_APP_BASE_URL+"/token/api/validate/regOtp", validateObj).then((res)=>{
			if(res.data.code === 0){
				console.log("Validated");
				handleRegistration()
				
			}else{
				setMsg("Enter valid OTP")
			}
		}).catch((err)=>{
			console.log(err);
		}).finally(()=>{

		})
		// try {
		// 	const res = await axios.post(process.env.REACT_APP_BASE_URL+"/token/api/validate/regOtp", validateObj)
			
		// 	console.log(res.data);
		// 	console.log(validateObj);
		// 	//register
		// 	await handleRegistration()

		// } catch (err) {
		// 	console.log(err);
			
		// }
	
	}

	const OtpResults = () => (
		<div>		
			<p>Enter Mobile OTP</p>
			<input type="text" id="MobileOTP" className="form-control"  name='MobileOTP' required />
			<p>Enter Email OTP</p>
			<input type="text" id="EmailOTP" className="form-control"  name='EmailOTP' required />
			
		</div>
							
	  )

	  const generateOTP = async (e)=>{
		e.preventDefault()
		if(mobileNo.value.length !== 10){ 
			setMsg("Please Enter valid phone number")
			return
		}
		setValidationFlag(false)
		set_resendOtpFlag(false)
		
		setMsg('')
		if(nameofVendor.value && registeredOfficeAddress.value && mobileNo.value && emailid.value){
			const gObj = {
				emailId: emailid.value,
				mobileNo: mobileNo.value
			}
			setLoading({
				...loading,
				generate_otp: true
			})
			await axios.post(process.env.REACT_APP_BASE_URL+"/token/api/generate/regOtp", gObj ).then((res)=>{
				setsotpFlag(true)
				
				//setMsg("Otp sent to your registered mobile number and email. check your mobile and email. Mobile OTP : "+ res.data.content.mobileNoOtp +" Email OTP :  "+ res.data.content.emailIdOtp )
				setMsg("Otp sent to your registered mobile number and email. check your mobile and email.")
				console.log(+ res.data.content.emailIdOtp)
			}).catch((err)=>{
				console.log(err);
			}).finally(()=>{
				setLoading({
					...loading,
					generate_otp: false
				})
			})
			
		}
		else{
			setMsg("Please fill all the feilds");
		}
	  }
  return (
    <div className="login-img">
      <div className="page">
        <div className="dropdown float-end custom-layout">
                <div className="demo-icon nav-link icon mt-4 bg-primary" onClick={()=>custompagesswitcherdata.Swichermainright()}>
                    <i className="fe fe-settings fa-spin text_primary"></i>
                </div>
            </div>
        <div className="" onClick={()=>custompagesswitcherdata.Swichermainrightremove()}>
          <div className="col col-login mx-auto">
            <div className="text-center">
              <img
                src={require("../../../assets/images/brand/logo.png")}
                className="header-brand-img"
                alt=""
              />
            </div>
          </div>
          <div className="container-login100">
            <div className="wrap-login100 p-0">
              <Card.Body>
                <form className="login100-form validate-form" onSubmit={ValidateOTP_register}>
                  <span className="login100-form-title">New Vendor Registration</span>
                  <div
                    className="wrap-input100 validate-input"

                  >
                    <input
                      className="input100"
                      type="text"
                      name="vendor"
                      placeholder="Name of the Vendor"
                      disabled={otpFlag}  {...nameofVendor} 
                      required
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-account" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"

                  >
                    <input
                      className="input100"
                      type="number"
                      name="mobile"
                      placeholder="Mobile"
                      disabled={otpFlag}  {...mobileNo} 
                      required
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-smartphone" aria-hidden="true"></i>
                    </span>
                  </div>
                 
                  <div
                    className="wrap-input100 validate-input"
 
                  >
                    <input
                      className="input100"
                      type="text"
                      name="email"
                      placeholder="Email"
                      disabled={otpFlag} {...emailid} 
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
                      required
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-email" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"

                  >
                    <input
                      className="input100"
                      type="text"
                      name="address"
                      placeholder="Registered Office Address"
                      disabled={otpFlag} {...registeredOfficeAddress} 
                      required
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="mdi mdi-home" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"

                  >
                    <input
                      className="input100"
                      type="number"
                      name="landline"
                      placeholder="Landline No."
                      disabled={otpFlag}  {...landlineNo} 
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="mdi mdi-phone" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"
                  
                  >
                    <input
                      className="input100"
                      type="text"
                      name="website"
                      placeholder="Website Address"
                      disabled={otpFlag} {...websiteAddress}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-globe-alt" aria-hidden="true"></i>
                    </span>
                  </div>
                  {otpFlag &&	<OtpResults />}	
						<p style={{color: "red"}}>{msg}</p>
                 {/*  <label className="custom-control custom-checkbox mt-4">
                    <input type="checkbox" className="custom-control-input" />
                    <span className="custom-control-label">
                      Agree the 
                      <Link to={`${process.env.PUBLIC_URL}/pages/terms/`}>
                        terms and policy
                      </Link>
                    </span>
                  </label> */}
                  <div className="container-login100-form-btn">
                  {error && <><small style={{ color: 'green' }}>{error}</small><br /></>}
                  &nbsp;
                  <div></div>


                  { 
                  otpFlag?
                     <>
                     											<button type="submit"  className="mb-1 login100-form-btn btn-primary" disabled={loading.register}>{loading.register ? 'Loading...' : 'Register'}</button> 
											{resendOtpFlag?
                      
											<button type="button" className=" login100-form-btn btn-secondary" id="getotpBtn" onClick={generateOTP}>Resend OTP</button>
										:<button type="button" disabled className=" login100-form-btn btn-secondary" id="getotpBtn" >Resend Otp in <span className=''><Countdown date={Date.now() + 1000*60*5} renderer={renderer} /></span></button>}
                     

											</>
                      : <Link
                      to={`${process.env.PUBLIC_URL}/CustomPages/Login/`}
                      className="login100-form-btn btn-primary"
                      type="button" onClick={generateOTP}  disabled={loading.generate_otp}>
                        {loading.generate_otp ? 'Loading...' : 'Gnerate OTP'}
                      </Link>

                      }
                  
                  </div>
                  <div className="text-center pt-3">
                    <p className="text-dark mb-0">
                      Already Registered?
                      <Link
                        to={`${process.env.PUBLIC_URL}/custompages/login`}
                        className="text-primary ms-1"
                      >
                        Log In
                      </Link>
                    </p>
                  </div>
                </form>
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-center my-3">
                  <Link to="#" className="social-login  text-center me-4">
                    <i className="fa fa-google"></i>
                  </Link>
                  <Link to="#" className="social-login  text-center me-4">
                    <i className="fa fa-facebook"></i>
                  </Link>
                  <Link to="#" className="social-login  text-center">
                    <i className="fa fa-twitter"></i>
                  </Link>
                </div>
              </Card.Footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
