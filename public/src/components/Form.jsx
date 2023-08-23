"use client"
import React, { useState } from "react";
import axios from "axios";

const url = "/api/v1/fileUpload"

const Form = ({ data, setData }) => {

  const [title, setTitle] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      setLoading(true);

      const resPhoto = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData([resPhoto.data.object, ...data]);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.msg);
      setTimeout(() => {
        setError("");
      }, 10000);
      setLoading(false);
    }

    setTitle('');
    setImage(null);
  };


  return <form className="form-father" onSubmit={handleSubmit}>
    <div className="form-row">
      <label htmlFor="title" className="form-label">Title</label>
      <input type="text" className="form-input" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
    </div>
    <div className="form-row">
      <label htmlFor="" className="form-label">Image :</label>
      {
        image ?
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            className="w-full h-20 object-contain"
          />
          :
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-2  ">
                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              </div>
              <input
                accept="image/*"
                type="file"
                id="dropzone-file"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
      }
    </div>
    <div className="form-row">
      <button type="submit" className="btn-nc bg-gray-500">
        {
          loading ? "Loading..." : "Submit"
        }
      </button>
    </div>
    {
      error && (
        <div className="form-row">
          {/* <small className="alert alert-danger">{error}</small> */}
          <p className="text-xs p-1 bg-red-300 rounded">{error}</p>
        </div>
      )
    }
  </form>;
};

export default Form;
