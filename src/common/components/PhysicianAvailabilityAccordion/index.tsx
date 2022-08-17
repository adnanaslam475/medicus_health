import { Collapse } from "antd";
import { date } from "common/utils";
import { DoctorSchedule, useDoctorSchedulesQuery } from "generated/graphql";
import React from "react";
import { sorter } from "utils/helper";
import _classes from "./styles.module.scss";

type Props = {
  doctorId: number | undefined;
};
const PhysicianAvailabilityAccordion = (props: Props) => {
  const { doctorId } = props;
  const todayDate = new Date();

  const [{ data: doctorScheduleDetails }, executeUseDoctorSchedulesQuery] =
    useDoctorSchedulesQuery({
      variables: {
        doctorId: Number(doctorId),
      },
      //   pause: doctorId,
    });
  let today = todayDate.getDay();
  let matchDay = doctorScheduleDetails?.doctorSchedules?.find(
    (item) => item.day == today
  );
  return (
    <Collapse className={`${_classes["doctorProfileCard"]} mt-3`}>
      <Collapse.Panel
        disabled={!doctorId}
        className="w-full mb-5"
        key="1"
        header={
          <div className="flex-none sm:flex flex-grow justify-between">
            <div className="text-cyan-1 ant-collapse-available">
              {!doctorId ? "No physician selected" :"Physician availability schedule"}
            </div>
          </div>
        }
      >
        <div className="ant-collapse-time-body">
          {doctorScheduleDetails?.doctorSchedules?.length !== 0
            ? doctorScheduleDetails?.doctorSchedules
                ?.sort((a, b) => {
                  return sorter(a as DoctorSchedule, b as DoctorSchedule);
                })
                .map((item, index) => (
                  <div className="flex-none sm:flex flex-grow justify-between mb-2">
                    <span>{date?.dayName(item.day)}</span>
                    <div>
                      <span>
                      {`${date.formathhmma(item?.startTime)} -
                          ${date.formathhmma(item?.endTime)}`}
                        {/* {`${date.time24HrConvert(item?.startTime)} -
                          ${date.time24HrConvert(item?.endTime)}`} */}
                      </span>
                    </div>
                  </div>
                ))
            : "Physician schedules not available"}
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default PhysicianAvailabilityAccordion;
