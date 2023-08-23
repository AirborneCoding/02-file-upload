import React from "react";

const data1 = [
 {
  _id: 1,
  title: "black bmw m4 ",
  image: "https://g80.bimmerpost.com/forums/attachment.php?attachmentid=3160661&stc=1&d=1682015448"
 },
 {
  _id: 2,
  title: "ismail martinez ",
  image: "https://blogladiadoresfit.com/wp-content/uploads/2021/04/Ismael-Martinez2.jpg"
 },
 {
  _id: 3,
  title: "Sarasota FL",
  image: "https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blt10300fcd66c11f6d/61bc43619793463f93f421a4/CA_Sarasota_US_Header.jpg"
 },
 {
  _id: 4,
  title: "developer",
  image: "https://t3.ftcdn.net/jpg/03/18/60/62/360_F_318606217_Hk8jo2MVoI33SQOkYrfOF929J7JgIP0P.jpg"
 },
]


const PhotoData = ({ data, loading, deleteData }) => {

 return <section className="body-container mb-16 pb-16">
  <h4 className="font-bold">Photo Uploaded : {data.length}</h4>

  <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
   {
    loading ?
     <p>Loading...</p>
     :
     (
      data.length < 1 ? "No Photo uploaded , please insert one" :
       data?.map((item) => {
        const { title, image: { url } } = item
        return <li
         key={item._id}
         className=" rounded cursor-pointer hover:shadow-xl hover:shadow-black"
        >
         <div className="flex justify-between bg-white p-3  items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
           className="btn-nc bg-red-700 inline-block"
           onClick={() => { deleteData(item._id) }}
          >delete</button>
         </div>
         <img src={url} alt={title} className="h-96  w-full object-cover" />
        </li>
       })
     )
   }
  </ul>
 </section>;
};

export default PhotoData;
