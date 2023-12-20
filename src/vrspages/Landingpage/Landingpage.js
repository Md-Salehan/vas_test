import React from 'react'
import './Landingpage.css'
import Footer from '../Footer/Footer'
import Login from '../Login/Login';
import { useState } from 'react';
import axios from 'axios';



function Landingpage() {
    const [fromPeriod, setsFromPeriod] = React.useState('')

	const [toPeriod, setsToPeriod] = React.useState('')
    const [apply, setApply] = useState(false);

    axios.get('http://192.168.22.61/VendorSys/api/v1/PeriodMasterAllDetail').then(response => {
		
	let period=response.data.content;
	setsFromPeriod(period[0].fromDate);
	setsToPeriod(period[0].toDate);
	}).catch(error => {
		
		
	});

  return (
    <div className='landing-page'>
        <div className="header" id="myHeader">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light p-0">
                    <a className="navbar-brand" href="#">
                        <img src="img/logo-2.png" alt="Logo" className="header-logo" />
                    </a>
                    <h2>
                        Vendor Approval System
                    </h2>
                </nav>
            </div>
        </div>
        <div className='landing-page-body'>
            <div className='left'>
                <div className='list'>
                    <ul>
                        <li><a href='Doc/VendorApprovalProcess.pdf' target='_blank'> Vendor Approval Process</a></li>
                        <li><a href='Doc/EligibilityCriteria.pdf' target='_blank'> Eligibility Criteria</a></li>
                        <li><a href="/ProductList"> Product List</a> </li>
                        <li><a href='/EnlistedVendor'> Enlisted Vendor</a></li>
                    </ul>
                </div>
                <div className='btn-div'>
                    <button onClick={()=> setApply(true)}>
                        <span>Apply Now</span>
                    </button>
                </div>
            </div>
            <div className='right'>
                { apply?
                    <Login />
                :
                <>
                    <div className='content'>
                        <h2>Welcome to the</h2>
                        <h2>Vendor Approval System</h2>
                        <h2>Public Health Engineering Department</h2>
                        <h2>West Bengal</h2>
                    </div>
                    <marquee><span className='spanmarquee'>Vendor Registration System will remain open for Vendors from {fromPeriod} to {toPeriod}</span></marquee>
                </>
                }
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default Landingpage