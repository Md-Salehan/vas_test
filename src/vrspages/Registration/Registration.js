import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Footer/Footer';

function Registration()
{
	const [loading, setLoading] = useState(false);
	const nameofVendor = useFormInput('');
    const registeredOfficeAddress = useFormInput('');
	const landlineNo = useFormInput('');
    const mobileNo = useFormInput('');	
	const emailid = useFormInput('');
	const websiteAddress= useFormInput('');
	const [error, setError] = useState(null);
	const handleRegistration=(event)=>
	{
		event.preventDefault();
        setError(null);
        setLoading(true);
        axios.post('http://192.168.22.61/VendorSys/api/v1/registration', { emailId: emailid.value, landlineNo: landlineNo.value , mobileNo: mobileNo.value, webSite: websiteAddress.value, officeAddress: registeredOfficeAddress.value,vendorName:nameofVendor.value,userType:'C',registrationNo:''}).then(response => {
           debugger;
		
		   setLoading(false);
            setError(response.data.msg);
        }).catch(error => {
            setLoading(false);
            // console.log(error.data);
            setError("Wrong credentials. Please check and try again");
        });
	}


    return(
        <div>
        <div className="top-container">
		<div className="container">
			<div className="row">
				<div className="col-md-6 col-9">
					<div className="top-header-leftpannel">
						<a href="#"><i className="fa fa-phone" aria-hidden="true"></i>&nbsp;
							+91 1234567890</a>
						<a href="#"><i className="fa fa-envelope" aria-hidden="true"></i>&nbsp;
							info@domain.com</a>
					</div>
				</div>
				
				<div className="col-md-6 col-3 pl-0">
					<div className="top-header-rightpannel">
						<a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
						<a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
						<a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
					</div>
				</div>
			</div>
		</div>
	</div>
    <div className="header" id="myHeader">
    <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
            <a className="navbar-brand" href="#"><img src="img/logo-2.png" alt="Logo"
                    className="header-logo" /></a>
                    {/* <button class="Enquiry-btn ml-auto mt-1" data-toggle="modal" data-target="#loginmodal">Log In</button> */}
        </nav>
    </div>
</div>
<hr></hr>
	<div className="col-md-12">
	<div className='row'>
	<div className="col-md-4">
							
						</div>
						<div className="col-md-4">
							
						</div>
						<div className="col-md-4">
							
						</div>
						</div>
	</div>
	



<div className="row m-0">
				<div className="col-md-3"></div>
						<div className="col-md-6">
						<form onSubmit={handleRegistration}>
							<div className="log-modal-rightpannel">
							<h3 className='text-center'>New Registration</h3>
								<div className="forloginpannel">
									<div className="input-div-enquiery p-3" id="forMobileotp">
										<div className="row">
											<div className="col-md-6">
											<div className="from-each-div">
							<p className="from-label-p">Name of Vendor</p>
							
							<input type="text"className="form-control" {...nameofVendor} required />
						</div>
											</div>
											<div className="col-md-6">
											<div className="from-each-div">
							<p className="from-label-p">Registered Office Address </p>
							<input type="text"className="form-control" {...registeredOfficeAddress} required />
						</div>
											</div>
										
									
										<div className="col-md-6">
						<div className="from-each-div">
							<p className="from-label-p">Landline No</p>
							<input type="text"className="form-control" {...landlineNo} />
						</div>
						</div>
						<div className="col-md-6">
						<div className="from-each-div">
							<p className="from-label-p">Mobile No </p>
							
							<input type="text"className="form-control" {...mobileNo} required pattern="[789][0-9]{9}" />
						</div>
						</div>
						<div className="col-md-6">
						<div className="from-each-div">
							<p className="from-label-p">Email id </p>
							<input type="text"className="form-control" {...emailid} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required />
						</div>
						</div>
						<div className="col-md-6">
						<div className="from-each-div">
							<p className="from-label-p">Website Address </p>
							<input type="text"className="form-control" {...websiteAddress} />
						</div>
						</div>
						</div>
										
										<div className="col-md-12 text-right p-0 mt-4">
										{error && <><small style={{ color: 'green' }}>{error}</small><br /></>}
											
                                            &nbsp;
                                           <a href="/" className="Enquiry-btn mr-3 mt-2 bg-danger color-wh-important">Close</a>
										   <button type='submit' className="Enquiry-btn ml-auto mt-2 bg-important color-wh-important" disabled={loading}>{loading ? 'Loading...' : 'Save'}</button> 
										</div>
										
									</div>
								</div>
							</div>
							</form>
						</div>
                        <div className="col-md-3"></div>
					</div>

					<Footer></Footer>
   
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
export default Registration;