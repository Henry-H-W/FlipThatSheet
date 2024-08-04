'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Music = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [allImage, setAllImage] = useState(null);
    
    useEffect(() => {
        getPdf();
    }, [])
    const getPdf = async () => {
      const result = await axios.get("http://localhost:8000/get-files");
      console.log(result.data.data)
      setAllImage(result.data.data);
    }

    const submitImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        console.log(title, file)
        const result = await axios.post("http://localhost:8000/upload-files", formData, 
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log(result);
    };

  return (
    <div>
        <form className="formStyle" onSubmit={submitImage}>
        <h4>Upload Pdf in React</h4>
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
  )
}

export default Music