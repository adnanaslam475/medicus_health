import React from "react";

import { notification } from "antd";
import Router from "next/router";
import { useCreatePatientByAdminMutation } from "generated/graphql";
import AppLayout from "common/components/AppLayout/AppLayout";
import { AddPatientForm } from "modules/admin/components/AddPatientForm/AddPatientForm";
import { graphqlError } from "utils/helper";

function AdminPatientAdd() {
  const [{fetching}, CreatePatientByAdminMutation] = useCreatePatientByAdminMutation();

  const createPatient = async (values: any) => {
    const response = await CreatePatientByAdminMutation({
      createPatientInput: {
        first_name: values?.firstName,
        last_name: values?.lastName,
        email: values?.email,
        contact_number: values?.contact_number,
        streetAddress: values?.streetAddress,
        country_id: values?.country,
        state_id: values?.state,
        city_id: values?.city_id,
        zip_code: values?.postalCode,
      },
    });

    if (response?.data?.createPatientByAdmin) {
      Router.push({
        pathname: "/admin/patients",
      });
    }

    if (response?.data) {
      response?.data?.createPatientByAdmin &&
        notification.success({
          message: "Successfully Created",
        });
    }

    if (response?.error) {
      notification.error({
        message: graphqlError(response),
      });
    }

    try {
    } catch (error) {
      notification.error({
        message: "Something went wrong.",
      });
    }
  };

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Add a patient</h2>
        </div>
        <div className="w-full">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="flex flex-col w-full justify-start items-center py-3">
              <div className="w-full">
                <AddPatientForm onFinish={createPatient} loading={fetching}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminPatientAdd;
