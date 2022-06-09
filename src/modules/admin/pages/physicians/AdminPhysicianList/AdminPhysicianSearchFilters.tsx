import React, { useState } from "react";
import { Input, Button, Select, Space, DatePicker } from "antd";
import {
  CloseOutlined,
  SearchOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { getDateInFormat } from "common/utils/date";
import { DateType } from "common/types/types";
import { BookingDate, GetPhysiciansInput } from "generated/graphql";
const { RangePicker } = DatePicker;

const { Option } = Select;

type Props = {
  onChange: (value: GetPhysiciansInput | any) => void;
};

function AdminPhysicianSearchFilters(props: Props) {
  const [filterState, setFilterState] = useState<GetPhysiciansInput | any>({});
  const [creationDate,setCreationDate]=useState<BookingDate>({})

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
    onChangeFields("creationDate",creationDate)
  };
  const [openDateRange1, setOpenDateRange1] = useState(false);

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
          placeholder="Language"
          className="w-full sm:w-40"
          onChange={(e) => onChangeFields("language", e)}
          value={filterState.language}
        >
          <Option value="English">English</Option>
          <Option value="Spanish">Espanol</Option>
        </Select>
      </div>
      <div className="flex-none sm:flex lg:ml-3 mt-3 sm:mt-0">
        <Space
          direction="vertical"
          size={0}
          className="w-full md:w-44 xl:w-60 sm:mb-3"
        >
          <div className="relative -mt-3">
            <RangePicker
              value={null}
              open={openDateRange1}
              className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
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
              className="flex date-btn"
              block
              type="default"
              onClick={() => setOpenDateRange1?.(!openDateRange1)}
            >
              {filterState?.creationDate?.endDate ? (
                <div>
                  {filterState?.creationDate?.endDate
                    ? `${getDateInFormat(
                        filterState?.creationDate?.startDate
                      )} -> ${getDateInFormat(
                        filterState?.creationDate?.endDate
                      )}`
                    : "Account Created At"}
                </div>
              ) : (
                <div className="flex justify-between items-center w-full px-3">
                  <div>Account Created At</div>
                  <div>
                    <CaretDownOutlined style={{ color: `primary` }} />
                  </div>
                </div>
              )}
            </Button>
          </div>
        </Space>
      </div>
      <Button type="text" className="sm:ml-3" onClick={clear}>
        <CloseOutlined className="text-sm" />
        <span className="text-gray-1">Clear</span>
      </Button>
    </div>
  );
}

export default AdminPhysicianSearchFilters;
