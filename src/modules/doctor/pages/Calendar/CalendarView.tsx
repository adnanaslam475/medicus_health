import React, { useEffect, useState } from "react";
import Router from "next/router";
import AppLayout from "common/components/AppLayout/AppLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import _Classes from "./CalendarView.module.scss";
import { Button, Select } from "antd";
import { useDoctorProfilesQuery } from "../../../../generated/graphql";
import { CloseOutlined } from "@ant-design/icons";


function CalendarPage() {

  return (
    <AppLayout>
      <h1>Calendar</h1>
    </AppLayout>
  );
}

export default CalendarPage;
