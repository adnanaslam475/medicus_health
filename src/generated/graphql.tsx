import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Appointment = {
  __typename?: "Appointment";
  charges: Scalars["Int"];
  doctorId: Scalars["Int"];
  endTime: Scalars["String"];
  id: Scalars["Int"];
  patient: User;
  patientId: Scalars["Int"];
  questionnair: Scalars["JSON"];
  reportUrl?: Maybe<Scalars["JSON"]>;
  requestedDate: Scalars["DateTime"];
  serviceId: Scalars["Int"];
  startTime: Scalars["String"];
  status?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
};

export type AppointmentHealthHistory = {
  __typename?: "AppointmentHealthHistory";
  appointmentId: Scalars["Int"];
  doctorId: Scalars["Int"];
  history: Scalars["JSON"];
  id: Scalars["Int"];
  patientId: Scalars["Int"];
};

export type BookAppointmentInput = {
  appointmentId: Scalars["Int"];
  cardId: Scalars["Int"];
  endTime: Scalars["String"];
  requestedDate: Scalars["DateTime"];
  startTime: Scalars["String"];
};

export type City = {
  __typename?: "City";
  city_name: Scalars["String"];
  id: Scalars["Float"];
  state_id: Scalars["Float"];
};

export type Country = {
  __typename?: "Country";
  country_name: Scalars["String"];
  country_phone_code: Scalars["Float"];
  country_short_name: Scalars["String"];
  id: Scalars["Float"];
};

export type CreateAppointmentInput = {
  charges: Scalars["Int"];
  doctorId: Scalars["Int"];
  endTime: Scalars["String"];
  patientId: Scalars["Int"];
  questionnair: Scalars["JSON"];
  reportUrl: Scalars["JSON"];
  requestedDate: Scalars["DateTime"];
  serviceId: Scalars["Int"];
  startTime: Scalars["String"];
};

export type CreateDoctorProfileInput = {
  about_me: Scalars["String"];
  condition_treated: Scalars["String"];
  doctor_id: Scalars["Float"];
  educational_background: Scalars["String"];
  language: Scalars["String"];
  professional_experience: Scalars["String"];
  profile_image?: InputMaybe<Scalars["String"]>;
  specialization: Scalars["String"];
  year_of_experience: Scalars["Float"];
};

export type CreateDoctorScheduleInput = {
  day: Scalars["Float"];
  schedule: Array<Schedule>;
};

export type CreatePatientHealthHistoryInput = {
  history?: InputMaybe<Scalars["JSON"]>;
  user_id: Scalars["Int"];
};

export type CreatePaymentInput = {
  card_digits: Scalars["Float"];
  card_type: Scalars["String"];
  is_default: Scalars["Boolean"];
  source_id: Scalars["String"];
  user_id: Scalars["Float"];
};

export type CreateUserInput = {
  city_id: Scalars["Float"];
  contact_number: Scalars["String"];
  country_id: Scalars["Float"];
  date_of_birth?: InputMaybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  email_token?: InputMaybe<Scalars["String"]>;
  first_name: Scalars["String"];
  gender: Scalars["String"];
  last_name: Scalars["String"];
  password: Scalars["String"];
  role?: InputMaybe<Scalars["String"]>;
  state_id: Scalars["Float"];
  stripe_customer_id?: InputMaybe<Scalars["String"]>;
  zip_code: Scalars["String"];
};

export type DoctorProfile = {
  __typename?: "DoctorProfile";
  about_me: Scalars["String"];
  condition_treated: Scalars["String"];
  doctor_id: Scalars["Int"];
  educational_background: Scalars["String"];
  id: Scalars["Int"];
  language: Scalars["String"];
  professional_experience: Scalars["String"];
  profile_image?: Maybe<Scalars["String"]>;
  specialization: Scalars["String"];
  user?: Maybe<User>;
  year_of_experience: Scalars["Int"];
};

export type DoctorSchedule = {
  __typename?: "DoctorSchedule";
  createdAt: Scalars["DateTime"];
  day: Scalars["Float"];
  deletedAt: Scalars["DateTime"];
  doctorId: Scalars["Float"];
  endTime: Scalars["String"];
  id: Scalars["ID"];
  startTime: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  user?: Maybe<User>;
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  access_token: Scalars["String"];
  user: User;
};

