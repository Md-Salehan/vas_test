import React, { useRef, useState } from 'react'

import axios from 'axios';
import Smalltag from '../SmallTag/smalltag';
import { Link, NavLink } from "react-router-dom";
import { Breadcrumb, Row, Card } from "react-bootstrap";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ProductRequest() {
    const prodNature = useRef();
    const prodDesc = useRef();
    const prodApplArea = useRef();
    const [doc, set_doc] = useState([])
    const [msg, set_msg] = useState("")
    const [loading, set_loading] = useState(false)
    // const navigate = useNavigate()
    const handletestFileChange=(e)=>{
        const {files} = e.target
            set_doc([...files])
    }
    const delete_ProdReq_Files = (i)=>{
        let list = doc;
        console.log(list);
        list.splice(i,1)
        set_doc([...list])
        // console.log(list);
    }
    const sendProductRequest= async (e)=>{
        e.preventDefault()
        console.log("called");
        set_msg("")
        let obj = {
            fleDtls: [],
            prodApplArea: prodApplArea.current.value,
            prodDesc: prodDesc.current.value,
            prodNature: prodNature.current.value,
            regNo: localStorage.getItem("registrationNo")
        }
        let files = [...doc];

        //file validation
        if(files.length > 5){ 
            set_msg("Atmost 5 files are allowed")
            return 
        }
        if(files.length === 0){ 
            set_msg("Please upload file")
            return
        }
        for(let i=0; i<files.length; i++){
            if(files[i].size > 25*1000*1000){
                set_msg("please check file '"+files[i].name+"' exceed 25MB")
                return
            }
        }
        
        //uploading files
        set_loading(true)
        // file is not accepting
        for(let i=0; i< files.length; i++){
            let formData = new FormData();
            formData.append("vfile", files[i])
            set_loading(true)
            await axios.post(process.env.REACT_APP_BASE_URL+"/common/filemgr", formData).then((res)=>{
                if(res.data.code === 0) obj.fleDtls = [...obj.fleDtls, {
                    fileTypeCode: "23",
                    // fileDescription: "New product request",
                    //     // "fileTypeCode": "string",
                    // fileTypeSlNo: `${i}`,
                    //     // "fileUri": "string"
                    fileUri: res.data.content.fileUri
                } ]
                else{
                    set_msg("Somthing went wrong! Please try again")
                    set_loading(false)
                    return
                }
            }).catch((err)=>{
                console.log(err, "err");
                set_loading(false)
                return
            }).finally(()=>{
                set_loading(false)
            })
        }
        console.log(obj);
        //sending request
        await axios.post(process.env.REACT_APP_BASE_URL+"/api/v1/prodreq", obj).then((res)=>{
            if(res.data.code === 0){
                alert("Request send Successfully")
                document.getElementById("reset-btn").click()
            }
            console.log(res.data);
            set_loading(false)
        }).catch((err)=>{
            console.log(err);
            set_loading(false)
        })
       console.log(obj);

    }
    const reset_prodReq = ()=>{
        set_doc([])
    }
    return (
        <>
	
	<div className="page-header">
        <div>
          <h1 className="page-title">Product Request</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
            Product Request
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {/* <div className="ms-auto pageheader-btn">
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
            <div className="main-body-pannel">
                
                <div className='right-pannel-div'>
                    <form onSubmit={sendProductRequest}>
                    <div className='right-pannel-div-inner'>

<div className='col-md-12'> 
<div id="main">
<div className="">
  <div className="accordion" id="faq">

   
  <Accordion TransitionProps={{ unmountOnExit: true }} expanded={true} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><div id="faqhead1">Request for inclusion of New Products</div></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
		  <div className="container">
        
        <div id="faq1" className="collapse show" aria-labelledby="faqhead1" data-parent="#faq"> 
            <div className="">
                <div className='row'>
                    <div className="col-md-4">
                        <div className="from-each-div">
                            <p className="from-label-p">Product category<spna className='text-danger fs-5'>*</spna></p>

                            <select ref={prodNature} required className="form-control"  id='natureOfCompany' >
                                <option value={""}>-- Select --</option>
                                <option value={"C"}>Civil</option>
                                <option value={"M"}>
Mechanical/Electrical
</option>

                            </select>



                        </div>
                    </div>
                    <div className="col-md-8">
        <div className="from-each-div">
            <p className="from-label-p">Product Name<spna className='text-danger fs-5'>*</spna> </p>
            <input ref={prodDesc} required type="text" className="form-control" />
        </div>
    </div>
    <div className='col-md-12'>
    <div className="from-each-div">
            <p className="from-label-p">Specific Application Area<spna className='text-danger fs-5'>*</spna> </p>
            <textarea ref={prodApplArea} required style={{ minWidth: "100%", minHeight: "100px" }}
                    
                     className="form-control d-inline-block w-auto align-top courtCases" />
        </div>
            
                
        </div>
    <div className="col-md-4">
        <div className="from-each-div">
            <div className='from-each-div mb-0'>
                                            <p className='from-label-p'>Upload Necessary Documents<spna className='text-danger fs-5'>*</spna> </p>
                                            <div className='tag-input-container'>
								<div className='enterTag-div'>
                                            <button className='up-btn payment-btn ' 
									variant="contained"
									>
									<span className='upload'>
										UPLOAD <i className="fa fa-upload" aria-hidden="true"></i>
									</span>
                                            <input onChange={handletestFileChange} multiple accept=".pdf" required type='file'  className="form-control mf-file-input"
                                                name='product' id="product" />
                                    </button>
                                    </div>
                                    </div>
                                                <div className='tag-showcase-box-vertical'>
									{
                                        doc.map((file, i)=>(
										<Smalltag deleteFunc={()=>delete_ProdReq_Files(i)} fontAwsmIcon="fas fa-file" lable={file.name} key={i}/>
									))
									}
								</div>

                                        </div>
        </div>
    </div>

                </div>

            </div>
        </div>
    </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    
</div>
</div>
</div>
</div>
{msg && <p className='err-msg'>{msg}</p>}
            <div className="col-md-12 text-right mb-2">
                <input style={{marginRight: "10px"}} id='reset-btn' onClick={reset_prodReq} type='reset' className="Enquiry-btn ml-auto mt-2 btn btn-secondary " value={"Reset"} />
                <button type='submit' className="Enquiry-btn ml-auto mt-2 btn btn-primary">{loading? "Loading...": "Submit"}</button>
            </div>


</div>
                    </form>

                </div>
            </div>
           
        </>
    )
}

export default ProductRequest