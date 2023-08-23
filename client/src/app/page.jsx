"use client"
import React from "react";
import axios from "axios";
// components
import Form from "@/components/Form";
import PhotoData from "@/components/PhotoData";
// urls
const dataUrl = "/api/v1/fileUpload";

const Page = () => {


 // fetch Data
 const [loading, setLoading] = React.useState(false)
 const [data, setData] = React.useState([])

 const fetchData = async () => {
  try {
   setLoading(true)
   const response = await axios.get(dataUrl)
   setData(response.data.objects)
   setLoading(false)
  } catch (error) {
   // console.log(error.response.data.message);
   setLoading(false)

  }
 }

 React.useEffect(() => {
  fetchData()
 }, [])


 // delete data 
 const deleteData = async (itemId) => {
  try {
   setLoading(true)
   const deleteUrl = `/api/v1/fileUpload/${itemId}`
   await axios.delete(deleteUrl)
   setData(data.filter((item) => item._id !== itemId));
   setLoading(false)
  } catch (error) {
   // console.log(error.response.data.message);
   setLoading(false)
  }
 }


 return <main className="mt-8 mb-15">
  <h2 className="body-container text-center text-2xl font-bold" >
   <span className="underline">File Upload</span> <br /><br />
   (Upload Photos to test)
  </h2>
  <Form data={data} setData={setData} />
  <PhotoData data={data} loading={loading} deleteData={deleteData} />
 </main>;
};

export default Page;