export type LoginUserInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  UserForgotPassword: User;
  UserResetPassword: User;
  bookAppointment: Appointment;
  cancelAppointment: Appointment;
  createAppointment: Appointment;
  createCard: UserCard;
  createDoctorProfile: DoctorProfile;
  createOrUpdateDoctorSchedule: Array<DoctorSchedule>;
  createPatientHealthHistory: PatientHealthHistory;
  createUser: User;
  enableOrDisableDoctor: User;
  login: LoginResponse;
  proposeNewTime: Appointment;
  removeAppointment: Appointment;
  removeCard: UserCard;
  removeDoctorProfile: DoctorProfile;
  removeDoctorSchedule: DoctorSchedule;
  removePatientHealthHistory: PatientHealthHistory;
  removeUser: User;
  setAsDefaultCard: UserCard;
  setDoctorPassword: User;
  updateAppointment: Appointment;
  updateDoctorProfile: DoctorProfile;
  updatePatientHealthHistory: PatientHealthHistory;
  updateUser: User;
  userVerifyEmail: User;
};

export type MutationUserForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationUserResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};

export type MutationBookAppointmentArgs = {
  bookAppointmentInput: BookAppointmentInput;
};

export type MutationCancelAppointmentArgs = {
  id: Scalars["Int"];
};

export type MutationCreateAppointmentArgs = {
  createAppointmentInput: CreateAppointmentInput;
};

export type MutationCreateCardArgs = {
  createPaymentInput: CreatePaymentInput;
};

export type MutationCreateDoctorProfileArgs = {
  createDoctorProfileInput: CreateDoctorProfileInput;
};

export type MutationCreateOrUpdateDoctorScheduleArgs = {
  createDoctorScheduleInput: Array<CreateDoctorScheduleInput>;
  doctorId: Scalars["Int"];
};

export type MutationCreatePatientHealthHistoryArgs = {
  createPatientHealthHistoryInput: CreatePatientHealthHistoryInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationEnableOrDisableDoctorArgs = {
  id: Scalars["Int"];
};

export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};

export type MutationProposeNewTimeArgs = {
  proposeNewTimeInput: ProposeNewTimeInput;
};

export type MutationRemoveAppointmentArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveCardArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveDoctorProfileArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveDoctorScheduleArgs = {
  doctorId: Scalars["Int"];
};

export type MutationRemovePatientHealthHistoryArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveUserArgs = {
  id: Scalars["Int"];
};

export type MutationSetAsDefaultCardArgs = {
  id: Scalars["Int"];
};

export type MutationSetDoctorPasswordArgs = {
  setPasswordInput: ResetPasswordInput;
};

export type MutationUpdateAppointmentArgs = {
  updateAppointmentInput: UpdateAppointmentInput;
};

export type MutationUpdateDoctorProfileArgs = {
  updateDoctorProfileInput: UpdateDoctorProfileInput;
};

export type MutationUpdatePatientHealthHistoryArgs = {
  updatePatientHealthHistoryInput: UpdatePatientHealthHistoryInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars["Int"];
  updateUserInput: UpdateUserInput;
};

export type MutationUserVerifyEmailArgs = {
  token: Scalars["String"];
};

export type PatientHealthHistory = {
  __typename?: "PatientHealthHistory";
  history?: Maybe<Scalars["JSON"]>;
  id: Scalars["Int"];
  user?: Maybe<User>;
  user_id: Scalars["Int"];
};

export type ProposeNewTimeInput = {
  charges: Scalars["Int"];
  endTime: Scalars["String"];
  id: Scalars["Int"];
  requestedDate: Scalars["DateTime"];
  serviceId: Scalars["Int"];
  startTime: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  appointment: Appointment;
  appointmentQuestionner: AppointmentHealthHistory;
  appointments: Array<Appointment>;
  cities: Array<City>;
  city: City;
  countries: Array<Country>;
  country: Country;
  doctorProfile: DoctorProfile;
  doctorProfiles: Array<DoctorProfile>;
  doctorSchedules: Array<DoctorSchedule>;
  getAllCards: Array<UserCard>;
  getCard: UserCard;
  getCitiesByState: Array<City>;
  getStatesByCountry: Array<State>;
  patientHealthHistory: PatientHealthHistory;
  patientHealthHistorys: Array<PatientHealthHistory>;
  state: State;
  states: Array<State>;
  user: User;
  users: Array<User>;
};

