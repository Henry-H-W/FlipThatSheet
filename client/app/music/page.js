"use client";
import { Document, Page, pdfjs } from "react-pdf";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";
import Navbar from "../components/navbar/nav";
import { ThemeProvider, createTheme } from "@mui/material/styles";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Music = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");

  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:8000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "http://localhost:8000/upload-files",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (result.statusText == "OK") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  };

  const openSheetMusic = (pdf) => {
    setSelectedFile(pdf);
    // window.open(`http://localhost:8000/files/${pdf}`, "_blank", "noreferrer");
  };
  const [numPages, setNumPages] = useState(12);
  const [pageNumber, setPageNumber] = useState(1);
  const [prevD, setPrevD] = useState("Neutral");

  const firstHandle = function (event) {
    var data = JSON.parse(event.data);
    console.log("eventtt", data[0].prediction);
    const prediction = data[0].prediction;
    console.log(prediction, prevD, pageNumber, numPages);

    // if (prevD != prediction) {
    if (prediction == "Left") {
      previousPage(prediction);
    } else if (prediction == "Right") {
      nextPage(prediction);
    }
    // }
  };

  const sourceHandle = function (event) {
    console.log(event);
  };

  useEffect(() => {
    console.log("ADDINGADDINGADDING");
    var source = new EventSource("http://127.0.0.1:5000/events");
    source.addEventListener("customer", firstHandle, false);
    source.addEventListener("error", sourceHandle, false);
    return () => {
      // whenever the component removes it will executes
      source.removeEventListener("customer", firstHandle, false);
      source.removeEventListener("error", sourceHandle, false);
      console.log("ALERTALERTALERT");
    };
  });

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function previousPage(prediction) {
    if (pageNumber > 1) {
      setPrevD(prediction);
      console.log("turning to prev page", pageNumber - 1);
      setPageNumber(pageNumber - 1);
    }
    // changePage(-1);
  }

  function nextPage(prediction) {
    // changePage(1);
    if (pageNumber < numPages) {
      setPrevD(prediction);
      console.log("turning to prev page", pageNumber + 1);
      setPageNumber(pageNumber + 1);
    }
  }

  const theme = createTheme({
    palette: {
      background: {
        default: "#ffffff", // White
      },
      primary: {
        main: "#0000ff", // Blue
      },
      secondary: {
        main: "#add8e6", // Light blue
      },
      text: {
        primary: "#000000", // Black text color
      },
    },
    typography: {
      fontFamily: "Comic Sans MS",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <header>
        <Navbar />
      </header>
      {/* {selectedFile && ( */}
      <Modal open={selectedFile} style={styles.container}>
        <div>
          <div
            style={{
              width: "100%",
            }}
          >
            <CloseIcon
              fontSize="large"
              style={{ position: "absolute", zIndex: 8, right: 480, top: 20 }}
              onClick={() => setSelectedFile("")}
            />

            {/* <div>
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
            </div> */}
            <Document file={selectedFile} onLoadSuccess={onDocumentLoadSuccess}>
              <Page
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
            <div
              className="pagec"
              style={{
                zIndex: 80,
                position: "absolute",
                bottom: 10,
                marginLeft: 15,
              }}
            >
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </div>
          </div>
        </div>
      </Modal>
      {/* )} */}

      <div>
        <img hidden={true} src="http://localhost:5000/video_feed" alt="Video" />

        <form className="formStyle" onSubmit={submitImage}>
          <Box textAlign="center" mt={5}>
            <Typography variant="h3" gutterBottom>
              Import Music
            </Typography>
          </Box>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            type="file"
            class="form-control"
            accept="application/pdf"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <button class="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data) => {
                return (
                  <div className="inner-div">
                    <h6>Title: {data.title}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={async () => {
                        openSheetMusic(data.pdf);
                        const response = await fetch(
                          "http://localhost:5000/requests",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        if (response.ok) {
                          console.log("it worked");
                        }
                      }}
                    >
                      Open Sheet Music
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
    </ThemeProvider>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: "0 auto",
    padding: "20px",
    height: "100vh",
    boxSizing: "border-box",
  },
  pdf: {
    width: "80%", // Adjust the width of the PDF viewer here
    maxWidth: "600px", // Limit the maximum width
  },
};

export default Music;
