import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation, Link  } from 'react-router-dom';
import { Card } from "react-bootstrap";
import * as custompagesswitcherdata from "../../../data/Switcher/Custompagesswitcherdata"
import axios from 'axios';
import { setUserSession } from '../Common/Common';

export default function Login() {

  let navigate = useNavigate();
  const username = useFormInput('');
const email= useFormInput('');
  const password = useFormInput('');
const EmailOTP = useFormInput('');
  const MobileOTP = useFormInput('');
  const [error, setError] = 'mmmm'+  useState(null);
  const [loading, setLoading] = useState(false);
const [otpFlag, setsotpFlag] = React.useState(false)
const [LoginFlag, setsLogFlag] = React.useState(true)

const [fromPeriod, setsFromPeriod] = React.useState('')

const [toPeriod, setsToPeriod] = React.useState('')
//setLoading(true);
axios.get('http://192.168.22.61/VendorSys/api/v1/PeriodMasterAllDetail').then(response => {
  
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


  // const url = 'http://107.20.165.187:8080/ihealth/token/generate-token';
  // handle button click of login form
  const handleLogin = (event) => {

      event.preventDefault();
      setError(null);
  
  axios.post('http://192.168.22.61/VendorSys/token/api/otp/validate',{ emailId: email.value,emailIdOtp:document.getElementById('EmailOTP').value, mobileNo: username.value,mobileNoOtp:document.getElementById('MobileOTP').value}).then(response => {
  debugger;
    if(response.data.code==0)
    {

      localStorage.setItem("email",email.value);
      localStorage.setItem("mobileno", username.value);
      localStorage.setItem("name",response.data.content.name);
      localStorage.setItem("offAddress",response.data.content.offAddress);
      localStorage.setItem("userType",response.data.content.userType);
      localStorage.setItem("registrationNo",response.data.content.registrationNo);
      localStorage.setItem("token",response.data.content.token);
      localStorage.setItem("webside",response.data.content.webside)
      if(response.data.content.userType=='C')
      {
        navigate('../Dashboard/Dashboard');
      }

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
if(email.value==''|| email.value==null)
{
a=0;
alert('Please fill the email fields');
}
else{
  a=1;
}
if(a==1){


  axios.post('http://192.168.22.61/VendorSys/token/api/otp/generate',{ emailId: email.value, mobileNo: username.value}).then(response => {
  
    if(response.data.code==0)
    {
      //localStorage.setItem("MobileOTP",response.data.content.mobileNoOtp);
      //localStorage.setItem("EmailOTP",response.data.content.emailIdOtp)
      setsotpFlag(true);
      setsLogFlag(false);
      setError("Otp sent to your registered mobile number and email. check your mobile and email. Mobile OTP : "+response.data.content.mobileNoOtp +" Email OTP :  "+response.data.content.emailIdOtp);


    }else{
      //setError(response.data.content.msg);
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


        
                  <p>Enter Mobile OTP</p>
                  <input type="text" id="MobileOTP" className="bord-bottom-input"  name='MobileOTP' required />
                  <p>Enter Email OTP</p>
                  <input type="text" id="EmailOTP" className="bord-bottom-input"  name='EmailOTP' required />
                  
                  
                  <button className="book-now w-100 mt-3" id="getotpBtn" onClick={handleLogin}>Login</button>
          </div>
          
)



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
                <form className="login100-form validate-form">
                  <span className="login100-form-title">Login</span>
                  <div className="wrap-input100 validate-input">
                    <input
                      className="input100"
                      type="text"
                      name="username"
                      placeholder="Mobile No."
                      id="username"
                      disabled={otpFlag}
                      {...username}
                      required 
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-phone" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input">
                    <input
                      className="input100"
                      type="text"
                      name="email"
                      placeholder="Email"
                      id="email"
                      disabled={otpFlag}
                      {...email}
                      required
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-email" aria-hidden="true"></i>
                    </span>
                  </div>
                  {otpFlag &&	<OtpResults />}	
										{error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
                    <div className="mt-4"><p className="log-small-text">By continuing, you agree to <a
													href="#">Terms of Use </a>and <a href="#">Privacy Policy</a>.</p>
										{LoginFlag && <button className="login100-form-btn btn-primary" id="getotpBtn" onClick={SendOtp}>Send Otp1</button>}					
								
										</div>
                    
                  {/* <div className="wrap-input100 validate-input">
                    <input
                      className="input100"
                      type="password"
                      name="pass"
                      placeholder="Password"
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                    </span>
                  </div> */}
                  <div className="text-end pt-1">
                    <p className="mb-0">
                      <Link
                        to={`${process.env.PUBLIC_URL}/custompages/forgotPassword/`}
                        className="text-primary ms-1"
                      >
                        Forgot Password?
                      </Link>
                    </p>
                  </div>
                  {/* <div className="container-login100-form-btn">
                    <Link
                      to={`${process.env.PUBLIC_URL}/dashboard/`}
                      className="login100-form-btn btn-primary"
                    >
                      Send Otp
                    </Link>
                  </div> */}
                  <div className="text-center pt-3">
                    <p className="text-dark mb-0">
                      Not a member?
                      <Link
                        to={`${process.env.PUBLIC_URL}/custompages/register/`}
                        className="text-primary ms-1"
                      >
                        Create an Account
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

