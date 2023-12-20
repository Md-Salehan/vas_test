import axios from 'axios'
import React, { useState } from 'react'
import ApplicationRow from '../applicationRow/ApplicationRow'
function ApplicationTable({ApplicationList, lable, productList, appTyp}) {
  // const [arr,set_arr] = useState([])
  // useEffect(() => {
  //   set_arr(productList.map((prod)=>{
  //     return ApplicationList.filter((application)=>{
  //       return application.productName === prod.productDesc
  //     })
  //   }))
    
  // }, [productList, ApplicationList])

  return (
    <div style={{margin:"20px 0 20px 0"}}>
      <h4>{lable}</h4>
            <div className='header-bg'>
              <table style={{width: "100%"}}>
                <thead  >
                  <tr>
                    
                    <th style={{width: "70%"}}>Product Name</th>
                    <th style={{width: "30%"}}>Number of Applications</th>
                  </tr>
                </thead>
              </table>
            </div>


            <div id="">
              <div className="">
                <div className="accordion" id="faq">
                    { 
                      productList.map((prod, index)=>(
                        
                        <ApplicationRow appTyp={appTyp} key={index}  sno={index+1} prodName={prod.productDesc} ApplicationList={ApplicationList} />
                      ))
                    }
                </div>
              </div>
            </div>
            </div>
  )
}

export default ApplicationTable