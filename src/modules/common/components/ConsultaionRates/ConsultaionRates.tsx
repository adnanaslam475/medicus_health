import Spin from "antd/lib/spin";
import { useGetAllAppointmentServiceTypesQuery } from "generated/graphql";
import React from "react";

function ConsultationRates() {
	const [{ data: appointmentServiceTypes, fetching }] =
		useGetAllAppointmentServiceTypesQuery();
	const servicesWithPrice = appointmentServiceTypes?.appointmentServiceTypes;

	return (
		<div>
			<h3 className="pb-0 mb-0 text-base">Appointment services charges</h3>
			<p className="py-2">
				The appointment charges are set by the medicus administrator.
			</p>
      {/* // for loader */}
			{/* {fetching == false ? (
				servicesWithPrice?.map(({ name, price },id) => {
					return (
						<div className="my-5" key={id}>
							<h5 className="text-sm">{name}</h5>
							<div className="bg-gray-4 rounded p-4 max-w-1/2">
								<p className="pb-0 mb-0 text-md">{price}</p>
							</div>
						</div>
					);
				})
			) : (
				<Spin />
			)} */}
      	{servicesWithPrice?.map(({ name, price },id) => {
					return (
						<div className="my-5" key={id}>
							<h5 className="text-sm">{name}</h5>
							<div className="bg-gray-4 rounded p-4 max-w-[200px]">
								<p className="pb-0 mb-0 text-md">{price}</p>
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default ConsultationRates;
