import React from "react";
import { Tag } from "antd";
import { FilePdfOutlined, FileJpgOutlined } from "@ant-design/icons";

function Attachments() {
  return (
    <React.Fragment>
      <div className="w-4/6 mt-4">
          <Tag icon={<FilePdfOutlined />} color="#F6F8FA" className="ant-typography ant-typography-secondary">
            test_reports.pdf
          </Tag>
          <div className="my-3"></div>
          <Tag icon={<FileJpgOutlined />} color="#F6F8FA" className="ant-typography ant-typography-secondary">
              Heart_Scans_2021.jpg
          </Tag>
      </div>
    </React.Fragment>
   
  );
}
export default Attachments;
