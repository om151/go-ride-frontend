import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";


const FinishRide = (props) => {

  const navigate = useNavigate();

  async function endRide (){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
      rideId : props.rideData._id
    },{
      headers :{
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })

    if(response.status == 200){
      props.setFinishRidePanel(false);
      navigate("/captain-home")
    }
  }
    return(
        <div>
        <h5 className="p-1 text-center w-[93%] absolute top-0 ">
   <i
     className="text-3xl text-gray-300 ri-arrow-down-wide-line"
     onClick={() => {
      props.setFinishRidePanel(false);
     }}
   ></i>
 </h5>

 <h3 className="text-2xl font-semibold mb-5">Finish this ride to start</h3>

 <div className="flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-3">
   <div className="flex items-center gap-3">
       <img className="h-12 w-12 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw9tk89YzCM4exFNWNbbG4vRalCVHIVNUWyw&s" alt="" />
       <h2 className="text-lg font-medium">{props.rideData?.user.fullname.firstname + " " + props.rideData?.user.fullname.lastname}</h2>
   </div>
   <h5 className="text-lg font-semibold">2.2 KM</h5>
 </div>

 <div className="flex gap-2 justify-between flex-col items-center">
   <div className="w-full mt-5">
     <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
       <i className="text-lg ri-map-pin-range-fill"></i>
       <div className="">
         <h3 className="text-lg font-medium">{props.rideData?.pickup}</h3>
         <p className="text-sm -mt-1 text-gray-600">
         {props.rideData?.pickupDes}
         </p>
       </div>
     </div>

     <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
     <i className="text-lg ri-square-fill"></i>
       <div className="">
         <h3 className="text-lg font-medium">{props.rideData?.destination}</h3>
         <p className="text-sm -mt-1 text-gray-600">
         {props.rideData?.destinationDes}
         </p>
       </div>
     </div>

     <div className="flex items-center gap-5 p-3 ">
     <i className="text-lg ri-currency-line"></i>
       <div className="">
         <h3 className="text-lg font-medium">₹{props.rideData?.fare}</h3>
         <p className="text-sm -mt-1 text-gray-600">
           Pay Online
         </p>
       </div>
     </div>
   </div>

   


   <div className="mt-10 w-full">
   
   <button 
   onClick={endRide}
   className="flex text-lg justify-center w-full mt- bg-green-600 text-white font-semibold p-3 rounded-lg">
          Finish Ride
        </button>

        

   
   </div>
 </div>
   </div>
    )
}

export default FinishRide;