import React, { useState } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { PlusOutlined, EyeFilled } from "@ant-design/icons";
import Link from "next/link";
import Router from "next/router";
import Image from "next/image";
import { Button, Table } from "antd";
import AdminPhysicianSearchFilters from "./AdminPhysicianSearchFilters";
import {
	City,
	Country,
	DoctorProfile,
	State,
	useCountriesQuery,
	useGetCitiesByStateQuery,
	useGetPhysiciansQuery,
	useGetStatesByCountryQuery,
	User,
} from "generated/graphql";
import engFlag from "../../../../../../public/assets/images/engFlag.png";
import espanolFlag from "../../../../../../public/assets//images/espanolFlag.png";
import { date } from "common/utils";
import { FLAG_BY_LANGUAGE } from "utils/helper";
import { json } from "node:stream/consumers";

function AdminPhysicianList() {
  const [filterValues, setFilterValues] = useState({});

  const [{ data, fetching }, executeUseGetPhysiciansQuery] =
    useGetPhysiciansQuery({
      variables: {
        filter: filterValues,
      },
    });
  const { getPhysicians } = data || {};

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (value: User) => {
        return <div>{`${value}`}</div>;
      },
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: User) => {
        return <div>{email}</div>;
      },
      sorter: true,
    },
    {
      title: "Specialization",
      dataIndex: "doctorProfile",
      key: "doctorProfile",
      render: (doctorProfile: DoctorProfile) => {
        return <div>{doctorProfile?.specialization || ""}</div>;
      },
      sorter: true,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (city: City) => {
        return <div>{city?.city_name || ""}</div>;
      },
      sorter: true,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (state: State) => {
        return <div>{state?.state_name || ""}</div>;
      },
      sorter: true,
    },

    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (country: Country) => {
        return <div>{country?.country_name || ""}</div>;
      },
      sorter: true,
    },
    {
      title: "Zip Code",
      dataIndex: "zip_code",
      key: "zip_code",
      render: (zip_code: string) => {
        return <div>{zip_code || ""}</div>;
      },
      sorter: true,
    },

    {
      title: "Language",
      dataIndex: "doctorProfile",
      key: "doctorProfile",
      render: (doctorProfile: DoctorProfile) => {
        let formatedLanguage =
          doctorProfile?.language !== undefined &&
          doctorProfile?.language?.includes("{")
            ? JSON.parse(doctorProfile?.language)
            : doctorProfile?.language;

        let language = doctorProfile?.language?.toLowerCase() || "english";

        return (
          <div className="flagAvatar engFlag pr-2">
            {formatedLanguage &&
              Object.entries(formatedLanguage)
                .filter((item) => item[1])
                ?.map((value) => {
                  return (
                    <Image
                      priority={true}
                      src={FLAG_BY_LANGUAGE[String(value[0]).toLowerCase()]}
                      alt={language || "flag"}
                      width={25}
                      height={25}
                    /> 
                  );
                })}
          </div>
        );
      },
			sorter: true,
		},
		{
			title: "",
			dataIndex: "id",
			key: "view",
			className: "table-action-icon",
			render: (id: string) => (
				<div className="text-primary">
					<EyeFilled
						onClick={() => {
							return Router.push(`/admin/physicians/${id}`);
						}}
					/>
				</div>
			),
		},
	];

	function onChangeFilters(values: any) {
		setFilterValues(values);
		executeUseGetPhysiciansQuery({
			filter: filterValues,
			requestPolicy: "network-only",
		});
	}
	return (
		<AppLayout>
			<div className="w-full">
				<div className="flex justify-between mb-2">
					<h2 className="mb-4">Physicians</h2>
					<Link passHref href={`/admin/physicians/addPhysician`}>
						<a>
							<Button type="primary">
								<PlusOutlined />
								Add a Physician
							</Button>
						</a>
					</Link>
				</div>
				<AdminPhysicianSearchFilters onChange={onChangeFilters} />
				<div className="w-full">
					<div className="">
						<Table
							columns={columns}
							dataSource={getPhysicians}
							loading={fetching}
              scroll={{x:true}}
						/>
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
export default AdminPhysicianList;
