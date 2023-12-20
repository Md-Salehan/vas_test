import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import PDFViewer from 'pdf-viewer-reactjs'
import { useEffect } from 'react';
function ViewFile() {
  const {file} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    window.open(
      "../../../Doc/"+file,
      "_blank",
      
    )
    navigate(-1)
  }, [file])
  
  
  

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(numPages){
    setNumPages(numPages);
  }
  return (
    <div className="">
        
        
        {/* <div className='right-pannel-div'>
          <div className='right-pannel-div-inner mrgin-buttom-zero'>
            <div className="row inner-vendor">
            <div className='col-md-12'>
    <div className='view-file'> */}
    
    {/* <PDFViewer
            document={{
                url: "../../../Doc/"+file,
            }}
            /> */}
  {/* <embed src={"../../../Doc/"+file} width={1100} height={600}  /> */}
    {/* </div>
    </div>
    </div>
    </div>
</div> */}
</div>
    
  )
}

export default ViewFile;

