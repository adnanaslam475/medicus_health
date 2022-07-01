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
    <div className="page-filters flex-none lg:flex items-center mb-5">
      <div className="flex-none sm:flex sm:mb-3 lg:mb-0">
        <div className="lg:ml-3 sm:w-full md:w-full lg:w-80">
          <Input
            value={filterState.searchField || ""}
            placeholder="Search by ID, name or email address"
            prefix={<SearchOutlined />}
            onChange={(e) => onChangeFields("searchField", e.target.value)}
          />
        </div>
      </div>
      <div className="lg:ml-3 mt-3 sm:mt-0">
        <Select
          placeholder="Specialization"
          className="w-full sm:w-40"
          onChange={(e) => onChangeFields("specialization", e)}
          value={filterState.specialization}
        >
          <Option>Abcd</Option>
          <Option>EFG</Option>
        </Select>
      </div>
      <div className="lg:ml-3 mt-3 sm:mt-0">
        <Select
          placeholder="Country"
          className="w-full sm:w-40"
          onChange={(e) => onChangeFields("country", e)}
          value={filterState.country}
        >
     { React.Children.toArray(
              countries?.map((el, i) => {
                return (
                  <Select.Option value={el?.id}>
                    {el?.country_name}
                  </Select.Option>
                );
              })
            )}
        </Select>
      </div>
      <div className="lg:ml-3 mt-3 sm:mt-0">
        <Select
          placeholder="State"
          className="w-full sm:w-40"
          onChange={(e) => onChangeFields("state", e)}
          filterOption={(input, state: any) =>
            state.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          value={filterState.state}
        >
              {React.Children.toArray(
              getStatesByCountry?.data?.getStatesByCountry?.map((el, i) => {
                return (
                  <Select.Option value={el.id}>{el?.state_name}</Select.Option>
                );
              })
            )}
        </Select>
      </div>
      <div className="lg:ml-3 mt-3 sm:mt-0">
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
      <Button type="text" className="sm:ml-3" onClick={clear}>
        <CloseOutlined className="text-sm" />
        <span className="text-gray-1">Clear</span>
      </Button>
    </div>
  );
}

export default AdminPhysicianSearchFilters;
