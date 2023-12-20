import React, { useState } from 'react';
import {Link} from "react-router-dom"
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger,Tooltip } from "react-bootstrap";
import { useEffect } from 'react';
import axios from 'axios';
import { getUserDtl } from '../../vrspages/Common/Common';


//totalTransactions
export const totalTransactions = {
  series: [{
    name: "Total Orders",
    type: 'line',
    data:[0, 45, 30, 75, 15, 94, 40, 115, 30, 105, 65, 110]
    
  },{
    name: "Total Sales",
    type: 'line',
    data: [0, 60, 20, 130, 75, 130, 75, 140, 64, 130, 85, 120]
    
  }, {
    name: "",
    type: 'area',
    data: [0, 105, 70, 175, 85, 154, 90, 185, 120, 145, 185, 130]
  }],

  options: {
    chart: {
			height: 300,
			type: "line",
			stacked: false,
			toolbar: {
				enabled: false
			},
			dropShadow: {
        enabled: true,
				opacity: 0.1,
			},
		},
    colors: ["#6259ca", "#f99433", 'rgba(119, 119, 142, 0.01)'],
		dataLabels: {
			enabled: false
		},
    stroke: {
			curve: "smooth",
			width: [3, 3, 0],
			dashArray: [0, 4],
			lineCap: "round"
		},
		grid: {
			padding: {
				left: 0,
				right: 0
			},
			strokeDashArray: 3
		},
		markers: {
			size: 0,
			hover: {
				size: 0
			}
		},
  
    xaxis: {
			type: "month",
			categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			axisBorder: {
				show: false,
				color: 'rgba(119, 119, 142, 0.08)',
			},
			labels: {
				style: {
					color: '#8492a6',
					fontSize: '12px',
				},
			},
		},
    yaxis: {
			labels: {
				style: {
					color: '#8492a6',
					fontSize: '12px',
				},
			},
			axisBorder: {
				show: false,
				color: 'rgba(119, 119, 142, 0.08)',
			},
		},
    fill: {
			gradient: {
			  inverseColors: false,
			  shade: 'light',
			  type: "vertical",
			  opacityFrom: 0.85,
			  opacityTo: 0.55,
			  stops: [0, 100, 100, 100]
			}
		  },
		tooltip: {
			show:false
		},
    legend: {
      position: "top",
      show:true
    }
  },
 
};
//Recentorders

export const Recentorders = {
  series: [83],
  options: {
    chart: {
      height: 305,
      type: "radialBar",
      responsive:'true',
      offsetY: 10,
      offsetX: 0,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "16px",
            color: undefined,
            offsetY: 30,
          },
          value: {
            offsetY: -16,
            fontSize: "22px",
            color: undefined,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    colors: ['#ff5d9e'],
	fill: {
		type: "gradient",
		gradient: {
			shade: "gradient",
			type: "horizontal",
			shadeIntensity: .5,
			gradientToColors: ['#6259ca'],
			inverseColors: !0,
			opacityFrom: 1,
			opacityTo: 1,
			stops: [0, 100]
		}
	},
    stroke: {
      dashArray: 4,
    },
    labels: [""],
  },
};

//dashbordtable



let username=getUserDtl().username;
export const DashbordTable=()=>{
  const [allApplication, setAllApplication] = useState([])
  
    useEffect(() => {
      const fetchAllApplication = async ()=>{

          await axios.get(process.env.REACT_APP_API_URL_PREFIX+"/api/v1/generalinformation/{registration_number}?regNo="+getUserDtl().registrationNo).then((res)=>{
            const modifiedData = res.data.content.map((item, index) => ({...item, rowNo:index+1,}));
            setAllApplication(modifiedData)
          })
          
      }
      fetchAllApplication()
    }, [])
   console.log(allApplication);
   console.log(getUserDtl().registrationNo);

    const getApplicationStatus = (status)=>{
      if(status === "P") return <span className='text-primary'>Pending</span>
      if(status === "A") return <span className='text-success'>Accepted</span>
      if(status === "R") return <span className='text-danger'>Rejected</span>
      return <span className='text-primary'>Pending</span>
    }
   /*  const coloums = [
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
    ] */
  const columns=[
    {
      name: "S.NO",
      selector: row => [row.rowNo],
      sortable: true,
      cell:row=><span className="text-muted fs-15 fw-semibold text-center">{row.rowNo}</span>
    },
    
    /* {
      name: "	NAME",
      selector: row => [row.username],
      sortable: true,
      cell:row=> <div className="d-flex">
        
      <img className="avatar avatar-md brround mt-1" alt="" src={row.img}/>
      <div className="ms-2 mt-0 mt-sm-2 d-block">
          <h6 className="mb-0 fs-14 fw-semibold">{row.username}</h6>
          <span className="fs-12 text-muted">{row.email}</span>
      </div>
  </div>  
    }, */
    {
      
      name: "APPLICATION NO.",
      selector: row => [row.applicationNo],
      sortable: true,
      cell:row=><span className="text-muted fs-15 fw-semibold text-center">{row.applicationNo}</span>
    },
    {
      name: "APPLICATION DATE",
      selector: row => [row.applicationDate],
      sortable: true,
      cell:row=><span className="text-muted fs-15 fw-semibold">{row.applicationDate}</span>
    },
    {
      name: "PRODUCT CATEGORY",
      selector: row => [row.prod_cat],
      sortable: true,
      cell:row=><span className="text-muted fs-15 fw-semibold">{row.prod_cat}</span>
    },
    {
      name: "PRODUCT",
      selector: row => [row.productName],
      sortable: true,
      cell:row=><span className="text-muted fs-15 fw-semibold">{row.productName}</span>
    },
    {
      name: "SUBMISSION STATUS",
      selector: row => [row.submittedFlag==="N"? "Not Submitted": "Submitted"],
      sortable: true,
      cell: row=><span className={`text-${row.color} fs-15 fw-semibold`}>{row.submittedFlag==="N"? "Not Submitted": "Submitted"}</span>
    },
    {
      name: "APPLICATION STATUS",
      selector: row => [getApplicationStatus(row.checkStatus)],
      sortable: true,
      cell: row=><span className={`text-${row.color} fs-15 fw-semibold`}>{getApplicationStatus(row.checkStatus)}</span>
    },
    {
      name: "ACTION",
      selector: row => [row.action],
      sortable: true,
      cell: row =><span className="">
      <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
      <Link to="#"className="btn btn-primary btn-sm rounded-11 me-2" ><i><svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"/></svg></i></Link>
      </OverlayTrigger>
      <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
      <Link to="#" className="btn btn-danger btn-sm rounded-11"><i><svg className="table-delete" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg></i></Link>
      </OverlayTrigger>
  </span>
    },
  ]
 
        let data= allApplication;
        const tableDatas = {
          columns,
          data,
        };
       let i=1;
       
        return(
          <DataTableExtensions {...tableDatas}>
          <DataTable 
          columns={columns}  
          data={data}
          noHeader
          defaultSortField="APPLICATION NO" 
          defaultSortAsc={false}
          striped={true}
          center={true}
          persistTableHead
          pagination
          highlightOnHover />
          </DataTableExtensions>
        )
      }
