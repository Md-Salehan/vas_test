import React , { useState }from 'react';

 import Header from '../Header/Header';
 import Sidebar from '../Sidebar/Sidebar';
 import Footer from '../Footer/Footer';

function DocumentUploaded()
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
							<h1 className="page-heading">Document Uploaded List</h1>
						</div>
						<div className='col-md-12 mt-3'>
  <table className="table w-100 table-bordered dta-table">
    <thead>
      <tr>
        <th style={{width: "15%"}}>Sl No.</th>		
        <th style={{width: "65%"}}>Document Name</th>
        <th style={{width: "20%"}} className='text-center'>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
		<td>Lorem Ipsum</td>
        
        <td className='text-center'> 
			<div>
            <a href='#'><i class="fa fa-pencil mr-3" aria-hidden="true"></i></a>
				<a href='#'><i class="fa fa-trash" aria-hidden="true"></i></a>
				
			</div>
		</td>
      </tr>
	  <tr>
        <td>2</td>
        <td>Lorem Ipsum</td>
		
        <td className='text-center'> 
			<div>
            <a href='#'><i class="fa fa-pencil mr-3" aria-hidden="true"></i></a>
				<a href='#'><i class="fa fa-trash" aria-hidden="true"></i></a>
			</div>
		</td>
      </tr>
	  <tr>
        <td>3</td>
        <td>Lorem Ipsum</td>
		
        <td className='text-center'> 
			<div>
            <a href='#'><i class="fa fa-pencil mr-3" aria-hidden="true"></i></a>
				<a href='#'><i class="fa fa-trash" aria-hidden="true"></i></a>
			</div>
		</td>
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

export default DocumentUploaded;