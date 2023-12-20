import React, { useState,useEffect } from 'react'

import {Link} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { Breadcrumb, Row, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

function Products() {
  const [newUserArr, set_newUserArr] = useState([])
  const productCode = useFormInput('');
	const productDesc = useFormInput('');
	const category = useFormInput('');
  
  

  const [loading, setLoading] = useState(false);
	const [otpFlag, setsotpFlag] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [disableflag, setdisableflag] = React.useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetch_AllNewProd = async ()=>{
        await axios.get(process.env.REACT_APP_BASE_URL+"/api/v1/productcategories").then((res)=>{
          set_newUserArr(res.data.content);
         
        })
        
    }
    fetch_AllNewProd()
  }, []);

const getAlldata=()=>
{
   axios.get(process.env.REACT_APP_BASE_URL+"/api/v1/productcategories").then((res)=>{
    set_newUserArr(res.data.content);
   
  })
}




  const getFullName=(Name)=>
  {
    var member;
    switch (Name) {
      case 'C':
        member = "Civil";
        break;
      case 'M':
        member = "M/E";
       
       
    }
    return member;
  }
  const getActiveName=(Name)=>
  {
    var member;
    switch (Name) {
      case 'A':
        member = "Active";
        break;
      case 'I':
        member = "InActive";
       
       
    }
    return member;
  }

  const handleFilter=(event)=>
  {
    if (event.target.value != '') {

      axios.get(process.env.REACT_APP_BASE_URL + "/api/v1/products/{prodCategory}?prodCategory=" + event.target.value).then((res) => {
        set_newUserArr(res.data.content);

      })
    }
    else {
      axios.get(process.env.REACT_APP_BASE_URL+"/api/v1/productcategories").then((res)=>{
        set_newUserArr(res.data.content);
       
      })
    }
  }
  const handleActive=(data)=>
  {
confirmAlert({
  title: 'Confirm to submit',
  message: 'Are you sure to do this.',
  buttons: [
    {
      label: 'Yes',
      onClick: () => 
      {
        const activedata=data.activeFlag=='A'?'I':'A';
        axios.put(process.env.REACT_APP_BASE_URL+"/api/v1/productsActFlg/"+data.productCode+"/?activeFlag="+activedata).then((res)=>{
          alert(res.data.msg);
          getAlldata();
         
        })
      }
    },
    {
      label: 'No'
     
    }
  ]
});
}
  const handleRegistration= async ()=>
	{


if(productCode.value && productDesc.value &&  category.value){
		const propObj = { 
			productCode: productCode.value, 					
			productDesc:productDesc.value,
			productNature:category.value
      
		}
			
        setLoading(true);
        await axios.post(process.env.REACT_APP_BASE_URL+'/api/v1/products', propObj).then(res => {
				console.log(propObj);
			setMsg(res.data.msg)	
		   	setLoading(false);
			setsotpFlag(false)
		
			if(res.data.code === 0) 
			{
				alert("Save successfully");
       
        setdisableflag(true);
			
			}
			
        }).catch(error => {
            setLoading(false);
            setMsg("Wrong credentials. Please check and try again");
        });
      }
      else{
        setMsg("Please fill all the feilds");
      }
	}
  return (
    <>
     <div className="page-header">
        <div>
          <h1 className="page-title">Products</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Products
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
         {/*  <Link
            to={`${process.env.PUBLIC_URL}/BillList`}
            className="btn btn-success btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Button
          </Link> */}
        </div>
      </div>
    
      <div className='right-pannel-div'>
        <div className='right-pannel-div-inner mrgin-buttom-zero'>
          <div className='card'>
            <div className='card-body'>
            <div className="row inner-vendor">
          <div className='col-md-12'>
                            <table class="table w-100 table-bordered ">
                                <thead className='table-header'>
                                    <tr>
                                        <th style={{ width: "40%" }}>Type</th>
                                        <th style={{ width: "40%" }}>Code</th>  
                                        <th style={{ width: "40%" }}>Desc</th>                                               
                                        <th style={{ width: "10%" }}>Add</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        <tr>

                                            <td><select className="form-control" 
							name='category' id='category' {...category}
								>
								<option value={""}>--Select--</option>
								<option value='C'>Civil</option>
								<option value='M'>M/E</option>
							</select></td>
              <td>
              <input className="form-control" type="text" {...productCode} />
              </td>
              <td>
              <input className="form-control" type="text" {...productDesc} />
              </td>
              

                                            <td>
                                                <button style={{ width: "100%" }} type="button" class="btn btn-success" onClick={handleRegistration} disabled={disableflag}><FontAwesomeIcon icon={faPlus} /></button>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>

          </div>
          <p style={{color: "red"}}>{msg}</p>
            {error && <><small style={{ color: 'green' }}>{error}</small><br /></>}
          </div>
          </div>
        
        
           <div className='card'>
            <div className='card-body'>
            <div className="row inner-vendor">
          <div className='col-md-12'>
          <table className="table w-100 table-bordered dta-table bg-light">
                  <thead>
                    <tr>
                      <th>Products</th>
                      <th style={{ width: "30%" }}>
                        {/* <div className='dflex'>
                        <input style={{ width: "80%" }} type='text' />
                        <button style={{ width: "20%" }} type="button" class="btn btn-success"><i className="fa-solid fa-plus"></i></button>
                        </div> */}
                        <select className="form-control" 
							name='category' id='category' onChange={handleFilter}
								>
								<option value={""}>All</option>
								<option value='C'>Civil</option>
								<option value='M'>M/E</option>
              
							</select>
                      </th>
                      </tr>
                      </thead>
                      </table>
                            <table class="table w-100 table-bordered ">
                                <thead className='table-header'>
                                    <tr>
                                        <th style={{ width: "40%" }}>Type</th>
                                        <th style={{ width: "40%" }}>Code</th>
                                        <th style={{ width: "40%" }}>Name</th>
                                        
                                        <th style={{ width: "10%" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                      newUserArr.map((data, index) =>
                                      

                                    
                                      //  if(data.userType!=='V')
                                      //  {
                                        <tr  key={index}>
                                          <td>{getFullName(data.productNature)}</td>
                                          <td>{data.productCode}</td>
                                          <td>{data.productDesc}</td>
                                          
                                          <td style={{ width: "10%" }}><button style={{ width: "100%" }} type="button" onClick={() => handleActive(data)} class="btn btn-success">{getActiveName(data.activeFlag)}</button></td>

                                        </tr>
                                    // }
                                                                      
                                    )  

                                       
                                    }
                                   
                                </tbody>
                            </table>
                        </div>

          </div>
            </div>
           </div>
        

        </div>
      </div>
     
    </>
  )
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
export default Products