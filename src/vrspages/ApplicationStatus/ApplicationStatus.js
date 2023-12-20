import React , { useState }from 'react';

 import Header from '../Header/Header';
 import Sidebar from '../Sidebar/Sidebar';
 import Footer from '../Footer/Footer';

function ApplicationStatus()
{
   
    return(   
        <>
          <Header></Header>
          <div className="main-body-pannel">
            <Sidebar></Sidebar>
            <div className="right-pannel-div">
				<div className="right-pannel-div-inner">
					<div className="row">
						<div className="col-md-12">
							<h1 className="page-heading">Application Status</h1>
						</div>
						<div className='col-md-12 mt-3'>
            <table class="table w-100 table-bordered dta-table">
                  <thead>
                    <tr>
                      <th >Sl No.</th>
                      <th >Application No</th>
                      <th >Date of Application</th>
                      <th>Product Category <br></br>(Civil/Mechanical/Electrical)</th>
                      <th>Product</th>
                      <th>Application Status</th>
                      <th>Edit</th>
                      </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>App/2023/00001</td>
                          <td>28/04/2023</td>
                          <td>Civil</td>
                          <td>Rod</td>
                          <td>Pending</td>
                          <th><a href='#'>Click</a></th>
                          </tr>
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

export default ApplicationStatus;