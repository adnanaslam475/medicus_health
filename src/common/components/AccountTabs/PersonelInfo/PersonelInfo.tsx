import React, { useState } from "react";
import { Avatar, Tabs, Button } from "antd";
import Router from "next/router";
import Image from "next/image";
import yourImage from "../../../../../public/assets/images/your_photo.png";
import PersonalInfoList from "../../../../modules/common/components/PersonalInfoList/PersonalInfoList";
import PersonalInfoDetail from "../../../../modules/common/components/PersonalInfoDetail/PersonalInfoDetail";
// import SidebarDrawer from "../../../modules/admin/components/SidebarDrawer";
const { TabPane } = Tabs;

const PersonalInfo = () => {
  const [isEdit, setIsEdit] = useState(false as boolean);

  return (
    <>
      <div className="w-1/2">
        <div className="flex justify-between items-center">
          <div className="flex w-1/2 justify-start items-center py-3 pl-0 pr-3">
            <Avatar
              size={64}
              src={
                <Image
                  alt=""
                  src={yourImage}
                  width={128}
                  height={128}
                  className="border rounded border-gray-2"
                />
              }
            />
            <a
              href="javascript:void(0)"
              className="text-primary underline ml-3 text-xs"
            >
              Update Photo
            </a>
          </div>

          <div className="edit-btn flex justify-end">
            {isEdit ? (
              <div className="flex gap-4">
                <Button
                  danger
                  className="text-xs p-5 text-red"
                  size="large"
                  onClick={() => setIsEdit(false)}
                >
                  <span className="text-xs">CANCEL</span>
                </Button>
                <Button
                  style={{ background: "#30CEC2", borderColor: "transparent" }}
                  className="text-xs p-5"
                  size="large"
                  // loading={loading}
                  // disabled={loading}
                >
                  <span className="text-xs text-white">SAVE</span>
                </Button>
              </div>
            ) : (
              <Button
                type="default"
                className="text-xs p-5"
                size="large"
                onClick={() => setIsEdit(true)}
              >
                <span className="text-xs">EDIT</span>
              </Button>
            )}
          </div>
        </div>
        {isEdit ? (
          <PersonalInfoDetail onFinish={() => null} loading={true} />
        ) : (
          <PersonalInfoList />
        )}
      </div>
    </>
  );
};

export default PersonalInfo;
