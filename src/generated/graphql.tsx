import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type City = {
  __typename?: 'City';
  city_name: Scalars['String'];
  id: Scalars['Float'];
  state_id: Scalars['Float'];
};

export type Country = {
  __typename?: 'Country';
  country_name: Scalars['String'];
  country_phone_code: Scalars['Float'];
  country_short_name: Scalars['String'];
  id: Scalars['Float'];
};

export type CreateDoctorProfileInput = {
  about_me: Scalars['String'];
  condition_treated: Scalars['String'];
  doctor_id: Scalars['Float'];
  educational_background: Scalars['String'];
  language: Scalars['String'];
  professional_experience: Scalars['String'];
  specialization: Scalars['String'];
  year_of_experience: Scalars['Float'];
};

export type CreateDoctorScheduleInput = {
  day: Scalars['Float'];
  schedule: Array<Schedule>;
};

export type CreatePatientHealthHistoryInput = {
  history?: InputMaybe<Scalars['JSON']>;
  user_id: Scalars['Int'];
};

export type CreatePaymentInput = {
  is_default: Scalars['Boolean'];
  source_id: Scalars['String'];
  user_id: Scalars['Float'];
};

export type CreateUserInput = {
  city_id: Scalars['Float'];
  contact_number: Scalars['String'];
  country_id: Scalars['Float'];
  date_of_birth?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  email_token?: InputMaybe<Scalars['String']>;
  first_name: Scalars['String'];
  gender: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
  state_id: Scalars['Float'];
  stripe_customer_id?: InputMaybe<Scalars['String']>;
  zip_code: Scalars['String'];
};

export type DoctorProfile = {
  __typename?: 'DoctorProfile';
  about_me: Scalars['String'];
  condition_treated: Scalars['String'];
  doctor_id: Scalars['Int'];
  educational_background: Scalars['String'];
  id: Scalars['Int'];
  language: Scalars['String'];
  professional_experience: Scalars['String'];
  specialization: Scalars['String'];
  user?: Maybe<User>;
  year_of_experience: Scalars['Int'];
};

export type DoctorSchedule = {
  __typename?: 'DoctorSchedule';
  createdAt: Scalars['DateTime'];
  day: Scalars['Float'];
  deletedAt: Scalars['DateTime'];
  doctorId: Scalars['Float'];
  endTime: Scalars['String'];
  id: Scalars['ID'];
  startTime: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String'];
  user: User;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  UserForgotPassword: User;
  UserResetPassword: User;
  createCard: UserCard;
  createDoctorProfile: DoctorProfile;
  createOrUpdateDoctorSchedule: Array<DoctorSchedule>;
  createPatientHealthHistory: PatientHealthHistory;
  createUser: User;
  login: LoginResponse;
  removeCard: UserCard;
  removeDoctorProfile: DoctorProfile;
  removeDoctorSchedule: DoctorSchedule;
  removePatientHealthHistory: PatientHealthHistory;
  removeUser: User;
  setAsDefaultCard: UserCard;
  updateDoctorProfile: DoctorProfile;
  updatePatientHealthHistory: PatientHealthHistory;
  updateUser: User;
  userVerifyEmail: User;
};


export type MutationUserForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationUserResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};


export type MutationCreateCardArgs = {
  createPaymentInput: CreatePaymentInput;
};


export type MutationCreateDoctorProfileArgs = {
  createDoctorProfileInput: CreateDoctorProfileInput;
};


export type MutationCreateOrUpdateDoctorScheduleArgs = {
  createDoctorScheduleInput: Array<CreateDoctorScheduleInput>;
};


export type MutationCreatePatientHealthHistoryArgs = {
  createPatientHealthHistoryInput: CreatePatientHealthHistoryInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationRemoveCardArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveDoctorProfileArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveDoctorScheduleArgs = {
  doctorId: Scalars['Int'];
};


export type MutationRemovePatientHealthHistoryArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int'];
};


export type MutationSetAsDefaultCardArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateDoctorProfileArgs = {
  updateDoctorProfileInput: UpdateDoctorProfileInput;
};


export type MutationUpdatePatientHealthHistoryArgs = {
  updatePatientHealthHistoryInput: UpdatePatientHealthHistoryInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  updateUserInput: UpdateUserInput;
};


export type MutationUserVerifyEmailArgs = {
  token: Scalars['String'];
};

