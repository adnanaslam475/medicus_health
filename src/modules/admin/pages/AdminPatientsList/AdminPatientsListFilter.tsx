import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import _classes from "./AdminPatientListFilter.module.scss";
import { PatientListFilterType } from "common/types/types";
import { SelectCountryTypeFilter } from "common/components/SelectCountryTypeFilter/SelectCountryTypeFilter";
import { SelectStateTypeFilter } from "common/components/SelectStateTypeFilter/SelectStateTypeFilter";
import { useGetAllAppointmentServiceTypesQuery } from "generated/graphql";

type Props = {
  onChange: (value: PatientListFilterType) => void;
};

function AdminPatientsListFilter(props: Props) {
  const [filterState, setFilterState] = useState<PatientListFilterType>({});
  const [form] = Form.useForm();
  const { onChange } = props;

  const [visible, setVisible] = useState(false);

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

    if (!filters?.countryId) {
      delete filters?.countryId;
    }
    if (!filters?.stateId) {
      delete filters?.stateId;
    }

    onChange(filters);
  }

  const getCountryId = (countryId: number) => {
    console.log("countryId", countryId);
    return countryId;
  };

  return (
    <div
      className={`${_classes["page-filters"]} flex-none md:flex items-center mb-5 flex-wrap`}
    >
      <span className="text-gray-1 mr-3 mb-3"></span>
      <div className="flex flex-wrap gap-2 ">
        <div className=" w-full sm:w-full md:w-full lg:w-96 ">
          <Input
            value={filterState.searchField}
            placeholder="Search by ID or name or email address"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              onChangeFields("searchField", e.target.value);
            }}
          />
        </div>

        {/* <div className="w-full md:w-44 xl:w-44 sm:mt-0">
          <SelectCountryTypeFilter
            onChange={(value) => onChangeFields("countryId", Number(value))}
            value={filterState?.countryId}
          />
        </div> */}

        <div className="w-full md:w-44 xl:w-44 sm:mt-0  flex">
          {/* <SelectStateTypeFilter
            onChange={(value) => onChangeFields("stateId", Number(value))}
            value={filterState?.stateId}
            selectedCountryId={filterState.countryId}
          /> */}
          <Button
            onClick={clear}
            type="text"
            className={`${_classes["btn-clear"]} ml-3`}
          >
            <CloseOutlined className="text-sm" />
            <span className="text-gray-1 text-sm">Clear</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminPatientsListFilter;
