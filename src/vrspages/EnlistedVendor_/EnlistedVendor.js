import React, { useState, useEffect, useRef, useDebugValue  } from 'react';
import './EnlistedVendor.css'
import Footer from '../Footer/Footer'
import Login from '../Login/Login';


import 'jquery/dist/jquery.min.js';
 
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 




import axios from 'axios';



function EnlistedVendor() {
    let i=0;
   
const [ProductList, setProductList] = useState([]);
const [topping, setTopping] = useState("C")
const [apply, setApply] = useState(false);

useEffect(() => {
   
    fetch('http://192.168.22.61/VendorSys/api/v1/products/{prodCategory}?prodCategory=C', {
        method: 'POST',
      })
    .then(response => response.json())
    .then(json => 
        {
            
            if(json.code==0)
            {
                var jsondata=json.content;
                setProductList(jsondata);
            }
           
            
        }
       
        )
    .finally(() => {
       
    })}, [])








const getProductList=(category)=>
{

  setTopping(category.target.value);
  axios.post('http://192.168.22.61/VendorSys/api/v1/products/{prodCategory}?prodCategory='+category.target.value).then(response => {
		
if(response.data.code==0)
{
    var jsondata=response.data.content;
    setProductList(jsondata);
    
    
}

	
	}).catch(error => {
		
		
	});
};


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
                   {/* <div className="main-body-pannel">
       
        <div className="right-pannel-div">
          <div className="right-pannel-div-inner"> */}
            <div className="row">
              <div className="col-md-12">
                <div className="form-check-inline">
                  <label className="form-check-label">
                    <input type="radio" className="form-check-input" name="optradio" checked={topping==='C'} value="C" onChange={getProductList} />Civil
                  </label>
                </div>
                <div className="form-check-inline">
                  <label className="form-check-label">
                    <input type="radio" className="form-check-input" name="optradio" value="M" checked={topping==='M'} onChange={getProductList}  />Mechanical / Electrical
                  </label>
                </div>


              </div>


              
              <div className='col-md-12 mt-3 tabletop'>
             

                <table  id="ProductList" className='table w-100 table-bordered dta-table '>
                  <thead>
                    <tr>
                      <th style={{ width: "15%" }}>Sl No.</th>
                      <th style={{ width: "65%" }}>Name of the Product</th>

                    </tr>
                  </thead>
                  <tbody id="tbody">
                {
                   ProductList.map((result,j) => {
                    return (
              
                      <tr>
                        <td>{i = i + 1}</td>
                        <td key={j}>{result.productDesc}</td>
              
                      </tr>
              
                    )
                  })
              }

                  </tbody>
                </table>
               
              </div>

            </div>
          {/* </div>
        </div>
      </div> */}
                </>
                }
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default EnlistedVendor