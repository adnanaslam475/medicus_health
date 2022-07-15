import { Button, Table } from "antd";
import {
  Appointment,
  AppointmentServiceType,
  AppointmentTimeSlots,
  DoctorSchedule,
  User,
} from "generated/graphql";
import React from "react";

import { EyeFilled, MessageOutlined } from "@ant-design/icons";
import Router from "next/router";
import { date } from "common/utils";
import { getUserData } from "common/utils/userData";
import _classes from './CurrentAppointment.module.scss';
type Props = {
  loading:boolean|undefined;
};

function CurrentAppointmentTable({ loading }: Props) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: {
        compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
        multiple: 3,
      },
    },
    {
      title: "Physician name",
      dataIndex: "physician",
      render: (value: User) => {
        return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
      },

      sorter: {
        compare: (a: any, b: any) => a.first_name - b.first_name,
        multiple: 3,
      },
    },
    {
      title: "Service type",
      dataIndex: "serviceType",
    
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
    },
    {
      title: "Booking date",
      dataIndex: "requestedDate",
      key: "requestedDate",
      // sorter: {
      //   compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
      //   multiple: 3,
      // },
      render: (value: string) => {
        return <div className="someclass">{date?.formatMMMMDDYYYY(value)}</div>;
      },
    },
    {
      title: "Appointment due date",
      dataIndex: "appointmentSchedule",
      key: "appointmentSchedule",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
     
    },
    {
      title: "Appointment time",
      dataIndex: "appointmentScheduletime",
      key: "appointmentScheduletime",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
   
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      render: () => {
        return <div className={`${_classes["button-wrap1"]}`}><Button>Join</Button></div>;
      },

   
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      render: () => {
        return <div className={`${_classes["button-wrap"]}`}><Button  icon={<MessageOutlined/>}  type="primary" className="bg-primary">Message physician</Button></div>;
      },

   
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      render: () => {
        return <div className={`${_classes["button-wrap"]}`}><Button  icon={<MessageOutlined />} type="primary" className="bg-primary">Message admin</Button></div>;
      },

   
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      className: "table-action-icon text-primary",
      render: (appointmentId: number) => (
        <div className="text-primary">
          <EyeFilled
            onClick={() => {
              return Router.push(
                `/physician/appointments/current/${appointmentId}`
              );
            }}
          />
        </div>
      ),
    },


  ];
  const Ddata = [
		{
			id: "1",
			// name: "John Brown",
			physician: "MD-2312",
      serviceType: "First consultation",
		
			requestedDate: "09:00 AM - 09:30 AM",
			appointmentSchedule: "$40.00",
      appointmentScheduletime: "$40.00",
			refund: "$40.00",
			return_fee: "$40.00",
      stripe_fee:"$3232",
			net_fee: "$40.00",
		},
		
	];
  return <Table columns={columns} dataSource={Ddata} loading={loading} scroll={{x:true}}/>;
}
export default CurrentAppointmentTable;
