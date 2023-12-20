import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation, Link  } from 'react-router-dom';

import axios from 'axios';
import { setUserSession } from '../Common/Common';

function Login()
{
	let navigate = useNavigate();
    const username = useFormInput('');
	const email= useFormInput('');
    const password = useFormInput('');
	const EmailOTP = useFormInput('');
    const MobileOTP = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
	const [otpFlag, setsotpFlag] = React.useState(false)
	const [LoginFlag, setsLogFlag] = React.useState(true)

	const [fromPeriod, setsFromPeriod] = React.useState('')

	const [toPeriod, setsToPeriod] = React.useState('')
	//setLoading(true);
	


    // const url = 'http://107.20.165.187:8080/ihealth/token/generate-token';
    // handle button click of login form
    const handleLogin = (event) => {
	
        event.preventDefault();
        setError(null);
		
		axios.post('http://192.168.22.61/VendorSys/token/api/otp/validate',{  mobileNo: username.value,mobileNoOtp:document.getElementById('MobileOTP').value}).then(response => {
		
			if(response.data.code==0)
			{

			
				localStorage.setItem("mobileno", username.value);
				localStorage.setItem("name",response.data.content.name);
				localStorage.setItem("offAddress",response.data.content.offAddress);
				localStorage.setItem("userType",response.data.content.userType);
				localStorage.setItem("registrationNo",response.data.content.registrationNo);
				localStorage.setItem("token",response.data.content.token);
				localStorage.setItem("webside",response.data.content.webside);
				localStorage.setItem("landlineno",response.data.content.landLineNo)
				if(response.data.content.userType=='C')
				{
					navigate(`${process.env.PUBLIC_URL}/Dashboard`);
				}
				else if(response.data.content.userType=='V')
				{
					navigate(`${process.env.PUBLIC_URL}/Dashboard`);
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
	
	if(a==1){


		axios.post('http://192.168.22.61/VendorSys/token/api/otp/generate',{ mobileNo: username.value}).then(response => {
		
			if(response.data.code==0)
			{
				//localStorage.setItem("MobileOTP",response.data.content.mobileNoOtp);
				//localStorage.setItem("EmailOTP",response.data.content.emailIdOtp)
				setsotpFlag(true)
				setsLogFlag(false);
				setError("Otp sent to your registered mobile number. check your mobile. Mobile OTP : "+response.data.content.mobileNoOtp);


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
	
	
					
										<p>Enter Mobile OTP</p>
										<input type="text" id="MobileOTP" className="bord-bottom-input"  name='MobileOTP' required />
										
										
										
										<button className="book-now w-100 mt-3" id="getotpBtn" onClick={handleLogin}>Login</button>
						</div>
						
  )
    return(
        <div className='login'>
			<div className="col-md-5 login-box">
				{/* <form onSubmit={handleLogin}> */}
					<div className="log-modal-rightpannel">
								<h3 className='text-center'>Log in</h3>
								<div className="forloginpannel">
									<div className="input-div-enquiery p-2" id="forMobileotp">
										<p>Enter Mobile number</p>
										<input type="text" id="username" disabled={otpFlag} className="bord-bottom-input" {...username} name='username' required />

										{otpFlag &&	<OtpResults />}	
										{error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
										<div className="mt-4">
										{LoginFlag && <button className="book-now w-100 mt-3" id="getotpBtn" onClick={SendOtp}>Send Otp</button>}	
										
										
								
										</div>
										
									</div>
									
									<div className="new-login"><a href="/Registration" id="newuser"> Register yourself first to Login</a></div>
									
								</div>
							</div>
				{/* </form> */}
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
export default Login;