export type PatientHealthHistory = {
  __typename?: 'PatientHealthHistory';
  history?: Maybe<Scalars['JSON']>;
  id: Scalars['Int'];
  user?: Maybe<User>;
  user_id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
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


export type QueryCityArgs = {
  id: Scalars['Int'];
};


export type QueryCountryArgs = {
  id: Scalars['Int'];
};


export type QueryDoctorProfileArgs = {
  id: Scalars['Int'];
};


export type QueryGetCardArgs = {
  id: Scalars['Int'];
};


export type QueryGetCitiesByStateArgs = {
  state_id: Scalars['Int'];
};


export type QueryGetStatesByCountryArgs = {
  country_id: Scalars['Int'];
};


export type QueryPatientHealthHistoryArgs = {
  id: Scalars['Int'];
};


export type QueryStateArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  password_token?: InputMaybe<Scalars['String']>;
};

export type Schedule = {
  endTime: Scalars['String'];
  startTime: Scalars['String'];
};

export type State = {
  __typename?: 'State';
  country_id: Scalars['Float'];
  id: Scalars['Float'];
  state_name: Scalars['String'];
};

export type UpdateDoctorProfileInput = {
  about_me?: InputMaybe<Scalars['String']>;
  condition_treated?: InputMaybe<Scalars['String']>;
  doctor_id?: InputMaybe<Scalars['Float']>;
  educational_background?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  professional_experience?: InputMaybe<Scalars['String']>;
  specialization?: InputMaybe<Scalars['String']>;
  year_of_experience?: InputMaybe<Scalars['Float']>;
};

export type UpdatePatientHealthHistoryInput = {
  history?: InputMaybe<Scalars['JSON']>;
  user_id: Scalars['Int'];
};

export type UpdateUserInput = {
  city_id: Scalars['Float'];
  contact_number: Scalars['String'];
  country_id: Scalars['Float'];
  date_of_birth?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  email_token?: InputMaybe<Scalars['String']>;
  first_name: Scalars['String'];
  gender: Scalars['String'];
  last_name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  state_id: Scalars['Float'];
  stripe_customer_id?: InputMaybe<Scalars['String']>;
  zip_code: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  city_id: Scalars['Int'];
  contact_number: Scalars['String'];
  country_id: Scalars['Int'];
  date_of_birth: Scalars['DateTime'];
  doctorProfile?: Maybe<DoctorProfile>;
  email: Scalars['String'];
  first_name: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['Int'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  patientHealthHistory?: Maybe<PatientHealthHistory>;
  role?: Maybe<Scalars['String']>;
  state_id: Scalars['Int'];
  zip_code: Scalars['String'];
};

export type UserCard = {
  __typename?: 'UserCard';
  card_id: Scalars['String'];
  id: Scalars['Int'];
  is_default: Scalars['Boolean'];
  user_id: Scalars['Int'];
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, email: string } };

export type CreatePatientHealthHistoryMutationVariables = Exact<{
  input: CreatePatientHealthHistoryInput;
}>;


export type CreatePatientHealthHistoryMutation = { __typename?: 'Mutation', createPatientHealthHistory: { __typename?: 'PatientHealthHistory', id: number } };

export type UserVerifyEmailMutationVariables = Exact<{
  input: Scalars['String'];
}>;


export type UserVerifyEmailMutation = { __typename?: 'Mutation', userVerifyEmail: { __typename?: 'User', id: number } };

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', access_token: string, user: { __typename?: 'User', id: number, email: string, role?: string | null } } };

export type CountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', id: number, country_name: string }> };

export type GetStatesByCountryQueryVariables = Exact<{
  input: Scalars['Int'];
}>;


export type GetStatesByCountryQuery = { __typename?: 'Query', getStatesByCountry: Array<{ __typename?: 'State', id: number, country_id: number, state_name: string }> };

export type GetCitiesByStateQueryVariables = Exact<{
  input: Scalars['Int'];
}>;


export type GetCitiesByStateQuery = { __typename?: 'Query', getCitiesByState: Array<{ __typename?: 'City', id: number, state_id: number, city_name: string }> };

export type DoctorProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type DoctorProfilesQuery = { __typename?: 'Query', doctorProfiles: Array<{ __typename?: 'DoctorProfile', id: number, doctor_id: number, year_of_experience: number, specialization: string, condition_treated: string, educational_background: string, professional_experience: string, language: string, about_me: string, user?: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender: string, contact_number: string } | null }> };


export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    id
    email
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const CreatePatientHealthHistoryDocument = gql`
    mutation CreatePatientHealthHistory($input: CreatePatientHealthHistoryInput!) {
  createPatientHealthHistory(createPatientHealthHistoryInput: $input) {
    id
  }
}
    `;

