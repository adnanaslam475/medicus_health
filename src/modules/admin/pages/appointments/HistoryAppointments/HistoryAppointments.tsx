import { Select, DatePicker, Space, Button, Input } from "antd";
import React, { useState } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import {
  CloseOutlined,
  SearchOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import {
  Appointment,
  useGetAllRequestedAppointmentsQuery,
} from "generated/graphql";
import AppointmentHistoryTable from "common/components/AppointmentHistoryTable/AppointmentHistoryTable";
import _classes from "./HistoryAppointments.module.scss";

const { RangePicker } = DatePicker;

function CancelledAppointment() {
  // GET ALL APPOINMENTS
  const [{ data }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        status: "Completed",
      },
    },
  });
  const [openDateRange1, setOpenDateRange1] = useState(false);

  const { appointments } = data || {};

  const physicians = ["Dr Abc", "Dr Def", "Dr Ghi"];
  const applyDateRange = () => {
    setOpenDateRange1(false);
  };
  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">History</h2>
          </div>
          <Button type="primary" size="large">
            Request an Appointment
          </Button>
        </div>
        <div className="w-5/6 mb-10">
          <div className="flex items-center">
            <span className="mx-3">Filter</span>
            <div className="lg:ml-3 w-full sm:w-full md:w-full lg:w-70 mr-2">
              <Input
                placeholder="Search by ID or physician name"
                prefix={<SearchOutlined />}
              />
            </div>

            <div className="mx-3">
              <Select
                placeholder="Doctor"
                className=" lg:w-44 font-medium text-primary placeholder-primary  text-center"
              >
                {physicians?.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div className="w-full md:w-44 xl:w-60 mr-3">
              <Select
                placeholder="Service"
                className="mx-3 lg:w-44 font-medium text-primary placeholder-primary  text-center"
              >
                <Select.Option
                  className="text-primary placeholder-gray-500"
                  value="Doctor Francis"
                >
                  Doctor Francis
                </Select.Option>
              </Select>
            </div>

            <div className="flex-none sm:flex -mt-3">
              <Space
                direction="vertical"
                size={0}
                className="w-full md:w-44 xl:w-60 sm:mb-3"
              >
                <div className="relative">
                  <RangePicker
                    value={null}
                    open={openDateRange1}
                    className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
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
                    <div className="flex justify-between items-center w-full px-3">
                      <div>Date</div>
                      <div>
                        <CaretDownOutlined style={{ color: `primary` }} />
                      </div>
                    </div>
                  </Button>
                </div>
              </Space>
            </div>

            <Button
              type="text"
              size="middle"
              className={`${_classes["historyClearBtn"]} w-50 ml-0 pl-0`}
            >
              <CloseOutlined />
              <span className="text-gray-2 mx-1">Clear</span>
            </Button>
          </div>
        </div>
        {/* Transaction History table */}
        <div className="custom-table-ui">
          <AppointmentHistoryTable data={appointments as Appointment[]} />
        </div>
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
