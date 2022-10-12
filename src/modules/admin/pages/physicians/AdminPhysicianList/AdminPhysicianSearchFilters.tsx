import React, { useState } from "react";
import { Input, Button, Select, Space, DatePicker } from "antd";
import {
  CloseOutlined,
  SearchOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { getDateInFormat } from "common/utils/date";
import { DateType } from "common/types/types";
import {
  BookingDate,
  GetPhysiciansInput,
  useCountriesQuery,
  useGetStatesByCountryQuery,
} from "generated/graphql";
import { SelectCountryTypeFilter } from "common/components/SelectCountryTypeFilter/SelectCountryTypeFilter";
import { SelectCityTypeFilter } from "common/components/SelectCityTypeFilter/SelectCityTypeFilter";
import { SelectCityFilter } from "common/components/SelectCityFilter/SelectCityFilter";
import _classes from "./AdminPhysicianSearchFilters.module.scss";
import { SelectStateTypeFilter } from "common/components/SelectStateTypeFilter/SelectStateTypeFilter";

const { RangePicker } = DatePicker;

const { Option } = Select;

type Props = {
  onChange: (value: GetPhysiciansInput | any) => void;
};

function AdminPhysicianSearchFilters(props: Props) {
  const [filterPostalCode, setPostalCode] = useState<GetPhysiciansInput | any>(
    {}
  );
  const [filterCity, setFilterCity] = useState<GetPhysiciansInput | any>({});
  const [filterState, setFilterState] = useState<GetPhysiciansInput | any>({});
  const [countryId, setCountryId] = useState<number | undefined>();
  const [creationDate, setCreationDate] = useState<BookingDate>({});

  const { onChange } = props;
  function clear() {
    setFilterState({});
    onChange({});
  }

  function onChangeFields(key: string, value: string | number | object) {
    const filters = {
      ...filterState,
      [key]: value,
    };

    setFilterState(filters);

    if (!filters?.searchField) {
      delete filters?.searchField;
    }
    if (!filters?.specialization) {
      delete filters?.specialization;
    }

    if (!filters?.language) {
      delete filters?.language;
    }
    if (!filters?.countryId) {
      delete filters?.stateId;
    }

    if (!filters?.stateId) {
      delete filters?.cityId;
    }

    onChange(filters);
    console.log(filters, "ddd");
  }

  const applyDateRange = () => {
    setOpenDateRange1(false);
    onChangeFields("creationDate", creationDate);
  };
  const [openDateRange1, setOpenDateRange1] = useState(false);

  const [{ data }] = useCountriesQuery();

  const { countries } = data || {};
  const [getStatesByCountry] = useGetStatesByCountryQuery({
    variables: {
      input: countryId || 0,
    },
    pause: countryId === undefined,
  });
  return (
    <div
      className={`${_classes["page-filters-parent"]} page-filters flex lg:flex items-center mb-5 flex-wrap gap-2`}
    >
      <div className="inline-flex flex-1 sm:flex-0 md:flex-none lg:mb-0 ">
        <div className="flex w-full md:w-72 lg:w-72 xl:w-96">
          <Input
            value={filterState.searchField || ""}
            placeholder="Search by ID# or physician name"
            prefix={<SearchOutlined />}
            onChange={(e) => onChangeFields("searchField", e.target.value)}
          />
        </div>
      </div>
      <div className="sm:mt-0 w-full md:w-44 lg:w-56 xl:w-56">
        <Input
          value={filterState.specialization || ""}
          placeholder="Specialization"
          // prefix={<SearchOutlined />}
          onChange={(e) => onChangeFields("specialization", e.target.value)}
        />
        {/* <Select
          placeholder="Specialization"
          className="w-full sm:w-40"
          onChange={(e) => onChangeFields("specialization", e)}
          value={filterState.specialization}
        >
          <Option value="Cardiologist">Cardiologist</Option>
          <Option value="Family Physician">Family Physician</Option>
          <Option value="Neurologist">Neurologist</Option>
        </Select> */}
      </div>
      {/* <div className="w-full sm:mt-0 md:w-44 xl:w-44">
        <SelectCountryTypeFilter
          onChange={(value) => onChangeFields("countryId", Number(value))}
          value={filterState?.countryId}
        />
      </div>
      <div className="w-full sm:mt-0 md:w-44 xl:w-44">
        <SelectStateTypeFilter
          onChange={(value) => onChangeFields("stateId", Number(value))}
          value={filterState?.stateId}
          selectedCountryId={filterState.countryId}
        />
      </div>

      <div className="w-full sm:mt-0 md:w-44 xl:w-44">
        <SelectCityFilter
          onChange={(value) => onChangeFields("cityId", Number(value))}
          value={filterState?.cityId}
          selectedStateId={filterState.stateId}
        />
      </div>

      <div className="w-full sm:mt-0 md:w-44 lg:w-auto xl:w-44">
        <Select
          placeholder="Language"
          className="w-full sm:w-full sm:mt-0 md:w-44 lg:w-full xl:w-44"
          onChange={(e) => onChangeFields("language", e.toLowerCase())}
          value={filterState.language}
        >
          <Option value="English">English</Option>
          <Option value="Spanish">Espanol</Option>
        </Select>
      </div>
      <div
        className={`${_classes["rangePicker-cover"]} flex-none sm:flex lg:flex-none mt-0 sm:mt-0 w-full md:w-52 lg:w-52 xl:w-52`}
      >
        <Space
          direction="vertical"
          size={0}
          className="w-full md:w-56 lg:w-52 xl:w-60 sm:mb-3"
        >
          <div className="relative">
            <RangePicker
              value={null}
              open={openDateRange1}
              className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible "
              onChange={(_, dateString: string[]) =>
                setCreationDate({
                  startDate: dateString[0],
                  endDate: dateString[1],
                })
              }
              renderExtraFooter={() => (
                <div className="flex gap-3 justify-end p-3">
                  <Button
                    className="bg-gray-300"
                    onClick={() => {
                      setOpenDateRange1(false);
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
              className={`${_classes["dropdown"]} flex date-btn border-double`}
              block
              type="default"
              onClick={() => setOpenDateRange1?.(!openDateRange1)}
            >
              {filterState?.creationDate?.endDate ? (
                <div className="border-0 border-indigo-0 text-gray-1 ">
                  {filterState?.creationDate?.endDate
                    ? `${getDateInFormat(
                        filterState?.creationDate?.startDate
                      )} -> ${getDateInFormat(
                        filterState?.creationDate?.endDate
                      )}`
                    : "Account created at"}
                </div>
              ) : (
                <div className="flex justify-between items-center w-full px-1 lg:pl-0 border-gray text-gray-1">
                  <div className="font-rubik font-normal">
                    Account created at
                  </div>
                  <CaretDownOutlined />
                </div>
              )}
            </Button>
          </div>
        </Space>
      </div> */}
      {/* <Button type="text" className="" onClick={clear}>
        <CloseOutlined className="text-sm" />
        <span className="text-gray-1">Clear</span>
      </Button> */}
      <Button
        onClick={clear}
        type="text"
        className={`${_classes["btn-clear"]} ml-0`}
      >
        <CloseOutlined style={{ color: "#9295af" }} className="text-sm" />
        <span className="text-gray-1 text-sm">Clear</span>
      </Button>
    </div>
  );
}

export default AdminPhysicianSearchFilters;
