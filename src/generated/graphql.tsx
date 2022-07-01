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

export type AccountCreatiionDate = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type AccountCreationDate = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type AdminDashResponse = {
  __typename?: 'AdminDashResponse';
  total_number_of_appointments?: Maybe<Scalars['Float']>;
  total_number_of_physicians?: Maybe<Scalars['Float']>;
  total_number_of_users?: Maybe<Scalars['Float']>;
  total_revenue?: Maybe<Scalars['Float']>;
};

export type AdminProfilePicture = {
  __typename?: 'AdminProfilePicture';
  id: Scalars['Int'];
  profile_picture?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId: Scalars['Int'];
};

export type AdminSettingResponse = {
  __typename?: 'AdminSettingResponse';
  california_state_tax?: Maybe<Scalars['String']>;
  consultation_charges_medicus_cut?: Maybe<Scalars['String']>;
  consultation_charges_physician_cut?: Maybe<Scalars['String']>;
  second_opinion_charges_medicus_cut?: Maybe<Scalars['String']>;
  second_opinion_charges_physician_cut?: Maybe<Scalars['String']>;
  stripe_fee?: Maybe<Scalars['String']>;
  stripe_variable_amount?: Maybe<Scalars['String']>;
  taxes_state_tax?: Maybe<Scalars['String']>;
  total_consultation_charges?: Maybe<Scalars['String']>;
  total_second_opinion_charges?: Maybe<Scalars['String']>;
  washington_state_tax?: Maybe<Scalars['String']>;
};

export type Appointment = {
  __typename?: 'Appointment';
  appointmentDateTime?: Maybe<AppointmentDateTimeResponse>;
  appointmentHealthHistory?: Maybe<AppointmentHealthHistory>;
  appointmentSchedule?: Maybe<DoctorSchedule>;
  appointmentTimeSlots?: Maybe<Array<AppointmentTimeSlots>>;
  charges: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  currentAppointmentNote?: Maybe<AppointmentNote>;
  deletedAt: Scalars['DateTime'];
  doctor?: Maybe<User>;
  doctorId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  notesHistory?: Maybe<Array<AppointmentNote>>;
  patient?: Maybe<User>;
  patientId?: Maybe<Scalars['Int']>;
  questionnaire?: Maybe<Scalars['JSON']>;
  reportUrl?: Maybe<Scalars['JSON']>;
  requestedDate?: Maybe<Scalars['DateTime']>;
  scheduleId?: Maybe<Scalars['Int']>;
  serviceId?: Maybe<Scalars['Int']>;
  serviceType?: Maybe<AppointmentServiceType>;
  status?: Maybe<Scalars['String']>;
  transaction?: Maybe<Transaction>;
  user?: Maybe<User>;
};

export type AppointmentDateTimeResponse = {
  __typename?: 'AppointmentDateTimeResponse';
  endTime?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
};

export type AppointmentHealthHistory = {
  __typename?: 'AppointmentHealthHistory';
  appointment?: Maybe<Appointment>;
  appointmentId: Scalars['Int'];
  doctorId: Scalars['Int'];
  history: Scalars['JSON'];
  id: Scalars['Int'];
  patientId: Scalars['Int'];
};

