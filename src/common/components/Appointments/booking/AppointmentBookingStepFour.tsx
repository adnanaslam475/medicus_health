import React from "react";

function StepFour() {
  return (
    <>
        <div className="w-full border-b border-gray-5 pb-2 mb-5">
            <label className="block">Doctor</label>
            <span>Dr. Paul Wallner</span>
        </div>
        <div className="flex">
            <div className="w-4/6 border-b border-gray-5 pb-2 mb-5">
                <label className="block">Service</label>
                <span>First Consultation</span>
            </div>
            <div className="w-2/6 ml-4 border-b border-gray-5 pb-2 mb-5">
                <label className="block">Charges</label>
                <span>$59.00</span>
            </div>
        </div>
        <div className="w-full border-b border-gray-5 pb-2 mb-5">
            <label className="block">Requested Date & Time</label>
            <span>February 4, 2022</span>
            <span>07:45 am - 08:30 am</span>
        </div>
        <p className="text-gray">Please note that your payment will only be charged once the physician will confirm the appointment. This is only an appointment request.</p>
    </>
  );
}
export default StepFour;
