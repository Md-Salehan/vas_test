import React, { useState, useEffect, useRef, useDebugValue  } from 'react';
import './ProductList.css'

import Login from '../Login/Login';

import DataTable from 'react-data-table-component';


// import 'jquery/dist/jquery.min.js';
 
//Datatable Modules
// import "datatables.net-dt/js/dataTables.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
// import $ from 'jquery'; 




import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import { Breadcrumb, Row, Card } from "react-bootstrap";



function ProductList() {

const [ProductList, setProductList] = useState([]);
const [topping, setTopping] = useState("C")
const [apply, setApply] = useState(false);


  useEffect(() => {
   
    fetch(process.env.REACT_APP_BASE_URL+'/api/v1/products/{prodCategory}?prodCategory=C', {
        method: 'GET',
      })
    .then(response => response.json())
    .then(json => 
        {
            
            if(json.code===0)
            {
                var jsondata=json.content;
                setProductList(jsondata);
            }
           
            
        }
       
        )
    .finally(() => {
       
    })}, [])

    
    



const ProductTable = ({coloums, data})=>{
  return <DataTable 
    columns={coloums} 
    data={data}
    fixedHeader
    fixedHeaderScrollHeight='300px'
    pagination
    highlightOnHover />
}

const coloums = [
  {
    name: "S. No:",
    selector: (row, index) => index + 1,
    width: "100px"
  },
  {
    name: "Name of the Product",
    selector: (row)=> row.productDesc,
    sortable: true
  }
]



const getProductList=(category)=>
{

  setTopping(category.target.value);
  axios.get(process.env.REACT_APP_BASE_URL+'/api/v1/products/{prodCategory}?prodCategory='+category.target.value).then(response => {
		
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
        <div className="page-header">
        <div>
          <h1 className="page-title">Product List</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Product List
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
       {/*  <div className="ms-auto pageheader-btn">
          <Link
            to={`${process.env.PUBLIC_URL}/BillList`}
            className="btn btn-success btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Button
          </Link>
        </div> */}
      </div>

       
        <div className='landing-page-body'>
         
            
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
                <ProductTable coloums={coloums} data={ProductList} />
              </div>

            </div>
          
        </div>

       <br></br>
    </div>
  )
}

export default ProductList