export function useCreatePatientHealthHistoryMutation() {
  return Urql.useMutation<CreatePatientHealthHistoryMutation, CreatePatientHealthHistoryMutationVariables>(CreatePatientHealthHistoryDocument);
};
export const UserVerifyEmailDocument = gql`
    mutation userVerifyEmail($input: String!) {
  userVerifyEmail(token: $input) {
    id
  }
}
    `;

export function useUserVerifyEmailMutation() {
  return Urql.useMutation<UserVerifyEmailMutation, UserVerifyEmailMutationVariables>(UserVerifyEmailDocument);
};
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
};
export const CountriesDocument = gql`
    query countries {
  countries {
    id
    country_name
  }
}
    `;

export function useCountriesQuery(options?: Omit<Urql.UseQueryArgs<CountriesQueryVariables>, 'query'>) {
  return Urql.useQuery<CountriesQuery>({ query: CountriesDocument, ...options });
};
export const GetStatesByCountryDocument = gql`
    query getStatesByCountry($input: Int!) {
  getStatesByCountry(country_id: $input) {
    id
    country_id
    state_name
  }
}
    `;

export function useGetStatesByCountryQuery(options: Omit<Urql.UseQueryArgs<GetStatesByCountryQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStatesByCountryQuery>({ query: GetStatesByCountryDocument, ...options });
};
export const GetCitiesByStateDocument = gql`
    query getCitiesByState($input: Int!) {
  getCitiesByState(state_id: $input) {
    id
    state_id
    city_name
  }
}
    `;

export function useGetCitiesByStateQuery(options: Omit<Urql.UseQueryArgs<GetCitiesByStateQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCitiesByStateQuery>({ query: GetCitiesByStateDocument, ...options });
};
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

export function useDoctorProfilesQuery(options?: Omit<Urql.UseQueryArgs<DoctorProfilesQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorProfilesQuery>({ query: DoctorProfilesDocument, ...options });
};
import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "City",
        "fields": [
          {
            "name": "city_name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "state_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Country",
        "fields": [
          {
            "name": "country_name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "country_phone_code",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "country_short_name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DoctorProfile",
        "fields": [
          {
            "name": "about_me",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "condition_treated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "doctor_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "educational_background",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "language",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "professional_experience",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "specialization",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "year_of_experience",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DoctorSchedule",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "day",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "deletedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "doctorId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "endTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "startTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "LoginResponse",
        "fields": [
          {
            "name": "access_token",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "UserForgotPassword",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "UserResetPassword",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "resetPasswordInput",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "createCard",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserCard",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "createPaymentInput",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "createDoctorProfile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DoctorProfile",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "createDoctorProfileInput",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "createOrUpdateDoctorSchedule",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "DoctorSchedule",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "createDoctorScheduleInput",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "createPatientHealthHistory",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PatientHealthHistory",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "createPatientHealthHistoryInput",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "createUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "createUserInput",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "login",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "LoginResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "loginUserInput",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "removeCard",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserCard",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "removeDoctorProfile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DoctorProfile",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "removeDoctorSchedule",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DoctorSchedule",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "doctorId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "removePatientHealthHistory",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PatientHealthHistory",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "removeUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "setAsDefaultCard",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserCard",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "updateDoctorProfile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DoctorProfile",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "updateDoctorProfileInput",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "updatePatientHealthHistory",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PatientHealthHistory",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "updatePatientHealthHistoryInput",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "updateUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "updateUserInput",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "userVerifyEmail",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "token",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PatientHealthHistory",
        "fields": [
          {
            "name": "history",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "user_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "cities",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "City",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "city",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "City",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "countries",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Country",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "country",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Country",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "doctorProfile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DoctorProfile",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "doctorProfiles",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "DoctorProfile",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "doctorSchedules",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "DoctorSchedule",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "getAllCards",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UserCard",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "getCard",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserCard",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "getCitiesByState",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "City",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "state_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "getStatesByCountry",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "State",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "country_id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "patientHealthHistory",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PatientHealthHistory",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "patientHealthHistorys",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "PatientHealthHistory",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "state",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "State",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "states",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "State",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "users",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "User",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "State",
        "fields": [
          {
            "name": "country_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "state_name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "User",
        "fields": [
          {
            "name": "city_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "contact_number",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "country_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "date_of_birth",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "doctorProfile",
            "type": {
              "kind": "OBJECT",
              "name": "DoctorProfile",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "email",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "first_name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "gender",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "last_name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "password",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "patientHealthHistory",
            "type": {
              "kind": "OBJECT",
              "name": "PatientHealthHistory",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "role",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "state_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "zip_code",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UserCard",
        "fields": [
          {
            "name": "card_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "is_default",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "user_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;