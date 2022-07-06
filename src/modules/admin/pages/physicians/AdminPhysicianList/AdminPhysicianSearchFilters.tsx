import React, { useState } from "react";
import { Input, Button, Select, Space, DatePicker } from "antd";
import {
  CloseOutlined,
  SearchOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { getDateInFormat } from "common/utils/date";
import { DateType } from "common/types/types";
import { BookingDate, GetPhysiciansInput, useCountriesQuery,useGetStatesByCountryQuery} from "generated/graphql";
import { SelectCountryTypeFilter } from "common/components/SelectCountryTypeFilter/SelectCountryTypeFilter";
import { SelectStateTypeFilter } from "common/components/SelectStateTypeFilter copy/SelectStateTypeFilter";
const { RangePicker } = DatePicker;

const { Option } = Select;

type Props = {
  onChange: (value: GetPhysiciansInput | any) => void;
};

function AdminPhysicianSearchFilters(props: Props) {
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

    if (!filters?.language) {
      delete filters?.language;
    }

    onChange(filters);
    console.log(filters,"ddd")
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
    <div className="page-filters flex lg:flex items-center mb-5 flex-wrap gap-2">
      <div className="flex lg:mb-0 ">
        <div className="flex-1 flex w-80">
          <Input
            value={filterState.searchField || ""}
            placeholder="Search by ID, name or email address"
            prefix={<SearchOutlined />}
            onChange={(e) => onChangeFields("searchField", e.target.value)}
          />
        </div>
      </div>
      <div className="  sm:mt-0">
        <Select
          placeholder="Specialization"
          className="w-full sm:w-40"
          onChange={(e) => onChangeFields("specialization", e)}
          value={filterState.specialization}
        >
           <Option value="Cardiologist">Cardiologist</Option>
            <Option value="Family Physician">Family Physician</Option>
            <Option value="Neurologist">Neurologist</Option>
          
          
        </Select>
      </div>
      <div className=" sm:mt-0  md:w-44 xl:w-44">
     
         <SelectCountryTypeFilter
            onChange={(value) => onChangeFields("countryId", Number(value))}
            value={filterState?.countryId}
          />
      </div>
      <div className="sm:mt-0">
      <SelectStateTypeFilter 
            onChange={(value) => onChangeFields("stateId", Number(value))}
            value={filterState?.stateId}
            selectedCountryId={filterState.countryId}
          />
      </div>
      <div className="sm:mt-0">
        <Select
          placeholder="Language"
          className="w-full sm:w-40"
          onChange={(e) => onChangeFields("language", e.toLowerCase())}
          value={filterState.language}
        >
          <Option value="English">English</Option>
          <Option value="Spanish">Espanol</Option>
        </Select>
      </div>
      <Button type="text" className="" onClick={clear}>
        <CloseOutlined className="text-sm" />
        <span className="text-gray-1">Clear</span>
      </Button>
    </div>
  );
}

export default AdminPhysicianSearchFilters;
