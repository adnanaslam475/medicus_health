import React, { useState } from "react";
import { Avatar, Tabs, Button } from "antd";
import Router from "next/router";
import Image from "next/image";
import yourImage from "../../../../../public/assets/images/your_photo.png";
// import PersonalInfo from "";
// import SidebarDrawer from "../../../modules/admin/components/SidebarDrawer";
const { TabPane } = Tabs;

const PersonalInfo = () => {
  return (
    <>
      <div className="w-1/2">
        <div className="flex justify-between items-center">
          <div className="flex w-1/2 justify-start items-center p-3">
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
            <a href="void(0)" className="text-primary underline ml-3 text-xs">
              Update Photo
            </a>
          </div>

          <div className="edit-btn flex justify-end">
            <Button type="default" className="text-xs p-5" size="large">
              <span className="text-xs">EDIT</span>
            </Button>

            <div className="btn-group hidden">
              <Button danger className="text-xs p-5 text-red" size="large">
                <span className="text-xs">CANCEL</span>
              </Button>
              <Button
                style={{ background: "#30CEC2", borderColor: "transparent" }}
                className="text-xs p-5"
                size="large"
              >
                <span className="text-xs text-white">SAVE</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="customList mt-4">
          <ul>
            <div className="border border-gray-3 px-0 rounded custom-list-items">
              <li>
                <div className="flex w-full  border-b border-gray-3 p-4">
                  <div className="w-1/2 text-gray-1">First Name</div>
                  <div className="w-1/2 text-secondary">Mark</div>
                </div>
              </li>

              <li>
                <div className="flex w-full  border-b border-gray-3 p-4">
                  <div className="w-1/2 text-gray-1">Last Name</div>
                  <div className="w-1/2 text-secondary">Manson</div>
                </div>
              </li>

              <li>
                <div className="flex w-full  border-b border-gray-3 p-4">
                  <div className="w-1/2 text-gray-1">Gender</div>
                  <div className="w-1/2 text-secondary">Male</div>
                </div>
              </li>

              <li>
                <div className="flex w-full  border-b border-gray-3 p-4">
                  <div className="w-1/2 text-gray-1">Date of Birth</div>
                  <div className="w-1/2 text-secondary">April, 21, 1990</div>
                </div>
              </li>

              <li>
                <div className="flex w-full  border-b border-gray-3 p-4">
                  <div className="w-1/2 text-gray-1">Email Address</div>
                  <div className="w-1/2 text-secondary">
                    markmanson@gmail.com
                  </div>
                </div>
              </li>

              <li>
                <div className="flex w-full  border-b border-gray-3 p-4">
                  <div className="w-1/2 text-gray-1">Password</div>
                  <div className="w-1/2 text-secondary">*****************</div>
                </div>
              </li>

              <li>
                <div className="flex w-full  border-b border-gray-3 p-4">
                  <div className="w-1/2 text-gray-1">Country</div>
                  <div className="w-1/2 text-secondary">United States</div>
                </div>
              </li>

              <li>
                <div className="flex w-full  border-b border-gray-3 p-4">
                  <div className="w-1/2 text-gray-1">City</div>
                  <div className="w-1/2 text-secondary">Dallas</div>
                </div>
              </li>

              <li>
                <div className="flex w-full  border-b border-gray-3 p-4">
                  <div className="w-1/2 text-gray-1">Maritial Status</div>
                  <div className="w-1/2 text-gray-1">N/A</div>
                </div>
              </li>

              <li>
                <div className="flex w-full  border-b border-gray-3 p-4">
                  <div className="w-1/2 text-gray-1">
                    Do You have any children?
                  </div>
                  <div className="w-1/2 text-gray-1">N/A</div>
                </div>
              </li>

              <li>
                <div className="flex w-full  border-b border-gray-3 p-4">
                  <div className="w-1/2 text-gray-1">
                    What is your Occupation?
                  </div>
                  <div className="w-1/2 text-gray-1">N/A</div>
                </div>
              </li>

              <li>
                <div className="flex w-full  border-b border-gray-3 p-4">
                  <div className="w-1/2 text-gray-1">
                    Do you have any Occupational Exposure?
                  </div>
                  <div className="w-1/2 text-gray-1">N/A</div>
                </div>
              </li>

              <li>
                <div className="flex w-full  border-b border-gray-3 p-4">
                  <div className="w-1/2 text-gray-1">Do you have any pets?</div>
                  <div className="w-1/2 text-gray-1">N/A</div>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
