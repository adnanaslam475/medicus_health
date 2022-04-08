/* eslint-disable no-else-return */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import calendarStyle from "./style.module.scss";



function AdminAimsCalender() {
 
  const events = [{ title: "today's event", date: new Date() }];
  //   const calendarComponentRef = useRef(null);
  // function renderEventContent(eventInfo) {
  //   console.log("eventInfo", eventInfo.event.extendedProps);
  //   return (
  //     <>
  //       {/* <b>{eventInfo.timeText}</b> */}
  //       <p>{eventInfo.event.title}</p>
  //     </>
  //   );
  // }
  

  return (
    <div>
      <div className={`${calendarStyle.css}`}>
        <FullCalendar
          // eventContent={renderEventContent}
          // eslint-disable-next-line react/no-unstable-nested-components
          dayHeaderContent={(args) => {
            const weekShortName = new Date(args.date).toLocaleString("en-us", { weekday: "short" });
            // const currentDate = new Date(args.date).getDate();
            return (
              <div style={{ flexDirection: "column" }}>
                {/* <div style={{ color: "#000" }}>{currentDate}</div> */}
                <div style={{ color: "#000" }}>{weekShortName}</div>
              </div>
            );
          }}
          initialView="timeGridWeek"
          

          headerToolbar={{
            left: "customText today customPrev customNext",
            center: "title",
            right: "listview search custom1",
          }}
          customButtons={{
            customNext: {
              icon: "chevron-right",
              // click: () => {
              //   handleDateChange("next");
              // },
            },
            customPrev: {
              icon: "chevron-left",
              // click: () => {
              //   handleDateChange("prev");
              // },
            },
            customText: {
              text: "Appointment",
            },
            custom1: {
              text: 'Request an Appointment',
              click: function() {
                alert('clicked custom button 1!');
              }
            },
            listview: {
              text: 'List View',
              click: function() {
                alert('clicked custom button 1!');
              }
            },
            search: {
           
              text:"Search",
              // click: () => {
              //   handleDateChange("prev");
              
              // },
            },

          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          // ref={calendarComponentRef}
          // weekends={calender.calendarWeekends}
          events={events}
          // eventClick={handleDateClick}
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