export type QueryAppointmentArgs = {
  id: Scalars["Int"];
};

export type QueryAppointmentQuestionnerArgs = {
  appointmentId: Scalars["Int"];
};

export type QueryAppointmentsArgs = {
  doctorId: Scalars["Int"];
};

export type QueryCityArgs = {
  id: Scalars["Int"];
};

export type QueryCountryArgs = {
  id: Scalars["Int"];
};

export type QueryDoctorProfileArgs = {
  doctor_id: Scalars["Int"];
};

export type QueryDoctorSchedulesArgs = {
  doctorId: Scalars["Int"];
};

export type QueryGetAllCardsArgs = {
  user_id: Scalars["Int"];
};

export type QueryGetCardArgs = {
  id: Scalars["Int"];
};

export type QueryGetCitiesByStateArgs = {
  state_id: Scalars["Int"];
};

export type QueryGetStatesByCountryArgs = {
  country_id: Scalars["Int"];
};

export type QueryPatientHealthHistoryArgs = {
  id: Scalars["Int"];
};

export type QueryStateArgs = {
  id: Scalars["Int"];
};

export type QueryUserArgs = {
  id: Scalars["Int"];
};

export type ResetPasswordInput = {
  password: Scalars["String"];
  password_token?: InputMaybe<Scalars["String"]>;
};

export type Schedule = {
  endTime: Scalars["String"];
  startTime: Scalars["String"];
};

export type State = {
  __typename?: "State";
  country_id: Scalars["Float"];
  id: Scalars["Float"];
  state_name: Scalars["String"];
};

export type UpdateAppointmentInput = {
  charges?: InputMaybe<Scalars["Int"]>;
  doctorId?: InputMaybe<Scalars["Int"]>;
  endTime?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  patientId?: InputMaybe<Scalars["Int"]>;
  questionnair?: InputMaybe<Scalars["JSON"]>;
  reportUrl?: InputMaybe<Scalars["JSON"]>;
  requestedDate?: InputMaybe<Scalars["DateTime"]>;
  serviceId?: InputMaybe<Scalars["Int"]>;
  startTime?: InputMaybe<Scalars["String"]>;
};

export type UpdateDoctorProfileInput = {
  about_me?: InputMaybe<Scalars["String"]>;
  condition_treated?: InputMaybe<Scalars["String"]>;
  doctor_id?: InputMaybe<Scalars["Float"]>;
  educational_background?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<Scalars["String"]>;
  professional_experience?: InputMaybe<Scalars["String"]>;
  profile_image?: InputMaybe<Scalars["String"]>;
  specialization?: InputMaybe<Scalars["String"]>;
  year_of_experience?: InputMaybe<Scalars["Float"]>;
};

export type UpdatePatientHealthHistoryInput = {
  history?: InputMaybe<Scalars["JSON"]>;
  user_id: Scalars["Int"];
};

export type UpdateUserInput = {
  city_id: Scalars["Float"];
  contact_number: Scalars["String"];
  country_id: Scalars["Float"];
  date_of_birth?: InputMaybe<Scalars["DateTime"]>;
  email?: InputMaybe<Scalars["String"]>;
  email_token?: InputMaybe<Scalars["String"]>;
  first_name: Scalars["String"];
  gender: Scalars["String"];
  last_name: Scalars["String"];
  password?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["String"]>;
  state_id: Scalars["Float"];
  stripe_customer_id?: InputMaybe<Scalars["String"]>;
  zip_code: Scalars["String"];
};

