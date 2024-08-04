import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./styles.css";


export default function MusicView() {
  const [numPages, setNumPages] = useState(12);
  const [pageNumber, setPageNumber] = useState(1);
  const [prevD, setPrevD] = useState('Neutral');

  const firstHandle = function(event) {
    var data = JSON.parse(event.data);
    console.log('eventtt', data[0].prediction)
    const prediction=data[0].prediction;
    console.log(prediction, prevD, pageNumber, numPages)
  
    // if (prevD != prediction) {
    if (prediction == 'Left'){
      previousPage(prediction)
    } else if (prediction == 'Right') {
      nextPage(prediction)
    }
      // }
  }

  const sourceHandle = function(event) {
    console.log(event);
  }

  useEffect(() => {
    console.log("ADDINGADDINGADDING")
    var source = new EventSource("http://127.0.0.1:5000/events");
    source.addEventListener(
      "customer",
      firstHandle,
      false
    );
    source.addEventListener(
      "error",
      sourceHandle,
      false
    );
    return () => {
      // whenever the component removes it will executes
      source.removeEventListener('customer', firstHandle, false);
      source.removeEventListener('error',sourceHandle,false);
      console.log("ALERTALERTALERT")
    };
  });

  // const fetchDirection = async() => {
  //   const response = await fetch('http://127.0.0.1:5000/prediction')
  //   const data=await response.json()
  //   const prediction = data.prediction
    
  //   console.log(prediction, prevD, pageNumber, numPages)
  //   if (prevD != prediction && prediction != "Neutral") {
  //     if (prediction == 'Left'){
  //       previousPage(prediction)
  //     } else if (prediction == 'Right') {
  //       nextPage(prediction)
  //     }
  //   }
  // }
  // useEffect(()=>{
  //   setInterval(()=>{
  //     fetchDirection()
  //     console.log('fetching')
  //   },2000)
    
  // })
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
  

  /*To Prevent right click on screen*/
  // document.addEventListener("contextmenu", (event) => {
  //   event.preventDefault();
  // });

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // function changePage(offset) {
  //   setPageNumber((prevPageNumber) => prevPageNumber + offset);
  // }

  function previousPage(prediction) {
    if (pageNumber>1) {
      setPrevD(prediction)
      console.log('turning to prev page', pageNumber-1)
      setPageNumber(pageNumber-1)
    }
    // changePage(-1);
    
  }

  function nextPage(prediction) {
    // changePage(1);
    if (pageNumber < numPages) {
      setPrevD(prediction)
      console.log('turning to prev page', pageNumber+1)
      setPageNumber(pageNumber+1)
    }
  }

  return (
    <>
      <div className="main">
        <img  hidden={true}
                src="http://localhost:5000/video_feed"
                alt="Video"
                />
        <button type="submit" value="Stop/Start" name="stop" onClick={async () => {

                  const response = await fetch("http://localhost:5000/requests", {
                  method: "POST",
                  headers: {
                  'Content-Type' : 'application/json'
                  },
                  })
                  if (response.ok){
                  console.log("it worked")
                  }}}>Push</button>
        <div>
          <Document
            file={"finding-related-tables.pdf"}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
        <div>
          <div className="pagec">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </div>
          <div className="buttonc">
            <div
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className="Pre"
            >
              Previous
            </div>
            <div
              style={{ color: "red" }}
              className="button"
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Nextadfasdf
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
