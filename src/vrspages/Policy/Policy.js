import React , { useState }from 'react';

 import Header from '../Header/Header';
 import Sidebar from '../Sidebar/Sidebar';
 import Footer from '../Footer/Footer';

function Policy()
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
							<h1 className="page-heading">Policy</h1>
						</div>
						<div className='col-md-12 mt-3'>
  
  </div>
						
					</div>
				</div>
		</div>
          </div>
          <Footer></Footer>
        </>       
    );
}

export default Policy;