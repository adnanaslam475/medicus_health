import React, { useState } from "react";
import { Button, Space, DatePicker, Form } from "antd";
import {
  CaretDownOutlined,
  CloseOutlined,
  DownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  useDoctorProfilesQuery,
  useGetAllAppointmentServiceTypesQuery,
} from "../../../generated/graphql";
import _classes from "./PatientAppointmentHistoryFilter.module.scss";
import { patientAppointmentHistoryFilterType } from "common/types/types";
import { SelectServiceTypeFilter } from "../SelectServiceTypeFilter/SelectServiceTypeFilter";
import { SelectPhysicianTypeFilter } from "../SelectPhysicianTypeFilter/SelectPhysicianTypeFilter";
import { calendarFilterIcon } from "utils/images";
import Image from "next/image";

const { RangePicker } = DatePicker;

type Props = {
  onChange: (value: patientAppointmentHistoryFilterType) => void;
};

function PatientAppointmentHistoryFilter(props: Props) {
  const [filterState, setFilterState] =
    useState<patientAppointmentHistoryFilterType>({});
  const [form] = Form.useForm();
  const { onChange } = props;

  const [openDateRange, setOpenDateRange] = useState(false);

  const [visible, setVisible] = useState(false);

  const [{ data }] = useGetAllAppointmentServiceTypesQuery();
  const { appointmentServiceTypes } = data || {};

  function clear() {
    setFilterState({});
    onChange({});
    form.resetFields();
  }

  const applyDateRange = () => {
    setOpenDateRange(false);
  };

  function onChangeFields(key: string, value: string | number | object) {
    const filters = {
      ...filterState,
      [key]: value,
    };
    setFilterState(filters);

    if (!filters?.doctorId) {
      delete filters?.doctorId;
    }

    if (!filters?.serviceId) {
      delete filters?.serviceId;
    }

    if (!filters?.dueDate?.startDate && !filters?.dueDate?.startDate) {
      delete filters?.dueDate;
    }

    onChange(filters);
  }

  return (
    <div
      className={`${_classes["page-filters"]} flex-none md:flex items-center mb-5`}
    >
      <span className="text-gray-1 mr-3 mb-3"></span>
      <div className="flex-none sm:flex">
        <div className="w-full md:w-44 xl:w-60 mr-3 mb-3">
          <SelectPhysicianTypeFilter
            onChange={(value) => onChangeFields("doctorId", value)}
            value={filterState?.doctorId}
          />
        </div>

        <div className="w-full md:w-60 mb-3 mr-2">
          <SelectServiceTypeFilter
            onChange={(value) => onChangeFields("serviceId", value)}
            value={filterState?.serviceId}
          />
        </div>

        <div className="flex-none sm:flex">
          <Space
            direction="vertical"
            size={0}
            className="w-full md:w-44 xl:w-60 sm:mb-3 mr-2"
          >
            <div className="relative">
              <RangePicker
                value={null}
                onChange={(_, dateString: string[]) =>
                  onChangeFields("dueDate", {
                    startDate: dateString[0],
                    endDate: dateString[1],
                  })
                }
                open={openDateRange}
                className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
                renderExtraFooter={() => (
                  <div className="flex gap-3 justify-end p-3">
                    <Button
                      className="bg-gray-300"
                      onClick={() => {
                        setOpenDateRange(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className=" text-white"
                      type="primary"
                      onClick={() => {
                        applyDateRange();
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                )}
              />
              <Button
                className="flex date-btn"
                block
                type="default"
                onClick={() => setOpenDateRange?.(!openDateRange)}
              >
                {filterState.dueDate?.startDate ? (
                  <div>
                    {filterState.dueDate
                      ? `${filterState.dueDate.startDate} -> ${filterState.dueDate.endDate}`
                      : "Date"}
                  </div>
                ) : (
                  <div className="flex justify-between items-center w-full px-3">
                    <div className="flex items-center font-thin">
                      <span className="mr-2 mt-1">
                        <Image
                          width={18}
                          height={18}
                          src={calendarFilterIcon}
                          alt=""
                        />
                      </span>
                      Date
                    </div>
                    <div>
                      <CaretDownOutlined />
                    </div>
                  </div>
                )}
              </Button>
            </div>
          </Space>

          <Button
            onClick={clear}
            type="text"
            className={`${_classes["btn-clear"]} sm:ml-3`}
          >
            <CloseOutlined className="text-sm" />
            <span className="text-gray-1 text-sm">Clear</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PatientAppointmentHistoryFilter;