export type User = {
  __typename?: "User";
  appointment?: Maybe<Appointment>;
  city_id: Scalars["Int"];
  contact_number: Scalars["String"];
  country_id: Scalars["Int"];
  date_of_birth: Scalars["DateTime"];
  doctorProfile?: Maybe<DoctorProfile>;
  doctorSchedules?: Maybe<Array<DoctorSchedule>>;
  email: Scalars["String"];
  first_name: Scalars["String"];
  gender: Scalars["String"];
  id: Scalars["Int"];
  last_name: Scalars["String"];
  password: Scalars["String"];
  patientHealthHistory?: Maybe<PatientHealthHistory>;
  role?: Maybe<Scalars["String"]>;
  state_id: Scalars["Int"];
  status: Scalars["Boolean"];
  zip_code: Scalars["String"];
};

export type UserCard = {
  __typename?: "UserCard";
  card_digits: Scalars["Int"];
  card_id: Scalars["String"];
  card_type: Scalars["String"];
  id: Scalars["Int"];
  is_default: Scalars["Boolean"];
  user_id: Scalars["Int"];
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser: { __typename?: "User"; id: number; email: string };
};

export type CreatePatientHealthHistoryMutationVariables = Exact<{
  input: CreatePatientHealthHistoryInput;
}>;

export type CreatePatientHealthHistoryMutation = {
  __typename?: "Mutation";
  createPatientHealthHistory: {
    __typename?: "PatientHealthHistory";
    id: number;
  };
};

export type UpdatePatientHealthHistoryMutationVariables = Exact<{
  input: UpdatePatientHealthHistoryInput;
}>;

export type UpdatePatientHealthHistoryMutation = {
  __typename?: "Mutation";
  updatePatientHealthHistory: {
    __typename?: "PatientHealthHistory";
    id: number;
  };
};

export type UserVerifyEmailMutationVariables = Exact<{
  input: Scalars["String"];
}>;

export type UserVerifyEmailMutation = {
  __typename?: "Mutation";
  userVerifyEmail: { __typename?: "User"; id: number };
};

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginResponse";
    access_token: string;
    user: {
      __typename?: "User";
      id: number;
      email: string;
      role?: string | null;
    };
  };
};

export type UserForgotPasswordMutationVariables = Exact<{
  input: Scalars["String"];
}>;

export type UserForgotPasswordMutation = {
  __typename?: "Mutation";
  UserForgotPassword: { __typename?: "User"; id: number };
};

export type UserResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;

export type UserResetPasswordMutation = {
  __typename?: "Mutation";
  UserResetPassword: { __typename?: "User"; id: number };
};

export type CountriesQueryVariables = Exact<{ [key: string]: never }>;

export type CountriesQuery = {
  __typename?: "Query";
  countries: Array<{
    __typename?: "Country";
    id: number;
    country_name: string;
  }>;
};

export type GetStatesByCountryQueryVariables = Exact<{
  input: Scalars["Int"];
}>;

export type GetStatesByCountryQuery = {
  __typename?: "Query";
  getStatesByCountry: Array<{
    __typename?: "State";
    id: number;
    country_id: number;
    state_name: string;
  }>;
};

export type GetCitiesByStateQueryVariables = Exact<{
  input: Scalars["Int"];
}>;

export type GetCitiesByStateQuery = {
  __typename?: "Query";
  getCitiesByState: Array<{
    __typename?: "City";
    id: number;
    state_id: number;
    city_name: string;
  }>;
};

export type DoctorProfilesQueryVariables = Exact<{ [key: string]: never }>;

export type DoctorProfilesQuery = {
  __typename?: "Query";
  doctorProfiles: Array<{
    __typename?: "DoctorProfile";
    id: number;
    doctor_id: number;
    year_of_experience: number;
    specialization: string;
    condition_treated: string;
    educational_background: string;
    professional_experience: string;
    language: string;
    about_me: string;
    user?: {
      __typename?: "User";
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      gender: string;
      contact_number: string;
    } | null;
  }>;
};

export type PatientHealthHistoryQueryVariables = Exact<{
  input: Scalars["Int"];
}>;

export type PatientHealthHistoryQuery = {
  __typename?: "Query";
  patientHealthHistory: {
    __typename?: "PatientHealthHistory";
    id: number;
    history?: any | null;
  };
};

export const CreateUserDocument = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
      email
    }
  }
