import React from "react";
import { Card, Button } from "antd";
import Router, { useRouter } from "next/router";
import Link from "next/link";

import {
  VideoCameraOutlined,
} from '@ant-design/icons';

function AppointmentCard() {

  return (
    <Card              
    //   title="Default size card"
    style={{ width: 259, backgroundColor: "#F6F8FA", border: 0, marginRight:"20px", marginBottom:"20px" }}
  >
    <h3 className="mb-0">Dr. Paul Wallner</h3>
    <h5 className="text-gray">First Consultation</h5>
    <span className="font-14">Date</span>
    <h6>February 4, 2022</h6>

    <span className="font-14">Time</span>
    <h6 className="text-cyan">07:45 am - 08:30 am (Now)</h6>

    <span className="font-14">Status</span>
    <h6 className="text-cyan">Confirmed</h6>

    <Button type="primary" size="large" icon={<VideoCameraOutlined />}>
      Join Now
    </Button>
  </Card>
  );
}

export default AppointmentCard;
