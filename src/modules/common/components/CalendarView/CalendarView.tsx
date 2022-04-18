/* eslint-disable no-else-return */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import _Classes from "./CalendarView.module.scss";
import { Button, Select } from "antd";
import { useDoctorProfilesQuery } from "../../../../generated/graphql";
import Router from "next/router";
import { CloseOutlined } from "@ant-design/icons";

type Props = {
  handleDateChange: (arg: any | undefined) => void;
  handleDateClick: (arg: any | undefined) => void;
  calendarComponentRef: React.LegacyRef<FullCalendar> | undefined | any;
  calender: object | any;
  setDoctorId: number | any;
};

function AdminAimsCalender(props: Props) {
  const {
    handleDateChange,
    calendarComponentRef,
    calender,
    handleDateClick,
    setDoctorId,
  } = props;
  const events = [{ title: "today's event", date: new Date() }];
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string | null>(null);

  const [{ data }] = useDoctorProfilesQuery();
  const { doctorProfiles } = data || {};

  function handleSearch() {
    setIsSearch(!isSearch);
  }

  const handleChange = (selectedItems: any) => {
    setSelectedItems(selectedItems);
    setDoctorId(selectedItems);
  };

  const onClear = () => {
    setSelectedItems(null);
    setDoctorId(undefined)
  };

  return (
    <div>
      <div className={`${_Classes["calendarview"]}`}>
        {isSearch ? (
          <div className="my-2 flex flex-row">
            <div className="lg:ml-3 mt-3 sm:mt-0 sm:w-2/5">
              <Select
                placeholder="Search by Physician Name"
                className={`w-full`}
                showArrow
                showSearch
                value={selectedItems}
                onChange={handleChange}
                filterOption={(inputValue, option: any) =>
                  option.props.children
                    .toString()
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
                }
              >
                {doctorProfiles?.map((item) => (
                  <Select.Option key={item?.id} value={item?.doctor_id}>
                    {item?.user?.first_name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div>
              <Button onClick={onClear} type="text" className="sm:ml-3">
                <CloseOutlined className="text-sm" />
                <span className="text-gray-1">Clear</span>
              </Button>
            </div>
          </div>
        ) : null}
        <FullCalendar
          dayHeaderContent={(args) => {
            const weekShortName = new Date(args.date).toLocaleString("en-us", {
              weekday: "short",
            });
            const currentDate = new Date(args.date).getDate();
            return (
              <div style={{ flexDirection: "column" }}>
                <div style={{ color: "#000" }}>{currentDate}</div>
                <div style={{ color: "#000" }}>{weekShortName}</div>
              </div>
            );
          }}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "customText today customPrev customNext title",
            center: "",
            right: "listview search custom1",
          }}
          customButtons={{
            customNext: {
              icon: "chevron-right",
              click: () => {
                handleDateChange("next");
              },
            },
            customPrev: {
              icon: "chevron-left",
              click: () => {
                handleDateChange("prev");
              },
            },
            customText: {
              text: "Appointment",
            },
            custom1: {
              text: "Request an Appointment",
              click: function () {
              
              },
            },
            listview: {
              text: "List View",
              click: function () {
                Router.push("/patient/appointments/requested");
              },
            },
            search: {
              text: "Search",
              click: () => {
                handleSearch();
              },
            },
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={calendarComponentRef}
          // weekends={calender.calendarWeekends}
          events={calender?.calenderEvents}
          eventClick={handleDateClick}
          eventTextColor="black"
          displayEventTime={false}
          // eslint-disable-next-line consistent-return
          // eventClassNames={(arg) => {
          //   if (arg?.isToday || arg.event.extendedProps?.startingToday) {
          //     return [`${calendarStyle.clsToday}`];
          //   } else if (arg.event.extendedProps?.status === "Completed") {
          //     return [`${calendarStyle.clsComplete}`];
          //   } else if (arg.event.extendedProps?.status === "Ongoing") {
          //     return [`${calendarStyle.clsOngoing}`];
          //   } else if (arg.event.extendedProps?.status === "Upcoming") {
          //     return [`${calendarStyle.clsUpcoming}`];
          //   } else if (arg.event.extendedProps?.status === "Cancelled") {
          //     return [`${calendarStyle.clsCancel}`];
          //   }
          // }}
        />
      </div>
    </div>
  );
}

export default AdminAimsCalender;