`;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument
  );
}
export const CreatePatientHealthHistoryDocument = gql`
  mutation CreatePatientHealthHistory(
    $input: CreatePatientHealthHistoryInput!
  ) {
    createPatientHealthHistory(createPatientHealthHistoryInput: $input) {
      id
    }
  }
`;

export function useCreatePatientHealthHistoryMutation() {
  return Urql.useMutation<
    CreatePatientHealthHistoryMutation,
    CreatePatientHealthHistoryMutationVariables
  >(CreatePatientHealthHistoryDocument);
}
export const UpdatePatientHealthHistoryDocument = gql`
  mutation UpdatePatientHealthHistory(
    $input: UpdatePatientHealthHistoryInput!
  ) {
    updatePatientHealthHistory(updatePatientHealthHistoryInput: $input) {
      id
    }
  }
`;

export function useUpdatePatientHealthHistoryMutation() {
  return Urql.useMutation<
    UpdatePatientHealthHistoryMutation,
    UpdatePatientHealthHistoryMutationVariables
  >(UpdatePatientHealthHistoryDocument);
}
export const UserVerifyEmailDocument = gql`
  mutation userVerifyEmail($input: String!) {
    userVerifyEmail(token: $input) {
      id
    }
  }
`;

export function useUserVerifyEmailMutation() {
  return Urql.useMutation<
    UserVerifyEmailMutation,
    UserVerifyEmailMutationVariables
  >(UserVerifyEmailDocument);
}
export const LoginDocument = gql`
  mutation login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      access_token
      user {
        id
        email
        role
      }
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const UserForgotPasswordDocument = gql`
  mutation UserForgotPassword($input: String!) {
    UserForgotPassword(email: $input) {
      id
    }
  }
`;

export function useUserForgotPasswordMutation() {
  return Urql.useMutation<
    UserForgotPasswordMutation,
    UserForgotPasswordMutationVariables
  >(UserForgotPasswordDocument);
}
export const UserResetPasswordDocument = gql`
  mutation UserResetPassword($input: ResetPasswordInput!) {
    UserResetPassword(resetPasswordInput: $input) {
      id
    }
  }
`;

export function useUserResetPasswordMutation() {
  return Urql.useMutation<
    UserResetPasswordMutation,
    UserResetPasswordMutationVariables
  >(UserResetPasswordDocument);
}
export const CountriesDocument = gql`
  query countries {
    countries {
      id
      country_name
    }
  }
`;

export function useCountriesQuery(
  options?: Omit<Urql.UseQueryArgs<CountriesQueryVariables>, "query">
) {
  return Urql.useQuery<CountriesQuery>({
    query: CountriesDocument,
    ...options,
  });
}
export const GetStatesByCountryDocument = gql`
  query getStatesByCountry($input: Int!) {
    getStatesByCountry(country_id: $input) {
      id
      country_id
      state_name
    }
  }
`;

export function useGetStatesByCountryQuery(
  options: Omit<Urql.UseQueryArgs<GetStatesByCountryQueryVariables>, "query">
) {
  return Urql.useQuery<GetStatesByCountryQuery>({
    query: GetStatesByCountryDocument,
    ...options,
  });
}
export const GetCitiesByStateDocument = gql`
  query getCitiesByState($input: Int!) {
    getCitiesByState(state_id: $input) {
      id
      state_id
      city_name
    }
  }
`;

export function useGetCitiesByStateQuery(
  options: Omit<Urql.UseQueryArgs<GetCitiesByStateQueryVariables>, "query">
) {
  return Urql.useQuery<GetCitiesByStateQuery>({
    query: GetCitiesByStateDocument,
    ...options,
  });
}
export const DoctorProfilesDocument = gql`
  query doctorProfiles {
    doctorProfiles {
      id
      doctor_id
      year_of_experience
      specialization
      condition_treated
      educational_background
      professional_experience
      language
      about_me
      user {
        id
        first_name
        last_name
        email
        gender
        contact_number
      }
    }
  }
`;

