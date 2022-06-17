import React from "react";
import moment from "moment";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Form, Select, Avatar, notification, Button } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import ConfirmationModal from "./ConfirmationModal";
import InputFields from "./InputFields";
import Envelope from "../../../../../public/assets/images/envelope.svg";
import ViewProfileFields from "./ViewFields";
import {
	useCountriesQuery,
	useEnableOrDisablePatientMutation,
	useGetCitiesByStateQuery,
	useGetStatesByCountryQuery,
	useGetUserQuery,
	User,
	useRemovePatientUserMutation,
	useUpdateUserProfileMutation,
	useUserForgotPasswordMutation,
} from "generated/graphql";
import _classes from "./ProfileTab.module.scss";
import { AdminPatientUpdateInput } from "common/types/types";

type Props = {};
type CountryOrStateObject = { id: number | string | undefined | null };
function AdminPatientProfileTab({}: Props) {
	const { query } = useRouter();
	const [countryId, setCountryId] = React.useState<CountryOrStateObject>({
		id: 0,
	});
	const [stateId, setStateId] = React.useState<CountryOrStateObject>({ id: 0 });
	const [isEdit, setIsEdit] = React.useState<boolean>(false);
	const [userDisableInput, setUserDisableInput] = React.useState<boolean>();
	const [open, setOpen] = React.useState<boolean>(false);
	const [formInstance] = Form.useForm();
	const [{ fetching: loading }, setForgotPass] =
		useUserForgotPasswordMutation();
	const [{ fetching: isUpdating }, updateUserProfile] =
		useUpdateUserProfileMutation();

	const [{ fetching: deleting }, removeUser] = useRemovePatientUserMutation();

	const [{ data }] = useGetUserQuery({
		variables: {
			input: Number(query.id),
		},
		pause: !query.id,
	});

	const { user } = data || {};
	const {
		first_name,
		last_name,
		country_id,
		city_id,
		status,
		state_id,
		email,
		patientProfile,
	} = user || {};

	const [{ fetching: disableLoading }, enableOrDisableAdmin] =
		useEnableOrDisablePatientMutation();
	const [{ data: countriesData }] = useCountriesQuery({ requestPolicy: "network-only" });
	const { countries } = countriesData || {};
	const [{ data: city_data }] = useGetCitiesByStateQuery({
		variables: {
			input: Number(stateId?.id || state_id),
		},
		pause: state_id === undefined,
		requestPolicy: "network-only" 
	});
	const { getCitiesByState } = city_data || {};

	const [{ data: states_data }] = useGetStatesByCountryQuery({
		variables: {
			input: Number(countryId?.id || country_id),
		},
		pause: !country_id,
		requestPolicy: "network-only" 
	});
	const { getStatesByCountry } = states_data || {};

	function prepareAndSetEditPayload() {
		formInstance.setFieldsValue({
			...user,
			...patientProfile,
			country_name: country_id,
			state_name: state_id,
			city_name: city_id,
			date_of_birth: moment(user?.date_of_birth),
		});
		setUserDisableInput(status || false);
	}

	React.useEffect(() => {
		if (user) prepareAndSetEditPayload();
	}, [user]);

	React.useEffect(() => {
		if (countryId?.id) {
			formInstance.setFieldsValue({
				...formInstance.getFieldsValue(),
				state_name: getStatesByCountry ? getStatesByCountry[0]?.id : "",
			});
			getStatesByCountry && setStateId(getStatesByCountry[0]);
		}
	}, [getStatesByCountry,first_name]);

	React.useEffect(() => {
		stateId?.id &&
			formInstance.setFieldsValue({
				...formInstance.getFieldsValue(),
				city_name: getCitiesByState ? getCitiesByState[0]?.id : "",
			});
	}, [getCitiesByState,first_name]);

	const handleResetLink = async () => {
		try {
			const response = await setForgotPass({
				input: query.id as string,
			});
			if (response?.error) {
				throw new Error(response?.error?.graphQLErrors[0]?.message);
			}
			if (response.data) {
				notification.success({
					message: "Link Sent Successfully",
				});
			}
		} catch (error: any) {
			notification.error({
				message: error?.message || "Something Went Wrong",
			});
		}
	};

	const deleteProfileHandler = async () => {
		try {
			const response = await removeUser({
				id: Number(query.id),
			});
			if (response?.error) {
				throw new Error(response?.error?.graphQLErrors[0]?.message);
			}
			if (response.data) {
				setOpen(false)
				Router.push(`/admin/patients/`);
				notification.success({
					message: "User Deleted Successfully",
				});
			}
		} catch (error: any) {
			notification.error({
				message: error?.message || "Something Went Wrong",
			});
		}
	};
	const changeAccountStatusHandler = async (value: boolean) => {
		setUserDisableInput(value);
		try {
			const response = await enableOrDisableAdmin({
				id: Number(query.id),
			});
			if (response?.error) {
				throw new Error(response?.error?.graphQLErrors[0]?.message);
			}
			if (response.data) {
				notification.success({
					message: "User Updated Successfully",
				});
			}
		} catch (error: any) {
			notification.error({
				message: error?.message || "Something Went Wrong",
			});
		}
	};

	const onFinish = async (values: AdminPatientUpdateInput) => {
		const { password, confirm_password } = values;
		if (password && password !== confirm_password) {
			return notification.error({
				message: "Password does not match!",
			});
		}
		try {
			const response = await updateUserProfile({
				id: Number(query?.id),
				updateUserInput: {
					first_name: values.first_name,
					last_name: values.last_name,
					gender: values.gender,
					date_of_birth: values.date_of_birth,
					email: values.email,
					contact_number: values.contact_number,
					country_id: values?.country_name,
					password: values.password || "",
					state_id: values.state_name,
					city_id: values.city_name || values.state_name,
					streetAddress: values.streetAddress,
					zip_code: values?.zip_code,
					maritalStatus: values.maritalStatus,
					children: Number(values.children),
					occupation: values.occupation,
					occupationalExposure: values.occupationalExposure,
					pets: values.pets,
				},
			});
			if (response?.error) {
				throw new Error(response?.error?.graphQLErrors[0]?.message);
			}
			if (response.data) {
				Router.push("/admin/patients");
				formInstance.resetFields();
			}
		} catch (error: any) {
			notification.error({
				message: error.message || "Something went wrong",
			});
		}
	};
	const country_name = React.useMemo(() => {
		return countries?.find((value) => value.id === country_id)?.country_name;
	}, [countries]);
	const state_name = React.useMemo(() => {
		return getStatesByCountry?.find((value) => value.id === state_id)
			?.state_name;
	}, [getStatesByCountry]);
	const city_name = React.useMemo(() => {
		return getCitiesByState?.find((value) => value.id === city_id)?.city_name;
	}, [getCitiesByState]);

	return (
		<div className={`relative ${_classes["admin-patient-profile-page"]}`}>
			<div className="w-full mb-10 flex gap-8 items-center">
				<div className="relative">
					<Avatar
						size={130}
						style={{
							borderColor: "transparent",
							borderWidth: 2,
							lineHeight: "40px",
						}}
						src={patientProfile?.profileImage}
					/>
				</div>

				<div>
					<h2 className="mb-0">
						{`${first_name && first_name} ${last_name && last_name}` || ""}
					</h2>
					<span className="block">{email}</span>
					<div className="flex gap-2 pt-2">
						<div
							className={
								userDisableInput
									? `${_classes["profile-select-enable"]}`
									: `${_classes["profile-select-disable"]}`
							}
						>
							<Select
								className={`mr-5 disable-select`}
								onChange={changeAccountStatusHandler}
								value={userDisableInput}
								style={{ width: 120 }}
							>
								<Select.Option value={true}>Enabled</Select.Option>
								<Select.Option className="text-red" value={false}>
									Disabled
								</Select.Option>
							</Select>
						</div>
						<Button type="default" onClick={() => setIsEdit(!isEdit)}>
							<EditOutlined />
							Edit Info
						</Button>
					</div>
				</div>
			</div>
			<div className="flex mb-8 absolute top-0 right-0">
				<Button
					className="ml-auto"
					loading={loading}
					type="link"
					disabled={loading || disableLoading}
					icon={<Image src={Envelope} alt="" />}
					onClick={handleResetLink}
				>
					Send Password Reset link
				</Button>
				<Button
					type="link"
					danger
					onClick={() => setOpen(true)}
					disabled={deleting}
					loading={deleting || disableLoading}
					icon={<CloseOutlined />}
				>
					Delete profile
				</Button>
			</div>
			{isEdit ? (
				<Form layout="vertical" onFinish={onFinish} form={formInstance}>
					<InputFields
						data={{
							countries,
							states: getStatesByCountry,
							cities: getCitiesByState,
						}}
						formInstance={formInstance}
						setStateId={setStateId}
						setCountryId={setCountryId}
						isUpdating={isUpdating}
					/>
				</Form>
			) : (
				<>
					<ViewProfileFields
						data={user as User}
						country_name={country_name}
						state_name={state_name}
						city_name={city_name}
					/>
				</>
			)}
			<ConfirmationModal
				visible={open}
				onCancel={() => setOpen(false)}
				onOk={deleteProfileHandler}
				message="Are you sure you want ot delete this user?"
			/>
		</div>
	);
}

export default AdminPatientProfileTab;
