import React from "react";
import DoctorCard from "common/components/DoctorCards/DoctorCards";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Button, Table, Tag, Modal } from "antd";
import { PlusOutlined, EyeFilled } from "@ant-design/icons";
import Link from "next/link";

import AdminPhysicianSearchFilters from "./UpcomingAppointmentFilter";
import Router from "next/router";

import Image from "next/image";
import engFlag from "../../../../../public/assets/images/engFlag.png";
import espanolFlag from "../../../../../public/assets/images/espanolFlag.png";
import UpcomingAppointmentFilter from "./UpcomingAppointmentFilter";
import SearchFilters from "common/components/SearchFilters/SearchFilters";
import {
  Appointment,
  AppointmentServiceType,
  useGetAllRequestedAppointmentsQuery,
  User,
} from "generated/graphql";
import { getUserData } from "common/utils/userData";
import UpcomingAppointmentTableDoctor from "modules/doctor/components/UpcomingAppointmentTableDoctor/UpcomingAppointmentTableDoctor";

const FLAG_BY_LANGUAGE = {
  ["english" as string]: engFlag,
  ["Spanish" as string]: espanolFlag,
};

function UpcomingAppointmentDoctor() {
  // const [{ data }] = useDoctorProfilesQuery();
  const { user } = getUserData();
  const [{ data }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        doctorId: user?.id,
      },
    },
  });
  const { appointments } = data || {};

  const columns = [
    {
      title: "ID",
      dataIndex: "doctidorId",
      sorter: {
        compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
        multiple: 3,
      },
    },
    {
      title: "Patient",
      dataIndex: "patient",
      render: (value: User) => {
        return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
      },

      sorter: {
        compare: (a: any, b: any) => a.first_name - b.first_name,
        multiple: 3,
      },
    },
    {
      title: "Service",
      dataIndex: "serviceType",
      render: (value: AppointmentServiceType) => {
        return <div>{value?.name}</div>;
      },
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
    },
    {
      title: "Date",
      dataIndex: "requestedDate",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
    },
    {
      title: "Time",
      dataIndex: "language",
      render: (language: string) => {
        return (
          <div className="flagAvatar engFlag pr-2">
            {FLAG_BY_LANGUAGE[language] && (
              <Image
                src={FLAG_BY_LANGUAGE[language]}
                // src={espanolFlag}
                alt={language || "flag"}
                width={25}
                height={25}
              />
            )}
          </div>
        );
      },
      sorter: {
        compare: (a: any, b: any) => a.date - b.date,
        multiple: 3,
      },
    },
    {
      title: "Total Amount",
      dataIndex: "serviceType",
      render: (value: AppointmentServiceType) => value.price,
      sorter: {
        compare: (a: any, b: any) => a.date - b.date,
        multiple: 3,
      },
    },
    {
      title: "",
      dataIndex: "doctor_id",
      key: "view",
      className: "table-action-icon",
      render: (value: any) => (
        <div>
          <EyeFilled
            onClick={() => {
              return Router.push(`/doctor/appointments/detail`);
            }}
          />
        </div>
      ),
    },
  ];
  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Upcoming Appointments</h2>
          <Link passHref href={`/doctor/appointments/calendar`}>
            <a>
              <Button>Calendar View</Button>
            </a>
          </Link>
        </div>

        <UpcomingAppointmentFilter />
        <UpcomingAppointmentTableDoctor
          dataSource={appointments as Appointment[]}
        />
      </div>
    </AppLayout>
  );
}
export default UpcomingAppointmentDoctor;
