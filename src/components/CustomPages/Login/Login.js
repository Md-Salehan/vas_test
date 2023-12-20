import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation, Link  } from 'react-router-dom';
import { Card } from "react-bootstrap";
import * as custompagesswitcherdata from "../../../data/Switcher/Custompagesswitcherdata"
import Countdown from "react-countdown";
import axios from 'axios';
import { color } from 'echarts';
//import { setUserSession } from '../../../Components/Common/Common';
import { setUserSession } from '../../../vrspages/Common/Common';

export default function Login()
{
	let navigate = useNavigate();
    const username = useFormInput('');	
    const password = useFormInput('');
    const MobileOTP = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
	const [otpFlag, setsotpFlag] = React.useState(false)
	const [LoginFlag, setsLogFlag] = React.useState(true)
	const [resendOtpFlag, set_resendOtpFlag] = React.useState(false)
	const [fromPeriod, setsFromPeriod] = React.useState('')
	const [toPeriod, setsToPeriod] = React.useState('')
	
	//setLoading(true);
	//alert (process.env.REACT_APP_API_URL_PREFIX+"/api/v1/PeriodMasterAllDetail");
	axios.get(process.env.REACT_APP_BASE_URL+"/api/v1/PeriodMasterAllDetail").then(response => {
		
	let period=response.data.content;
	setsFromPeriod(period[0].fromDate);
	setsToPeriod(period[0].toDate);

		//setLoading(false);
		// setUserSession(response.data.content.token, response.data.content);
		// localStorage.removeItem('method');
		// localStorage.removeItem('freq');
		// localStorage.removeItem('disease');
		// localStorage.removeItem('medicines');
		// localStorage.removeItem('medDetails');
		// console.log(response.data);
		//navigate('/Dashboard');
	}).catch(error => {
		//setLoading(false);
		// console.log(error.data);
		
	});
	useEffect(() => {
		setsLogFlag(true)
		set_resendOtpFlag(false)
		setsotpFlag(false)
		setError(null)
	}, [])
	const Completionist = () => set_resendOtpFlag(true);
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

    // const url = 'http://107.20.165.187:8080/ihealth/token/generate-token';
    // handle button click of login form
    const handleLogin = (event) => {
	
        event.preventDefault();
        setError(null);
		
		axios.post(process.env.REACT_APP_BASE_URL+"/token/api/otp/validate",{  mobileNo: username.value,mobileNoOtp:document.getElementById('MobileOTP').value}).then(response => {
		
			if(response.data.code==0)
			{

				const sessobj= {
							 
							mobileno:username.value, 
							name:response.data.content.name, 
							offAddress:response.data.content.offAddress, 
							userType:response.data.content.userType,
							registrationNo:response.data.content.registrationNo,
							token:response.data.content.token,
							webside:response.data.content.webside,
							isAutenticated: true,
							};
				const sessJson=JSON.stringify(sessobj);
				setUserSession (sessJson);

				//  localStorage.setItem("email",email.value);
				localStorage.setItem("mobileno", username.value);
				localStorage.setItem("name",response.data.content.name);
				localStorage.setItem("offAddress",response.data.content.offAddress);
				localStorage.setItem("userType",response.data.content.userType);
				localStorage.setItem("registrationNo",response.data.content.registrationNo);
				localStorage.setItem("token",response.data.content.token);
				localStorage.setItem("webside",response.data.content.webside)
				sessionStorage.setItem("isAutenticated", true);
				
				
				if(response.data.content.userType !=='V')
				{
					navigate(`${process.env.PUBLIC_URL}/DepartmentalDashboard`);
					
				}
				else if(response.data.content.userType=='V')
				{
					navigate(`${process.env.PUBLIC_URL}/Dashboard`);
					
				}

				else {
					setError("You are not authorized. Please contact administrator")

				}
				
				/* switch (response.data.content.userType) {
					case 'A':
					case 'C':
						navigate('/Dashboard');
					case 'B':
					case 'D':
						navigate(`${process.env.PUBLIC_URL}/custompages/register/`);
					default: 
						setError("You are not authoriZed. Please contact administrator")
				} */

			}else{
				setError(response.data.content.msg);
			}

		
	}).catch(error => {
		//setLoading(false);
		// console.log(error.data);
		setError("Wrong credentials. Please check and try again");
	});




		// if(document.getElementById('EmailOTP').value==localStorage.getItem("EmailOTP") && document.getElementById('MobileOTP').value==localStorage.getItem("MobileOTP"))
		// {
		// 	navigate('/Dashboard');
		// }
		// else if(username.value=='wbphe@gmail.com' && password.value=='wbphe@gmail.com')
		// {
		// 	navigate('/DepartmentalDashboard');
		// }
		// else
		// {
		// 	//alert("Wrong credentials. Please check and try again");
		// 	setError("Wrong credentials. Please check and try again");
		// }
		
      
    }
const SendOtp=()=>
{
	
	var a=0;
	if(username.value==''|| username.value==null)
	{
		a=0;
		alert('Please fill the Mobile fields');
	}
	else{
		a=1;
	}
	
	if(a==1){


		axios.post(process.env.REACT_APP_BASE_URL+
		//"/token/api/otp/generate"
		"/token/api/otp/generate",{  mobileNo: username.value}).then(response => {
		
			if(response.data.code==0)
			{
				//localStorage.setItem("MobileOTP",response.data.content.mobileNoOtp);
				//localStorage.setItem("EmailOTP",response.data.content.emailIdOtp)
				setsotpFlag(true)
				setsLogFlag(false);
				setError("OTP sent to your registered mobile number. check your mobile. Mobile OTP : "+response.data.content.mobileNoOtp);


			}else{
				setError(response.data.content.msg);
			}

		
	}).catch(error => {
		//setLoading(false);
		// console.log(error.data);
		setError("Wrong credentials. Please check and try again");
	});

		
		
	}
	
}
const OtpResults = () => (
	<div>
	
	
  <div className="wrap-input100 validate-input">
                  
                  <input type="text" id="MobileOTP" className="input100"  name='MobileOTP' placeholder="Enter Mobile OTP" required />
                  
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                  </span>
                </div>
                
                  
              <div className="container-login100-form-btn">
                  <button className="login100-form-btn btn-primary" id="getotpBtn" onClick={handleLogin}>Login</button>
				 
                  </div>

				  <div className="container-login100-form-btn">
            
				  {resendOtpFlag?
											<button className="login100-form-btn btn-primary"id="getotpBtn" onClick={SendOtp}>Resend OTP</button>
										:<button disabled className="login100-form-btn btn-secondary" id="getotpBtn" >Resend OTP in  <span className=''><Countdown date={Date.now() + 1000*60*5} renderer={renderer} /></span></button>}
                  </div>
                  </div>
						
  )
    return(
        <div>
   
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
                alt="Public Health Engineering Deaprtment, West Bengal"
              />
            </div>
			<br></br>
			<div className="text-center">
			<h1 className="page-title" style={{ color: 'white' }}>Vendor Approval System</h1>
			</div>
          </div>				
								
		  <div className="container-login100">
            <div className="wrap-login100 p-0">					
			<Card.Body>
			<div className="login100-form validate-form">
                  <span className="login100-form-title">Login</span>					
                  <div className="wrap-input100 validate-input">
										<input type="text" id="username" disabled={otpFlag} className="input100" {...username} name='username' placeholder="Mobile No." required />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-smartphone" aria-hidden="true"></i>
                    </span>
                    </div>
                    
                  
										{otpFlag &&	<OtpResults />}	
										{error && <><div className="text-center pt-3" style={{ color: 'red' }}>{error}</div><br /></>}
										<div className="mt-4">
										{LoginFlag && <button className="login100-form-btn btn-primary" id="getotpBtn" onClick={SendOtp}>Send Otp</button>}	
										
										
								
										</div>
										
					
				
					<div className="text-center pt-3">
                    <p className="text-dark mb-0">
                      Not a registered vendor?
                      <Link
                        to={`${process.env.PUBLIC_URL}/custompages/register/`}
                        className="text-primary ms-1"
                      >
                        Register Now to Login
                      </Link>
                    </p>
                  </div>
					</div>
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
					<div className="text-center pt-3" style={{ color: 'white' }}>
					<marquee><span> Vendor Registration System will remain open for Vendors from {fromPeriod} to {toPeriod} </span></marquee>
					
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
