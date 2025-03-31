import { useGSAP } from "@gsap/react";
import React, { useReducer, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import gsap from "gsap";
import FinishRide from "../components/finishRide";
import LiveTracking from "../components/liveTracking";


const CaptainRiding = () => {
  const location = useLocation();
  const rideData = location.state?.ride; // extract ride data if available

  const [finishRidePanel , setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(
      function () {
        if (finishRidePanel) {
          gsap.to(finishRidePanelRef.current, {
            transform: "translateY(0)",
          });
        } else {
          gsap.to(finishRidePanelRef.current, {
            transform: "translateY(100%)",
          });
        }
      },
      [finishRidePanel]
    );


  return (
      <div className="h-screen">
           
      <div className="fixed p-4 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          div
          className="  h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <LiveTracking/>
      </div>
    
      <div className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400" onClick={() => {
          setFinishRidePanel(true);
      }}>
      <h5 className="p-1 text-center w-[95%] absolute top-0 ">
      <i
        className="text-3xl text-gray-800 ri-arrow-up-wide-line"
        onClick={() => {
         
        }}
      ></i>
    </h5>
      <h4 className="text-xl font-semibold ">4 KM away</h4>
      <button className=" bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">Complete ride</button>
      </div>

      <div ref={finishRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full  py-6 px-3 bg-white pt-12">
    <FinishRide setFinishRidePanel={setFinishRidePanel} rideData = { rideData} />
    </div>

      

    </div>
  )
}

export default CaptainRiding;