export type AppointmentNote = {
  __typename?: 'AppointmentNote';
  appointment?: Maybe<Appointment>;
  appointmentId: Scalars['Int'];
  assessment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  id: Scalars['Int'];
  isPublished: Scalars['Boolean'];
  note?: Maybe<Scalars['String']>;
  objective?: Maybe<Scalars['String']>;
  plan?: Maybe<Scalars['String']>;
  subjective?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type AppointmentPriceResponse = {
  __typename?: 'AppointmentPriceResponse';
  appointmentPrice?: Maybe<Scalars['Float']>;
  systemFee?: Maybe<Scalars['Float']>;
  tax?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

export type AppointmentServiceType = {
  __typename?: 'AppointmentServiceType';
  appointment?: Maybe<Appointment>;
  deletedAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type AppointmentTime = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type AppointmentTimeSlots = {
  __typename?: 'AppointmentTimeSlots';
  appointment?: Maybe<Appointment>;
  endTime: Scalars['DateTime'];
  id: Scalars['Int'];
  selected: Scalars['Boolean'];
  startTime: Scalars['DateTime'];
};

export type BookAppointmentInput = {
  appointmentId: Scalars['Int'];
  cardId: Scalars['Int'];
  requestedDate: Scalars['DateTime'];
  scheduleId: Scalars['Int'];
  selectedSlotId: Scalars['Float'];
};

export type BookingDate = {
  endDate?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type ChatChannels = {
  __typename?: 'ChatChannels';
  channelName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  doctorId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  isAdminChat: Scalars['Boolean'];
  participants?: Maybe<Array<ChatParticipants>>;
  patientId?: Maybe<Scalars['Int']>;
  receiverDetail?: Maybe<User>;
};

export type ChatMessages = {
  __typename?: 'ChatMessages';
  channel: ChatChannels;
  channelId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  messageType?: Maybe<Scalars['String']>;
  receiver: User;
  receiverId: Scalars['Int'];
  sender: User;
  senderId: Scalars['Int'];
};

export type ChatParticipants = {
  __typename?: 'ChatParticipants';
  channel?: Maybe<ChatChannels>;
  channelId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  participantId: Scalars['Int'];
  userDetails?: Maybe<User>;
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

export type CreateAdminInput = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  profile_picture?: InputMaybe<Scalars['String']>;
};

export type CreateAdminSettingInput = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type CreateAppointmentInput = {
  doctorId: Scalars['Int'];
  patientId: Scalars['Int'];
  questionnaire?: InputMaybe<Scalars['JSON']>;
  reportUrl: Scalars['JSON'];
  requestedDate: Scalars['DateTime'];
  scheduleId: Scalars['Int'];
  serviceId: Scalars['Int'];
};

export type CreateAppointmentNoteInput = {
  appointmentId: Scalars['Int'];
  assessment?: InputMaybe<Scalars['String']>;
  isPublished: Scalars['Boolean'];
  note?: InputMaybe<Scalars['String']>;
  objective?: InputMaybe<Scalars['String']>;
  plan?: InputMaybe<Scalars['String']>;
  subjective?: InputMaybe<Scalars['String']>;
};

export type CreateAppointmentServiceTypeInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type CreateChatChannelInput = {
  doctorId?: InputMaybe<Scalars['Int']>;
  isAdminChat: Scalars['Boolean'];
  patientId?: InputMaybe<Scalars['Int']>;
};

export type CreateChatMessageInput = {
  channelId: Scalars['Int'];
  message: Scalars['String'];
  messageType?: InputMaybe<Scalars['String']>;
  receiverId: Scalars['Int'];
  senderId: Scalars['Int'];
};

export type CreateDoctorBillingMethodInput = {
  accountTitle: Scalars['String'];
  bankAccountNumber: Scalars['String'];
  bankId: Scalars['String'];
  bankName: Scalars['String'];
  doctorId: Scalars['Float'];
  is_default: Scalars['Boolean'];
  routingNumber: Scalars['String'];
  source: Scalars['String'];
};

export type CreateDoctorInput = {
  city_id: Scalars['Float'];
  country_id: Scalars['Float'];
  date_of_birth?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  email_token?: InputMaybe<Scalars['String']>;
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
  state_id: Scalars['Float'];
  streetAddress: Scalars['String'];
  stripe_customer_id?: InputMaybe<Scalars['String']>;
  zip_code: Scalars['String'];
};

export type CreateDoctorProfileInput = {
  about_me: Scalars['String'];
  condition_treated: Scalars['String'];
  doctor_id: Scalars['Float'];
  educational_background: Array<EducationalBackground>;
  language: Scalars['String'];
  professional_experience: Array<ProfessionalExperience>;
  profile_image?: InputMaybe<Scalars['String']>;
  specialization: Scalars['String'];
  year_of_experience: Scalars['Float'];
};

export type CreateDoctorQuestionnaireInput = {
  doctorId: Scalars['Int'];
  questionnaire?: InputMaybe<Scalars['JSON']>;
};

export type CreateDoctorScheduleInput = {
  day: Scalars['Float'];
  schedule: Array<Schedule>;
};

export type CreateDoctorScheduleNewInput = {
  day: Scalars['Int'];
  doctorId: Scalars['Int'];
  endTime: Scalars['String'];
  startTime: Scalars['String'];
};

export type CreatePatientHealthHistoryInput = {
  history?: InputMaybe<Scalars['JSON']>;
  user_id: Scalars['Int'];
};

export type CreatePaymentInput = {
  card_digits: Scalars['Float'];
  card_holder_name?: InputMaybe<Scalars['String']>;
  card_type: Scalars['String'];
  exp_month: Scalars['String'];
  exp_year: Scalars['String'];
  is_default: Scalars['Boolean'];
  source_id: Scalars['String'];
  user_id: Scalars['Float'];
};

export type CreateStaffInput = {
  contact_number: Scalars['String'];
  doctorId: Scalars['Float'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
};

export type CreateUserByAdminInput = {
  city_id?: InputMaybe<Scalars['Float']>;
  contact_number: Scalars['String'];
  country_id: Scalars['Float'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  profileImage?: InputMaybe<Scalars['String']>;
  state_id?: InputMaybe<Scalars['Float']>;
  streetAddress: Scalars['String'];
  zip_code: Scalars['String'];
};

export type CreateUserInput = {
  city_id?: InputMaybe<Scalars['Float']>;
  contact_number: Scalars['String'];
  country_id?: InputMaybe<Scalars['Float']>;
  date_of_birth?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  email_token?: InputMaybe<Scalars['String']>;
  first_name: Scalars['String'];
  gender: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
  state_id?: InputMaybe<Scalars['Float']>;
  streetAddress: Scalars['String'];
  stripe_customer_id?: InputMaybe<Scalars['String']>;
  zip_code: Scalars['String'];
};

export type CreationDate = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type DateRange = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type DoctorBillingMethod = {
  __typename?: 'DoctorBillingMethod';
  accountTitle: Scalars['String'];
  bankAccountNumber: Scalars['String'];
  bankId: Scalars['String'];
  bankName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  doctor?: Maybe<User>;
  doctorId: Scalars['Int'];
  id: Scalars['ID'];
  is_default?: Maybe<Scalars['Boolean']>;
  routingNumber: Scalars['String'];
  source: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DoctorEarningsResponse = {
  __typename?: 'DoctorEarningsResponse';
  total_earnings?: Maybe<Scalars['Float']>;
  total_earnings_from_consultation?: Maybe<Scalars['Float']>;
  total_earnings_from_second_opinions?: Maybe<Scalars['Float']>;
  total_number_of_consultation?: Maybe<Scalars['Float']>;
  total_number_of_patients?: Maybe<Scalars['Float']>;
  total_number_of_second_opinions?: Maybe<Scalars['Float']>;
};

export type DoctorProfile = {
  __typename?: 'DoctorProfile';
  about_me?: Maybe<Scalars['String']>;
  condition_treated?: Maybe<Scalars['String']>;
  doctor_id: Scalars['Int'];
  educational_background?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  language?: Maybe<Scalars['JSON']>;
  professional_experience?: Maybe<Scalars['String']>;
  profile_image?: Maybe<Scalars['String']>;
  specialization?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  year_of_experience?: Maybe<Scalars['Float']>;
};

export type DoctorQuestionnaire = {
  __typename?: 'DoctorQuestionnaire';
  deletedAt: Scalars['DateTime'];
  doctor: User;
  doctorId: Scalars['Int'];
  id: Scalars['Int'];
  questionnaire?: Maybe<Scalars['JSON']>;
  user?: Maybe<User>;
};

export type DoctorSchedule = {
  __typename?: 'DoctorSchedule';
  appointment?: Maybe<Appointment>;
  createdAt: Scalars['DateTime'];
  day: Scalars['Float'];
  deletedAt: Scalars['DateTime'];
  doctorId: Scalars['Float'];
  endTime: Scalars['String'];
  id: Scalars['ID'];
  startTime: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type DueDate = {
  endDate?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type EarningRange = {
  final?: InputMaybe<Scalars['Int']>;
  initial?: InputMaybe<Scalars['Int']>;
};

export type EducationalBackground = {
  degree: Scalars['String'];
  institution: Scalars['String'];
};

export type EducationalBackgroundUpdate = {
  degree?: InputMaybe<Scalars['String']>;
  institution?: InputMaybe<Scalars['String']>;
};

export type EmailAvailableInput = {
  email: Scalars['String'];
};

export type EmailAvailableResponse = {
  __typename?: 'EmailAvailableResponse';
  isEmailAvailable: Scalars['Boolean'];
};

export type GenerateRtcTokenInput = {
  channelName: Scalars['String'];
  role: Scalars['String'];
  tokenType: Scalars['String'];
  uId: Scalars['String'];
};

export type GetAdminUsersFilterInput = {
  creationDate?: InputMaybe<CreationDate>;
  searchUser?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

export type GetAppointmentInput = {
  appointmentId?: InputMaybe<Scalars['Int']>;
  bookingDate?: InputMaybe<BookingDate>;
  current?: InputMaybe<Scalars['Boolean']>;
  doctorId?: InputMaybe<Scalars['Int']>;
  dueDate?: InputMaybe<DueDate>;
  patientId?: InputMaybe<Scalars['Int']>;
  paymentStatus?: InputMaybe<Scalars['String']>;
  physicianName?: InputMaybe<Scalars['String']>;
  searchString?: InputMaybe<Scalars['String']>;
  serviceId?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
};

export type GetCurrentAppointmentInput = {
  appointmentId?: InputMaybe<Scalars['Int']>;
  bookingDate?: InputMaybe<BookingDate>;
  doctorId?: InputMaybe<Scalars['Int']>;
  dueDate?: InputMaybe<DueDate>;
  patientId?: InputMaybe<Scalars['Int']>;
  paymentStatus?: InputMaybe<Scalars['String']>;
  physicianName?: InputMaybe<Scalars['String']>;
  searchString?: InputMaybe<Scalars['String']>;
  serviceId?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
};

export type GetPatientsInput = {
  countryId?: InputMaybe<Scalars['Int']>;
  searchField?: InputMaybe<Scalars['String']>;
  stateId?: InputMaybe<Scalars['Int']>;
};

export type GetPhysicianAppointmentInput = {
  appointmentId?: InputMaybe<Scalars['Int']>;
  appointmentTime?: InputMaybe<AppointmentTime>;
  appointmentType?: InputMaybe<Scalars['String']>;
  bookingDate?: InputMaybe<BookingDate>;
  doctorId?: InputMaybe<Scalars['Int']>;
  dueDate?: InputMaybe<DueDate>;
  paymentStatus?: InputMaybe<Scalars['String']>;
  previous?: InputMaybe<Scalars['Boolean']>;
  searchString?: InputMaybe<Scalars['String']>;
  serviceId?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
};

export type GetPhysiciansInput = {
  countryId?: InputMaybe<Scalars['Int']>;
  creationDate?: InputMaybe<PhysicianAccountCreationDate>;
  language?: InputMaybe<Scalars['String']>;
  searchField?: InputMaybe<Scalars['String']>;
  specialization?: InputMaybe<Scalars['String']>;
  stateId?: InputMaybe<Scalars['Int']>;
};

export type GetPhysiciansPatientsInput = {
  countryId?: InputMaybe<Scalars['Int']>;
  searchField?: InputMaybe<Scalars['String']>;
};

export type GetStaffFilter = {
  CreationDate?: InputMaybe<AccountCreationDate>;
  doctorId?: InputMaybe<Scalars['Int']>;
  searchString?: InputMaybe<Scalars['String']>;
  service?: InputMaybe<Scalars['String']>;
  staffId?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Boolean']>;
};

export type GetTransectionInput = {
  DateRange?: InputMaybe<DateRange>;
  appointmentId?: InputMaybe<Scalars['Int']>;
  earnings?: InputMaybe<EarningRange>;
  searchString?: InputMaybe<Scalars['String']>;
  serviceId?: InputMaybe<Scalars['Int']>;
  serviceName?: InputMaybe<Scalars['String']>;
  transectionId?: InputMaybe<Scalars['Int']>;
};

export type GetUserFilter = {
  CreationDate?: InputMaybe<AccountCreatiionDate>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  emailAddress?: InputMaybe<Scalars['String']>;
  patientId?: InputMaybe<Scalars['Int']>;
  searchString?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  streetAddress?: InputMaybe<Scalars['String']>;
  zipCode?: InputMaybe<Scalars['Int']>;
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
  bookAppointment: Appointment;
  cancelAppointment: Appointment;
  cancelAppointmentByAdmin: Appointment;
  cancelAppointmentByPatient: Appointment;
  createAdminSetting: AdminSettingResponse;
  createAdminUser: User;
  createAppointment: Appointment;
  createCard: UserCard;
  createChatChannel: ChatChannels;
  createChatMessage: ChatMessages;
  createDoctor: User;
  createDoctorBillingMethod: DoctorBillingMethod;
  createDoctorProfile: DoctorProfile;
  createDoctorSchedule: DoctorSchedule;
  createOrUpdateAppointmentNote: AppointmentNote;
  createOrUpdateDoctorQuestionnaire: DoctorQuestionnaire;
  createOrUpdateDoctorSchedule: Array<DoctorSchedule>;
  createPatientByAdmin: User;
  createPatientHealthHistory: PatientHealthHistory;
  createServiceType: AppointmentServiceType;
  createStaff: User;
  createUser: User;
  deleteServiceType: AppointmentServiceType;
  enableOrDisableDoctor: User;
  enableOrDisablePatient: User;
  enableOrDisableStaff: User;
  generateRTCToken: RtcTokenResponse;
  login: LoginResponse;
  markedAppointmentAsCompleted: Appointment;
  payment: Transaction;
  proposeNewTime: Appointment;
  reBookAppointment: Appointment;
  removeAppointment: Appointment;
  removeAppointmentNote: AppointmentNote;
  removeCard: UserCard;
  removeDoctorBillingMethod: DoctorBillingMethod;
  removeDoctorProfile: DoctorProfile;
  removeDoctorQuestionnaire: DoctorQuestionnaire;
  removeDoctorSchedule: DoctorSchedule;
  removeOneDoctorSchedule: DoctorSchedule;
  removePatientHealthHistory: PatientHealthHistory;
  removeStaff: User;
  removeUser: User;
  setAsDefaultCard: UserCard;
  setDoctorPassword: User;
  suggestNewTime: Appointment;
  toggleEmailPreferences: UserEmailPreferencesResponse;
  updateAdminUser: User;
  updateDctorPercentage: Transaction;
  updateDoctorProfile: DoctorProfile;
  updatePatientHealthHistory: PatientHealthHistory;
  updateServiceType: AppointmentServiceType;
  updateStaff: User;
  updateUser: User;
  userVerifyEmail: User;
};


export type MutationUserForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationUserResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};


export type MutationBookAppointmentArgs = {
  bookAppointmentInput: BookAppointmentInput;
};


export type MutationCancelAppointmentArgs = {
  id: Scalars['Int'];
};


export type MutationCancelAppointmentByAdminArgs = {
  id: Scalars['Int'];
};


export type MutationCancelAppointmentByPatientArgs = {
  id: Scalars['Int'];
};


export type MutationCreateAdminSettingArgs = {
  createAdminSettingInput: Array<CreateAdminSettingInput>;
};


export type MutationCreateAdminUserArgs = {
  createAdminInput: CreateAdminInput;
};


export type MutationCreateAppointmentArgs = {
  createAppointmentInput: CreateAppointmentInput;
};


export type MutationCreateCardArgs = {
  createPaymentInput: CreatePaymentInput;
};


export type MutationCreateChatChannelArgs = {
  createChatChannelInput: CreateChatChannelInput;
};


export type MutationCreateChatMessageArgs = {
  createChatMessageInput: CreateChatMessageInput;
};


export type MutationCreateDoctorArgs = {
  createDoctorInput: CreateDoctorInput;
};


export type MutationCreateDoctorBillingMethodArgs = {
  createDoctorBillingMethodInput: CreateDoctorBillingMethodInput;
};


export type MutationCreateDoctorProfileArgs = {
  createDoctorProfileInput: CreateDoctorProfileInput;
};


export type MutationCreateDoctorScheduleArgs = {
  createDoctorScheduleNewInput: CreateDoctorScheduleNewInput;
};


export type MutationCreateOrUpdateAppointmentNoteArgs = {
  createAppointmentNoteInput: CreateAppointmentNoteInput;
};


export type MutationCreateOrUpdateDoctorQuestionnaireArgs = {
  createDoctorQuestionnaireInput: CreateDoctorQuestionnaireInput;
};


export type MutationCreateOrUpdateDoctorScheduleArgs = {
  createDoctorScheduleInput: Array<CreateDoctorScheduleInput>;
  doctorId: Scalars['Int'];
};


export type MutationCreatePatientByAdminArgs = {
  createPatientInput: CreateUserByAdminInput;
};


export type MutationCreatePatientHealthHistoryArgs = {
  createPatientHealthHistoryInput: CreatePatientHealthHistoryInput;
};


export type MutationCreateServiceTypeArgs = {
  createAppointmentServiceTypeInput: CreateAppointmentServiceTypeInput;
};


export type MutationCreateStaffArgs = {
  createStaffInput: CreateStaffInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteServiceTypeArgs = {
  id: Scalars['Int'];
};


export type MutationEnableOrDisableDoctorArgs = {
  id: Scalars['Int'];
};


export type MutationEnableOrDisablePatientArgs = {
  id: Scalars['Int'];
};


export type MutationEnableOrDisableStaffArgs = {
  id: Scalars['Int'];
};


export type MutationGenerateRtcTokenArgs = {
  generateRTCTokenInput: GenerateRtcTokenInput;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationMarkedAppointmentAsCompletedArgs = {
  appointmentId: Scalars['Int'];
};


export type MutationPaymentArgs = {
  paymentInput: PaymentInput;
};


export type MutationProposeNewTimeArgs = {
  proposeNewTimeInput: ProposeNewTimeInput;
};


export type MutationReBookAppointmentArgs = {
  rebookAppointmentInput: ReBookAppointmentInput;
};


export type MutationRemoveAppointmentArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveAppointmentNoteArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCardArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveDoctorBillingMethodArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveDoctorProfileArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveDoctorQuestionnaireArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveDoctorScheduleArgs = {
  doctorId: Scalars['Int'];
};


export type MutationRemoveOneDoctorScheduleArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePatientHealthHistoryArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveStaffArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int'];
};


export type MutationSetAsDefaultCardArgs = {
  id: Scalars['Int'];
};


export type MutationSetDoctorPasswordArgs = {
  setPasswordInput: ResetPasswordInput;
};


export type MutationSuggestNewTimeArgs = {
  suggestNewTime: SuggestNewTimeInput;
};


export type MutationToggleEmailPreferencesArgs = {
  toggleEmailPreferencesInput: TogglePreference;
};


export type MutationUpdateAdminUserArgs = {
  id: Scalars['Int'];
  updateAdminUserInput: UpdateAdminUserInput;
};


export type MutationUpdateDctorPercentageArgs = {
  id: Scalars['Int'];
  updateDoctorPercentage: UpdateDoctorPercentage;
};


export type MutationUpdateDoctorProfileArgs = {
  updateDoctorProfileInput: UpdateDoctorProfileInput;
};


export type MutationUpdatePatientHealthHistoryArgs = {
  updatePatientHealthHistoryInput: UpdatePatientHealthHistoryInput;
};


export type MutationUpdateServiceTypeArgs = {
  id: Scalars['Float'];
  updateServiceTypeInput: UpdateServiceTypeInput;
};


export type MutationUpdateStaffArgs = {
  id: Scalars['Int'];
  updateStaffInput: UpdateStaffInput;
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
  id?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  user_id: Scalars['Int'];
};

export type PatientProfile = {
  __typename?: 'PatientProfile';
  children?: Maybe<Scalars['Int']>;
  exposureDuration?: Maybe<Scalars['String']>;
  haveChildren?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  maritalStatus?: Maybe<Scalars['String']>;
  occupation?: Maybe<Scalars['String']>;
  occupationalExposure?: Maybe<Scalars['String']>;
  pets?: Maybe<Scalars['String']>;
  petsAnswer?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId: Scalars['Float'];
};

export type PaymentInput = {
  appointmentId: Scalars['Int'];
};

export type PhysicianAccountCreationDate = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type ProfessionalExperience = {
  institution: Scalars['String'];
  role: Scalars['String'];
};

export type ProfessionalExperience2 = {
  institution?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
};

export type ProposeNewTimeInput = {
  charges: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  proposedTimeSlots: Array<ProposedTimeSlots>;
  serviceId: Scalars['Int'];
};

export type ProposedTimeSlots = {
  endTime: Scalars['String'];
  startTime: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  adminDash: AdminDashResponse;
  adminSettings: AdminSettingResponse;
  adminUser: User;
  adminUsers: Array<User>;
  appointment: Appointment;
  appointmentBanner: Array<Appointment>;
  appointmentNote: AppointmentNote;
  appointmentNotes: Array<AppointmentNote>;
  appointmentQuestionnaire: AppointmentHealthHistory;
  appointmentServiceType: AppointmentServiceType;
  appointmentServiceTypes: Array<AppointmentServiceType>;
  appointments: Array<Appointment>;
  appointmentsReminderBanner: Appointment;
  checkEmailAvailability: EmailAvailableResponse;
  cities: Array<City>;
  city: City;
  countries: Array<Country>;
  country: Country;
  currentAppointments: Array<Appointment>;
  doctorBillingMethod: DoctorBillingMethod;
  doctorBillingMethods: Array<DoctorBillingMethod>;
  doctorProfile: DoctorProfile;
  doctorProfiles: Array<DoctorProfile>;
  doctorQuestionnaire: DoctorQuestionnaire;
  doctorQuestionnaires: Array<DoctorQuestionnaire>;
  doctorSchedules: Array<DoctorSchedule>;
  getAllCards: Array<UserCard>;
  getAllChatChannels: Array<ChatChannels>;
  getAppointmentPrice: AppointmentPriceResponse;
  getAppointmentPriceForRequest: AppointmentPriceResponse;
  getCard: UserCard;
  getChannelMessages: Array<ChatMessages>;
  getCitiesByState: Array<City>;
  getDoctorEarnings: DoctorEarningsResponse;
  getPatients: Array<User>;
  getPhysicians: Array<User>;
  getStatesByCountry: Array<State>;
  getTransectionFilter: Array<Transaction>;
  getUserFilter: Array<UserResponse>;
  patientHealthHistory?: Maybe<PatientHealthHistory>;
  patientHealthHistorys: Array<PatientHealthHistory>;
  patientLastQuestionnaire: AppointmentHealthHistory;
  physicianAppointments: Array<Appointment>;
  physiciansPatients: Array<User>;
  staff: Array<User>;
  staffDetail: User;
  state: State;
  states: Array<State>;
  transaction: Transaction;
  transactions: Array<Transaction>;
  user: User;
  userEmailPreferences: UserEmailPreferencesResponse;
  users: Array<User>;
};


export type QueryAdminUserArgs = {
  id: Scalars['Int'];
};


export type QueryAdminUsersArgs = {
  filter: GetAdminUsersFilterInput;
};


export type QueryAppointmentArgs = {
  id: Scalars['Int'];
};


export type QueryAppointmentBannerArgs = {
  doctorId: Scalars['Int'];
};


export type QueryAppointmentNoteArgs = {
  appointmentId: Scalars['Int'];
};


export type QueryAppointmentQuestionnaireArgs = {
  appointmentId: Scalars['Int'];
};


export type QueryAppointmentServiceTypeArgs = {
  id: Scalars['Int'];
};


export type QueryAppointmentsArgs = {
  filter: GetAppointmentInput;
};


export type QueryCheckEmailAvailabilityArgs = {
  emailAvailableInput: EmailAvailableInput;
};


export type QueryCityArgs = {
  id: Scalars['Int'];
};


export type QueryCountryArgs = {
  id: Scalars['Int'];
};


export type QueryCurrentAppointmentsArgs = {
  filter: GetCurrentAppointmentInput;
};


export type QueryDoctorBillingMethodArgs = {
  id: Scalars['Int'];
};


export type QueryDoctorBillingMethodsArgs = {
  doctorId: Scalars['Int'];
};


export type QueryDoctorProfileArgs = {
  doctor_id: Scalars['Int'];
};


export type QueryDoctorQuestionnaireArgs = {
  doctorId: Scalars['Int'];
};


export type QueryDoctorSchedulesArgs = {
  doctorId: Scalars['Int'];
};


export type QueryGetAllCardsArgs = {
  user_id: Scalars['Int'];
};


export type QueryGetAppointmentPriceArgs = {
  id: Scalars['Int'];
};


export type QueryGetAppointmentPriceForRequestArgs = {
  patientId: Scalars['Int'];
  serviceId: Scalars['Int'];
};


export type QueryGetCardArgs = {
  id: Scalars['Int'];
};


export type QueryGetChannelMessagesArgs = {
  channelId: Scalars['Int'];
};


export type QueryGetCitiesByStateArgs = {
  state_id: Scalars['Int'];
};


export type QueryGetDoctorEarningsArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetPatientsArgs = {
  filter: GetPatientsInput;
};


export type QueryGetPhysiciansArgs = {
  filter: GetPhysiciansInput;
};


export type QueryGetStatesByCountryArgs = {
  country_id: Scalars['Int'];
};


export type QueryGetTransectionFilterArgs = {
  filter: GetTransectionInput;
};


export type QueryGetUserFilterArgs = {
  filter: GetUserFilter;
};


export type QueryPatientHealthHistoryArgs = {
  id: Scalars['Int'];
};


export type QueryPatientLastQuestionnaireArgs = {
  doctorId: Scalars['Int'];
  patientId: Scalars['Int'];
};


export type QueryPhysicianAppointmentsArgs = {
  filter: GetPhysicianAppointmentInput;
};


export type QueryPhysiciansPatientsArgs = {
  filter: GetPhysiciansPatientsInput;
};


export type QueryStaffArgs = {
  filter: GetStaffFilter;
};


export type QueryStaffDetailArgs = {
  id: Scalars['Int'];
};


export type QueryStateArgs = {
  id: Scalars['Int'];
};


export type QueryTransactionArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type ReBookAppointmentInput = {
  appointmentId: Scalars['Int'];
  selectedSlotId: Scalars['Float'];
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  password_token?: InputMaybe<Scalars['String']>;
};

export type RtcTokenResponse = {
  __typename?: 'RtcTokenResponse';
  channelName: Scalars['String'];
  privilegeExpireTime: Scalars['String'];
  rtcAccessToken: Scalars['String'];
  rtmAccessToken: Scalars['String'];
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

export type SuggestNewTimeInput = {
  /** Appointment ID required */
  id: Scalars['Int'];
  /** Array of object required. Example [{ startTime: "yyyy-mm-dd hh:mm:ss", endTime: "yyyy-mm-dd hh:mm:ss"}] */
  proposedTimeSlots: Array<SuggestedTimeSlots>;
};

export type SuggestedTimeSlots = {
  /** Appointment end date and time required */
  endTime: Scalars['String'];
  /** Appointment start date and time required */
  startTime: Scalars['String'];
};

export type TogglePreference = {
  admin_appointment_create_update?: InputMaybe<Scalars['Boolean']>;
  appointment_accepted_by_doctor?: InputMaybe<Scalars['Boolean']>;
  appointment_accepted_by_patient?: InputMaybe<Scalars['Boolean']>;
  appointment_reminder?: InputMaybe<Scalars['Boolean']>;
  appointment_requested?: InputMaybe<Scalars['Boolean']>;
  appointment_rescheduled_by_doctor?: InputMaybe<Scalars['Boolean']>;
  appointment_slot_suggested_by_doctor?: InputMaybe<Scalars['Boolean']>;
  new_message_received?: InputMaybe<Scalars['Boolean']>;
  transaction_successful_alert?: InputMaybe<Scalars['Boolean']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  amountReceived: Scalars['Float'];
  appointment?: Maybe<Appointment>;
  appointmentCharges: Scalars['Float'];
  appointmentId: Scalars['Int'];
  cardId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  doctor_percentage: Scalars['String'];
  id: Scalars['Int'];
  payment_status?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  stripeFee: Scalars['Float'];
  tax: Scalars['Float'];
  transactionId: Scalars['String'];
};

export type UpdateAdminUserInput = {
  contact_number?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  profile_picture?: InputMaybe<Scalars['String']>;
};

export type UpdateDoctorPercentage = {
  doctor_percentage: Scalars['String'];
};

export type UpdateDoctorProfileInput = {
  about_me?: InputMaybe<Scalars['String']>;
  condition_treated?: InputMaybe<Scalars['String']>;
  doctor_id: Scalars['Float'];
  educational_background?: InputMaybe<Array<EducationalBackgroundUpdate>>;
  email: Scalars['String'];
  first_name: Scalars['String'];
  language?: InputMaybe<Scalars['JSON']>;
  last_name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  professional_experience?: InputMaybe<Array<ProfessionalExperience2>>;
  profile_image?: InputMaybe<Scalars['String']>;
  specialization?: InputMaybe<Scalars['String']>;
  year_of_experience?: InputMaybe<Scalars['Float']>;
};

export type UpdatePatientHealthHistoryInput = {
  history?: InputMaybe<Scalars['JSON']>;
  user_id: Scalars['Int'];
};

export type UpdateServiceTypeInput = {
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
};

export type UpdateStaffInput = {
  contact_number: Scalars['String'];
  doctorId: Scalars['Float'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
};

export type UpdateUserInput = {
  children?: InputMaybe<Scalars['Int']>;
  city_id: Scalars['Float'];
  contact_number: Scalars['String'];
  country_id: Scalars['Float'];
  date_of_birth?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  email_token?: InputMaybe<Scalars['String']>;
  exposureDuration?: InputMaybe<Scalars['String']>;
  first_name: Scalars['String'];
  gender: Scalars['String'];
  haveChildren?: InputMaybe<Scalars['String']>;
  last_name: Scalars['String'];
  maritalStatus?: InputMaybe<Scalars['String']>;
  occupation?: InputMaybe<Scalars['String']>;
  occupationalExposure?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  pets?: InputMaybe<Scalars['String']>;
  petsAnswer?: InputMaybe<Scalars['String']>;
  profileImage?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  state_id: Scalars['Float'];
  streetAddress: Scalars['String'];
  stripe_customer_id?: InputMaybe<Scalars['String']>;
  zip_code: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  adminProfilePicture?: Maybe<AdminProfilePicture>;
  adminSetting?: Maybe<AdminSettingResponse>;
  appointment?: Maybe<Appointment>;
  chatChannel?: Maybe<ChatChannels>;
  chatParticipant?: Maybe<ChatParticipants>;
  city?: Maybe<City>;
  city_id?: Maybe<Scalars['Int']>;
  contact_number?: Maybe<Scalars['String']>;
  country?: Maybe<Country>;
  country_id?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  date_of_birth?: Maybe<Scalars['DateTime']>;
  deletedAt: Scalars['DateTime'];
  doctorBillingMethods?: Maybe<Array<DoctorBillingMethod>>;
  doctorId?: Maybe<Scalars['Int']>;
  doctorProfile?: Maybe<DoctorProfile>;
  doctorQuestionnaire?: Maybe<DoctorQuestionnaire>;
  doctorSchedules?: Maybe<Array<DoctorSchedule>>;
  email: Scalars['String'];
  emailPreferences: UserEmailPreferencesResponse;
  first_name: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  last_name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  patientHealthHistory?: Maybe<PatientHealthHistory>;
  patientProfile?: Maybe<PatientProfile>;
  role?: Maybe<Scalars['String']>;
  state?: Maybe<State>;
  state_id?: Maybe<Scalars['Int']>;
  status: Scalars['Boolean'];
  streetAddress?: Maybe<Scalars['String']>;
  zip_code?: Maybe<Scalars['String']>;
};

export type UserCard = {
  __typename?: 'UserCard';
  card_digits: Scalars['Int'];
  card_holder_name?: Maybe<Scalars['String']>;
  card_id: Scalars['String'];
  card_type: Scalars['String'];
  deletedAt: Scalars['DateTime'];
  exp_month: Scalars['String'];
  exp_year: Scalars['String'];
  id: Scalars['Int'];
  is_default: Scalars['Boolean'];
  user_id: Scalars['Int'];
};

export type UserEmailPreferencesResponse = {
  __typename?: 'UserEmailPreferencesResponse';
  admin_appointment_create_update?: Maybe<Scalars['Boolean']>;
  appointment_accepted_by_doctor?: Maybe<Scalars['Boolean']>;
  appointment_accepted_by_patient?: Maybe<Scalars['Boolean']>;
  appointment_reminder?: Maybe<Scalars['Boolean']>;
  appointment_requested?: Maybe<Scalars['Boolean']>;
  appointment_rescheduled_by_doctor?: Maybe<Scalars['Boolean']>;
  appointment_slot_suggested_by_doctor?: Maybe<Scalars['Boolean']>;
  new_message_received?: Maybe<Scalars['Boolean']>;
  patient_registration_update?: Maybe<Scalars['Boolean']>;
  physician_registration_update?: Maybe<Scalars['Boolean']>;
  transaction_successful_alert?: Maybe<Scalars['Boolean']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  adminProfilePicture?: Maybe<AdminProfilePicture>;
  appointment?: Maybe<Appointment>;
  city_id: Scalars['Int'];
  contact_number?: Maybe<Scalars['String']>;
  country_id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  date_of_birth?: Maybe<Scalars['DateTime']>;
  deletedAt: Scalars['DateTime'];
  doctorBillingMethods?: Maybe<Array<DoctorBillingMethod>>;
  doctorId?: Maybe<Scalars['Int']>;
  doctorProfile?: Maybe<DoctorProfile>;
  doctorQuestionnaire?: Maybe<DoctorQuestionnaire>;
  doctorSchedules?: Maybe<Array<DoctorSchedule>>;
  email: Scalars['String'];
  first_name: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  last_name: Scalars['String'];
  patientHealthHistory?: Maybe<PatientHealthHistory>;
  patientProfile?: Maybe<PatientProfile>;
  role?: Maybe<Scalars['String']>;
  state_id: Scalars['Int'];
  status: Scalars['Boolean'];
  streetAddress?: Maybe<Scalars['String']>;
  zip_code: Scalars['String'];
};

export type UpdateAdminUserMutationVariables = Exact<{
  updateAdminUserInput: UpdateAdminUserInput;
  id: Scalars['Int'];
}>;


export type UpdateAdminUserMutation = { __typename?: 'Mutation', updateAdminUser: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, password?: string | null, contact_number?: string | null } };

export type GenerateRtcTokenMutationVariables = Exact<{
  generateRTCTokenInput: GenerateRtcTokenInput;
}>;


export type GenerateRtcTokenMutation = { __typename?: 'Mutation', generateRTCToken: { __typename?: 'RtcTokenResponse', rtmAccessToken: string, rtcAccessToken: string, channelName: string, privilegeExpireTime: string } };

export type CreateChatChannelMutationVariables = Exact<{
  createChatChannelInput: CreateChatChannelInput;
}>;


export type CreateChatChannelMutation = { __typename?: 'Mutation', createChatChannel: { __typename?: 'ChatChannels', id: number, channelName: string, doctorId?: number | null, patientId?: number | null, isAdminChat: boolean, createdAt: any } };

export type CreateChatMessageMutationVariables = Exact<{
  createChatMessageInput: CreateChatMessageInput;
}>;


export type CreateChatMessageMutation = { __typename?: 'Mutation', createChatMessage: { __typename?: 'ChatMessages', id: number, channelId: number, senderId: number, receiverId: number, message?: string | null, messageType?: string | null, createdAt: any, sender: { __typename?: 'User', id: number, first_name: string, last_name: string }, receiver: { __typename?: 'User', id: number, first_name: string, last_name: string } } };

export type CreateDoctorScheduleMutationVariables = Exact<{
  doctorId: Scalars['Int'];
  day: Scalars['Int'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
}>;


export type CreateDoctorScheduleMutation = { __typename?: 'Mutation', createDoctorSchedule: { __typename?: 'DoctorSchedule', id: string, startTime: string, endTime: string, day: number } };

export type RemoveDoctorScheduleMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveDoctorScheduleMutation = { __typename?: 'Mutation', removeOneDoctorSchedule: { __typename?: 'DoctorSchedule', day: number } };

export type ProposeNewTimeMutationVariables = Exact<{
  proposeNewTimeInput: ProposeNewTimeInput;
}>;


export type ProposeNewTimeMutation = { __typename?: 'Mutation', proposeNewTime: { __typename?: 'Appointment', id?: number | null, patientId?: number | null, doctorId?: number | null, serviceId?: number | null, scheduleId?: number | null, requestedDate?: any | null, status?: string | null } };

export type RemoveAppointmentNoteMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveAppointmentNoteMutation = { __typename?: 'Mutation', removeAppointmentNote: { __typename?: 'AppointmentNote', id: number, appointmentId: number, subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean, createdAt: any, updatedAt: any } };

export type SuggestNewTimeMutationVariables = Exact<{
  suggestNewTime: SuggestNewTimeInput;
}>;


export type SuggestNewTimeMutation = { __typename?: 'Mutation', suggestNewTime: { __typename?: 'Appointment', appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', startTime: any, endTime: any, selected: boolean }> | null } };

export type ReBookAppointmentMutationVariables = Exact<{
  rebookAppointmentInput: ReBookAppointmentInput;
}>;


export type ReBookAppointmentMutation = { __typename?: 'Mutation', reBookAppointment: { __typename?: 'Appointment', status?: string | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, email: string } };

export type CreatePatientHealthHistoryMutationVariables = Exact<{
  input: CreatePatientHealthHistoryInput;
}>;


export type CreatePatientHealthHistoryMutation = { __typename?: 'Mutation', createPatientHealthHistory: { __typename?: 'PatientHealthHistory', id?: number | null } };

export type UpdatePatientHealthHistoryMutationVariables = Exact<{
  input: UpdatePatientHealthHistoryInput;
}>;


export type UpdatePatientHealthHistoryMutation = { __typename?: 'Mutation', updatePatientHealthHistory: { __typename?: 'PatientHealthHistory', id?: number | null } };

export type UserVerifyEmailMutationVariables = Exact<{
  input: Scalars['String'];
}>;


export type UserVerifyEmailMutation = { __typename?: 'Mutation', userVerifyEmail: { __typename?: 'User', id: number } };

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', access_token: string, user: { __typename?: 'User', id: number, email: string, role?: string | null, first_name: string, last_name: string, doctorId?: number | null, patientProfile?: { __typename?: 'PatientProfile', profileImage?: string | null } | null, doctorProfile?: { __typename?: 'DoctorProfile', profile_image?: string | null, specialization?: string | null } | null, adminProfilePicture?: { __typename?: 'AdminProfilePicture', profile_picture?: string | null } | null } } };

export type UserForgotPasswordMutationVariables = Exact<{
  input: Scalars['String'];
}>;


export type UserForgotPasswordMutation = { __typename?: 'Mutation', UserForgotPassword: { __typename?: 'User', id: number } };

export type UserResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type UserResetPasswordMutation = { __typename?: 'Mutation', UserResetPassword: { __typename?: 'User', id: number } };

export type SetDoctorPasswordMutationVariables = Exact<{
  setPasswordInput: ResetPasswordInput;
}>;


export type SetDoctorPasswordMutation = { __typename?: 'Mutation', setDoctorPassword: { __typename?: 'User', id: number } };

export type CreateCardMutationVariables = Exact<{
  input: CreatePaymentInput;
}>;


export type CreateCardMutation = { __typename?: 'Mutation', createCard: { __typename?: 'UserCard', id: number, user_id: number, card_id: string, card_type: string, card_digits: number, is_default: boolean, exp_month: string, exp_year: string, card_holder_name?: string | null } };

export type RemoveCardMutationVariables = Exact<{
  input: Scalars['Int'];
}>;


export type RemoveCardMutation = { __typename?: 'Mutation', removeCard: { __typename?: 'UserCard', id: number, user_id: number, card_id: string, card_type: string, card_digits: number, is_default: boolean } };

export type DefaultCardMutationVariables = Exact<{
  input: Scalars['Int'];
}>;


export type DefaultCardMutation = { __typename?: 'Mutation', setAsDefaultCard: { __typename?: 'UserCard', id: number, user_id: number, card_id: string, card_type: string, card_digits: number, is_default: boolean } };

export type RemoveStaffMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveStaffMutation = { __typename?: 'Mutation', removeStaff: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, contact_number?: string | null } };

export type UpdateUserProfileMutationVariables = Exact<{
  id: Scalars['Int'];
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', first_name: string, last_name: string, email: string, gender?: string | null, date_of_birth?: any | null, country_id?: number | null, contact_number?: string | null, city_id?: number | null, password?: string | null, state_id?: number | null, role?: string | null, zip_code?: string | null, streetAddress?: string | null } };

export type CreateDoctorMutationVariables = Exact<{
  createDoctorInput: CreateDoctorInput;
}>;


export type CreateDoctorMutation = { __typename?: 'Mutation', createDoctor: { __typename?: 'User', first_name: string, last_name: string, email: string, streetAddress?: string | null, country_id?: number | null, state_id?: number | null, city_id?: number | null, zip_code?: string | null, id: number } };

export type UpdateDoctorProfileMutationVariables = Exact<{
  updateDoctorProfileInput: UpdateDoctorProfileInput;
}>;


export type UpdateDoctorProfileMutation = { __typename?: 'Mutation', updateDoctorProfile: { __typename?: 'DoctorProfile', id: number, doctor_id: number, year_of_experience?: number | null, specialization?: string | null, condition_treated?: string | null, educational_background?: string | null, professional_experience?: string | null, language?: any | null, about_me?: string | null, profile_image?: string | null, user?: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender?: string | null, streetAddress?: string | null, country_id?: number | null, state_id?: number | null, city_id?: number | null, zip_code?: string | null, password?: string | null, status: boolean, role?: string | null } | null } };

export type EnableOrDisableDoctorMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EnableOrDisableDoctorMutation = { __typename?: 'Mutation', enableOrDisableDoctor: { __typename?: 'User', id: number, status: boolean } };

export type CreateAppointmentMutationVariables = Exact<{
  createAppointment: CreateAppointmentInput;
}>;


export type CreateAppointmentMutation = { __typename?: 'Mutation', createAppointment: { __typename?: 'Appointment', patientId?: number | null, doctorId?: number | null, serviceId?: number | null, requestedDate?: any | null, scheduleId?: number | null, reportUrl?: any | null } };

export type CreateDoctorBillingMethodMutationVariables = Exact<{
  createDoctorBillingMethodInput: CreateDoctorBillingMethodInput;
}>;


export type CreateDoctorBillingMethodMutation = { __typename?: 'Mutation', createDoctorBillingMethod: { __typename?: 'DoctorBillingMethod', id: string, bankId: string, bankName: string, bankAccountNumber: string, accountTitle: string, routingNumber: string } };

export type RemoveDoctorBillingMethodMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveDoctorBillingMethodMutation = { __typename?: 'Mutation', removeDoctorBillingMethod: { __typename?: 'DoctorBillingMethod', id: string } };

export type CancelAppointmentByPatientMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CancelAppointmentByPatientMutation = { __typename?: 'Mutation', cancelAppointmentByPatient: { __typename?: 'Appointment', id?: number | null, patientId?: number | null, doctorId?: number | null, serviceId?: number | null, scheduleId?: number | null, requestedDate?: any | null, reportUrl?: any | null, status?: string | null, createdAt: any } };

export type BookAppointmentMutationVariables = Exact<{
  bookAppointmentInput: BookAppointmentInput;
}>;


export type BookAppointmentMutation = { __typename?: 'Mutation', bookAppointment: { __typename?: 'Appointment', id?: number | null, status?: string | null } };

export type CreateOrUpdateAppointmentNoteMutationVariables = Exact<{
  createAppointmentNoteInput: CreateAppointmentNoteInput;
}>;


export type CreateOrUpdateAppointmentNoteMutation = { __typename?: 'Mutation', createOrUpdateAppointmentNote: { __typename?: 'AppointmentNote', id: number } };

export type CancelAppointmentByDoctorMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CancelAppointmentByDoctorMutation = { __typename?: 'Mutation', cancelAppointment: { __typename?: 'Appointment', id?: number | null, patientId?: number | null, doctorId?: number | null, serviceId?: number | null, scheduleId?: number | null } };

export type CreateStaffMutationVariables = Exact<{
  createStaffInput: CreateStaffInput;
}>;


export type CreateStaffMutation = { __typename?: 'Mutation', createStaff: { __typename?: 'User', email: string, contact_number?: string | null, first_name: string, last_name: string, doctorId?: number | null } };

export type UpdateStaffProfileMutationVariables = Exact<{
  id: Scalars['Int'];
  updateStaffInput: UpdateStaffInput;
}>;


export type UpdateStaffProfileMutation = { __typename?: 'Mutation', updateStaff: { __typename?: 'User', first_name: string, last_name: string, email: string, contact_number?: string | null, doctorId?: number | null } };

export type CreateAdminMutationVariables = Exact<{
  createAdminInput: CreateAdminInput;
}>;


export type CreateAdminMutation = { __typename?: 'Mutation', createAdminUser: { __typename?: 'User', email: string, first_name: string, last_name: string } };

export type UpdateAdminMutationVariables = Exact<{
  id: Scalars['Int'];
  updateAdminUserInput: UpdateAdminUserInput;
}>;


export type UpdateAdminMutation = { __typename?: 'Mutation', updateAdminUser: { __typename?: 'User', first_name: string, last_name: string, email: string, password?: string | null, status: boolean, contact_number?: string | null } };

export type EnableOrDisablePatientMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EnableOrDisablePatientMutation = { __typename?: 'Mutation', enableOrDisablePatient: { __typename?: 'User', id: number, status: boolean } };

export type RemoveAppointmentByAdminMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveAppointmentByAdminMutation = { __typename?: 'Mutation', removeAppointment: { __typename?: 'Appointment', id?: number | null } };

export type RemovePatientUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemovePatientUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: number } };

export type EnableOrDisableStaffMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EnableOrDisableStaffMutation = { __typename?: 'Mutation', enableOrDisableStaff: { __typename?: 'User', id: number, status: boolean } };

export type CreatePatientByAdminMutationVariables = Exact<{
  createPatientInput: CreateUserByAdminInput;
}>;


export type CreatePatientByAdminMutation = { __typename?: 'Mutation', createPatientByAdmin: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender?: string | null, date_of_birth?: any | null, contact_number?: string | null, streetAddress?: string | null, country_id?: number | null, deletedAt: any, state_id?: number | null, city_id?: number | null, zip_code?: string | null, password?: string | null, status: boolean, role?: string | null, doctorId?: number | null, createdAt: any, patientHealthHistory?: { __typename?: 'PatientHealthHistory', id?: number | null, user_id: number, history?: any | null } | null } };

export type ToggleEmailPreferencesMutationVariables = Exact<{
  toggleEmailPreferencesInput: TogglePreference;
}>;


export type ToggleEmailPreferencesMutation = { __typename?: 'Mutation', toggleEmailPreferences: { __typename?: 'UserEmailPreferencesResponse', patient_registration_update?: boolean | null, physician_registration_update?: boolean | null, appointment_accepted_by_doctor?: boolean | null, appointment_rescheduled_by_doctor?: boolean | null, appointment_reminder?: boolean | null, admin_appointment_create_update?: boolean | null, new_message_received?: boolean | null, appointment_slot_suggested_by_doctor?: boolean | null, appointment_requested?: boolean | null, appointment_accepted_by_patient?: boolean | null, transaction_successful_alert?: boolean | null } };

export type GetAdminUsersQueryVariables = Exact<{
  filter: GetAdminUsersFilterInput;
}>;


export type GetAdminUsersQuery = { __typename?: 'Query', adminUsers: Array<{ __typename?: 'User', id: number, first_name: string, last_name: string, email: string, createdAt: any, status: boolean }> };

export type AdminDashboardStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminDashboardStatisticsQuery = { __typename?: 'Query', adminDash: { __typename?: 'AdminDashResponse', total_number_of_users?: number | null, total_revenue?: number | null, total_number_of_physicians?: number | null, total_number_of_appointments?: number | null } };

export type AdminPhysicianAppointmentQueryVariables = Exact<{
  filter: GetAppointmentInput;
}>;


export type AdminPhysicianAppointmentQuery = { __typename?: 'Query', appointments: Array<{ __typename?: 'Appointment', id?: number | null, charges: number, status?: string | null, patient?: { __typename?: 'User', first_name: string, last_name: string, email: string, patientProfile?: { __typename?: 'PatientProfile', profileImage?: string | null } | null } | null, doctor?: { __typename?: 'User', first_name: string, last_name: string } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', startTime: any, endTime: any, selected: boolean }> | null, appointmentSchedule?: { __typename?: 'DoctorSchedule', startTime: string, endTime: string } | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, serviceType?: { __typename?: 'AppointmentServiceType', name: string } | null }> };

export type GetPatientsQueryVariables = Exact<{
  filter: GetPatientsInput;
}>;


export type GetPatientsQuery = { __typename?: 'Query', getPatients: Array<{ __typename?: 'User', id: number, first_name: string, last_name: string, email: string, contact_number?: string | null, createdAt: any, streetAddress?: string | null, zip_code?: string | null, state?: { __typename?: 'State', state_name: string } | null, city?: { __typename?: 'City', city_name: string } | null, country?: { __typename?: 'Country', country_name: string } | null }> };

export type PhysicianPaymentByAdminMutationVariables = Exact<{
  paymeninput: PaymentInput;
}>;


export type PhysicianPaymentByAdminMutation = { __typename?: 'Mutation', payment: { __typename?: 'Transaction', id: number, transactionId: string, appointmentId: number, cardId: number, amountReceived: number, status: string, doctor_percentage: string, payment_status?: string | null, createdAt: any } };

export type CreateAdminSettingsMutationVariables = Exact<{
  createAdminSettingInput: Array<CreateAdminSettingInput> | CreateAdminSettingInput;
}>;


export type CreateAdminSettingsMutation = { __typename?: 'Mutation', createAdminSetting: { __typename?: 'AdminSettingResponse', total_consultation_charges?: string | null, consultation_charges_medicus_cut?: string | null, consultation_charges_physician_cut?: string | null, total_second_opinion_charges?: string | null, second_opinion_charges_medicus_cut?: string | null, second_opinion_charges_physician_cut?: string | null, california_state_tax?: string | null, washington_state_tax?: string | null, taxes_state_tax?: string | null, stripe_fee?: string | null, stripe_variable_amount?: string | null } };

export type GetAdminSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminSettingsQuery = { __typename?: 'Query', adminSettings: { __typename?: 'AdminSettingResponse', total_consultation_charges?: string | null, consultation_charges_medicus_cut?: string | null, consultation_charges_physician_cut?: string | null, total_second_opinion_charges?: string | null, second_opinion_charges_medicus_cut?: string | null, second_opinion_charges_physician_cut?: string | null, california_state_tax?: string | null, washington_state_tax?: string | null, taxes_state_tax?: string | null, stripe_fee?: string | null, stripe_variable_amount?: string | null } };

export type AdminUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AdminUserQuery = { __typename?: 'Query', adminUser: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, contact_number?: string | null, adminProfilePicture?: { __typename?: 'AdminProfilePicture', profile_picture?: string | null } | null } };

export type RemoveAdminUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveAdminUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: number } };

export type GetAllChatChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllChatChannelsQuery = { __typename?: 'Query', getAllChatChannels: Array<{ __typename?: 'ChatChannels', id: number, channelName: string, doctorId?: number | null, patientId?: number | null, isAdminChat: boolean, createdAt: any, receiverDetail?: { __typename?: 'User', first_name: string, last_name: string, role?: string | null, email: string } | null, participants?: Array<{ __typename?: 'ChatParticipants', id: number, channelId: number, participantId: number, channel?: { __typename?: 'ChatChannels', id: number, channelName: string, doctorId?: number | null, patientId?: number | null, isAdminChat: boolean } | null, userDetails?: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, role?: string | null, chatChannel?: { __typename?: 'ChatChannels', channelName: string, doctorId?: number | null, patientId?: number | null, isAdminChat: boolean } | null, doctorProfile?: { __typename?: 'DoctorProfile', profile_image?: string | null } | null, patientProfile?: { __typename?: 'PatientProfile', profileImage?: string | null } | null } | null }> | null }> };

export type GetChannelMessagesQueryVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type GetChannelMessagesQuery = { __typename?: 'Query', getChannelMessages: Array<{ __typename?: 'ChatMessages', id: number, channelId: number, senderId: number, message?: string | null, messageType?: string | null, sender: { __typename?: 'User', first_name: string, last_name: string, doctorProfile?: { __typename?: 'DoctorProfile', profile_image?: string | null } | null, patientProfile?: { __typename?: 'PatientProfile', profileImage?: string | null } | null } }> };

export type CheckEmailAvailabilityQueryVariables = Exact<{
  emailAvailableInput: EmailAvailableInput;
}>;


export type CheckEmailAvailabilityQuery = { __typename?: 'Query', checkEmailAvailability: { __typename?: 'EmailAvailableResponse', isEmailAvailable: boolean } };

export type DoctorBillingMethodsQueryVariables = Exact<{
  doctorId: Scalars['Int'];
}>;


export type DoctorBillingMethodsQuery = { __typename?: 'Query', doctorBillingMethods: Array<{ __typename?: 'DoctorBillingMethod', id: string, bankId: string, bankName: string, bankAccountNumber: string, accountTitle: string, routingNumber: string }> };

export type DoctorAppointmentDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DoctorAppointmentDetailQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id?: number | null, status?: string | null, scheduleId?: number | null, doctorId?: number | null, patientId?: number | null, requestedDate?: any | null, createdAt: any, reportUrl?: any | null, doctor?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null, patient?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', id: number, startTime: any, endTime: any, selected: boolean }> | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, serviceType?: { __typename?: 'AppointmentServiceType', id: number, name: string, price: number } | null, transaction?: { __typename?: 'Transaction', createdAt: any } | null, appointmentHealthHistory?: { __typename?: 'AppointmentHealthHistory', history: any } | null } };

export type DoctorAppointmentDetailAppointmentInfoQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DoctorAppointmentDetailAppointmentInfoQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id?: number | null, status?: string | null, requestedDate?: any | null, createdAt: any, charges: number, patient?: { __typename?: 'User', id: number, first_name: string, last_name: string, patientProfile?: { __typename?: 'PatientProfile', profileImage?: string | null } | null } | null, serviceType?: { __typename?: 'AppointmentServiceType', id: number, name: string, price: number } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', id: number, startTime: any, endTime: any, selected: boolean }> | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, appointmentSchedule?: { __typename?: 'DoctorSchedule', startTime: string, endTime: string } | null, transaction?: { __typename?: 'Transaction', status: string, amountReceived: number } | null } };

export type DoctorAppointmentDetailPatientInfoQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DoctorAppointmentDetailPatientInfoQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', serviceType?: { __typename?: 'AppointmentServiceType', name: string } | null, patient?: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender?: string | null, date_of_birth?: any | null, contact_number?: string | null, streetAddress?: string | null, country_id?: number | null, city_id?: number | null, patientProfile?: { __typename?: 'PatientProfile', id: number, maritalStatus?: string | null, children?: number | null, occupation?: string | null, occupationalExposure?: string | null, pets?: string | null } | null } | null } };

export type PhysicianAppointmentsQueryVariables = Exact<{
  filter: GetPhysicianAppointmentInput;
}>;


export type PhysicianAppointmentsQuery = { __typename?: 'Query', physicianAppointments: Array<{ __typename?: 'Appointment', id?: number | null, createdAt: any, requestedDate?: any | null, charges: number, status?: string | null, patient?: { __typename?: 'User', first_name: string, last_name: string } | null, serviceType?: { __typename?: 'AppointmentServiceType', name: string } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', startTime: any, endTime: any, selected: boolean }> | null }> };

export type PhysicianAppointmentsHistoryQueryVariables = Exact<{
  filter: GetAppointmentInput;
}>;


export type PhysicianAppointmentsHistoryQuery = { __typename?: 'Query', appointments: Array<{ __typename?: 'Appointment', id?: number | null, patientId?: number | null, createdAt: any, requestedDate?: any | null, charges: number, reportUrl?: any | null, status?: string | null, serviceType?: { __typename?: 'AppointmentServiceType', name: string } | null, patient?: { __typename?: 'User', first_name: string, last_name: string, gender?: string | null, email: string, date_of_birth?: any | null, contact_number?: string | null, country_id?: number | null, city_id?: number | null, patientProfile?: { __typename?: 'PatientProfile', maritalStatus?: string | null, children?: number | null, occupation?: string | null, occupationalExposure?: string | null, pets?: string | null } | null, patientHealthHistory?: { __typename?: 'PatientHealthHistory', history?: any | null } | null } | null, doctor?: { __typename?: 'User', first_name: string, last_name: string, doctorProfile?: { __typename?: 'DoctorProfile', id: number, doctor_id: number, year_of_experience?: number | null, specialization?: string | null, condition_treated?: string | null, educational_background?: string | null, professional_experience?: string | null, language?: any | null, about_me?: string | null, profile_image?: string | null, user?: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender?: string | null, country_id?: number | null, state_id?: number | null, city_id?: number | null, zip_code?: string | null, password?: string | null, status: boolean, role?: string | null, doctorSchedules?: Array<{ __typename?: 'DoctorSchedule', id: string, doctorId: number, day: number, startTime: string, endTime: string, createdAt: any, updatedAt: any }> | null } | null } | null } | null, appointmentHealthHistory?: { __typename?: 'AppointmentHealthHistory', history: any } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', startTime: any, endTime: any, selected: boolean }> | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, currentAppointmentNote?: { __typename?: 'AppointmentNote', subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean } | null, notesHistory?: Array<{ __typename?: 'AppointmentNote', subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean }> | null, transaction?: { __typename?: 'Transaction', status: string, amountReceived: number } | null }> };

export type GetTransectionFilterQueryVariables = Exact<{
  filter: GetTransectionInput;
}>;


export type GetTransectionFilterQuery = { __typename?: 'Query', getTransectionFilter: Array<{ __typename?: 'Transaction', id: number, appointmentId: number, transactionId: string, payment_status?: string | null, amountReceived: number, appointment?: { __typename?: 'Appointment', patientId?: number | null, patient?: { __typename?: 'User', first_name: string, last_name: string } | null, serviceType?: { __typename?: 'AppointmentServiceType', id: number, name: string } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', selected: boolean, startTime: any, endTime: any }> | null } | null }> };

export type PhysiciansPatientsQueryVariables = Exact<{
  searchField?: InputMaybe<Scalars['String']>;
}>;


export type PhysiciansPatientsQuery = { __typename?: 'Query', physiciansPatients: Array<{ __typename?: 'User', id: number, first_name: string, last_name: string, email: string, contact_number?: string | null, streetAddress?: string | null, country?: { __typename?: 'Country', country_name: string } | null, patientProfile?: { __typename?: 'PatientProfile', profileImage?: string | null } | null }> };

export type GetPhysiciansQueryVariables = Exact<{
  filter: GetPhysiciansInput;
}>;


export type GetPhysiciansQuery = { __typename?: 'Query', getPhysicians: Array<{ __typename?: 'User', id: number, first_name: string, last_name: string, email: string, streetAddress?: string | null, createdAt: any, zip_code?: string | null, city?: { __typename?: 'City', city_name: string } | null, state?: { __typename?: 'State', state_name: string } | null, country?: { __typename?: 'Country', country_name: string } | null, doctorProfile?: { __typename?: 'DoctorProfile', language?: any | null, specialization?: string | null } | null }> };

export type GetAppointmentNoteByIdQueryVariables = Exact<{
  appointmentId: Scalars['Int'];
}>;


export type GetAppointmentNoteByIdQuery = { __typename?: 'Query', appointmentNote: { __typename?: 'AppointmentNote', id: number, appointmentId: number, subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean, createdAt: any, updatedAt: any, appointment?: { __typename?: 'Appointment', id?: number | null, patientId?: number | null, doctorId?: number | null } | null } };

export type GetAllAppointmentNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAppointmentNotesQuery = { __typename?: 'Query', appointmentNotes: Array<{ __typename?: 'AppointmentNote', id: number, appointmentId: number, subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean, createdAt: any, updatedAt: any, appointment?: { __typename?: 'Appointment', id?: number | null, patientId?: number | null, doctorId?: number | null } | null }> };

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

export type PatientHealthHistoryQueryVariables = Exact<{
  input: Scalars['Int'];
}>;


export type PatientHealthHistoryQuery = { __typename?: 'Query', patientHealthHistory?: { __typename?: 'PatientHealthHistory', id?: number | null, history?: any | null } | null };

export type GetAllCardsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetAllCardsQuery = { __typename?: 'Query', getAllCards: Array<{ __typename?: 'UserCard', id: number, user_id: number, card_id: string, card_type: string, card_digits: number, is_default: boolean, exp_month: string, exp_year: string }> };

export type GetCardQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetCardQuery = { __typename?: 'Query', getCard: { __typename?: 'UserCard', id: number, user_id: number, card_id: string, card_type: string, card_digits: number, is_default: boolean } };

export type GetUserQueryVariables = Exact<{
  input: Scalars['Int'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, first_name: string, last_name: string, gender?: string | null, date_of_birth?: any | null, contact_number?: string | null, email: string, country_id?: number | null, city_id?: number | null, state_id?: number | null, zip_code?: string | null, streetAddress?: string | null, status: boolean, patientProfile?: { __typename?: 'PatientProfile', maritalStatus?: string | null, profileImage?: string | null, children?: number | null, haveChildren?: string | null, occupation?: string | null, occupationalExposure?: string | null, pets?: string | null, petsAnswer?: string | null, exposureDuration?: string | null, userId: number } | null, doctorProfile?: { __typename?: 'DoctorProfile', id: number, doctor_id: number, year_of_experience?: number | null, specialization?: string | null, condition_treated?: string | null, educational_background?: string | null, professional_experience?: string | null, language?: any | null, about_me?: string | null, profile_image?: string | null } | null } };

export type DoctorProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type DoctorProfilesQuery = { __typename?: 'Query', doctorProfiles: Array<{ __typename?: 'DoctorProfile', id: number, doctor_id: number, year_of_experience?: number | null, specialization?: string | null, condition_treated?: string | null, educational_background?: string | null, professional_experience?: string | null, language?: any | null, about_me?: string | null, profile_image?: string | null, user?: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender?: string | null } | null }> };

export type DoctorProfileQueryVariables = Exact<{
  doctor_id: Scalars['Int'];
}>;


export type DoctorProfileQuery = { __typename?: 'Query', doctorProfile: { __typename?: 'DoctorProfile', id: number, doctor_id: number, year_of_experience?: number | null, specialization?: string | null, condition_treated?: string | null, educational_background?: string | null, professional_experience?: string | null, language?: any | null, about_me?: string | null, profile_image?: string | null, user?: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender?: string | null, country_id?: number | null, state_id?: number | null, city_id?: number | null, zip_code?: string | null, password?: string | null, status: boolean, role?: string | null, contact_number?: string | null, doctorSchedules?: Array<{ __typename?: 'DoctorSchedule', id: string, doctorId: number, day: number, startTime: string, endTime: string, createdAt: any, updatedAt: any }> | null } | null } };

export type GetAllRequestedAppointmentsQueryVariables = Exact<{
  filter: GetAppointmentInput;
}>;


export type GetAllRequestedAppointmentsQuery = { __typename?: 'Query', appointments: Array<{ __typename?: 'Appointment', id?: number | null, patientId?: number | null, doctorId?: number | null, serviceId?: number | null, requestedDate?: any | null, createdAt: any, status?: string | null, charges: number, patient?: { __typename?: 'User', first_name: string, last_name: string } | null, serviceType?: { __typename?: 'AppointmentServiceType', name: string, price: number } | null, doctor?: { __typename?: 'User', first_name: string, last_name: string, doctorProfile?: { __typename?: 'DoctorProfile', id: number, doctor_id: number, year_of_experience?: number | null, specialization?: string | null, condition_treated?: string | null, educational_background?: string | null, professional_experience?: string | null, language?: any | null, about_me?: string | null, profile_image?: string | null, user?: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender?: string | null, country_id?: number | null, state_id?: number | null, city_id?: number | null, zip_code?: string | null, password?: string | null, status: boolean, role?: string | null, doctorSchedules?: Array<{ __typename?: 'DoctorSchedule', id: string, doctorId: number, day: number, startTime: string, endTime: string, createdAt: any, updatedAt: any }> | null } | null } | null } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', id: number, startTime: any, endTime: any, selected: boolean }> | null, transaction?: { __typename?: 'Transaction', createdAt: any, amountReceived: number, status: string } | null, appointmentSchedule?: { __typename?: 'DoctorSchedule', startTime: string, endTime: string } | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null }> };

export type DoctorProfileDetailsQueryVariables = Exact<{
  input: Scalars['Int'];
}>;


export type DoctorProfileDetailsQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, streetAddress?: string | null, country_id?: number | null, state_id?: number | null, city_id?: number | null, zip_code?: string | null, doctorProfile?: { __typename?: 'DoctorProfile', id: number, year_of_experience?: number | null, specialization?: string | null, condition_treated?: string | null, educational_background?: string | null, professional_experience?: string | null, language?: any | null, about_me?: string | null, profile_image?: string | null } | null, doctorSchedules?: Array<{ __typename?: 'DoctorSchedule', day: number, startTime: string, endTime: string }> | null } };

export type GetAllAppointmentServiceTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAppointmentServiceTypesQuery = { __typename?: 'Query', appointmentServiceTypes: Array<{ __typename?: 'AppointmentServiceType', id: number, name: string, price: number }> };

export type DoctorSchedulesQueryVariables = Exact<{
  doctorId: Scalars['Int'];
}>;


export type DoctorSchedulesQuery = { __typename?: 'Query', doctorSchedules: Array<{ __typename?: 'DoctorSchedule', id: string, doctorId: number, day: number, startTime: string, endTime: string, createdAt: any, updatedAt: any }> };

export type DoctorQuestionnaireQueryVariables = Exact<{
  doctorId: Scalars['Int'];
}>;


export type DoctorQuestionnaireQuery = { __typename?: 'Query', doctorQuestionnaire: { __typename?: 'DoctorQuestionnaire', id: number, doctorId: number, questionnaire?: any | null } };

export type GetAppointmentByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetAppointmentByIdQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id?: number | null, status?: string | null, scheduleId?: number | null, doctorId?: number | null, patientId?: number | null, requestedDate?: any | null, reportUrl?: any | null, createdAt: any, charges: number, doctor?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null, patient?: { __typename?: 'User', id: number, first_name: string, last_name: string, patientHealthHistory?: { __typename?: 'PatientHealthHistory', history?: any | null } | null } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', id: number, startTime: any, endTime: any, selected: boolean }> | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, serviceType?: { __typename?: 'AppointmentServiceType', id: number, name: string, price: number } | null, transaction?: { __typename?: 'Transaction', createdAt: any, status: string } | null, appointmentHealthHistory?: { __typename?: 'AppointmentHealthHistory', history: any } | null, currentAppointmentNote?: { __typename?: 'AppointmentNote', subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean } | null, notesHistory?: Array<{ __typename?: 'AppointmentNote', subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean }> | null } };

export type GetAllTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTransactionsQuery = { __typename?: 'Query', transactions: Array<{ __typename?: 'Transaction', id: number, transactionId: string, appointmentId: number, amountReceived: number, status: string, createdAt: any, appointment?: { __typename?: 'Appointment', requestedDate?: any | null, reportUrl?: any | null, doctor?: { __typename?: 'User', first_name: string, last_name: string } | null, patient?: { __typename?: 'User', first_name: string, last_name: string } | null, serviceType?: { __typename?: 'AppointmentServiceType', id: number, name: string } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', selected: boolean, startTime: any, endTime: any }> | null } | null }> };

export type ScheduleQueryVariables = Exact<{
  doctorId: Scalars['Int'];
}>;


export type ScheduleQuery = { __typename?: 'Query', doctorSchedules: Array<{ __typename?: 'DoctorSchedule', id: string, startTime: string, endTime: string, day: number }> };

export type ViewSuggestedTimeSlotsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ViewSuggestedTimeSlotsQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id?: number | null, patientId?: number | null, doctorId?: number | null, charges: number, serviceId?: number | null, scheduleId?: number | null, requestedDate?: any | null, reportUrl?: any | null, status?: string | null, createdAt: any, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', id: number, startTime: any, endTime: any, selected: boolean }> | null, serviceType?: { __typename?: 'AppointmentServiceType', name: string, price: number } | null, doctor?: { __typename?: 'User', first_name: string, last_name: string } | null, transaction?: { __typename?: 'Transaction', status: string, amountReceived: number } | null } };

export type GetAppointmentsReminderBannerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppointmentsReminderBannerQuery = { __typename?: 'Query', appointmentsReminderBanner: { __typename?: 'Appointment', id?: number | null, patient?: { __typename?: 'User', first_name: string, last_name: string } | null, doctor?: { __typename?: 'User', first_name: string, last_name: string } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', startTime: any, endTime: any, selected: boolean }> | null } };

export type GetCountryByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetCountryByIdQuery = { __typename?: 'Query', country: { __typename?: 'Country', id: number, country_name: string, country_short_name: string, country_phone_code: number } };

export type GetCityByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetCityByIdQuery = { __typename?: 'Query', city: { __typename?: 'City', id: number, state_id: number, city_name: string } };

export type GetAppointmentReportUrlByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetAppointmentReportUrlByIdQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id?: number | null, doctorId?: number | null, patientId?: number | null, reportUrl?: any | null } };

export type GetDoctorEarningsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetDoctorEarningsQuery = { __typename?: 'Query', getDoctorEarnings: { __typename?: 'DoctorEarningsResponse', total_number_of_consultation?: number | null, total_number_of_second_opinions?: number | null, total_number_of_patients?: number | null, total_earnings_from_consultation?: number | null, total_earnings_from_second_opinions?: number | null, total_earnings?: number | null } };

export type GetAllStaffByDoctorQueryVariables = Exact<{
  filter: GetStaffFilter;
}>;


export type GetAllStaffByDoctorQuery = { __typename?: 'Query', staff: Array<{ __typename?: 'User', id: number, role?: string | null, email: string, first_name: string, last_name: string, contact_number?: string | null, doctorId?: number | null, createdAt: any, status: boolean }> };

export type GetStaffDetailsUrlByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetStaffDetailsUrlByIdQuery = { __typename?: 'Query', staffDetail: { __typename?: 'User', id: number, first_name: string, last_name: string, status: boolean, email: string, contact_number?: string | null, createdAt: any } };

export type GetAdminUserByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetAdminUserByIdQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, createdAt: any, status: boolean } };

export type GetAppointmentNotesByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetAppointmentNotesByIdQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', currentAppointmentNote?: { __typename?: 'AppointmentNote', id: number, appointmentId: number, subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean } | null, notesHistory?: Array<{ __typename?: 'AppointmentNote', id: number, appointmentId: number, subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean }> | null } };

export type UserEmailPreferencesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserEmailPreferencesQuery = { __typename?: 'Query', userEmailPreferences: { __typename?: 'UserEmailPreferencesResponse', patient_registration_update?: boolean | null, physician_registration_update?: boolean | null, appointment_accepted_by_doctor?: boolean | null, appointment_rescheduled_by_doctor?: boolean | null, appointment_reminder?: boolean | null, admin_appointment_create_update?: boolean | null, new_message_received?: boolean | null, appointment_slot_suggested_by_doctor?: boolean | null, appointment_requested?: boolean | null, appointment_accepted_by_patient?: boolean | null, transaction_successful_alert?: boolean | null } };

export type PatientLastQuestionnaireQueryVariables = Exact<{
  doctorId: Scalars['Int'];
  patientId: Scalars['Int'];
}>;


export type PatientLastQuestionnaireQuery = { __typename?: 'Query', patientLastQuestionnaire: { __typename?: 'AppointmentHealthHistory', history: any } };

export type GetDoctorNotesByAppIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetDoctorNotesByAppIdQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id?: number | null, patientId?: number | null, status?: string | null, currentAppointmentNote?: { __typename?: 'AppointmentNote', subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean } | null, notesHistory?: Array<{ __typename?: 'AppointmentNote', subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean }> | null } };

export type CurrentAppointmentsQueryVariables = Exact<{
  filter: GetCurrentAppointmentInput;
}>;


export type CurrentAppointmentsQuery = { __typename?: 'Query', currentAppointments: Array<{ __typename?: 'Appointment', id?: number | null, doctorId?: number | null, patientId?: number | null, status?: string | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', startTime: any, endTime: any, selected: boolean }> | null, doctor?: { __typename?: 'User', first_name: string, last_name: string } | null, serviceType?: { __typename?: 'AppointmentServiceType', name: string } | null }> };


export const UpdateAdminUserDocument = gql`
    mutation updateAdminUser($updateAdminUserInput: UpdateAdminUserInput!, $id: Int!) {
  updateAdminUser(updateAdminUserInput: $updateAdminUserInput, id: $id) {
    id
    first_name
    last_name
    email
    password
    contact_number
  }
}
    `;

export function useUpdateAdminUserMutation() {
  return Urql.useMutation<UpdateAdminUserMutation, UpdateAdminUserMutationVariables>(UpdateAdminUserDocument);
};
export const GenerateRtcTokenDocument = gql`
    mutation generateRTCToken($generateRTCTokenInput: GenerateRTCTokenInput!) {
  generateRTCToken(generateRTCTokenInput: $generateRTCTokenInput) {
    rtmAccessToken
    rtcAccessToken
    channelName
    privilegeExpireTime
  }
}
    `;

export function useGenerateRtcTokenMutation() {
  return Urql.useMutation<GenerateRtcTokenMutation, GenerateRtcTokenMutationVariables>(GenerateRtcTokenDocument);
};
export const CreateChatChannelDocument = gql`
    mutation createChatChannel($createChatChannelInput: CreateChatChannelInput!) {
  createChatChannel(createChatChannelInput: $createChatChannelInput) {
    id
    channelName
    doctorId
    patientId
    isAdminChat
    createdAt
  }
}
    `;

export function useCreateChatChannelMutation() {
  return Urql.useMutation<CreateChatChannelMutation, CreateChatChannelMutationVariables>(CreateChatChannelDocument);
};
export const CreateChatMessageDocument = gql`
    mutation createChatMessage($createChatMessageInput: CreateChatMessageInput!) {
  createChatMessage(createChatMessageInput: $createChatMessageInput) {
    id
    channelId
    senderId
    receiverId
    message
    messageType
    createdAt
    sender {
      id
      first_name
      last_name
    }
    receiver {
      id
      first_name
      last_name
    }
  }
}
    `;

export function useCreateChatMessageMutation() {
  return Urql.useMutation<CreateChatMessageMutation, CreateChatMessageMutationVariables>(CreateChatMessageDocument);
};
export const CreateDoctorScheduleDocument = gql`
    mutation createDoctorSchedule($doctorId: Int!, $day: Int!, $startTime: String!, $endTime: String!) {
  createDoctorSchedule(
    createDoctorScheduleNewInput: {doctorId: $doctorId, day: $day, startTime: $startTime, endTime: $endTime}
  ) {
    id
    startTime
    endTime
    day
  }
}
    `;

export function useCreateDoctorScheduleMutation() {
  return Urql.useMutation<CreateDoctorScheduleMutation, CreateDoctorScheduleMutationVariables>(CreateDoctorScheduleDocument);
};
export const RemoveDoctorScheduleDocument = gql`
    mutation removeDoctorSchedule($id: Int!) {
  removeOneDoctorSchedule(id: $id) {
    day
  }
}
    `;

export function useRemoveDoctorScheduleMutation() {
  return Urql.useMutation<RemoveDoctorScheduleMutation, RemoveDoctorScheduleMutationVariables>(RemoveDoctorScheduleDocument);
};
export const ProposeNewTimeDocument = gql`
    mutation proposeNewTime($proposeNewTimeInput: ProposeNewTimeInput!) {
  proposeNewTime(proposeNewTimeInput: $proposeNewTimeInput) {
    id
    patientId
    doctorId
    serviceId
    scheduleId
    requestedDate
    status
  }
}
    `;

export function useProposeNewTimeMutation() {
  return Urql.useMutation<ProposeNewTimeMutation, ProposeNewTimeMutationVariables>(ProposeNewTimeDocument);
};
export const RemoveAppointmentNoteDocument = gql`
    mutation removeAppointmentNote($id: Int!) {
  removeAppointmentNote(id: $id) {
    id
    appointmentId
    subjective
    objective
    assessment
    plan
    note
    isPublished
    createdAt
    updatedAt
  }
}
    `;

export function useRemoveAppointmentNoteMutation() {
  return Urql.useMutation<RemoveAppointmentNoteMutation, RemoveAppointmentNoteMutationVariables>(RemoveAppointmentNoteDocument);
};
export const SuggestNewTimeDocument = gql`
    mutation suggestNewTime($suggestNewTime: SuggestNewTimeInput!) {
  suggestNewTime(suggestNewTime: $suggestNewTime) {
    appointmentTimeSlots {
      startTime
      endTime
      selected
    }
  }
}
    `;

export function useSuggestNewTimeMutation() {
  return Urql.useMutation<SuggestNewTimeMutation, SuggestNewTimeMutationVariables>(SuggestNewTimeDocument);
};
export const ReBookAppointmentDocument = gql`
    mutation reBookAppointment($rebookAppointmentInput: ReBookAppointmentInput!) {
  reBookAppointment(rebookAppointmentInput: $rebookAppointmentInput) {
    status
  }
}
    `;

export function useReBookAppointmentMutation() {
  return Urql.useMutation<ReBookAppointmentMutation, ReBookAppointmentMutationVariables>(ReBookAppointmentDocument);
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
export const UpdatePatientHealthHistoryDocument = gql`
    mutation UpdatePatientHealthHistory($input: UpdatePatientHealthHistoryInput!) {
  updatePatientHealthHistory(updatePatientHealthHistoryInput: $input) {
    id
  }
}
    `;

export function useUpdatePatientHealthHistoryMutation() {
  return Urql.useMutation<UpdatePatientHealthHistoryMutation, UpdatePatientHealthHistoryMutationVariables>(UpdatePatientHealthHistoryDocument);
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
      first_name
      last_name
      doctorId
      patientProfile {
        profileImage
      }
      doctorProfile {
        profile_image
        specialization
      }
      adminProfilePicture {
        profile_picture
      }
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const UserForgotPasswordDocument = gql`
    mutation UserForgotPassword($input: String!) {
  UserForgotPassword(email: $input) {
    id
  }
}
    `;

export function useUserForgotPasswordMutation() {
  return Urql.useMutation<UserForgotPasswordMutation, UserForgotPasswordMutationVariables>(UserForgotPasswordDocument);
};
export const UserResetPasswordDocument = gql`
    mutation UserResetPassword($input: ResetPasswordInput!) {
  UserResetPassword(resetPasswordInput: $input) {
    id
  }
}
    `;

export function useUserResetPasswordMutation() {
  return Urql.useMutation<UserResetPasswordMutation, UserResetPasswordMutationVariables>(UserResetPasswordDocument);
};
export const SetDoctorPasswordDocument = gql`
    mutation setDoctorPassword($setPasswordInput: ResetPasswordInput!) {
  setDoctorPassword(setPasswordInput: $setPasswordInput) {
    id
  }
}
    `;

export function useSetDoctorPasswordMutation() {
  return Urql.useMutation<SetDoctorPasswordMutation, SetDoctorPasswordMutationVariables>(SetDoctorPasswordDocument);
};
export const CreateCardDocument = gql`
    mutation createCard($input: CreatePaymentInput!) {
  createCard(createPaymentInput: $input) {
    id
    user_id
    card_id
    card_type
    card_digits
    is_default
    exp_month
    exp_year
    card_holder_name
  }
}
    `;

export function useCreateCardMutation() {
  return Urql.useMutation<CreateCardMutation, CreateCardMutationVariables>(CreateCardDocument);
};
export const RemoveCardDocument = gql`
    mutation removeCard($input: Int!) {
  removeCard(id: $input) {
    id
    user_id
    card_id
    card_type
    card_digits
    is_default
  }
}
    `;

export function useRemoveCardMutation() {
  return Urql.useMutation<RemoveCardMutation, RemoveCardMutationVariables>(RemoveCardDocument);
};
export const DefaultCardDocument = gql`
    mutation DefaultCard($input: Int!) {
  setAsDefaultCard(id: $input) {
    id
    user_id
    card_id
    card_type
    card_digits
    is_default
  }
}
    `;

export function useDefaultCardMutation() {
  return Urql.useMutation<DefaultCardMutation, DefaultCardMutationVariables>(DefaultCardDocument);
};
export const RemoveStaffDocument = gql`
    mutation removeStaff($id: Int!) {
  removeStaff(id: $id) {
    id
    first_name
    last_name
    email
    contact_number
  }
}
    `;

export function useRemoveStaffMutation() {
  return Urql.useMutation<RemoveStaffMutation, RemoveStaffMutationVariables>(RemoveStaffDocument);
};
export const UpdateUserProfileDocument = gql`
    mutation updateUserProfile($id: Int!, $updateUserInput: UpdateUserInput!) {
  updateUser(id: $id, updateUserInput: $updateUserInput) {
    first_name
    last_name
    email
    gender
    date_of_birth
    country_id
    contact_number
    city_id
    password
    state_id
    role
    zip_code
    streetAddress
  }
}
    `;

export function useUpdateUserProfileMutation() {
  return Urql.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument);
};
export const CreateDoctorDocument = gql`
    mutation createDoctor($createDoctorInput: CreateDoctorInput!) {
  createDoctor(createDoctorInput: $createDoctorInput) {
    first_name
    last_name
    email
    streetAddress
    country_id
    state_id
    city_id
    zip_code
    id
  }
}
    `;

export function useCreateDoctorMutation() {
  return Urql.useMutation<CreateDoctorMutation, CreateDoctorMutationVariables>(CreateDoctorDocument);
};
export const UpdateDoctorProfileDocument = gql`
    mutation updateDoctorProfile($updateDoctorProfileInput: UpdateDoctorProfileInput!) {
  updateDoctorProfile(updateDoctorProfileInput: $updateDoctorProfileInput) {
    id
    doctor_id
    year_of_experience
    specialization
    condition_treated
    educational_background
    professional_experience
    language
    about_me
    profile_image
    user {
      id
      first_name
      last_name
      email
      gender
      streetAddress
      country_id
      state_id
      city_id
      zip_code
      password
      status
      role
    }
  }
}
    `;

export function useUpdateDoctorProfileMutation() {
  return Urql.useMutation<UpdateDoctorProfileMutation, UpdateDoctorProfileMutationVariables>(UpdateDoctorProfileDocument);
};
export const EnableOrDisableDoctorDocument = gql`
    mutation enableOrDisableDoctor($id: Int!) {
  enableOrDisableDoctor(id: $id) {
    id
    status
  }
}
    `;

export function useEnableOrDisableDoctorMutation() {
  return Urql.useMutation<EnableOrDisableDoctorMutation, EnableOrDisableDoctorMutationVariables>(EnableOrDisableDoctorDocument);
};
export const CreateAppointmentDocument = gql`
    mutation createAppointment($createAppointment: CreateAppointmentInput!) {
  createAppointment(createAppointmentInput: $createAppointment) {
    patientId
    doctorId
    serviceId
    requestedDate
    scheduleId
    reportUrl
  }
}
    `;

export function useCreateAppointmentMutation() {
  return Urql.useMutation<CreateAppointmentMutation, CreateAppointmentMutationVariables>(CreateAppointmentDocument);
};
export const CreateDoctorBillingMethodDocument = gql`
    mutation createDoctorBillingMethod($createDoctorBillingMethodInput: CreateDoctorBillingMethodInput!) {
  createDoctorBillingMethod(
    createDoctorBillingMethodInput: $createDoctorBillingMethodInput
  ) {
    id
    bankId
    bankName
    bankAccountNumber
    accountTitle
    routingNumber
  }
}
    `;

export function useCreateDoctorBillingMethodMutation() {
  return Urql.useMutation<CreateDoctorBillingMethodMutation, CreateDoctorBillingMethodMutationVariables>(CreateDoctorBillingMethodDocument);
};
export const RemoveDoctorBillingMethodDocument = gql`
    mutation removeDoctorBillingMethod($id: Int!) {
  removeDoctorBillingMethod(id: $id) {
    id
  }
}
    `;

export function useRemoveDoctorBillingMethodMutation() {
  return Urql.useMutation<RemoveDoctorBillingMethodMutation, RemoveDoctorBillingMethodMutationVariables>(RemoveDoctorBillingMethodDocument);
};
export const CancelAppointmentByPatientDocument = gql`
    mutation cancelAppointmentByPatient($id: Int!) {
  cancelAppointmentByPatient(id: $id) {
    id
    patientId
    doctorId
    serviceId
    scheduleId
    requestedDate
    reportUrl
    status
    createdAt
  }
}
    `;

export function useCancelAppointmentByPatientMutation() {
  return Urql.useMutation<CancelAppointmentByPatientMutation, CancelAppointmentByPatientMutationVariables>(CancelAppointmentByPatientDocument);
};
export const BookAppointmentDocument = gql`
    mutation bookAppointment($bookAppointmentInput: BookAppointmentInput!) {
  bookAppointment(bookAppointmentInput: $bookAppointmentInput) {
    id
    status
  }
}
    `;

export function useBookAppointmentMutation() {
  return Urql.useMutation<BookAppointmentMutation, BookAppointmentMutationVariables>(BookAppointmentDocument);
};
export const CreateOrUpdateAppointmentNoteDocument = gql`
    mutation createOrUpdateAppointmentNote($createAppointmentNoteInput: CreateAppointmentNoteInput!) {
  createOrUpdateAppointmentNote(
    createAppointmentNoteInput: $createAppointmentNoteInput
  ) {
    id
  }
}
    `;

export function useCreateOrUpdateAppointmentNoteMutation() {
  return Urql.useMutation<CreateOrUpdateAppointmentNoteMutation, CreateOrUpdateAppointmentNoteMutationVariables>(CreateOrUpdateAppointmentNoteDocument);
};
export const CancelAppointmentByDoctorDocument = gql`
    mutation cancelAppointmentByDoctor($id: Int!) {
  cancelAppointment(id: $id) {
    id
    patientId
    doctorId
    serviceId
    scheduleId
  }
}
    `;

export function useCancelAppointmentByDoctorMutation() {
  return Urql.useMutation<CancelAppointmentByDoctorMutation, CancelAppointmentByDoctorMutationVariables>(CancelAppointmentByDoctorDocument);
};
export const CreateStaffDocument = gql`
    mutation createStaff($createStaffInput: CreateStaffInput!) {
  createStaff(createStaffInput: $createStaffInput) {
    email
    contact_number
    first_name
    last_name
    email
    doctorId
  }
}
    `;

export function useCreateStaffMutation() {
  return Urql.useMutation<CreateStaffMutation, CreateStaffMutationVariables>(CreateStaffDocument);
};
export const UpdateStaffProfileDocument = gql`
    mutation updateStaffProfile($id: Int!, $updateStaffInput: UpdateStaffInput!) {
  updateStaff(id: $id, updateStaffInput: $updateStaffInput) {
    first_name
    last_name
    email
    contact_number
    doctorId
  }
}
    `;

export function useUpdateStaffProfileMutation() {
  return Urql.useMutation<UpdateStaffProfileMutation, UpdateStaffProfileMutationVariables>(UpdateStaffProfileDocument);
};
export const CreateAdminDocument = gql`
    mutation createAdmin($createAdminInput: CreateAdminInput!) {
  createAdminUser(createAdminInput: $createAdminInput) {
    email
    first_name
    last_name
  }
}
    `;

export function useCreateAdminMutation() {
  return Urql.useMutation<CreateAdminMutation, CreateAdminMutationVariables>(CreateAdminDocument);
};
export const UpdateAdminDocument = gql`
    mutation updateAdmin($id: Int!, $updateAdminUserInput: UpdateAdminUserInput!) {
  updateAdminUser(id: $id, updateAdminUserInput: $updateAdminUserInput) {
    first_name
    last_name
    email
    password
    status
    contact_number
  }
}
    `;

export function useUpdateAdminMutation() {
  return Urql.useMutation<UpdateAdminMutation, UpdateAdminMutationVariables>(UpdateAdminDocument);
};
export const EnableOrDisablePatientDocument = gql`
    mutation enableOrDisablePatient($id: Int!) {
  enableOrDisablePatient(id: $id) {
    id
    status
  }
}
    `;

export function useEnableOrDisablePatientMutation() {
  return Urql.useMutation<EnableOrDisablePatientMutation, EnableOrDisablePatientMutationVariables>(EnableOrDisablePatientDocument);
};
export const RemoveAppointmentByAdminDocument = gql`
    mutation removeAppointmentByAdmin($id: Int!) {
  removeAppointment(id: $id) {
    id
  }
}
    `;

export function useRemoveAppointmentByAdminMutation() {
  return Urql.useMutation<RemoveAppointmentByAdminMutation, RemoveAppointmentByAdminMutationVariables>(RemoveAppointmentByAdminDocument);
};
export const RemovePatientUserDocument = gql`
    mutation removePatientUser($id: Int!) {
  removeUser(id: $id) {
    id
  }
}
    `;

export function useRemovePatientUserMutation() {
  return Urql.useMutation<RemovePatientUserMutation, RemovePatientUserMutationVariables>(RemovePatientUserDocument);
};
export const EnableOrDisableStaffDocument = gql`
    mutation enableOrDisableStaff($id: Int!) {
  enableOrDisableStaff(id: $id) {
    id
    status
  }
}
    `;

export function useEnableOrDisableStaffMutation() {
  return Urql.useMutation<EnableOrDisableStaffMutation, EnableOrDisableStaffMutationVariables>(EnableOrDisableStaffDocument);
};
export const CreatePatientByAdminDocument = gql`
    mutation createPatientByAdmin($createPatientInput: CreateUserByAdminInput!) {
  createPatientByAdmin(createPatientInput: $createPatientInput) {
    id
    first_name
    last_name
    email
    gender
    date_of_birth
    contact_number
    streetAddress
    country_id
    deletedAt
    state_id
    city_id
    zip_code
    password
    status
    role
    doctorId
    createdAt
    patientHealthHistory {
      id
      user_id
      history
    }
  }
}
    `;

export function useCreatePatientByAdminMutation() {
  return Urql.useMutation<CreatePatientByAdminMutation, CreatePatientByAdminMutationVariables>(CreatePatientByAdminDocument);
};
export const ToggleEmailPreferencesDocument = gql`
    mutation toggleEmailPreferences($toggleEmailPreferencesInput: TogglePreference!) {
  toggleEmailPreferences(
    toggleEmailPreferencesInput: $toggleEmailPreferencesInput
  ) {
    patient_registration_update
    physician_registration_update
    appointment_accepted_by_doctor
    appointment_rescheduled_by_doctor
    appointment_reminder
    admin_appointment_create_update
    new_message_received
    appointment_slot_suggested_by_doctor
    appointment_requested
    appointment_accepted_by_patient
    transaction_successful_alert
  }
}
    `;

export function useToggleEmailPreferencesMutation() {
  return Urql.useMutation<ToggleEmailPreferencesMutation, ToggleEmailPreferencesMutationVariables>(ToggleEmailPreferencesDocument);
};
export const GetAdminUsersDocument = gql`
    query getAdminUsers($filter: GetAdminUsersFilterInput!) {
  adminUsers(filter: $filter) {
    id
    first_name
    last_name
    email
    createdAt
    status
  }
}
    `;

export function useGetAdminUsersQuery(options: Omit<Urql.UseQueryArgs<GetAdminUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminUsersQuery>({ query: GetAdminUsersDocument, ...options });
};
export const AdminDashboardStatisticsDocument = gql`
    query adminDashboardStatistics {
  adminDash {
    total_number_of_users
    total_revenue
    total_number_of_physicians
    total_number_of_appointments
  }
}
    `;

export function useAdminDashboardStatisticsQuery(options?: Omit<Urql.UseQueryArgs<AdminDashboardStatisticsQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminDashboardStatisticsQuery>({ query: AdminDashboardStatisticsDocument, ...options });
};
export const AdminPhysicianAppointmentDocument = gql`
    query AdminPhysicianAppointment($filter: GetAppointmentInput!) {
  appointments(filter: $filter) {
    id
    patient {
      first_name
      last_name
      email
      patientProfile {
        profileImage
      }
    }
    doctor {
      first_name
      last_name
    }
    appointmentTimeSlots {
      startTime
      endTime
      selected
    }
    appointmentSchedule {
      startTime
      endTime
    }
    appointmentDateTime {
      startTime
      endTime
    }
    charges
    status
    serviceType {
      name
    }
  }
}
    `;

export function useAdminPhysicianAppointmentQuery(options: Omit<Urql.UseQueryArgs<AdminPhysicianAppointmentQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminPhysicianAppointmentQuery>({ query: AdminPhysicianAppointmentDocument, ...options });
};
export const GetPatientsDocument = gql`
    query getPatients($filter: GetPatientsInput!) {
  getPatients(filter: $filter) {
    id
    first_name
    last_name
    email
    contact_number
    createdAt
    streetAddress
    zip_code
    state {
      state_name
    }
    city {
      city_name
    }
    country {
      country_name
    }
  }
}
    `;

export function useGetPatientsQuery(options: Omit<Urql.UseQueryArgs<GetPatientsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPatientsQuery>({ query: GetPatientsDocument, ...options });
};
export const PhysicianPaymentByAdminDocument = gql`
    mutation physicianPaymentByAdmin($paymeninput: PaymentInput!) {
  payment(paymentInput: $paymeninput) {
    id
    transactionId
    appointmentId
    cardId
    amountReceived
    status
    doctor_percentage
    payment_status
    createdAt
  }
}
    `;

export function usePhysicianPaymentByAdminMutation() {
  return Urql.useMutation<PhysicianPaymentByAdminMutation, PhysicianPaymentByAdminMutationVariables>(PhysicianPaymentByAdminDocument);
};
export const CreateAdminSettingsDocument = gql`
    mutation createAdminSettings($createAdminSettingInput: [CreateAdminSettingInput!]!) {
  createAdminSetting(createAdminSettingInput: $createAdminSettingInput) {
    total_consultation_charges
    consultation_charges_medicus_cut
    consultation_charges_physician_cut
    total_second_opinion_charges
    second_opinion_charges_medicus_cut
    second_opinion_charges_physician_cut
    california_state_tax
    washington_state_tax
    taxes_state_tax
    stripe_fee
    stripe_variable_amount
  }
}
    `;

export function useCreateAdminSettingsMutation() {
  return Urql.useMutation<CreateAdminSettingsMutation, CreateAdminSettingsMutationVariables>(CreateAdminSettingsDocument);
};
export const GetAdminSettingsDocument = gql`
    query getAdminSettings {
  adminSettings {
    total_consultation_charges
    consultation_charges_medicus_cut
    consultation_charges_physician_cut
    total_second_opinion_charges
    second_opinion_charges_medicus_cut
    second_opinion_charges_physician_cut
    california_state_tax
    washington_state_tax
    taxes_state_tax
    stripe_fee
    stripe_variable_amount
  }
}
    `;

export function useGetAdminSettingsQuery(options?: Omit<Urql.UseQueryArgs<GetAdminSettingsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminSettingsQuery>({ query: GetAdminSettingsDocument, ...options });
};
export const AdminUserDocument = gql`
    query adminUser($id: Int!) {
  adminUser(id: $id) {
    id
    first_name
    last_name
    email
    contact_number
    adminProfilePicture {
      profile_picture
    }
  }
}
    `;

export function useAdminUserQuery(options: Omit<Urql.UseQueryArgs<AdminUserQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminUserQuery>({ query: AdminUserDocument, ...options });
};
export const RemoveAdminUserDocument = gql`
    mutation removeAdminUser($id: Int!) {
  removeUser(id: $id) {
    id
  }
}
    `;

export function useRemoveAdminUserMutation() {
  return Urql.useMutation<RemoveAdminUserMutation, RemoveAdminUserMutationVariables>(RemoveAdminUserDocument);
};
export const GetAllChatChannelsDocument = gql`
    query getAllChatChannels {
  getAllChatChannels {
    id
    channelName
    doctorId
    patientId
    isAdminChat
    createdAt
    receiverDetail {
      first_name
      last_name
      role
      email
    }
    participants {
      id
      channelId
      participantId
      channel {
        id
        channelName
        doctorId
        patientId
        isAdminChat
      }
      userDetails {
        id
        first_name
        last_name
        email
        role
        chatChannel {
          channelName
          doctorId
          patientId
          isAdminChat
        }
        doctorProfile {
          profile_image
        }
        patientProfile {
          profileImage
        }
      }
    }
  }
}
    `;

export function useGetAllChatChannelsQuery(options?: Omit<Urql.UseQueryArgs<GetAllChatChannelsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllChatChannelsQuery>({ query: GetAllChatChannelsDocument, ...options });
};
export const GetChannelMessagesDocument = gql`
    query getChannelMessages($channelId: Int!) {
  getChannelMessages(channelId: $channelId) {
    id
    channelId
    senderId
    message
    messageType
    sender {
      first_name
      last_name
      doctorProfile {
        profile_image
      }
      patientProfile {
        profileImage
      }
    }
  }
}
    `;

export function useGetChannelMessagesQuery(options: Omit<Urql.UseQueryArgs<GetChannelMessagesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetChannelMessagesQuery>({ query: GetChannelMessagesDocument, ...options });
};
export const CheckEmailAvailabilityDocument = gql`
    query checkEmailAvailability($emailAvailableInput: EmailAvailableInput!) {
  checkEmailAvailability(emailAvailableInput: $emailAvailableInput) {
    isEmailAvailable
  }
}
    `;

export function useCheckEmailAvailabilityQuery(options: Omit<Urql.UseQueryArgs<CheckEmailAvailabilityQueryVariables>, 'query'>) {
  return Urql.useQuery<CheckEmailAvailabilityQuery>({ query: CheckEmailAvailabilityDocument, ...options });
};
export const DoctorBillingMethodsDocument = gql`
    query doctorBillingMethods($doctorId: Int!) {
  doctorBillingMethods(doctorId: $doctorId) {
    id
    bankId
    bankName
    bankAccountNumber
    accountTitle
    routingNumber
  }
}
    `;

export function useDoctorBillingMethodsQuery(options: Omit<Urql.UseQueryArgs<DoctorBillingMethodsQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorBillingMethodsQuery>({ query: DoctorBillingMethodsDocument, ...options });
};
export const DoctorAppointmentDetailDocument = gql`
    query doctorAppointmentDetail($id: Int!) {
  appointment(id: $id) {
    id
    status
    scheduleId
    doctorId
    patientId
    requestedDate
    createdAt
    reportUrl
    doctor {
      id
      first_name
      last_name
    }
    patient {
      id
      first_name
      last_name
    }
    appointmentTimeSlots {
      id
      startTime
      endTime
      selected
    }
    appointmentDateTime {
      startTime
      endTime
    }
    serviceType {
      id
      name
      price
    }
    transaction {
      createdAt
    }
    appointmentHealthHistory {
      history
    }
  }
}
    `;

export function useDoctorAppointmentDetailQuery(options: Omit<Urql.UseQueryArgs<DoctorAppointmentDetailQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorAppointmentDetailQuery>({ query: DoctorAppointmentDetailDocument, ...options });
};
export const DoctorAppointmentDetailAppointmentInfoDocument = gql`
    query doctorAppointmentDetailAppointmentInfo($id: Int!) {
  appointment(id: $id) {
    id
    status
    requestedDate
    createdAt
    charges
    patient {
      id
      first_name
      last_name
      patientProfile {
        profileImage
      }
    }
    serviceType {
      id
      name
      price
    }
    appointmentTimeSlots {
      id
      startTime
      endTime
      selected
    }
    appointmentDateTime {
      startTime
      endTime
    }
    appointmentSchedule {
      startTime
      endTime
    }
    transaction {
      status
      amountReceived
    }
  }
}
    `;

export function useDoctorAppointmentDetailAppointmentInfoQuery(options: Omit<Urql.UseQueryArgs<DoctorAppointmentDetailAppointmentInfoQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorAppointmentDetailAppointmentInfoQuery>({ query: DoctorAppointmentDetailAppointmentInfoDocument, ...options });
};
export const DoctorAppointmentDetailPatientInfoDocument = gql`
    query doctorAppointmentDetailPatientInfo($id: Int!) {
  appointment(id: $id) {
    serviceType {
      name
    }
    patient {
      id
      first_name
      last_name
      email
      gender
      date_of_birth
      contact_number
      contact_number
      streetAddress
      country_id
      city_id
      patientProfile {
        id
        maritalStatus
        children
        occupation
        occupationalExposure
        pets
      }
    }
  }
}
    `;

export function useDoctorAppointmentDetailPatientInfoQuery(options: Omit<Urql.UseQueryArgs<DoctorAppointmentDetailPatientInfoQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorAppointmentDetailPatientInfoQuery>({ query: DoctorAppointmentDetailPatientInfoDocument, ...options });
};
export const PhysicianAppointmentsDocument = gql`
    query physicianAppointments($filter: GetPhysicianAppointmentInput!) {
  physicianAppointments(filter: $filter) {
    id
    patient {
      first_name
      last_name
    }
    serviceType {
      name
    }
    appointmentTimeSlots {
      startTime
      endTime
      selected
    }
    createdAt
    requestedDate
    charges
    status
  }
}
    `;

export function usePhysicianAppointmentsQuery(options: Omit<Urql.UseQueryArgs<PhysicianAppointmentsQueryVariables>, 'query'>) {
  return Urql.useQuery<PhysicianAppointmentsQuery>({ query: PhysicianAppointmentsDocument, ...options });
};
export const PhysicianAppointmentsHistoryDocument = gql`
    query physicianAppointmentsHistory($filter: GetAppointmentInput!) {
  appointments(filter: $filter) {
    id
    patientId
    createdAt
    requestedDate
    serviceType {
      name
    }
    patient {
      first_name
      last_name
      gender
      email
      date_of_birth
      contact_number
      country_id
      city_id
      patientProfile {
        maritalStatus
        children
        occupation
        occupationalExposure
        pets
      }
      patientHealthHistory {
        history
      }
    }
    doctor {
      first_name
      last_name
    }
    charges
    appointmentHealthHistory {
      history
    }
    reportUrl
    appointmentTimeSlots {
      startTime
      endTime
      selected
    }
    appointmentDateTime {
      startTime
      endTime
    }
    doctor {
      first_name
      last_name
      doctorProfile {
        id
        doctor_id
        year_of_experience
        specialization
        condition_treated
        educational_background
        professional_experience
        language
        about_me
        profile_image
        user {
          id
          first_name
          last_name
          email
          gender
          country_id
          state_id
          city_id
          zip_code
          password
          status
          role
          doctorSchedules {
            id
            doctorId
            day
            startTime
            endTime
            createdAt
            updatedAt
          }
        }
      }
    }
    currentAppointmentNote {
      subjective
      objective
      assessment
      plan
      note
      isPublished
    }
    notesHistory {
      subjective
      objective
      assessment
      plan
      note
      isPublished
    }
    status
    transaction {
      status
      amountReceived
    }
    charges
  }
}
    `;

export function usePhysicianAppointmentsHistoryQuery(options: Omit<Urql.UseQueryArgs<PhysicianAppointmentsHistoryQueryVariables>, 'query'>) {
  return Urql.useQuery<PhysicianAppointmentsHistoryQuery>({ query: PhysicianAppointmentsHistoryDocument, ...options });
};
export const GetTransectionFilterDocument = gql`
    query getTransectionFilter($filter: GetTransectionInput!) {
  getTransectionFilter(filter: $filter) {
    id
    appointmentId
    transactionId
    payment_status
    amountReceived
    appointment {
      patient {
        first_name
        last_name
      }
      patientId
      serviceType {
        id
        name
      }
      appointmentTimeSlots {
        selected
        startTime
        endTime
      }
    }
  }
}
    `;

export function useGetTransectionFilterQuery(options: Omit<Urql.UseQueryArgs<GetTransectionFilterQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTransectionFilterQuery>({ query: GetTransectionFilterDocument, ...options });
};
export const PhysiciansPatientsDocument = gql`
    query physiciansPatients($searchField: String) {
  physiciansPatients(filter: {searchField: $searchField}) {
    id
    first_name
    last_name
    email
    contact_number
    streetAddress
    country {
      country_name
    }
    patientProfile {
      profileImage
    }
  }
}
    `;

export function usePhysiciansPatientsQuery(options?: Omit<Urql.UseQueryArgs<PhysiciansPatientsQueryVariables>, 'query'>) {
  return Urql.useQuery<PhysiciansPatientsQuery>({ query: PhysiciansPatientsDocument, ...options });
};
export const GetPhysiciansDocument = gql`
    query getPhysicians($filter: GetPhysiciansInput!) {
  getPhysicians(filter: $filter) {
    id
    first_name
    last_name
    email
    streetAddress
    createdAt
    city {
      city_name
    }
    state {
      state_name
    }
    country {
      country_name
    }
    zip_code
    doctorProfile {
      language
      specialization
    }
  }
}
    `;

export function useGetPhysiciansQuery(options: Omit<Urql.UseQueryArgs<GetPhysiciansQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPhysiciansQuery>({ query: GetPhysiciansDocument, ...options });
};
export const GetAppointmentNoteByIdDocument = gql`
    query getAppointmentNoteById($appointmentId: Int!) {
  appointmentNote(appointmentId: $appointmentId) {
    id
    appointmentId
    subjective
    objective
    assessment
    plan
    note
    isPublished
    createdAt
    updatedAt
    appointment {
      id
      patientId
      doctorId
    }
  }
}
    `;

export function useGetAppointmentNoteByIdQuery(options: Omit<Urql.UseQueryArgs<GetAppointmentNoteByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppointmentNoteByIdQuery>({ query: GetAppointmentNoteByIdDocument, ...options });
};
export const GetAllAppointmentNotesDocument = gql`
    query getAllAppointmentNotes {
  appointmentNotes {
    id
    appointmentId
    subjective
    objective
    assessment
    plan
    note
    isPublished
    createdAt
    updatedAt
    appointment {
      id
      patientId
      doctorId
    }
  }
}
    `;

export function useGetAllAppointmentNotesQuery(options?: Omit<Urql.UseQueryArgs<GetAllAppointmentNotesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllAppointmentNotesQuery>({ query: GetAllAppointmentNotesDocument, ...options });
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
export const PatientHealthHistoryDocument = gql`
    query patientHealthHistory($input: Int!) {
  patientHealthHistory(id: $input) {
    id
    history
  }
}
    `;

export function usePatientHealthHistoryQuery(options: Omit<Urql.UseQueryArgs<PatientHealthHistoryQueryVariables>, 'query'>) {
  return Urql.useQuery<PatientHealthHistoryQuery>({ query: PatientHealthHistoryDocument, ...options });
};
export const GetAllCardsDocument = gql`
    query getAllCards($userId: Int!) {
  getAllCards(user_id: $userId) {
    id
    user_id
    card_id
    card_type
    card_digits
    is_default
    exp_month
    exp_year
  }
}
    `;

export function useGetAllCardsQuery(options: Omit<Urql.UseQueryArgs<GetAllCardsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllCardsQuery>({ query: GetAllCardsDocument, ...options });
};
export const GetCardDocument = gql`
    query getCard($id: Int!) {
  getCard(id: $id) {
    id
    user_id
    card_id
    card_type
    card_digits
    is_default
  }
}
    `;

export function useGetCardQuery(options: Omit<Urql.UseQueryArgs<GetCardQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCardQuery>({ query: GetCardDocument, ...options });
};
export const GetUserDocument = gql`
    query getUser($input: Int!) {
  user(id: $input) {
    id
    first_name
    last_name
    gender
    date_of_birth
    contact_number
    email
    country_id
    city_id
    state_id
    zip_code
    streetAddress
    status
    patientProfile {
      maritalStatus
      profileImage
      children
      haveChildren
      occupation
      occupationalExposure
      pets
      petsAnswer
      exposureDuration
      userId
    }
    doctorProfile {
      id
      doctor_id
      year_of_experience
      specialization
      condition_treated
      educational_background
      professional_experience
      language
      about_me
      profile_image
    }
  }
}
    `;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options });
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
    profile_image
    user {
      id
      first_name
      last_name
      email
      gender
    }
  }
}
    `;

export function useDoctorProfilesQuery(options?: Omit<Urql.UseQueryArgs<DoctorProfilesQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorProfilesQuery>({ query: DoctorProfilesDocument, ...options });
};
export const DoctorProfileDocument = gql`
    query doctorProfile($doctor_id: Int!) {
  doctorProfile(doctor_id: $doctor_id) {
    id
    doctor_id
    year_of_experience
    specialization
    condition_treated
    educational_background
    professional_experience
    language
    about_me
    profile_image
    user {
      id
      first_name
      last_name
      email
      gender
      country_id
      state_id
      city_id
      zip_code
      password
      status
      role
      contact_number
      doctorSchedules {
        id
        doctorId
        day
        startTime
        endTime
        createdAt
        updatedAt
      }
    }
  }
}
    `;

export function useDoctorProfileQuery(options: Omit<Urql.UseQueryArgs<DoctorProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorProfileQuery>({ query: DoctorProfileDocument, ...options });
};
export const GetAllRequestedAppointmentsDocument = gql`
    query getAllRequestedAppointments($filter: GetAppointmentInput!) {
  appointments(filter: $filter) {
    id
    patientId
    doctorId
    serviceId
    requestedDate
    createdAt
    status
    charges
    patient {
      first_name
      last_name
    }
    serviceType {
      name
      price
    }
    doctor {
      first_name
      last_name
      doctorProfile {
        id
        doctor_id
        year_of_experience
        specialization
        condition_treated
        educational_background
        professional_experience
        language
        about_me
        profile_image
        user {
          id
          first_name
          last_name
          email
          gender
          country_id
          state_id
          city_id
          zip_code
          password
          status
          role
          doctorSchedules {
            id
            doctorId
            day
            startTime
            endTime
            createdAt
            updatedAt
          }
        }
      }
    }
    appointmentTimeSlots {
      id
      startTime
      endTime
      selected
    }
    transaction {
      createdAt
      amountReceived
      status
    }
    appointmentSchedule {
      startTime
      endTime
    }
    appointmentDateTime {
      startTime
      endTime
    }
  }
}
    `;

export function useGetAllRequestedAppointmentsQuery(options: Omit<Urql.UseQueryArgs<GetAllRequestedAppointmentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllRequestedAppointmentsQuery>({ query: GetAllRequestedAppointmentsDocument, ...options });
};
export const DoctorProfileDetailsDocument = gql`
    query doctorProfileDetails($input: Int!) {
  user(id: $input) {
    id
    first_name
    last_name
    email
    streetAddress
    country_id
    state_id
    city_id
    zip_code
    doctorProfile {
      id
      year_of_experience
      specialization
      condition_treated
      educational_background
      professional_experience
      language
      about_me
      profile_image
    }
    doctorSchedules {
      day
      startTime
      endTime
    }
  }
}
    `;

export function useDoctorProfileDetailsQuery(options: Omit<Urql.UseQueryArgs<DoctorProfileDetailsQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorProfileDetailsQuery>({ query: DoctorProfileDetailsDocument, ...options });
};
export const GetAllAppointmentServiceTypesDocument = gql`
    query getAllAppointmentServiceTypes {
  appointmentServiceTypes {
    id
    name
    price
  }
}
    `;

export function useGetAllAppointmentServiceTypesQuery(options?: Omit<Urql.UseQueryArgs<GetAllAppointmentServiceTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllAppointmentServiceTypesQuery>({ query: GetAllAppointmentServiceTypesDocument, ...options });
};
export const DoctorSchedulesDocument = gql`
    query doctorSchedules($doctorId: Int!) {
  doctorSchedules(doctorId: $doctorId) {
    id
    doctorId
    day
    startTime
    endTime
    createdAt
    updatedAt
  }
}
    `;

export function useDoctorSchedulesQuery(options: Omit<Urql.UseQueryArgs<DoctorSchedulesQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorSchedulesQuery>({ query: DoctorSchedulesDocument, ...options });
};
export const DoctorQuestionnaireDocument = gql`
    query doctorQuestionnaire($doctorId: Int!) {
  doctorQuestionnaire(doctorId: $doctorId) {
    id
    doctorId
    questionnaire
  }
}
    `;

export function useDoctorQuestionnaireQuery(options: Omit<Urql.UseQueryArgs<DoctorQuestionnaireQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorQuestionnaireQuery>({ query: DoctorQuestionnaireDocument, ...options });
};
export const GetAppointmentByIdDocument = gql`
    query getAppointmentById($id: Int!) {
  appointment(id: $id) {
    id
    status
    scheduleId
    doctorId
    patientId
    requestedDate
    reportUrl
    doctor {
      id
      first_name
      last_name
    }
    patient {
      id
      first_name
      last_name
      patientHealthHistory {
        history
      }
    }
    appointmentTimeSlots {
      id
      startTime
      endTime
      selected
    }
    appointmentDateTime {
      startTime
      endTime
    }
    serviceType {
      id
      name
      price
    }
    transaction {
      createdAt
      status
    }
    createdAt
    charges
    appointmentHealthHistory {
      history
    }
    currentAppointmentNote {
      subjective
      objective
      assessment
      plan
      note
      isPublished
    }
    notesHistory {
      subjective
      objective
      assessment
      plan
      note
      isPublished
    }
  }
}
    `;

export function useGetAppointmentByIdQuery(options: Omit<Urql.UseQueryArgs<GetAppointmentByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppointmentByIdQuery>({ query: GetAppointmentByIdDocument, ...options });
};
export const GetAllTransactionsDocument = gql`
    query getAllTransactions {
  transactions {
    id
    transactionId
    appointmentId
    amountReceived
    status
    createdAt
    appointment {
      requestedDate
      reportUrl
      doctor {
        first_name
        last_name
      }
      patient {
        first_name
        last_name
      }
      serviceType {
        id
        name
      }
      appointmentTimeSlots {
        selected
        startTime
        endTime
      }
    }
  }
}
    `;

export function useGetAllTransactionsQuery(options?: Omit<Urql.UseQueryArgs<GetAllTransactionsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllTransactionsQuery>({ query: GetAllTransactionsDocument, ...options });
};
export const ScheduleDocument = gql`
    query schedule($doctorId: Int!) {
  doctorSchedules(doctorId: $doctorId) {
    id
    startTime
    endTime
    day
  }
}
    `;

export function useScheduleQuery(options: Omit<Urql.UseQueryArgs<ScheduleQueryVariables>, 'query'>) {
  return Urql.useQuery<ScheduleQuery>({ query: ScheduleDocument, ...options });
};
export const ViewSuggestedTimeSlotsDocument = gql`
    query ViewSuggestedTimeSlots($id: Int!) {
  appointment(id: $id) {
    id
    patientId
    doctorId
    charges
    serviceId
    scheduleId
    requestedDate
    reportUrl
    status
    createdAt
    appointmentTimeSlots {
      id
      startTime
      endTime
      selected
    }
    serviceType {
      name
      price
    }
    doctor {
      first_name
      last_name
    }
    transaction {
      status
      amountReceived
    }
  }
}
    `;

export function useViewSuggestedTimeSlotsQuery(options: Omit<Urql.UseQueryArgs<ViewSuggestedTimeSlotsQueryVariables>, 'query'>) {
  return Urql.useQuery<ViewSuggestedTimeSlotsQuery>({ query: ViewSuggestedTimeSlotsDocument, ...options });
};
export const GetAppointmentsReminderBannerDocument = gql`
    query getAppointmentsReminderBanner {
  appointmentsReminderBanner {
    id
    patient {
      first_name
      last_name
    }
    doctor {
      first_name
      last_name
    }
    appointmentTimeSlots {
      startTime
      endTime
      selected
    }
  }
}
    `;

export function useGetAppointmentsReminderBannerQuery(options?: Omit<Urql.UseQueryArgs<GetAppointmentsReminderBannerQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppointmentsReminderBannerQuery>({ query: GetAppointmentsReminderBannerDocument, ...options });
};
export const GetCountryByIdDocument = gql`
    query getCountryById($id: Int!) {
  country(id: $id) {
    id
    country_name
    country_short_name
    country_phone_code
  }
}
    `;

export function useGetCountryByIdQuery(options: Omit<Urql.UseQueryArgs<GetCountryByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCountryByIdQuery>({ query: GetCountryByIdDocument, ...options });
};
export const GetCityByIdDocument = gql`
    query getCityById($id: Int!) {
  city(id: $id) {
    id
    state_id
    city_name
  }
}
    `;

export function useGetCityByIdQuery(options: Omit<Urql.UseQueryArgs<GetCityByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCityByIdQuery>({ query: GetCityByIdDocument, ...options });
};
export const GetAppointmentReportUrlByIdDocument = gql`
    query getAppointmentReportUrlById($id: Int!) {
  appointment(id: $id) {
    id
    doctorId
    patientId
    reportUrl
  }
}
    `;

export function useGetAppointmentReportUrlByIdQuery(options: Omit<Urql.UseQueryArgs<GetAppointmentReportUrlByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppointmentReportUrlByIdQuery>({ query: GetAppointmentReportUrlByIdDocument, ...options });
};
export const GetDoctorEarningsDocument = gql`
    query getDoctorEarnings($id: Int!) {
  getDoctorEarnings(id: $id) {
    total_number_of_consultation
    total_number_of_second_opinions
    total_number_of_patients
    total_earnings_from_consultation
    total_earnings_from_second_opinions
    total_earnings
  }
}
    `;

export function useGetDoctorEarningsQuery(options: Omit<Urql.UseQueryArgs<GetDoctorEarningsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetDoctorEarningsQuery>({ query: GetDoctorEarningsDocument, ...options });
};
export const GetAllStaffByDoctorDocument = gql`
    query getAllStaffByDoctor($filter: GetStaffFilter!) {
  staff(filter: $filter) {
    id
    role
    email
    first_name
    last_name
    contact_number
    doctorId
    createdAt
    status
  }
}
    `;

export function useGetAllStaffByDoctorQuery(options: Omit<Urql.UseQueryArgs<GetAllStaffByDoctorQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllStaffByDoctorQuery>({ query: GetAllStaffByDoctorDocument, ...options });
};
export const GetStaffDetailsUrlByIdDocument = gql`
    query getStaffDetailsUrlById($id: Int!) {
  staffDetail(id: $id) {
    id
    first_name
    last_name
    status
    email
    contact_number
    createdAt
  }
}
    `;

export function useGetStaffDetailsUrlByIdQuery(options: Omit<Urql.UseQueryArgs<GetStaffDetailsUrlByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStaffDetailsUrlByIdQuery>({ query: GetStaffDetailsUrlByIdDocument, ...options });
};
export const GetAdminUserByIdDocument = gql`
    query getAdminUserById($id: Int!) {
  user(id: $id) {
    id
    first_name
    last_name
    email
    createdAt
    status
  }
}
    `;

export function useGetAdminUserByIdQuery(options: Omit<Urql.UseQueryArgs<GetAdminUserByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminUserByIdQuery>({ query: GetAdminUserByIdDocument, ...options });
};
export const GetAppointmentNotesByIdDocument = gql`
    query getAppointmentNotesById($id: Int!) {
  appointment(id: $id) {
    currentAppointmentNote {
      id
      appointmentId
      subjective
      objective
      assessment
      plan
      note
      isPublished
    }
    notesHistory {
      id
      appointmentId
      subjective
      objective
      assessment
      plan
      note
      isPublished
    }
  }
}
    `;

export function useGetAppointmentNotesByIdQuery(options: Omit<Urql.UseQueryArgs<GetAppointmentNotesByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppointmentNotesByIdQuery>({ query: GetAppointmentNotesByIdDocument, ...options });
};
export const UserEmailPreferencesDocument = gql`
    query userEmailPreferences {
  userEmailPreferences {
    patient_registration_update
    physician_registration_update
    appointment_accepted_by_doctor
    appointment_rescheduled_by_doctor
    appointment_reminder
    admin_appointment_create_update
    new_message_received
    appointment_slot_suggested_by_doctor
    appointment_requested
    appointment_accepted_by_patient
    transaction_successful_alert
  }
}
    `;

export function useUserEmailPreferencesQuery(options?: Omit<Urql.UseQueryArgs<UserEmailPreferencesQueryVariables>, 'query'>) {
  return Urql.useQuery<UserEmailPreferencesQuery>({ query: UserEmailPreferencesDocument, ...options });
};
export const PatientLastQuestionnaireDocument = gql`
    query patientLastQuestionnaire($doctorId: Int!, $patientId: Int!) {
  patientLastQuestionnaire(doctorId: $doctorId, patientId: $patientId) {
    history
  }
}
    `;

export function usePatientLastQuestionnaireQuery(options: Omit<Urql.UseQueryArgs<PatientLastQuestionnaireQueryVariables>, 'query'>) {
  return Urql.useQuery<PatientLastQuestionnaireQuery>({ query: PatientLastQuestionnaireDocument, ...options });
};
export const GetDoctorNotesByAppIdDocument = gql`
    query getDoctorNotesByAppId($id: Int!) {
  appointment(id: $id) {
    id
    patientId
    status
    currentAppointmentNote {
      subjective
      objective
      assessment
      plan
      note
      isPublished
    }
    notesHistory {
      subjective
      objective
      assessment
      plan
      note
      isPublished
    }
  }
}
    `;

export function useGetDoctorNotesByAppIdQuery(options: Omit<Urql.UseQueryArgs<GetDoctorNotesByAppIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetDoctorNotesByAppIdQuery>({ query: GetDoctorNotesByAppIdDocument, ...options });
};
export const CurrentAppointmentsDocument = gql`
    query currentAppointments($filter: GetCurrentAppointmentInput!) {
  currentAppointments(filter: $filter) {
    id
    doctorId
    patientId
    appointmentDateTime {
      startTime
      endTime
    }
    appointmentTimeSlots {
      startTime
      endTime
      selected
    }
    doctor {
      first_name
      last_name
    }
    serviceType {
      name
    }
    status
  }
}
    `;

export function useCurrentAppointmentsQuery(options: Omit<Urql.UseQueryArgs<CurrentAppointmentsQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrentAppointmentsQuery>({ query: CurrentAppointmentsDocument, ...options });
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
        "name": "AdminDashResponse",
        "fields": [
          {
            "name": "total_number_of_appointments",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "total_number_of_physicians",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "total_number_of_users",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "total_revenue",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AdminProfilePicture",
        "fields": [
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
            "name": "profile_picture",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "userId",
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
        "name": "AdminSettingResponse",
        "fields": [
          {
            "name": "california_state_tax",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "consultation_charges_medicus_cut",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "consultation_charges_physician_cut",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "second_opinion_charges_medicus_cut",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "second_opinion_charges_physician_cut",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "stripe_fee",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "stripe_variable_amount",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "taxes_state_tax",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "total_consultation_charges",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "total_second_opinion_charges",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "washington_state_tax",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Appointment",
        "fields": [
          {
            "name": "appointmentDateTime",
            "type": {
              "kind": "OBJECT",
              "name": "AppointmentDateTimeResponse",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "appointmentHealthHistory",
            "type": {
              "kind": "OBJECT",
              "name": "AppointmentHealthHistory",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "appointmentSchedule",
            "type": {
              "kind": "OBJECT",
              "name": "DoctorSchedule",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "appointmentTimeSlots",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "AppointmentTimeSlots",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "charges",
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
            "name": "currentAppointmentNote",
            "type": {
              "kind": "OBJECT",
              "name": "AppointmentNote",
              "ofType": null
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
            "name": "doctor",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "doctorId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "notesHistory",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "AppointmentNote",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "patient",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "patientId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "questionnaire",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "reportUrl",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "requestedDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "scheduleId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "serviceId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "serviceType",
            "type": {
              "kind": "OBJECT",
              "name": "AppointmentServiceType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "transaction",
            "type": {
              "kind": "OBJECT",
              "name": "Transaction",
              "ofType": null
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
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AppointmentDateTimeResponse",
        "fields": [
          {
            "name": "endTime",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "startTime",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AppointmentHealthHistory",
        "fields": [
          {
            "name": "appointment",
            "type": {
              "kind": "OBJECT",
              "name": "Appointment",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "appointmentId",
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
            "name": "history",
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
            "name": "patientId",
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
        "name": "AppointmentNote",
        "fields": [
          {
            "name": "appointment",
            "type": {
              "kind": "OBJECT",
              "name": "Appointment",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "appointmentId",
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
            "name": "assessment",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
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
            "name": "isPublished",
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
            "name": "note",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "objective",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "plan",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "subjective",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
        "name": "AppointmentPriceResponse",
        "fields": [
          {
            "name": "appointmentPrice",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "systemFee",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "tax",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "total",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AppointmentServiceType",
        "fields": [
          {
            "name": "appointment",
            "type": {
              "kind": "OBJECT",
              "name": "Appointment",
              "ofType": null
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
            "name": "name",
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
            "name": "price",
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
        "name": "AppointmentTimeSlots",
        "fields": [
          {
            "name": "appointment",
            "type": {
              "kind": "OBJECT",
              "name": "Appointment",
              "ofType": null
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
            "name": "selected",
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
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ChatChannels",
        "fields": [
          {
            "name": "channelName",
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
            "name": "doctorId",
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
            "name": "isAdminChat",
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
            "name": "participants",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "ChatParticipants",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "patientId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "receiverDetail",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ChatMessages",
        "fields": [
          {
            "name": "channel",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ChatChannels",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "channelId",
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
            "name": "message",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "messageType",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "receiver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "receiverId",
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
            "name": "sender",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "senderId",
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
        "name": "ChatParticipants",
        "fields": [
          {
            "name": "channel",
            "type": {
              "kind": "OBJECT",
              "name": "ChatChannels",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "channelId",
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
            "name": "participantId",
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
            "name": "userDetails",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
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
        "name": "DoctorBillingMethod",
        "fields": [
          {
            "name": "accountTitle",
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
            "name": "bankAccountNumber",
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
            "name": "bankId",
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
            "name": "bankName",
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
            "name": "doctor",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
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
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "routingNumber",
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
            "name": "source",
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
        "name": "DoctorEarningsResponse",
        "fields": [
          {
            "name": "total_earnings",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "total_earnings_from_consultation",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "total_earnings_from_second_opinions",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "total_number_of_consultation",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "total_number_of_patients",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "total_number_of_second_opinions",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "condition_treated",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "language",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "professional_experience",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "profile_image",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "specialization",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DoctorQuestionnaire",
        "fields": [
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
            "name": "doctor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
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
            "name": "questionnaire",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DoctorSchedule",
        "fields": [
          {
            "name": "appointment",
            "type": {
              "kind": "OBJECT",
              "name": "Appointment",
              "ofType": null
            },
            "args": []
          },
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
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EmailAvailableResponse",
        "fields": [
          {
            "name": "isEmailAvailable",
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
            "name": "bookAppointment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Appointment",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "bookAppointmentInput",
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
            "name": "cancelAppointment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Appointment",
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
            "name": "cancelAppointmentByAdmin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Appointment",
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
            "name": "cancelAppointmentByPatient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Appointment",
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
            "name": "createAdminSetting",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AdminSettingResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "createAdminSettingInput",
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
            "name": "createAdminUser",
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
                "name": "createAdminInput",
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
            "name": "createAppointment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Appointment",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "createAppointmentInput",
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
            "name": "createChatChannel",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ChatChannels",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "createChatChannelInput",
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
            "name": "createChatMessage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ChatMessages",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "createChatMessageInput",
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
            "name": "createDoctor",
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
                "name": "createDoctorInput",
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
            "name": "createDoctorBillingMethod",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DoctorBillingMethod",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "createDoctorBillingMethodInput",
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
            "name": "createDoctorSchedule",
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
                "name": "createDoctorScheduleNewInput",
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
            "name": "createOrUpdateAppointmentNote",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppointmentNote",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "createAppointmentNoteInput",
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
            "name": "createOrUpdateDoctorQuestionnaire",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DoctorQuestionnaire",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "createDoctorQuestionnaireInput",
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
              },
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
            "name": "createPatientByAdmin",
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
                "name": "createPatientInput",
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
            "name": "createServiceType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppointmentServiceType",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "createAppointmentServiceTypeInput",
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
            "name": "createStaff",
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
                "name": "createStaffInput",
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
            "name": "deleteServiceType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppointmentServiceType",
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
            "name": "enableOrDisableDoctor",
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
            "name": "enableOrDisablePatient",
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
            "name": "enableOrDisableStaff",
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
            "name": "generateRTCToken",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "RtcTokenResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "generateRTCTokenInput",
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
            "name": "markedAppointmentAsCompleted",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Appointment",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "appointmentId",
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
            "name": "payment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Transaction",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "paymentInput",
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
            "name": "proposeNewTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Appointment",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "proposeNewTimeInput",
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
            "name": "reBookAppointment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Appointment",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "rebookAppointmentInput",
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
            "name": "removeAppointment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Appointment",
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
            "name": "removeAppointmentNote",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppointmentNote",
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
            "name": "removeDoctorBillingMethod",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DoctorBillingMethod",
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
            "name": "removeDoctorQuestionnaire",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DoctorQuestionnaire",
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
            "name": "removeOneDoctorSchedule",
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
            "name": "removeStaff",
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
            "name": "setDoctorPassword",
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
                "name": "setPasswordInput",
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
            "name": "suggestNewTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Appointment",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "suggestNewTime",
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
            "name": "toggleEmailPreferences",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserEmailPreferencesResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "toggleEmailPreferencesInput",
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
            "name": "updateAdminUser",
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
                "name": "updateAdminUserInput",
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
            "name": "updateDctorPercentage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Transaction",
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
                "name": "updateDoctorPercentage",
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
            "name": "updateServiceType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppointmentServiceType",
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
                "name": "updateServiceTypeInput",
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
            "name": "updateStaff",
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
                "name": "updateStaffInput",
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
              "kind": "SCALAR",
              "name": "Any"
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
        "name": "PatientProfile",
        "fields": [
          {
            "name": "children",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "exposureDuration",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "haveChildren",
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
            "name": "maritalStatus",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "occupation",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "occupationalExposure",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pets",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "petsAnswer",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "profileImage",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "userId",
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
            "name": "adminDash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AdminDashResponse",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "adminSettings",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AdminSettingResponse",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "adminUser",
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
            "name": "adminUsers",
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
            "args": [
              {
                "name": "filter",
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
            "name": "appointment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Appointment",
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
            "name": "appointmentBanner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Appointment",
                    "ofType": null
                  }
                }
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
            "name": "appointmentNote",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppointmentNote",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "appointmentId",
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
            "name": "appointmentNotes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AppointmentNote",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "appointmentQuestionnaire",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppointmentHealthHistory",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "appointmentId",
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
            "name": "appointmentServiceType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppointmentServiceType",
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
            "name": "appointmentServiceTypes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AppointmentServiceType",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "appointments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Appointment",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "filter",
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
            "name": "appointmentsReminderBanner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Appointment",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "checkEmailAvailability",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EmailAvailableResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "emailAvailableInput",
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
            "name": "currentAppointments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Appointment",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "filter",
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
            "name": "doctorBillingMethod",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DoctorBillingMethod",
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
            "name": "doctorBillingMethods",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "DoctorBillingMethod",
                    "ofType": null
                  }
                }
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
                "name": "doctor_id",
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
            "name": "doctorQuestionnaire",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DoctorQuestionnaire",
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
            "name": "doctorQuestionnaires",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "DoctorQuestionnaire",
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
            "args": [
              {
                "name": "user_id",
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
            "name": "getAllChatChannels",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ChatChannels",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "getAppointmentPrice",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppointmentPriceResponse",
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
            "name": "getAppointmentPriceForRequest",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppointmentPriceResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "patientId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "serviceId",
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
            "name": "getChannelMessages",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ChatMessages",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "channelId",
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
            "name": "getDoctorEarnings",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DoctorEarningsResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "getPatients",
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
            "args": [
              {
                "name": "filter",
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
            "name": "getPhysicians",
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
            "args": [
              {
                "name": "filter",
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
            "name": "getTransectionFilter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Transaction",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "filter",
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
            "name": "getUserFilter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UserResponse",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "filter",
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
              "kind": "OBJECT",
              "name": "PatientHealthHistory",
              "ofType": null
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
            "name": "patientLastQuestionnaire",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppointmentHealthHistory",
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
              },
              {
                "name": "patientId",
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
            "name": "physicianAppointments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Appointment",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "filter",
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
            "name": "physiciansPatients",
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
            "args": [
              {
                "name": "filter",
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
            "name": "staff",
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
            "args": [
              {
                "name": "filter",
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
            "name": "staffDetail",
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
            "name": "transaction",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Transaction",
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
            "name": "transactions",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Transaction",
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
            "name": "userEmailPreferences",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserEmailPreferencesResponse",
                "ofType": null
              }
            },
            "args": []
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
        "name": "RtcTokenResponse",
        "fields": [
          {
            "name": "channelName",
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
            "name": "privilegeExpireTime",
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
            "name": "rtcAccessToken",
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
            "name": "rtmAccessToken",
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
        "name": "Transaction",
        "fields": [
          {
            "name": "amountReceived",
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
            "name": "appointment",
            "type": {
              "kind": "OBJECT",
              "name": "Appointment",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "appointmentCharges",
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
            "name": "appointmentId",
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
            "name": "cardId",
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
            "name": "doctor_percentage",
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
            "name": "payment_status",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "status",
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
            "name": "stripeFee",
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
            "name": "tax",
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
            "name": "transactionId",
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
            "name": "adminProfilePicture",
            "type": {
              "kind": "OBJECT",
              "name": "AdminProfilePicture",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "adminSetting",
            "type": {
              "kind": "OBJECT",
              "name": "AdminSettingResponse",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "appointment",
            "type": {
              "kind": "OBJECT",
              "name": "Appointment",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chatChannel",
            "type": {
              "kind": "OBJECT",
              "name": "ChatChannels",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chatParticipant",
            "type": {
              "kind": "OBJECT",
              "name": "ChatParticipants",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "city",
            "type": {
              "kind": "OBJECT",
              "name": "City",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "city_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "contact_number",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "country",
            "type": {
              "kind": "OBJECT",
              "name": "Country",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "country_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
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
            "name": "date_of_birth",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "doctorBillingMethods",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DoctorBillingMethod",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "doctorId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "doctorQuestionnaire",
            "type": {
              "kind": "OBJECT",
              "name": "DoctorQuestionnaire",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "doctorSchedules",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DoctorSchedule",
                  "ofType": null
                }
              }
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
            "name": "emailPreferences",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserEmailPreferencesResponse",
                "ofType": null
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
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "patientProfile",
            "type": {
              "kind": "OBJECT",
              "name": "PatientProfile",
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
            "name": "state",
            "type": {
              "kind": "OBJECT",
              "name": "State",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "state_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "status",
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
            "name": "streetAddress",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "zip_code",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "card_digits",
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
            "name": "card_holder_name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
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
            "name": "card_type",
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
            "name": "exp_month",
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
            "name": "exp_year",
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
        "kind": "OBJECT",
        "name": "UserEmailPreferencesResponse",
        "fields": [
          {
            "name": "admin_appointment_create_update",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "appointment_accepted_by_doctor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "appointment_accepted_by_patient",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "appointment_reminder",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "appointment_requested",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "appointment_rescheduled_by_doctor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "appointment_slot_suggested_by_doctor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "new_message_received",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "patient_registration_update",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "physician_registration_update",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "transaction_successful_alert",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UserResponse",
        "fields": [
          {
            "name": "adminProfilePicture",
            "type": {
              "kind": "OBJECT",
              "name": "AdminProfilePicture",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "appointment",
            "type": {
              "kind": "OBJECT",
              "name": "Appointment",
              "ofType": null
            },
            "args": []
          },
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
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "date_of_birth",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "doctorBillingMethods",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DoctorBillingMethod",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "doctorId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "doctorQuestionnaire",
            "type": {
              "kind": "OBJECT",
              "name": "DoctorQuestionnaire",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "doctorSchedules",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DoctorSchedule",
                  "ofType": null
                }
              }
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
            "name": "patientHealthHistory",
            "type": {
              "kind": "OBJECT",
              "name": "PatientHealthHistory",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "patientProfile",
            "type": {
              "kind": "OBJECT",
              "name": "PatientProfile",
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
            "name": "status",
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
            "name": "streetAddress",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;