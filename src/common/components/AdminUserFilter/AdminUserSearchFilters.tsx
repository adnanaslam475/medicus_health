import React, { useState } from "react";
import {
  Input,
  Button,
  Select,
  Space,
  DatePicker,
  Form,
  Dropdown,
  InputNumber,
} from "antd";
import {
  CaretDownOutlined,
  CloseOutlined,
  DownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  BookingDate,
  useGetAllAppointmentServiceTypesQuery,
} from "../../../generated/graphql";
import searchStyle from "./style.module.scss";
import _classes from "./AdminUserSearchFilters.module.scss";
import { adminUserFilterType } from "common/types/types";
import AmountDropdown from "../AmountDropdown/AmountDropdown";

const { RangePicker } = DatePicker;

type Props = {
  onChange: (value: adminUserFilterType) => void;
};

function AdminUserSearchFilters(props: Props) {
  const [filterState, setFilterState] = useState<adminUserFilterType>({});
  const [form] = Form.useForm();
  const { onChange } = props;

  const [openDateRange, setOpenDateRange] = useState(false);
  const [creationDate, setCreationDate] = useState<BookingDate>({});

  const [visible, setVisible] = useState(false);

  const [{ data }] = useGetAllAppointmentServiceTypesQuery();
  const { appointmentServiceTypes } = data || {};

  function clear() {
    setFilterState({});
    onChange({});
  }

  const applyDateRange = () => {
    setOpenDateRange(false);
    onChangeFields("creationDate", creationDate);
  };

  function onChangeFields(key: string, value: string | object) {
    const filters = {
      ...filterState,
      [key]: value,
    };
    setFilterState(filters);

    if (!filters?.searchUser) {
      delete filters?.searchUser;
    }

    if (!filters?.status) {
      delete filters?.status;
    }

    if (
      !filters?.creationDate?.startDate &&
      !filters?.creationDate?.startDate
    ) {
      delete filters?.creationDate;
    }

    onChange(filters);
  }

  return (
    <div
      className={`${_classes["page-filters"]} flex items-center mb-5 flex-wrap`}
    >
      <span className="text-gray-1  mb-3"></span>
      <div className="flex gap-2 flex-wrap">
        <div className=" w-full sm:w-full md:w-full lg:w-96">
          <Input
            placeholder="Search by ID, name or email address"
            prefix={<SearchOutlined />}
            value={filterState?.searchUser}
            onChange={(e) => onChangeFields("searchUser", e?.target.value)}
          />
        </div>

        <div className="w-full sm:w-44 xl:w-60  ">
          <Select
            placeholder="Status"
            className={`${searchStyle.placeholderColor} w-full`}
            onChange={(value) => onChangeFields("status", value)}
            value={filterState?.status}
          >
            <Select.Option key="active" value="active">
              Enabled
            </Select.Option>
            <Select.Option key="disabled" value="disabled">
              Disabled
            </Select.Option>
          </Select>
        </div>

        <div className="w-full  sm:w-60">
          <Space direction="vertical" size={0} className="sm:w-60 flex w-full">
            <div className="relative">
              <RangePicker
                value={null}
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
                {filterState.creationDate?.startDate ? (
                  <div>
                    {filterState.creationDate
                      ? `${filterState.creationDate.startDate} -> ${filterState.creationDate.endDate}`
                      : "Account creation date"}
                  </div>
                ) : (
                  <div className="flex justify-between items-center w-full px-3">
                    <div>Account creation date</div>
                    <div>
                      <CaretDownOutlined />
                    </div>
                  </div>
                )}
              </Button>
            </div>
          </Space>
        </div>
        <div>
          <Button
            onClick={clear}
            type="text"
            // className={`${_classes["btn-clear"]}`}
          >
            <CloseOutlined className="text-sm" />
            <span className="text-gray-1 text-sm">Clear</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminUserSearchFilters;
