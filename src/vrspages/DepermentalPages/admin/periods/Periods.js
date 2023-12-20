import React, { useState,useEffect } from 'react'

import {Link} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { Breadcrumb, Row, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import axios from 'axios';
import moment from 'moment/moment';




function Periods() {
    const fromPeriod = useFormInput('');
	const toPeriod = useFormInput('');
   
  const [loading, setLoading] = useState(false);
  const [otpFlag, setsotpFlag] = React.useState(false);
const [msg, setMsg] = React.useState("");
const [disableflag, setdisableflag] = React.useState(false);
const [error, setError] = useState(null);


const [activeDate, set_activeDate] = useState({
  from: "",
  to : "",
  today: new Date().getTime(),
  exist: false,
  periodCode: ""
})
const getActiveDate = async ()=>{
  await axios.get(process.env.REACT_APP_BASE_URL+"/api/v1/ActivePeriod").then((res)=>{
    console.log(moment(new Date(res.data.content.fromDate).getDate()).format("YYYY/MM/DD").replaceAll("/", "-"));
    if(res.data?.content?.periodCode)
    set_activeDate({
      ...activeDate,
      from: moment(new Date(res.data.content.fromDate).getDate()).format("YYYY/MM/DD").replaceAll("/", "-"),
      to: moment(new Date(res.data.content.toDate).getDate()).format("YYYY/MM/DD").replaceAll("/", "-"),
      exist : true,
      periodCode: res.data.content.periodCode
    })
    else set_activeDate({
      from: "",
      to : "",
      today: new Date().getTime(),
      exist: false,
      periodCode: ""
    })
  }) 
  
}
useEffect(() => {
    
getActiveDate()

}, [])

const getDateInFormart_ddmmyyyy = (yyyymmdd) => {
  const date = new Date(yyyymmdd);
  const month =
    Number(date.getMonth()) < 9
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const HandleActivePeriod=()=>
{
    if(fromPeriod.value && toPeriod.value ){
		const propObj = { 
			fromDate: new Date(fromPeriod.value), 
			toDate: new Date(toPeriod.value)
		
		}
			
        setLoading(true);
         axios.put(process.env.REACT_APP_BASE_URL+'/api/v1/perioddetails', propObj).then(res => {
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

const deleteActivePeriod = async (e)=>{
  e.preventDefault()
  setLoading(true)
  await axios.delete(process.env.REACT_APP_BASE_URL+"/api/v1/period?periodCode="+activeDate.periodCode).then((res)=>{
    if(res.data.code === 0){
      getActiveDate()
    }
  }).catch(err=>console.log(err))
  .finally(()=>setLoading(false))
}

const postActivePeriod = async (e)=>{
  e.preventDefault()
  setLoading(true)

  const obj = {
    fromDate: moment(activeDate.from).format(),
    toDate: moment(activeDate.to).format()
  }
  console.log(obj);
  await axios.post(process.env.REACT_APP_BASE_URL+"/api/v1/period_master", obj).then((res)=>{
    if(res.data.code === 0){
      getActiveDate()
    }
  }).catch(err=>console.log(err))
  .finally(()=>setLoading(false))
}



const handleDateChange = (e)=>{
  const {name, value} = e.target
  set_activeDate({
    ...activeDate,
    [name]: value
  })
}


    return (
        <>
    <div className="page-header">
        <div>
          <h1 className="page-title">Periods</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Periods
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
                <div className='right-pannel-div-inner mrgin-buttom-zero card'>
                    <div className="card-body inner-vendor">
                        <div className='col-md-12'>
                            <table className="table w-100 table-bordered ">
                                <thead className='table-header'>
                                    <tr>
                                        <th style={{ width: "40%" }}>From</th>
                                        <th style={{ width: "40%" }}>To</th>
                                        <th>Set Period</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        <tr>

                                            <td><input 
                                            className="form-control" 
                                            type="date" 
                                            value={activeDate.from}
                                            onChange={handleDateChange}
                                            name='from'
                                                 />
                                            </td>

                                            <td><input 
                                            className="form-control" 
                                            type="date" 
                                            value={activeDate.to}
                                            onChange={handleDateChange}
                                            name='to'
                                             /></td>

                                            <td>
                                                {activeDate.exist ?
                                                  <button style={{ width: "100%" }} type="button" className="btn btn-danger" onClick={deleteActivePeriod}>  <i className="fa-solid fa-trash fa-lg"></i></button>
                                                :
                                                <button style={{ width: "100%" }} type="button" className="btn btn-success" onClick={postActivePeriod}>  <FontAwesomeIcon icon={faArrowRight} /></button>
                                                
                                                }
                                                
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            
            {error && <><small style={{ color: 'green' }}>{error}</small><br /></>}
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
export default Periods