import React, { useState } from "react";
import { Input, Button, Select, Space, DatePicker } from "antd";
import {
  CaretDownOutlined,
  CarryOutOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  BookingDate,
  useDoctorProfilesQuery,
  useGetAllAppointmentServiceTypesQuery,
  GetCurrentAppointmentInput,
} from "generated/graphql";
import searchStyle from "./style.module.scss";
import Image from "next/image";
import { calendarFilterIcon } from "utils/images";
import { getDateInFormat } from "../../utils/date";
import _classes from "./SearchFilters.module.scss";

const { RangePicker } = DatePicker;

type Props = {
  isFromPhysician?: boolean;
  onChange: (value: GetCurrentAppointmentInput) => void;
};

function SearchFilters(props: Props) {
  const { onChange, isFromPhysician } = props;

  const [openDateRange, setOpenDateRange] = useState(false);
  const [patientName, setPatientName] = useState<string>();

  const [filterState, setFilterState] = useState<GetCurrentAppointmentInput>(
    {}
  );
  const [creationDate, setCreationDate] = useState<BookingDate>({});

  const [{ data: dataList }] = useDoctorProfilesQuery();
  const { doctorProfiles } = dataList || {};

  const [{ data }] = useGetAllAppointmentServiceTypesQuery();
  const { appointmentServiceTypes } = data || {};

  function handlePaitentName_ID(event: React.ChangeEvent<HTMLInputElement>) {
    // setSearchPatient(event.target.value);
    setPatientName(event.target.value);
  }

  function onClear() {
    setFilterState({});
    onChange({});
  }

  const applyDateRange = () => {
    setOpenDateRange(false);
    onChangeFields("dueDate", creationDate);
  };

  function onChangeFields(key: string, value: string | number | object) {
    const filters = {
      ...filterState,
      [key]: value,
    };
    setFilterState(filters);

    if (!filters?.searchString) {
      delete filters?.searchString;
    }

    if (!filters?.dueDate) {
      delete filters?.dueDate;
    }

    onChange(filters);
  }

  return (
    <div
      className={`${_classes["page-filters"]} flex flex-col sm:flex-row items-center mb-5 flex-wrap gap-2`}
    >
      <span className="text-gray-1 sm:mr-3 sm:block mr-auto w-full xl:w-fit">
        Search by
      </span>
      {/* <div className="flex-none sm:flex"> */}
      <div className="   w-full sm:w-full md:w-full lg:w-60 ">
        <Input
          placeholder={"ID# or physician name"}
          prefix={<SearchOutlined />}
          onChange={(e) => onChangeFields("searchString", e.target.value)}
          value={filterState.searchString || ""}
        />
      </div>
      {isFromPhysician && (
        <div className="  w-full sm:w-full md:w-full lg:w-70 ">
          <Input
            placeholder={"ID# or patient name"}
            prefix={<SearchOutlined />}
            onChange={(event) => handlePaitentName_ID(event)}
            value={patientName}
          />
        </div>
      )}

      <div className="w-full md:w-56 xl:w-60 ">
        <Select
          suffixIcon={
            <div className="text-gray">
              <CaretDownOutlined className="text-sm text-gray" />
            </div>
          }
          placeholder="Appointment type"
          className={`${searchStyle.placeholderColor} w-full`}
          onChange={(e) => onChangeFields("serviceId", e)}
          value={filterState.serviceId || "Appointment type"}
        >
          {appointmentServiceTypes?.map((item) => (
            <Select.Option key={item?.id} value={item?.id}>
              {item?.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      {/* </div> */}
      <div className="flex-none sm:flex w-full md:w-60 xl:w-60">
        <Space direction="vertical" size={0} className="w-full md:w-60 xl:w-60">
          <div className="relative">
            <RangePicker
              onChange={(_, dateString: string[]) =>
                setCreationDate({
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
              {filterState?.dueDate?.endDate ? (
                <div>
                  {filterState?.dueDate?.endDate
                    ? `${getDateInFormat(
                        filterState?.dueDate?.startDate
                      )} -> ${getDateInFormat(filterState?.dueDate?.endDate)}`
                    : "Appointment date"}
                </div>
              ) : (
                <div className="flex justify-between items-center w-full px-3">
                  <div className="flex items-center font-thin">
                    <span className="mr-2 mt-1 min-w-[18px]">
                      <Image
                        priority={true}
                        width={18}
                        height={18}
                        src={calendarFilterIcon}
                        alt=""
                      />
                    </span>
                    <span className="font-normal font-rubik">
                      Appointment date
                    </span>
                  </div>
                  <div>
                    <CaretDownOutlined style={{ color: `primary` }} />
                  </div>
                </div>
              )}
            </Button>
          </div>
        </Space>
      </div>
      <Button
        onClick={onClear}
        type="text"
        className={`${_classes["btn-clear"]} ml-3 mr-auto sm:ml-0 sm:mr-0`}
      >
        <CloseOutlined className="text-sm" />
        <span className="text-gray-1 text-sm">Clear</span>
      </Button>
    </div>
  );
}

export default SearchFilters;
