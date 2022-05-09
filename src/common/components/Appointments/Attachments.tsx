import React from "react";
import { Tag } from "antd";
import { FilePdfOutlined, FileJpgOutlined } from "@ant-design/icons";
import { GetAppointmentByIdQuery } from "../../../generated/graphql";
import { parseJson } from "common/utils/helper";

type Props = {
  appoinmentDetails: GetAppointmentByIdQuery | undefined;
};
function Attachments(props: Props) {
  const { appoinmentDetails } = props || {};

  const { appointment } = appoinmentDetails || {};
  const { reportUrl } = appointment || {};

  let urlArr = parseJson(reportUrl);
  if (urlArr && urlArr.length > 0) {
    urlArr = urlArr[0]?.map((item: any) => item.split("com/")[1]);
  }
  return (
    <React.Fragment>
      <div className="w-4/6 mt-4">
        {urlArr?.map((item: any) => (
          <Tag
            icon={<FilePdfOutlined />}
            color="#F6F8FA"
            className="ant-typography ant-typography-secondary"
          >
            {item}
          </Tag>
        ))}

        <div className="my-3"></div>
      </div>
    </React.Fragment>
  );
}
export default Attachments;