export function useDoctorProfilesQuery(
  options?: Omit<Urql.UseQueryArgs<DoctorProfilesQueryVariables>, "query">
) {
  return Urql.useQuery<DoctorProfilesQuery>({
    query: DoctorProfilesDocument,
    ...options,
  });
}
export const PatientHealthHistoryDocument = gql`
  query patientHealthHistory($input: Int!) {
    patientHealthHistory(id: $input) {
      id
      history
    }
  }
`;

export function usePatientHealthHistoryQuery(
  options: Omit<Urql.UseQueryArgs<PatientHealthHistoryQueryVariables>, "query">
) {
  return Urql.useQuery<PatientHealthHistoryQuery>({
    query: PatientHealthHistoryDocument,
    ...options,
  });
}
import { IntrospectionQuery } from "graphql";
export default {
  __schema: {
    queryType: {
      name: "Query",
    },
    mutationType: {
      name: "Mutation",
    },
    subscriptionType: null,
    types: [
      {
        kind: "OBJECT",
        name: "Appointment",
        fields: [
          {
            name: "charges",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "doctorId",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "endTime",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "patient",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: "patientId",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "questionnair",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "reportUrl",
            type: {
              kind: "SCALAR",
              name: "Any",
            },
            args: [],
          },
          {
            name: "requestedDate",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "serviceId",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "startTime",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "status",
            type: {
              kind: "SCALAR",
              name: "Any",
            },
            args: [],
          },
          {
            name: "user",
            type: {
              kind: "OBJECT",
              name: "User",
              ofType: null,
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "AppointmentHealthHistory",
        fields: [
          {
            name: "appointmentId",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "doctorId",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "history",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "patientId",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "City",
        fields: [
          {
            name: "city_name",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "state_id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "Country",
        fields: [
          {
            name: "country_name",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "country_phone_code",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "country_short_name",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "DoctorProfile",
        fields: [
          {
            name: "about_me",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "condition_treated",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "doctor_id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "educational_background",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "language",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "professional_experience",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "profile_image",
            type: {
              kind: "SCALAR",
              name: "Any",
            },
            args: [],
          },
          {
            name: "specialization",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "user",
            type: {
              kind: "OBJECT",
              name: "User",
              ofType: null,
            },
            args: [],
          },
          {
            name: "year_of_experience",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "DoctorSchedule",
        fields: [
          {
            name: "createdAt",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "day",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "deletedAt",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "doctorId",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "endTime",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "startTime",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "updatedAt",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "user",
            type: {
              kind: "OBJECT",
              name: "User",
              ofType: null,
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "LoginResponse",
        fields: [
          {
            name: "access_token",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "user",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "Mutation",
        fields: [
          {
            name: "UserForgotPassword",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [
              {
                name: "email",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "UserResetPassword",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [
              {
                name: "resetPasswordInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "bookAppointment",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "Appointment",
                ofType: null,
              },
            },
            args: [
              {
                name: "bookAppointmentInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "cancelAppointment",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "Appointment",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "createAppointment",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "Appointment",
                ofType: null,
              },
            },
            args: [
              {
                name: "createAppointmentInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "createCard",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "UserCard",
                ofType: null,
              },
            },
            args: [
              {
                name: "createPaymentInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "createDoctorProfile",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "DoctorProfile",
                ofType: null,
              },
            },
            args: [
              {
                name: "createDoctorProfileInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "createOrUpdateDoctorSchedule",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "DoctorSchedule",
                    ofType: null,
                  },
                },
              },
            },
            args: [
              {
                name: "createDoctorScheduleInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "LIST",
                    ofType: {
                      kind: "NON_NULL",
                      ofType: {
                        kind: "SCALAR",
                        name: "Any",
                      },
                    },
                  },
                },
              },
              {
                name: "doctorId",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "createPatientHealthHistory",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "PatientHealthHistory",
                ofType: null,
              },
            },
            args: [
              {
                name: "createPatientHealthHistoryInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "createUser",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [
              {
                name: "createUserInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "enableOrDisableDoctor",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "login",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "LoginResponse",
                ofType: null,
              },
            },
            args: [
              {
                name: "loginUserInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "proposeNewTime",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "Appointment",
                ofType: null,
              },
            },
            args: [
              {
                name: "proposeNewTimeInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "removeAppointment",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "Appointment",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "removeCard",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "UserCard",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "removeDoctorProfile",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "DoctorProfile",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "removeDoctorSchedule",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "DoctorSchedule",
                ofType: null,
              },
            },
            args: [
              {
                name: "doctorId",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "removePatientHealthHistory",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "PatientHealthHistory",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "removeUser",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "setAsDefaultCard",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "UserCard",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "setDoctorPassword",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [
              {
                name: "setPasswordInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "updateAppointment",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "Appointment",
                ofType: null,
              },
            },
            args: [
              {
                name: "updateAppointmentInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "updateDoctorProfile",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "DoctorProfile",
                ofType: null,
              },
            },
            args: [
              {
                name: "updateDoctorProfileInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "updatePatientHealthHistory",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "PatientHealthHistory",
                ofType: null,
              },
            },
            args: [
              {
                name: "updatePatientHealthHistoryInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "updateUser",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
              {
                name: "updateUserInput",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "userVerifyEmail",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [
              {
                name: "token",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "PatientHealthHistory",
        fields: [
          {
            name: "history",
            type: {
              kind: "SCALAR",
              name: "Any",
            },
            args: [],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "user",
            type: {
              kind: "OBJECT",
              name: "User",
              ofType: null,
            },
            args: [],
          },
          {
            name: "user_id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "Query",
        fields: [
          {
            name: "appointment",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "Appointment",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "appointmentQuestionner",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "AppointmentHealthHistory",
                ofType: null,
              },
            },
            args: [
              {
                name: "appointmentId",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "appointments",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "Appointment",
                    ofType: null,
                  },
                },
              },
            },
            args: [
              {
                name: "doctorId",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "cities",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "City",
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: "city",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "City",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "countries",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "Country",
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: "country",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "Country",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "doctorProfile",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "DoctorProfile",
                ofType: null,
              },
            },
            args: [
              {
                name: "doctor_id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "doctorProfiles",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "DoctorProfile",
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: "doctorSchedules",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "DoctorSchedule",
                    ofType: null,
                  },
                },
              },
            },
            args: [
              {
                name: "doctorId",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "getAllCards",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "UserCard",
                    ofType: null,
                  },
                },
              },
            },
            args: [
              {
                name: "user_id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "getCard",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "UserCard",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "getCitiesByState",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "City",
                    ofType: null,
                  },
                },
              },
            },
            args: [
              {
                name: "state_id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "getStatesByCountry",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "State",
                    ofType: null,
                  },
                },
              },
            },
            args: [
              {
                name: "country_id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "patientHealthHistory",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "PatientHealthHistory",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "patientHealthHistorys",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "PatientHealthHistory",
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: "state",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "State",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "states",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "State",
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: "user",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "users",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "User",
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "State",
        fields: [
          {
            name: "country_id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "state_name",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "User",
        fields: [
          {
            name: "appointment",
            type: {
              kind: "OBJECT",
              name: "Appointment",
              ofType: null,
            },
            args: [],
          },
          {
            name: "city_id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "contact_number",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "country_id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "date_of_birth",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "doctorProfile",
            type: {
              kind: "OBJECT",
              name: "DoctorProfile",
              ofType: null,
            },
            args: [],
          },
          {
            name: "doctorSchedules",
            type: {
              kind: "LIST",
              ofType: {
                kind: "NON_NULL",
                ofType: {
                  kind: "OBJECT",
                  name: "DoctorSchedule",
                  ofType: null,
                },
              },
            },
            args: [],
          },
          {
            name: "email",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "first_name",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "gender",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "last_name",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "password",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "patientHealthHistory",
            type: {
              kind: "OBJECT",
              name: "PatientHealthHistory",
              ofType: null,
            },
            args: [],
          },
          {
            name: "role",
            type: {
              kind: "SCALAR",
              name: "Any",
            },
            args: [],
          },
          {
            name: "state_id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "status",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "zip_code",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "UserCard",
        fields: [
          {
            name: "card_digits",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "card_id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "card_type",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "is_default",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "user_id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "SCALAR",
        name: "Any",
      },
    ],
    directives: [],
  },
} as unknown as IntrospectionQuery;
