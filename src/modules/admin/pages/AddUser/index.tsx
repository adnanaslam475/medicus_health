import React from "react";
import Router from "next/router";
import { Button, Select, Form, FormInstance } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import { User } from "generated/graphql";

// import _classes from "../../staff/staff.module.scss";

type Props = {};
const { Option } = Select;

function AdminAddUser({}: Props) {
  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Add User</h2>
          <div className="flex" style={{ border: "1px solid red" }}>
            <Form>
              {/* <Form.Item */}
            </Form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminAddUser;
