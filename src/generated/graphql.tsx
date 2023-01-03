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

export type AdminPayoutResponse = {
  __typename?: 'AdminPayoutResponse';
  appointmentMonths: Array<Scalars['String']>;
  doctorEarnings: Array<Array<Scalars['String']>>;
  monthAppointments?: Maybe<Array<Array<Array<Appointment>>>>;
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

export type AdminTransactionReportResponse = {
  __typename?: 'AdminTransactionReportResponse';
  net_gross_sale?: Maybe<Scalars['Float']>;
  net_physician_fee?: Maybe<Scalars['Float']>;
  total_medicus_revenue?: Maybe<Scalars['Float']>;
  total_number_of_appointments?: Maybe<Scalars['Float']>;
  total_number_of_consultation?: Maybe<Scalars['Float']>;
  total_number_of_physicians?: Maybe<Scalars['Float']>;
  total_number_of_second_opinions?: Maybe<Scalars['Float']>;
  total_number_of_users?: Maybe<Scalars['Float']>;
  total_sale?: Maybe<Scalars['Float']>;
};

export type Appointment = {
  __typename?: 'Appointment';
  appointmentCharges?: Maybe<AppointmentPriceResponse>;
  appointmentDateTime?: Maybe<AppointmentDateTimeResponse>;
  appointmentHealthHistory?: Maybe<AppointmentHealthHistory>;
  appointmentSchedule?: Maybe<DoctorSchedule>;
  appointmentTimeSlots?: Maybe<Array<AppointmentTimeSlots>>;
  appointmentTypeProposed?: Maybe<AppointmentTypeProposedResponse>;
  charges: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  currentAppointmentNote?: Maybe<AppointmentNote>;
  deletedAt: Scalars['DateTime'];
  doctor?: Maybe<User>;
  doctorId?: Maybe<Scalars['Int']>;
  endTime?: Maybe<Scalars['DateTime']>;
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
  serviceTypeRequested?: Maybe<AppointmentServiceType>;
  startTime?: Maybe<Scalars['DateTime']>;
  status?: Maybe<Scalars['String']>;
  transaction?: Maybe<Transaction>;
  updatedAt: Scalars['DateTime'];
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

export type AppointmentPaginatedResponse = {
  __typename?: 'AppointmentPaginatedResponse';
  items: Array<Appointment>;
  links?: Maybe<Scalars['String']>;
  meta: Meta;
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
  deletedAt: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  id: Scalars['Int'];
  selected: Scalars['Boolean'];
  startTime: Scalars['DateTime'];
};

export type AppointmentTotalCharges = {
  finalCharges?: InputMaybe<Scalars['Int']>;
  initialCharges?: InputMaybe<Scalars['Int']>;
};

export type AppointmentTypeProposedResponse = {
  __typename?: 'AppointmentTypeProposedResponse';
  dateTime: Array<DateTimeSlots>;
  price?: Maybe<Scalars['Int']>;
  serviceId?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type AppointmentsCountResponse = {
  __typename?: 'AppointmentsCountResponse';
  canceled: Scalars['Float'];
  history: Scalars['Float'];
  pending: Scalars['Float'];
  propose: Scalars['Float'];
  reschedule: Scalars['Float'];
  upcoming: Scalars['Float'];
};

export type AwardsHonorsRecognition = {
  awards_honors_and_recognition: Scalars['String'];
};

export type AwardsHonorsRecognitionUpdate = {
  awards_honors_and_recognition?: InputMaybe<Scalars['String']>;
};

export type BookAppointmentInput = {
  appointmentId: Scalars['Int'];
  cardId: Scalars['Int'];
  scheduleId: Scalars['Int'];
  selectedSlotId: Scalars['Float'];
};

export type BookingDate = {
  endDate?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type CertificationLicensure = {
  certification_and_licensure: Scalars['String'];
};

export type CertificationLicensureUpdate = {
  certification_and_licensure?: InputMaybe<Scalars['String']>;
};

export type ChatChannels = {
  __typename?: 'ChatChannels';
  channelName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  doctorId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  isAdminChat: Scalars['Boolean'];
  lastMessage?: Maybe<ChatMessages>;
  participants?: Maybe<Array<ChatParticipants>>;
  patientId?: Maybe<Scalars['Int']>;
  receiverDetail?: Maybe<User>;
  unReadMessagesCount?: Maybe<UnReadMessagesCountResponse>;
};

export type ChatMessages = {
  __typename?: 'ChatMessages';
  channel?: Maybe<ChatChannels>;
  channelId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  isRead: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  messageType?: Maybe<Scalars['String']>;
  receiver?: Maybe<User>;
  receiverId: Scalars['Int'];
  sender?: Maybe<User>;
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
  password?: InputMaybe<Scalars['String']>;
  profile_picture?: InputMaybe<Scalars['String']>;
  timeZoneId?: InputMaybe<Scalars['Float']>;
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
  isRead: Scalars['Boolean'];
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
  contact_number: Scalars['String'];
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
  timeZoneId?: InputMaybe<Scalars['Float']>;
  zip_code?: InputMaybe<Scalars['String']>;
};

export type CreateDoctorProfileInput = {
  about_me: Scalars['String'];
  awards_honors_recognition?: InputMaybe<Array<AwardsHonorsRecognition>>;
  certification_and_licensure?: InputMaybe<Array<CertificationLicensure>>;
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
  languageId: Scalars['Int'];
  questionnaire?: InputMaybe<Scalars['JSON']>;
};

export type CreateDoctorScheduleInput = {
  day: Scalars['Float'];
  schedule: Array<Schedule>;
};

export type CreateDoctorScheduleNewInput = {
  doctorId: Scalars['Int'];
  endDay: Scalars['Int'];
  endTime: Scalars['String'];
  startDay: Scalars['Int'];
  startTime: Scalars['String'];
};

export type CreateLanguageInput = {
  code: Scalars['String'];
  name: Scalars['String'];
};

export type CreatePatientHealthHistoryInput = {
  history?: InputMaybe<Scalars['JSON']>;
  user_id: Scalars['Int'];
};

export type CreatePaymentInput = {
  card_digits: Scalars['Float'];
  card_holder_name?: InputMaybe<Scalars['String']>;
  card_type: Scalars['String'];
  country?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
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
  timeZoneId?: InputMaybe<Scalars['Float']>;
};

export type CreateUserByAdminInput = {
  city_id?: InputMaybe<Scalars['Float']>;
  contact_number: Scalars['String'];
  country_id?: InputMaybe<Scalars['Float']>;
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  profileImage?: InputMaybe<Scalars['String']>;
  state_id?: InputMaybe<Scalars['Float']>;
  streetAddress?: InputMaybe<Scalars['String']>;
  timeZoneId?: InputMaybe<Scalars['Float']>;
  zip_code?: InputMaybe<Scalars['String']>;
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
  timeZoneId?: InputMaybe<Scalars['Float']>;
  zip_code?: InputMaybe<Scalars['String']>;
};

export type CreationDate = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type DateRange = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeSlots = {
  __typename?: 'DateTimeSlots';
  date?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
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

export type DoctorCreateLinkResponse = {
  __typename?: 'DoctorCreateLinkResponse';
  created?: Maybe<Scalars['Float']>;
  expires_at?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
};

export type DoctorEarningsResponse = {
  __typename?: 'DoctorEarningsResponse';
  total_earnings?: Maybe<Scalars['Float']>;
  total_earnings_from_consultation?: Maybe<Scalars['Float']>;
  total_earnings_from_second_opinions?: Maybe<Scalars['Float']>;
  total_net_earnings?: Maybe<Scalars['Float']>;
  total_number_of_consultation?: Maybe<Scalars['Float']>;
  total_number_of_patients?: Maybe<Scalars['Float']>;
  total_number_of_second_opinions?: Maybe<Scalars['Float']>;
};

export type DoctorPayoutResponse = {
  __typename?: 'DoctorPayoutResponse';
  appointmentMonths: Array<Scalars['String']>;
  monthAppointments: Array<Array<Appointment>>;
};

export type DoctorProfile = {
  __typename?: 'DoctorProfile';
  about_me?: Maybe<Scalars['String']>;
  awards_honors_recognition?: Maybe<Scalars['String']>;
  certification_and_licensure?: Maybe<Scalars['String']>;
  condition_treated?: Maybe<Scalars['String']>;
  connect_details_submitted: Scalars['Boolean'];
  deletedAt: Scalars['DateTime'];
  doctor_id: Scalars['Int'];
  educational_background?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  language?: Maybe<Scalars['JSON']>;
  professional_experience?: Maybe<Scalars['String']>;
  profile_image?: Maybe<Scalars['String']>;
  profile_video?: Maybe<Scalars['String']>;
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
  languageId: Scalars['Int'];
  questionnaire?: Maybe<Scalars['JSON']>;
  user?: Maybe<User>;
};

export type DoctorSchedule = {
  __typename?: 'DoctorSchedule';
  appointment?: Maybe<Appointment>;
  createdAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  doctorId: Scalars['Float'];
  endDay: Scalars['Float'];
  endTime: Scalars['String'];
  id: Scalars['ID'];
  startDay: Scalars['Float'];
  startTime: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type DueDate = {
  endDate?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
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

export type GetAllChannelFilterInput = {
  searchString?: InputMaybe<Scalars['String']>;
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
  status2?: InputMaybe<Scalars['String']>;
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

export type GetDoctorScheduleFilterInput = {
  startDay: Scalars['Int'];
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
  status2?: InputMaybe<Scalars['String']>;
};

export type GetPhysiciansInput = {
  cityId?: InputMaybe<Scalars['Int']>;
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
  charges?: InputMaybe<AppointmentTotalCharges>;
  dueDate?: InputMaybe<ScheduleDate>;
  paymentStatus?: InputMaybe<Scalars['String']>;
  refunds?: InputMaybe<RefundCharges>;
  searchString?: InputMaybe<Scalars['String']>;
  serviceId?: InputMaybe<Scalars['Int']>;
  serviceName?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  stripeFee?: InputMaybe<StripeProcessingFee>;
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

export type Language = {
  __typename?: 'Language';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
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

export type Meta = {
  __typename?: 'Meta';
  currentPage: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
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
  createLanguage: Language;
  createOrUpdateAppointmentNote: AppointmentNote;
  createOrUpdateDoctorQuestionnaire: DoctorQuestionnaire;
  createOrUpdateDoctorSchedule: Array<DoctorSchedule>;
  createPatientByAdmin: User;
  createPatientHealthHistory: PatientHealthHistory;
  createPhysiciansStripeConnectAccount: User;
  createServiceType: AppointmentServiceType;
  createStaff: User;
  createUser: User;
  deleteChat: ChatChannels;
  deleteDoctor: User;
  deleteDoctorWithAllDataHardDelete: User;
  deleteServiceType: AppointmentServiceType;
  enableOrDisableDoctor: User;
  enableOrDisablePatient: User;
  enableOrDisableStaff: User;
  generateRTCToken: RtcTokenResponse;
  getOnboardingAccountLink: DoctorCreateLinkResponse;
  login: LoginResponse;
  markMessagesAsRead: ChatChannels;
  markedAppointmentAsCompleted: Appointment;
  onboardingTosAcceptance: User;
  payment: Transaction;
  proposeNewTime: Appointment;
  publishOrUnpublishDoctor: User;
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
  resendActivationLink: User;
  setAsDefaultCard: UserCard;
  setDoctorPassword: User;
  suggestNewTime: Appointment;
  toggleEmailPreferences: UserEmailPreferencesResponse;
  updateAdminUser: User;
  updateAppointment: Appointment;
  updateAppointmentAttachments: Appointment;
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


export type MutationCreateLanguageArgs = {
  createLanguageInput: CreateLanguageInput;
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


export type MutationDeleteChatArgs = {
  channelId: Scalars['Int'];
};


export type MutationDeleteDoctorArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteDoctorWithAllDataHardDeleteArgs = {
  id: Scalars['Int'];
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


export type MutationGetOnboardingAccountLinkArgs = {
  doctorId: Scalars['Int'];
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationMarkMessagesAsReadArgs = {
  channelId: Scalars['Int'];
};


export type MutationMarkedAppointmentAsCompletedArgs = {
  appointmentId: Scalars['Int'];
};


export type MutationOnboardingTosAcceptanceArgs = {
  doctorId: Scalars['Int'];
  ip: Scalars['String'];
};


export type MutationPaymentArgs = {
  paymentInput: PaymentInput;
};


export type MutationProposeNewTimeArgs = {
  proposeNewTimeInput: ProposeNewTimeInput;
};


export type MutationPublishOrUnpublishDoctorArgs = {
  id: Scalars['Int'];
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


export type MutationResendActivationLinkArgs = {
  email: Scalars['String'];
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


export type MutationUpdateAppointmentArgs = {
  updateAppointmentInput: UpdateAppointmentInput;
};


export type MutationUpdateAppointmentAttachmentsArgs = {
  updateAppointmentAttachmentsInput: UpdateAppointmentAttachmentsInput;
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

export type PaginationParams = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
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
  charges: Scalars['Float'];
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
  adminDashboard: AdminTransactionReportResponse;
  adminSettings: AdminSettingResponse;
  adminUser: User;
  adminUsers: UserPaginatedFilterResponse;
  appointment: Appointment;
  appointmentBanner: Array<Appointment>;
  appointmentCountByStatus: AppointmentsCountResponse;
  appointmentNote: AppointmentNote;
  appointmentNotes: Array<AppointmentNote>;
  appointmentQuestionnaire: AppointmentHealthHistory;
  appointmentServiceType: AppointmentServiceType;
  appointmentServiceTypes: Array<AppointmentServiceType>;
  appointments: AppointmentPaginatedResponse;
  appointmentsReminderBanner: Appointment;
  checkEmailAvailability: EmailAvailableResponse;
  cities: Array<City>;
  city: City;
  countries: Array<Country>;
  country: Country;
  currentAppointments: AppointmentPaginatedResponse;
  doctorBillingMethod: DoctorBillingMethod;
  doctorBillingMethods: Array<DoctorBillingMethod>;
  doctorPayouts?: Maybe<DoctorPayoutResponse>;
  doctorPayoutsByAdmin?: Maybe<AdminPayoutResponse>;
  doctorProfile: DoctorProfile;
  doctorProfiles: Array<DoctorProfile>;
  doctorQuestionnaire: DoctorQuestionnaire;
  doctorQuestionnaires: Array<DoctorQuestionnaire>;
  doctorSchedules: Array<DoctorSchedule>;
  doctorSchedulesByDay: Array<DoctorSchedule>;
  getAdminTransactionReport: AdminTransactionReportResponse;
  getAdminTransactionReportListing: TransactionPaginatedResponse;
  getAllCards: Array<UserCard>;
  getAllChatChannels: Array<ChatChannels>;
  getAppointmentPrice: AppointmentPriceResponse;
  getAppointmentPriceForRequest: AppointmentPriceResponse;
  getCard: UserCard;
  getChannelMessages: Array<ChatMessages>;
  getCitiesByState: Array<City>;
  getDoctorEarnings: DoctorEarningsResponse;
  getPatients: UserPaginatedResponse;
  getPhysicians: UserPaginatedResponse;
  getStatesByCountry: Array<State>;
  getTimeZones: Array<TimeZones>;
  getTransactionFilter: TransactionPaginatedResponse;
  getUserFilter: UserPaginatedFilterResponse;
  language: Language;
  languages: Array<Language>;
  patientHealthHistory?: Maybe<PatientHealthHistory>;
  patientHealthHistorys: Array<PatientHealthHistory>;
  patientLastQuestionnaire: AppointmentHealthHistory;
  physicianAppointments: AppointmentPaginatedResponse;
  physiciansPatients: UserPaginatedResponse;
  staff: UserPaginatedResponse;
  staffDetail: User;
  state: State;
  states: Array<State>;
  transaction: Transaction;
  transactions: TransactionPaginatedResponse;
  user: User;
  userEmailPreferences: UserEmailPreferencesResponse;
  users: UserPaginatedResponse;
};


export type QueryAdminDashboardArgs = {
  filter: GetTransectionInput;
};


export type QueryAdminUserArgs = {
  id: Scalars['Int'];
};


export type QueryAdminUsersArgs = {
  filter: GetAdminUsersFilterInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
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
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
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
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
};


export type QueryDoctorBillingMethodArgs = {
  id: Scalars['Int'];
};


export type QueryDoctorBillingMethodsArgs = {
  doctorId: Scalars['Int'];
};


export type QueryDoctorPayoutsArgs = {
  doctorId: Scalars['Int'];
};


export type QueryDoctorProfileArgs = {
  doctor_id: Scalars['Int'];
};


export type QueryDoctorQuestionnaireArgs = {
  doctorId: Scalars['Int'];
  languageId?: InputMaybe<Scalars['Int']>;
};


export type QueryDoctorSchedulesArgs = {
  doctorId: Scalars['Int'];
};


export type QueryDoctorSchedulesByDayArgs = {
  doctorId: Scalars['Int'];
  filter: GetDoctorScheduleFilterInput;
};


export type QueryGetAdminTransactionReportArgs = {
  filter: GetTransectionInput;
};


export type QueryGetAdminTransactionReportListingArgs = {
  filter: GetTransectionInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
};


export type QueryGetAllCardsArgs = {
  user_id: Scalars['Int'];
};


export type QueryGetAllChatChannelsArgs = {
  filter: GetAllChannelFilterInput;
};


export type QueryGetAppointmentPriceArgs = {
  cardId?: InputMaybe<Scalars['Int']>;
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
  filter: GetTransectionInput;
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetPatientsArgs = {
  filter: GetPatientsInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
};


export type QueryGetPhysiciansArgs = {
  filter: GetPhysiciansInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
};


export type QueryGetStatesByCountryArgs = {
  country_id: Scalars['Int'];
};


export type QueryGetTransactionFilterArgs = {
  filter: GetTransectionInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
};


export type QueryGetUserFilterArgs = {
  filter: GetUserFilter;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
};


export type QueryLanguageArgs = {
  id: Scalars['Int'];
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
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
};


export type QueryPhysiciansPatientsArgs = {
  filter: GetPhysiciansPatientsInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
};


export type QueryStaffArgs = {
  filter: GetStaffFilter;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
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


export type QueryTransactionsArgs = {
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  pagination?: InputMaybe<PaginationParams>;
};

export type ReBookAppointmentInput = {
  appointmentId: Scalars['Int'];
  selectedSlotId: Scalars['Float'];
};

export type RefundCharges = {
  finalRefunds?: InputMaybe<Scalars['Int']>;
  initialRefunds?: InputMaybe<Scalars['Int']>;
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

export type ScheduleDate = {
  endDate?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type SortingParams = {
  column: Scalars['String'];
  order: Scalars['String'];
};

export type State = {
  __typename?: 'State';
  country_id: Scalars['Float'];
  id: Scalars['Float'];
  state_name: Scalars['String'];
};

export type StripeProcessingFee = {
  finalFee?: InputMaybe<Scalars['Int']>;
  initialFee?: InputMaybe<Scalars['Int']>;
};

export type SuggestNewTimeInput = {
  /** Appointment id required */
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

export type TimeZones = {
  __typename?: 'TimeZones';
  countryCode: Scalars['String'];
  countryName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  gmtOffset: Scalars['String'];
  id: Scalars['Int'];
  timeZone: Scalars['String'];
  timeZoneName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
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
  medicus_percentage: Scalars['String'];
  payment_status?: Maybe<Scalars['String']>;
  payout_failed: Scalars['Boolean'];
  status: Scalars['String'];
  stripeFee: Scalars['Float'];
  tax: Scalars['Float'];
  transactionId: Scalars['String'];
};

export type TransactionPaginatedResponse = {
  __typename?: 'TransactionPaginatedResponse';
  items: Array<Transaction>;
  links?: Maybe<Scalars['String']>;
  meta: Meta;
};

export type UnReadMessagesCountResponse = {
  __typename?: 'UnReadMessagesCountResponse';
  channelMessagesCount: Scalars['Float'];
};

export type UpdateAdminUserInput = {
  contact_number?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  profile_picture?: InputMaybe<Scalars['String']>;
  timeZoneId?: InputMaybe<Scalars['Float']>;
};

export type UpdateAppointmentAttachmentsInput = {
  id: Scalars['Int'];
  reportUrl: Scalars['JSON'];
};

export type UpdateAppointmentInput = {
  charges: Scalars['Int'];
  doctorId: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  patientId: Scalars['Int'];
  serviceId: Scalars['Int'];
};

export type UpdateDoctorPercentage = {
  doctor_percentage: Scalars['String'];
};

export type UpdateDoctorProfileInput = {
  about_me?: InputMaybe<Scalars['String']>;
  awards_honors_recognition?: InputMaybe<Array<AwardsHonorsRecognitionUpdate>>;
  certification_and_licensure?: InputMaybe<Array<CertificationLicensureUpdate>>;
  city_id: Scalars['Float'];
  condition_treated?: InputMaybe<Scalars['String']>;
  contact_number: Scalars['String'];
  country_id: Scalars['Float'];
  doctor_id: Scalars['Float'];
  educational_background?: InputMaybe<Array<EducationalBackgroundUpdate>>;
  email: Scalars['String'];
  first_name: Scalars['String'];
  language?: InputMaybe<Scalars['JSON']>;
  last_name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  professional_experience?: InputMaybe<Array<ProfessionalExperience2>>;
  profile_image?: InputMaybe<Scalars['String']>;
  profile_video?: InputMaybe<Scalars['String']>;
  specialization?: InputMaybe<Scalars['String']>;
  state_id: Scalars['Float'];
  streetAddress: Scalars['String'];
  timeZoneId?: InputMaybe<Scalars['Float']>;
  year_of_experience?: InputMaybe<Scalars['Float']>;
  zip_code?: InputMaybe<Scalars['String']>;
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
  timeZoneId?: InputMaybe<Scalars['Float']>;
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
  timeZoneId?: InputMaybe<Scalars['Float']>;
  zip_code?: InputMaybe<Scalars['String']>;
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
  is_active: Scalars['Boolean'];
  lastLoginDateTime?: Maybe<Scalars['DateTime']>;
  last_name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  patientHealthHistory?: Maybe<PatientHealthHistory>;
  patientProfile?: Maybe<PatientProfile>;
  role?: Maybe<Scalars['String']>;
  state?: Maybe<State>;
  state_id?: Maybe<Scalars['Int']>;
  status: Scalars['Boolean'];
  streetAddress?: Maybe<Scalars['String']>;
  timeZone?: Maybe<TimeZones>;
  timeZoneId?: Maybe<Scalars['Int']>;
  tos_acceptance: Scalars['Boolean'];
  zip_code?: Maybe<Scalars['String']>;
};

export type UserCard = {
  __typename?: 'UserCard';
  card_digits: Scalars['Int'];
  card_holder_name?: Maybe<Scalars['String']>;
  card_id: Scalars['String'];
  card_type: Scalars['String'];
  country: Scalars['String'];
  currency: Scalars['String'];
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

export type UserPaginatedFilterResponse = {
  __typename?: 'UserPaginatedFilterResponse';
  items: Array<User>;
  links?: Maybe<Scalars['String']>;
  meta: Meta;
};

export type UserPaginatedResponse = {
  __typename?: 'UserPaginatedResponse';
  items: Array<User>;
  links?: Maybe<Scalars['String']>;
  meta: Meta;
};

export type UpdateAdminUserMutationVariables = Exact<{
  updateAdminUserInput: UpdateAdminUserInput;
  id: Scalars['Int'];
}>;


export type UpdateAdminUserMutation = { __typename?: 'Mutation', updateAdminUser: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, password?: string | null, contact_number?: string | null } };

export type UpdateAppointmentMutationVariables = Exact<{
  updateAppointmentInput: UpdateAppointmentInput;
}>;


export type UpdateAppointmentMutation = { __typename?: 'Mutation', updateAppointment: { __typename?: 'Appointment', doctor?: { __typename?: 'User', first_name: string } | null, appointmentTypeProposed?: { __typename?: 'AppointmentTypeProposedResponse', type?: string | null, serviceId?: number | null } | null, serviceType?: { __typename?: 'AppointmentServiceType', id: number, name: string, price: number } | null } };

export type DeleteDoctorMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteDoctorMutation = { __typename?: 'Mutation', deleteDoctor: { __typename?: 'User', id: number } };

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


export type CreateChatMessageMutation = { __typename?: 'Mutation', createChatMessage: { __typename?: 'ChatMessages', id: number, channelId: number, senderId: number, receiverId: number, message?: string | null, isRead: boolean, messageType?: string | null, createdAt: any, sender?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null, receiver?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null } };

export type ResendActivationLinkMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResendActivationLinkMutation = { __typename?: 'Mutation', resendActivationLink: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender?: string | null, date_of_birth?: any | null, contact_number?: string | null, streetAddress?: string | null, country_id?: number | null, state_id?: number | null, city_id?: number | null, zip_code?: string | null, password?: string | null, status: boolean, role?: string | null, doctorId?: number | null, createdAt: any } };

export type CreateDoctorScheduleMutationVariables = Exact<{
  doctorId: Scalars['Int'];
  startDay: Scalars['Int'];
  endDay: Scalars['Int'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
}>;


export type CreateDoctorScheduleMutation = { __typename?: 'Mutation', createDoctorSchedule: { __typename?: 'DoctorSchedule', id: string, startTime: string, endTime: string, startDay: number, endDay: number } };

export type RemoveDoctorScheduleMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveDoctorScheduleMutation = { __typename?: 'Mutation', removeOneDoctorSchedule: { __typename?: 'DoctorSchedule', startDay: number, endDay: number, id: string } };

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

export type OnboardingTosAcceptanceMutationVariables = Exact<{
  doctorId: Scalars['Int'];
  ip: Scalars['String'];
}>;


export type OnboardingTosAcceptanceMutation = { __typename?: 'Mutation', onboardingTosAcceptance: { __typename?: 'User', tos_acceptance: boolean } };

export type GetOnboardingAccountLinkMutationVariables = Exact<{
  doctorId: Scalars['Int'];
}>;


export type GetOnboardingAccountLinkMutation = { __typename?: 'Mutation', getOnboardingAccountLink: { __typename?: 'DoctorCreateLinkResponse', created?: number | null, expires_at?: number | null, url?: string | null } };

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


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', access_token: string, user: { __typename?: 'User', id: number, email: string, role?: string | null, first_name: string, last_name: string, doctorId?: number | null, patientProfile?: { __typename?: 'PatientProfile', profileImage?: string | null } | null, doctorProfile?: { __typename?: 'DoctorProfile', profile_image?: string | null, specialization?: string | null } | null, adminProfilePicture?: { __typename?: 'AdminProfilePicture', profile_picture?: string | null } | null, timeZone?: { __typename?: 'TimeZones', countryName: string, countryCode: string, timeZone: string, id: number, gmtOffset: string } | null } } };

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


export type UpdateDoctorProfileMutation = { __typename?: 'Mutation', updateDoctorProfile: { __typename?: 'DoctorProfile', id: number, doctor_id: number, year_of_experience?: number | null, specialization?: string | null, condition_treated?: string | null, educational_background?: string | null, professional_experience?: string | null, certification_and_licensure?: string | null, awards_honors_recognition?: string | null, language?: any | null, about_me?: string | null, profile_image?: string | null, profile_video?: string | null, user?: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender?: string | null, streetAddress?: string | null, contact_number?: string | null, country_id?: number | null, state_id?: number | null, city_id?: number | null, timeZoneId?: number | null, zip_code?: string | null, password?: string | null, status: boolean, role?: string | null, city?: { __typename?: 'City', city_name: string } | null, state?: { __typename?: 'State', state_name: string } | null, country?: { __typename?: 'Country', country_name: string } | null } | null } };

export type EnableOrDisableDoctorMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EnableOrDisableDoctorMutation = { __typename?: 'Mutation', enableOrDisableDoctor: { __typename?: 'User', id: number, is_active: boolean } };

export type PublishOrUnpublishDoctorMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PublishOrUnpublishDoctorMutation = { __typename?: 'Mutation', publishOrUnpublishDoctor: { __typename?: 'User', id: number, status: boolean } };

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


export type CreatePatientByAdminMutation = { __typename?: 'Mutation', createPatientByAdmin: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender?: string | null, date_of_birth?: any | null, contact_number?: string | null, streetAddress?: string | null, country_id?: number | null, state_id?: number | null, city_id?: number | null, zip_code?: string | null, password?: string | null, status: boolean, role?: string | null, doctorId?: number | null, createdAt: any, patientHealthHistory?: { __typename?: 'PatientHealthHistory', id?: number | null, user_id: number, history?: any | null } | null } };

export type ToggleEmailPreferencesMutationVariables = Exact<{
  toggleEmailPreferencesInput: TogglePreference;
}>;


export type ToggleEmailPreferencesMutation = { __typename?: 'Mutation', toggleEmailPreferences: { __typename?: 'UserEmailPreferencesResponse', patient_registration_update?: boolean | null, physician_registration_update?: boolean | null, appointment_accepted_by_doctor?: boolean | null, appointment_rescheduled_by_doctor?: boolean | null, appointment_reminder?: boolean | null, admin_appointment_create_update?: boolean | null, new_message_received?: boolean | null, appointment_slot_suggested_by_doctor?: boolean | null, appointment_requested?: boolean | null, appointment_accepted_by_patient?: boolean | null, transaction_successful_alert?: boolean | null } };

export type UpdateAppointmentAttachmentsMutationVariables = Exact<{
  updateAppointmentAttachmentsInput: UpdateAppointmentAttachmentsInput;
}>;


export type UpdateAppointmentAttachmentsMutation = { __typename?: 'Mutation', updateAppointmentAttachments: { __typename?: 'Appointment', id?: number | null, reportUrl?: any | null } };

export type GetPatientCurrentAppointmentsQueryVariables = Exact<{
  filter: GetAppointmentInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
}>;


export type GetPatientCurrentAppointmentsQuery = { __typename?: 'Query', appointments: { __typename?: 'AppointmentPaginatedResponse', items: Array<{ __typename?: 'Appointment', id?: number | null, doctor?: { __typename?: 'User', id: number } | null }> } };

export type GetAdminUsersQueryVariables = Exact<{
  filter: GetAdminUsersFilterInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
}>;


export type GetAdminUsersQuery = { __typename?: 'Query', adminUsers: { __typename?: 'UserPaginatedFilterResponse', items: Array<{ __typename?: 'User', id: number, first_name: string, last_name: string, email: string, createdAt: any, status: boolean }>, meta: { __typename?: 'Meta', totalPages: number, currentPage: number, totalItems: number } } };

export type AdminDashboardQueryVariables = Exact<{
  filter: GetTransectionInput;
}>;


export type AdminDashboardQuery = { __typename?: 'Query', adminDashboard: { __typename?: 'AdminTransactionReportResponse', total_number_of_users?: number | null, total_number_of_physicians?: number | null, total_number_of_consultation?: number | null, total_number_of_second_opinions?: number | null, net_gross_sale?: number | null, net_physician_fee?: number | null, total_medicus_revenue?: number | null, total_number_of_appointments?: number | null } };

export type AdminPhysicianAppointmentQueryVariables = Exact<{
  filter: GetAppointmentInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
}>;


export type AdminPhysicianAppointmentQuery = { __typename?: 'Query', appointments: { __typename?: 'AppointmentPaginatedResponse', items: Array<{ __typename?: 'Appointment', id?: number | null, charges: number, status?: string | null, appointmentTypeProposed?: { __typename?: 'AppointmentTypeProposedResponse', type?: string | null } | null, patient?: { __typename?: 'User', first_name: string, last_name: string, email: string, patientProfile?: { __typename?: 'PatientProfile', profileImage?: string | null } | null } | null, doctor?: { __typename?: 'User', first_name: string, last_name: string } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', startTime: any, endTime: any, selected: boolean }> | null, appointmentSchedule?: { __typename?: 'DoctorSchedule', startTime: string, endTime: string } | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, appointmentCharges?: { __typename?: 'AppointmentPriceResponse', total?: number | null } | null, serviceType?: { __typename?: 'AppointmentServiceType', name: string } | null }>, meta: { __typename?: 'Meta', totalPages: number, currentPage: number, totalItems: number } } };

export type GetPatientsQueryVariables = Exact<{
  filter: GetPatientsInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
}>;


export type GetPatientsQuery = { __typename?: 'Query', getPatients: { __typename?: 'UserPaginatedResponse', items: Array<{ __typename?: 'User', id: number, first_name: string, last_name: string, email: string, contact_number?: string | null, createdAt: any, streetAddress?: string | null, zip_code?: string | null, status: boolean, date_of_birth?: any | null, state?: { __typename?: 'State', state_name: string } | null, city?: { __typename?: 'City', city_name: string } | null, country?: { __typename?: 'Country', country_name: string } | null }>, meta: { __typename?: 'Meta', totalPages: number, currentPage: number, totalItems: number } } };

export type PhysicianPaymentByAdminMutationVariables = Exact<{
  paymentInput: PaymentInput;
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

export type GetAdminTransactionReportListingQueryVariables = Exact<{
  filter: GetTransectionInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
}>;


export type GetAdminTransactionReportListingQuery = { __typename?: 'Query', getAdminTransactionReportListing: { __typename?: 'TransactionPaginatedResponse', items: Array<{ __typename?: 'Transaction', id: number, appointmentId: number, payment_status?: string | null, appointmentCharges: number, amountReceived: number, status: string, stripeFee: number, doctor_percentage: string, medicus_percentage: string, appointment?: { __typename?: 'Appointment', createdAt: any, status?: string | null, requestedDate?: any | null, appointmentTypeProposed?: { __typename?: 'AppointmentTypeProposedResponse', type?: string | null } | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null } | null, transaction?: { __typename?: 'Transaction', amountReceived: number, status: string } | null, patient?: { __typename?: 'User', first_name: string, last_name: string } | null, doctor?: { __typename?: 'User', first_name: string, last_name: string } | null, serviceType?: { __typename?: 'AppointmentServiceType', name: string } | null, appointmentCharges?: { __typename?: 'AppointmentPriceResponse', appointmentPrice?: number | null, tax?: number | null, systemFee?: number | null, total?: number | null } | null } | null }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number } } };

export type GetAdminTransactionReportQueryVariables = Exact<{
  filter: GetTransectionInput;
}>;


export type GetAdminTransactionReportQuery = { __typename?: 'Query', getAdminTransactionReport: { __typename?: 'AdminTransactionReportResponse', total_number_of_users?: number | null, total_medicus_revenue?: number | null, total_sale?: number | null, net_gross_sale?: number | null, net_physician_fee?: number | null, total_number_of_consultation?: number | null, total_number_of_second_opinions?: number | null } };

export type DoctorPayoutsByAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type DoctorPayoutsByAdminQuery = { __typename?: 'Query', doctorPayoutsByAdmin?: { __typename?: 'AdminPayoutResponse', appointmentMonths: Array<string>, doctorEarnings: Array<Array<string>>, monthAppointments?: Array<Array<Array<{ __typename?: 'Appointment', id?: number | null, status?: string | null, doctorId?: number | null, serviceType?: { __typename?: 'AppointmentServiceType', name: string } | null, appointmentTypeProposed?: { __typename?: 'AppointmentTypeProposedResponse', type?: string | null } | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null } | null, appointmentCharges?: { __typename?: 'AppointmentPriceResponse', appointmentPrice?: number | null, tax?: number | null, systemFee?: number | null, total?: number | null } | null, patient?: { __typename?: 'User', first_name: string, last_name: string } | null, transaction?: { __typename?: 'Transaction', id: number, createdAt: any, transactionId: string, tax: number, doctor_percentage: string, medicus_percentage: string, stripeFee: number, amountReceived: number, status: string, payment_status?: string | null, appointmentCharges: number } | null }>>> | null } | null };

export type GetAllChatChannelsQueryVariables = Exact<{
  filter: GetAllChannelFilterInput;
}>;


export type GetAllChatChannelsQuery = { __typename?: 'Query', getAllChatChannels: Array<{ __typename?: 'ChatChannels', id: number, channelName: string, doctorId?: number | null, patientId?: number | null, isAdminChat: boolean, createdAt: any, unReadMessagesCount?: { __typename?: 'UnReadMessagesCountResponse', channelMessagesCount: number } | null, lastMessage?: { __typename?: 'ChatMessages', channelId: number, senderId: number, receiverId: number, message?: string | null, messageType?: string | null, createdAt: any } | null, receiverDetail?: { __typename?: 'User', id: number, first_name: string, last_name: string, role?: string | null, email: string, adminProfilePicture?: { __typename?: 'AdminProfilePicture', profile_picture?: string | null } | null, doctorProfile?: { __typename?: 'DoctorProfile', profile_image?: string | null } | null, patientProfile?: { __typename?: 'PatientProfile', profileImage?: string | null } | null } | null, participants?: Array<{ __typename?: 'ChatParticipants', id: number, channelId: number, participantId: number, channel?: { __typename?: 'ChatChannels', id: number, channelName: string, doctorId?: number | null, patientId?: number | null, isAdminChat: boolean } | null, userDetails?: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, role?: string | null, chatChannel?: { __typename?: 'ChatChannels', channelName: string, doctorId?: number | null, patientId?: number | null, isAdminChat: boolean } | null, doctorProfile?: { __typename?: 'DoctorProfile', profile_image?: string | null, user?: { __typename?: 'User', first_name: string, last_name: string } | null } | null, patientProfile?: { __typename?: 'PatientProfile', profileImage?: string | null, user?: { __typename?: 'User', first_name: string, last_name: string } | null } | null, adminProfilePicture?: { __typename?: 'AdminProfilePicture', id: number, profile_picture?: string | null, user?: { __typename?: 'User', first_name: string, last_name: string } | null } | null } | null }> | null }> };

export type GetChannelMessagesQueryVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type GetChannelMessagesQuery = { __typename?: 'Query', getChannelMessages: Array<{ __typename?: 'ChatMessages', id: number, channelId: number, senderId: number, message?: string | null, messageType?: string | null, createdAt: any, sender?: { __typename?: 'User', first_name: string, last_name: string, doctorProfile?: { __typename?: 'DoctorProfile', profile_image?: string | null } | null, patientProfile?: { __typename?: 'PatientProfile', profileImage?: string | null } | null, adminProfilePicture?: { __typename?: 'AdminProfilePicture', id: number, profile_picture?: string | null } | null } | null, receiver?: { __typename?: 'User', role?: string | null, adminProfilePicture?: { __typename?: 'AdminProfilePicture', id: number, profile_picture?: string | null } | null } | null }> };

export type CheckEmailAvailabilityQueryVariables = Exact<{
  emailAvailableInput: EmailAvailableInput;
}>;


export type CheckEmailAvailabilityQuery = { __typename?: 'Query', checkEmailAvailability: { __typename?: 'EmailAvailableResponse', isEmailAvailable: boolean } };

export type GetAppointmentPriceForRequestQueryVariables = Exact<{
  serviceId: Scalars['Int'];
  patientId: Scalars['Int'];
}>;


export type GetAppointmentPriceForRequestQuery = { __typename?: 'Query', getAppointmentPriceForRequest: { __typename?: 'AppointmentPriceResponse', appointmentPrice?: number | null, tax?: number | null, systemFee?: number | null, total?: number | null } };

export type GetAppointmentPriceQueryVariables = Exact<{
  id: Scalars['Int'];
  cardId?: InputMaybe<Scalars['Int']>;
}>;


export type GetAppointmentPriceQuery = { __typename?: 'Query', getAppointmentPrice: { __typename?: 'AppointmentPriceResponse', appointmentPrice?: number | null, tax?: number | null, systemFee?: number | null, total?: number | null } };

export type DeleteChatChannelMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteChatChannelMutation = { __typename?: 'Mutation', deleteChat: { __typename?: 'ChatChannels', id: number } };

export type MarkMessagesAsReadMutationMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MarkMessagesAsReadMutationMutation = { __typename?: 'Mutation', markMessagesAsRead: { __typename?: 'ChatChannels', id: number } };

export type GetTimeZonesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTimeZonesQuery = { __typename?: 'Query', getTimeZones: Array<{ __typename?: 'TimeZones', id: number, countryName: string, countryCode: string, timeZone: string, gmtOffset: string, timeZoneName: string }> };

export type AppointmentCountByStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type AppointmentCountByStatusQuery = { __typename?: 'Query', appointmentCountByStatus: { __typename?: 'AppointmentsCountResponse', upcoming: number, pending: number, canceled: number, history: number, reschedule: number, propose: number } };

export type GetUnreadMessageCountQueryVariables = Exact<{
  filter: GetAllChannelFilterInput;
}>;


export type GetUnreadMessageCountQuery = { __typename?: 'Query', getAllChatChannels: Array<{ __typename?: 'ChatChannels', unReadMessagesCount?: { __typename?: 'UnReadMessagesCountResponse', channelMessagesCount: number } | null }> };

export type DoctorBillingMethodsQueryVariables = Exact<{
  doctorId: Scalars['Int'];
}>;


export type DoctorBillingMethodsQuery = { __typename?: 'Query', doctorBillingMethods: Array<{ __typename?: 'DoctorBillingMethod', id: string, bankId: string, bankName: string, bankAccountNumber: string, accountTitle: string, routingNumber: string }> };

export type DoctorAppointmentDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DoctorAppointmentDetailQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id?: number | null, status?: string | null, scheduleId?: number | null, doctorId?: number | null, patientId?: number | null, requestedDate?: any | null, createdAt: any, reportUrl?: any | null, doctor?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null, patient?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', id: number, startTime: any, endTime: any, selected: boolean }> | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, appointmentTypeProposed?: { __typename?: 'AppointmentTypeProposedResponse', type?: string | null, price?: number | null, dateTime: Array<{ __typename?: 'DateTimeSlots', date?: string | null, startTime?: string | null, endTime?: string | null }> } | null, serviceType?: { __typename?: 'AppointmentServiceType', id: number, name: string, price: number } | null, transaction?: { __typename?: 'Transaction', createdAt: any } | null, appointmentHealthHistory?: { __typename?: 'AppointmentHealthHistory', history: any } | null } };

export type DoctorAppointmentDetailAppointmentInfoQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DoctorAppointmentDetailAppointmentInfoQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id?: number | null, status?: string | null, requestedDate?: any | null, createdAt: any, charges: number, doctor?: { __typename?: 'User', id: number, first_name: string, last_name: string, doctorProfile?: { __typename?: 'DoctorProfile', specialization?: string | null, profile_image?: string | null } | null, timeZone?: { __typename?: 'TimeZones', timeZone: string, timeZoneName: string } | null } | null, patient?: { __typename?: 'User', id: number, first_name: string, last_name: string, patientProfile?: { __typename?: 'PatientProfile', profileImage?: string | null } | null } | null, serviceType?: { __typename?: 'AppointmentServiceType', id: number, name: string, price: number } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', id: number, startTime: any, endTime: any, selected: boolean }> | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, appointmentSchedule?: { __typename?: 'DoctorSchedule', startTime: string, endTime: string } | null, appointmentTypeProposed?: { __typename?: 'AppointmentTypeProposedResponse', serviceId?: number | null, type?: string | null, price?: number | null, dateTime: Array<{ __typename?: 'DateTimeSlots', date?: string | null, startTime?: string | null, endTime?: string | null }> } | null, transaction?: { __typename?: 'Transaction', status: string, amountReceived: number } | null, appointmentCharges?: { __typename?: 'AppointmentPriceResponse', total?: number | null, appointmentPrice?: number | null } | null } };

export type DoctorAppointmentDetailPatientInfoQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DoctorAppointmentDetailPatientInfoQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', serviceType?: { __typename?: 'AppointmentServiceType', name: string } | null, patient?: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender?: string | null, date_of_birth?: any | null, contact_number?: string | null, streetAddress?: string | null, country_id?: number | null, city_id?: number | null, city?: { __typename?: 'City', city_name: string } | null, state?: { __typename?: 'State', state_name: string } | null, country?: { __typename?: 'Country', country_name: string } | null, patientProfile?: { __typename?: 'PatientProfile', id: number, maritalStatus?: string | null, children?: number | null, occupation?: string | null, occupationalExposure?: string | null, exposureDuration?: string | null, pets?: string | null, profileImage?: string | null } | null } | null } };

export type PhysicianAppointmentsQueryVariables = Exact<{
  filter: GetPhysicianAppointmentInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
}>;


export type PhysicianAppointmentsQuery = { __typename?: 'Query', physicianAppointments: { __typename?: 'AppointmentPaginatedResponse', items: Array<{ __typename?: 'Appointment', id?: number | null, createdAt: any, requestedDate?: any | null, charges: number, status?: string | null, doctor?: { __typename?: 'User', first_name: string, last_name: string, timeZone?: { __typename?: 'TimeZones', timeZone: string, timeZoneName: string, id: number } | null } | null, patient?: { __typename?: 'User', first_name: string, last_name: string } | null, serviceType?: { __typename?: 'AppointmentServiceType', name: string } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', startTime: any, endTime: any, selected: boolean }> | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, appointmentTypeProposed?: { __typename?: 'AppointmentTypeProposedResponse', type?: string | null, price?: number | null, dateTime: Array<{ __typename?: 'DateTimeSlots', date?: string | null, startTime?: string | null, endTime?: string | null }> } | null, transaction?: { __typename?: 'Transaction', payment_status?: string | null, status: string, amountReceived: number } | null }>, meta: { __typename?: 'Meta', totalPages: number, currentPage: number, totalItems: number } } };

export type PhysicianAppointmentsHistoryQueryVariables = Exact<{
  filter: GetAppointmentInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
}>;


export type PhysicianAppointmentsHistoryQuery = { __typename?: 'Query', appointments: { __typename?: 'AppointmentPaginatedResponse', items: Array<{ __typename?: 'Appointment', id?: number | null, doctorId?: number | null, charges: number, serviceId?: number | null, patientId?: number | null, createdAt: any, reportUrl?: any | null, requestedDate?: any | null, status?: string | null, serviceType?: { __typename?: 'AppointmentServiceType', name: string } | null, appointmentTypeProposed?: { __typename?: 'AppointmentTypeProposedResponse', type?: string | null, price?: number | null, serviceId?: number | null, dateTime: Array<{ __typename?: 'DateTimeSlots', date?: string | null, startTime?: string | null, endTime?: string | null }> } | null, patient?: { __typename?: 'User', id: number, first_name: string, last_name: string, gender?: string | null, email: string, date_of_birth?: any | null, contact_number?: string | null, country_id?: number | null, city_id?: number | null, city?: { __typename?: 'City', city_name: string } | null, state?: { __typename?: 'State', state_name: string } | null, country?: { __typename?: 'Country', country_name: string } | null, patientProfile?: { __typename?: 'PatientProfile', maritalStatus?: string | null, children?: number | null, occupation?: string | null, occupationalExposure?: string | null, pets?: string | null, profileImage?: string | null, exposureDuration?: string | null } | null, patientHealthHistory?: { __typename?: 'PatientHealthHistory', history?: any | null } | null } | null, appointmentHealthHistory?: { __typename?: 'AppointmentHealthHistory', history: any } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', startTime: any, endTime: any, selected: boolean }> | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, appointmentCharges?: { __typename?: 'AppointmentPriceResponse', appointmentPrice?: number | null, tax?: number | null, systemFee?: number | null, total?: number | null } | null, doctor?: { __typename?: 'User', id: number, first_name: string, last_name: string, doctorProfile?: { __typename?: 'DoctorProfile', specialization?: string | null, profile_image?: string | null, id: number, doctor_id: number, year_of_experience?: number | null, condition_treated?: string | null, educational_background?: string | null, professional_experience?: string | null, language?: any | null, about_me?: string | null, user?: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender?: string | null, country_id?: number | null, state_id?: number | null, city_id?: number | null, zip_code?: string | null, password?: string | null, status: boolean, role?: string | null, doctorSchedules?: Array<{ __typename?: 'DoctorSchedule', id: string, doctorId: number, startDay: number, endDay: number, startTime: string, endTime: string, createdAt: any, updatedAt: any }> | null } | null } | null, timeZone?: { __typename?: 'TimeZones', timeZone: string, timeZoneName: string } | null, doctorQuestionnaire?: { __typename?: 'DoctorQuestionnaire', id: number, doctorId: number, questionnaire?: any | null, languageId: number } | null } | null, transaction?: { __typename?: 'Transaction', status: string, amountReceived: number, appointmentCharges: number } | null }>, meta: { __typename?: 'Meta', totalPages: number, currentPage: number, totalItems: number } } };

export type GetTransactionFilterQueryVariables = Exact<{
  filter: GetTransectionInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
}>;


export type GetTransactionFilterQuery = { __typename?: 'Query', getTransactionFilter: { __typename?: 'TransactionPaginatedResponse', items: Array<{ __typename?: 'Transaction', id: number, appointmentId: number, transactionId: string, payment_status?: string | null, amountReceived: number, status: string, stripeFee: number, doctor_percentage: string, createdAt: any, appointmentCharges: number, tax: number, appointment?: { __typename?: 'Appointment', status?: string | null, patientId?: number | null, patient?: { __typename?: 'User', first_name: string, last_name: string } | null, serviceType?: { __typename?: 'AppointmentServiceType', id: number, name: string } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', selected: boolean, startTime: any, endTime: any }> | null, appointmentTypeProposed?: { __typename?: 'AppointmentTypeProposedResponse', type?: string | null, price?: number | null } | null } | null }>, meta: { __typename?: 'Meta', totalPages: number, currentPage: number, totalItems: number } } };

export type PhysiciansPatientsQueryVariables = Exact<{
  searchField?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
}>;


export type PhysiciansPatientsQuery = { __typename?: 'Query', physiciansPatients: { __typename?: 'UserPaginatedResponse', items: Array<{ __typename?: 'User', id: number, first_name: string, last_name: string, email: string, contact_number?: string | null, streetAddress?: string | null, country?: { __typename?: 'Country', country_name: string } | null, patientProfile?: { __typename?: 'PatientProfile', profileImage?: string | null } | null }>, meta: { __typename?: 'Meta', totalPages: number, currentPage: number, totalItems: number } } };

export type GetPhysiciansQueryVariables = Exact<{
  filter: GetPhysiciansInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
}>;


export type GetPhysiciansQuery = { __typename?: 'Query', getPhysicians: { __typename?: 'UserPaginatedResponse', items: Array<{ __typename?: 'User', id: number, first_name: string, last_name: string, email: string, streetAddress?: string | null, createdAt: any, lastLoginDateTime?: any | null, is_active: boolean, zip_code?: string | null, city?: { __typename?: 'City', city_name: string } | null, state?: { __typename?: 'State', state_name: string } | null, country?: { __typename?: 'Country', country_name: string } | null, doctorProfile?: { __typename?: 'DoctorProfile', language?: any | null, specialization?: string | null } | null }>, meta: { __typename?: 'Meta', totalPages: number, currentPage: number, totalItems: number } } };

export type GetAppointmentNoteByIdQueryVariables = Exact<{
  appointmentId: Scalars['Int'];
}>;


export type GetAppointmentNoteByIdQuery = { __typename?: 'Query', appointmentNote: { __typename?: 'AppointmentNote', id: number, appointmentId: number, subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean, createdAt: any, updatedAt: any, appointment?: { __typename?: 'Appointment', id?: number | null, patientId?: number | null, doctorId?: number | null, doctor?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null } | null } };

export type GetAllAppointmentNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAppointmentNotesQuery = { __typename?: 'Query', appointmentNotes: Array<{ __typename?: 'AppointmentNote', id: number, appointmentId: number, subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean, createdAt: any, updatedAt: any, appointment?: { __typename?: 'Appointment', id?: number | null, patientId?: number | null, doctorId?: number | null } | null }> };

export type DoctorPayoutsQueryVariables = Exact<{
  doctorId: Scalars['Int'];
}>;


export type DoctorPayoutsQuery = { __typename?: 'Query', doctorPayouts?: { __typename?: 'DoctorPayoutResponse', appointmentMonths: Array<string>, monthAppointments: Array<Array<{ __typename?: 'Appointment', id?: number | null, doctorId?: number | null, patientId?: number | null, appointmentTypeProposed?: { __typename?: 'AppointmentTypeProposedResponse', type?: string | null } | null, patient?: { __typename?: 'User', first_name: string, last_name: string } | null, serviceType?: { __typename?: 'AppointmentServiceType', name: string } | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, transaction?: { __typename?: 'Transaction', transactionId: string, appointmentId: number, id: number, doctor_percentage: string } | null }>> } | null };

export type DoctorSchedulesByDayQueryVariables = Exact<{
  doctorId: Scalars['Int'];
  filter: GetDoctorScheduleFilterInput;
}>;


export type DoctorSchedulesByDayQuery = { __typename?: 'Query', doctorSchedulesByDay: Array<{ __typename?: 'DoctorSchedule', id: string, startDay: number, endDay: number, startTime: string, endTime: string }> };

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


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, tos_acceptance: boolean, first_name: string, last_name: string, gender?: string | null, date_of_birth?: any | null, contact_number?: string | null, email: string, country_id?: number | null, city_id?: number | null, state_id?: number | null, zip_code?: string | null, is_active: boolean, streetAddress?: string | null, status: boolean, country?: { __typename?: 'Country', country_name: string } | null, state?: { __typename?: 'State', state_name: string } | null, city?: { __typename?: 'City', city_name: string } | null, patientProfile?: { __typename?: 'PatientProfile', maritalStatus?: string | null, profileImage?: string | null, children?: number | null, haveChildren?: string | null, occupation?: string | null, occupationalExposure?: string | null, pets?: string | null, petsAnswer?: string | null, exposureDuration?: string | null, userId: number } | null, doctorProfile?: { __typename?: 'DoctorProfile', id: number, doctor_id: number, connect_details_submitted: boolean, year_of_experience?: number | null, specialization?: string | null, condition_treated?: string | null, educational_background?: string | null, professional_experience?: string | null, language?: any | null, about_me?: string | null, profile_image?: string | null, profile_video?: string | null } | null, timeZone?: { __typename?: 'TimeZones', countryName: string, countryCode: string, timeZone: string, timeZoneName: string, id: number, gmtOffset: string } | null } };

export type DoctorProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type DoctorProfilesQuery = { __typename?: 'Query', doctorProfiles: Array<{ __typename?: 'DoctorProfile', id: number, doctor_id: number, year_of_experience?: number | null, specialization?: string | null, condition_treated?: string | null, educational_background?: string | null, professional_experience?: string | null, language?: any | null, about_me?: string | null, profile_image?: string | null, user?: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender?: string | null, doctorQuestionnaire?: { __typename?: 'DoctorQuestionnaire', id: number, doctorId: number, questionnaire?: any | null, languageId: number } | null } | null }> };

export type DoctorProfileQueryVariables = Exact<{
  doctor_id: Scalars['Int'];
}>;


export type DoctorProfileQuery = { __typename?: 'Query', doctorProfile: { __typename?: 'DoctorProfile', id: number, doctor_id: number, year_of_experience?: number | null, specialization?: string | null, condition_treated?: string | null, educational_background?: string | null, professional_experience?: string | null, awards_honors_recognition?: string | null, certification_and_licensure?: string | null, language?: any | null, about_me?: string | null, profile_image?: string | null, profile_video?: string | null, user?: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, gender?: string | null, streetAddress?: string | null, country_id?: number | null, state_id?: number | null, city_id?: number | null, zip_code?: string | null, password?: string | null, status: boolean, role?: string | null, contact_number?: string | null, country?: { __typename?: 'Country', country_name: string } | null, state?: { __typename?: 'State', state_name: string } | null, city?: { __typename?: 'City', city_name: string } | null, doctorSchedules?: Array<{ __typename?: 'DoctorSchedule', id: string, doctorId: number, endDay: number, startDay: number, startTime: string, endTime: string, createdAt: any, updatedAt: any }> | null, timeZone?: { __typename?: 'TimeZones', timeZone: string, timeZoneName: string, id: number } | null } | null } };

export type GetAllRequestedAppointmentsQueryVariables = Exact<{
  filter: GetAppointmentInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
}>;


export type GetAllRequestedAppointmentsQuery = { __typename?: 'Query', appointments: { __typename?: 'AppointmentPaginatedResponse', items: Array<{ __typename?: 'Appointment', id?: number | null, patientId?: number | null, doctorId?: number | null, serviceId?: number | null, requestedDate?: any | null, reportUrl?: any | null, createdAt: any, status?: string | null, charges: number, patient?: { __typename?: 'User', first_name: string, last_name: string, timeZone?: { __typename?: 'TimeZones', timeZone: string, timeZoneName: string, id: number } | null } | null, serviceType?: { __typename?: 'AppointmentServiceType', name: string, price: number } | null, doctor?: { __typename?: 'User', first_name: string, last_name: string, timeZone?: { __typename?: 'TimeZones', timeZone: string, timeZoneName: string, id: number } | null, doctorProfile?: { __typename?: 'DoctorProfile', id: number, doctor_id: number, year_of_experience?: number | null, specialization?: string | null, condition_treated?: string | null, educational_background?: string | null, professional_experience?: string | null, language?: any | null, about_me?: string | null, profile_image?: string | null, user?: { __typename?: 'User', doctorId?: number | null, id: number, first_name: string, last_name: string, email: string, gender?: string | null, country_id?: number | null, state_id?: number | null, city_id?: number | null, zip_code?: string | null, password?: string | null, status: boolean, role?: string | null, doctorSchedules?: Array<{ __typename?: 'DoctorSchedule', id: string, doctorId: number, startDay: number, endDay: number, startTime: string, endTime: string, createdAt: any, updatedAt: any }> | null } | null } | null } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', id: number, startTime: any, endTime: any, selected: boolean }> | null, transaction?: { __typename?: 'Transaction', createdAt: any, status: string, amountReceived: number, tax: number, stripeFee: number } | null, appointmentCharges?: { __typename?: 'AppointmentPriceResponse', total?: number | null, appointmentPrice?: number | null } | null, appointmentSchedule?: { __typename?: 'DoctorSchedule', startTime: string, endTime: string } | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, appointmentTypeProposed?: { __typename?: 'AppointmentTypeProposedResponse', type?: string | null, price?: number | null, dateTime: Array<{ __typename?: 'DateTimeSlots', date?: string | null, startTime?: string | null, endTime?: string | null }> } | null }>, meta: { __typename?: 'Meta', totalPages: number, currentPage: number, totalItems: number } } };

export type DoctorProfileDetailsQueryVariables = Exact<{
  input: Scalars['Int'];
}>;


export type DoctorProfileDetailsQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, first_name: string, last_name: string, email: string, streetAddress?: string | null, country_id?: number | null, state_id?: number | null, city_id?: number | null, zip_code?: string | null, doctorProfile?: { __typename?: 'DoctorProfile', id: number, year_of_experience?: number | null, specialization?: string | null, condition_treated?: string | null, educational_background?: string | null, professional_experience?: string | null, language?: any | null, about_me?: string | null, profile_image?: string | null } | null, doctorSchedules?: Array<{ __typename?: 'DoctorSchedule', endDay: number, startDay: number, startTime: string, endTime: string }> | null } };

export type GetAllAppointmentServiceTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAppointmentServiceTypesQuery = { __typename?: 'Query', appointmentServiceTypes: Array<{ __typename?: 'AppointmentServiceType', id: number, name: string, price: number }> };

export type DoctorSchedulesQueryVariables = Exact<{
  doctorId: Scalars['Int'];
}>;


export type DoctorSchedulesQuery = { __typename?: 'Query', doctorSchedules: Array<{ __typename?: 'DoctorSchedule', id: string, doctorId: number, endDay: number, startDay: number, startTime: string, endTime: string, createdAt: any, updatedAt: any }> };

export type DoctorQuestionnaireQueryVariables = Exact<{
  doctorId: Scalars['Int'];
  languageId: Scalars['Int'];
}>;


export type DoctorQuestionnaireQuery = { __typename?: 'Query', doctorQuestionnaire: { __typename?: 'DoctorQuestionnaire', id: number, doctorId: number, questionnaire?: any | null, languageId: number } };

export type GetAppointmentByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetAppointmentByIdQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id?: number | null, status?: string | null, scheduleId?: number | null, doctorId?: number | null, patientId?: number | null, requestedDate?: any | null, reportUrl?: any | null, questionnaire?: any | null, createdAt: any, charges: number, doctor?: { __typename?: 'User', id: number, first_name: string, last_name: string, doctorProfile?: { __typename?: 'DoctorProfile', specialization?: string | null, profile_image?: string | null } | null, doctorQuestionnaire?: { __typename?: 'DoctorQuestionnaire', questionnaire?: any | null, languageId: number } | null } | null, patient?: { __typename?: 'User', id: number, first_name: string, last_name: string, timeZone?: { __typename?: 'TimeZones', timeZone: string, timeZoneName: string } | null, patientProfile?: { __typename?: 'PatientProfile', profileImage?: string | null } | null, patientHealthHistory?: { __typename?: 'PatientHealthHistory', history?: any | null } | null } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', id: number, startTime: any, endTime: any, selected: boolean }> | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, appointmentTypeProposed?: { __typename?: 'AppointmentTypeProposedResponse', type?: string | null, price?: number | null, dateTime: Array<{ __typename?: 'DateTimeSlots', date?: string | null, startTime?: string | null, endTime?: string | null }> } | null, serviceType?: { __typename?: 'AppointmentServiceType', id: number, name: string, price: number } | null, transaction?: { __typename?: 'Transaction', createdAt: any, status: string, amountReceived: number } | null, appointmentCharges?: { __typename?: 'AppointmentPriceResponse', total?: number | null, appointmentPrice?: number | null } | null, appointmentHealthHistory?: { __typename?: 'AppointmentHealthHistory', history: any } | null, currentAppointmentNote?: { __typename?: 'AppointmentNote', createdAt: any, id: number, subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean, appointment?: { __typename?: 'Appointment', id?: number | null, doctor?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null } | null } | null, notesHistory?: Array<{ __typename?: 'AppointmentNote', createdAt: any, id: number, subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean, appointment?: { __typename?: 'Appointment', id?: number | null, doctor?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null } | null }> | null } };

export type GetAllTransactionsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
}>;


export type GetAllTransactionsQuery = { __typename?: 'Query', transactions: { __typename?: 'TransactionPaginatedResponse', items: Array<{ __typename?: 'Transaction', id: number, transactionId: string, appointmentId: number, amountReceived: number, status: string, createdAt: any, appointment?: { __typename?: 'Appointment', requestedDate?: any | null, reportUrl?: any | null, doctor?: { __typename?: 'User', first_name: string, last_name: string } | null, patient?: { __typename?: 'User', first_name: string, last_name: string } | null, serviceType?: { __typename?: 'AppointmentServiceType', id: number, name: string } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', selected: boolean, startTime: any, endTime: any }> | null } | null }>, meta: { __typename?: 'Meta', totalPages: number, currentPage: number, totalItems: number } } };

export type ScheduleQueryVariables = Exact<{
  doctorId: Scalars['Int'];
}>;


export type ScheduleQuery = { __typename?: 'Query', doctorSchedules: Array<{ __typename?: 'DoctorSchedule', id: string, startTime: string, endTime: string, endDay: number, startDay: number }> };

export type ViewSuggestedTimeSlotsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ViewSuggestedTimeSlotsQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id?: number | null, patientId?: number | null, doctorId?: number | null, charges: number, serviceId?: number | null, scheduleId?: number | null, requestedDate?: any | null, reportUrl?: any | null, status?: string | null, createdAt: any, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', id: number, startTime: any, endTime: any, selected: boolean }> | null, appointmentTypeProposed?: { __typename?: 'AppointmentTypeProposedResponse', type?: string | null, price?: number | null, serviceId?: number | null, dateTime: Array<{ __typename?: 'DateTimeSlots', date?: string | null, startTime?: string | null, endTime?: string | null }> } | null, serviceType?: { __typename?: 'AppointmentServiceType', id: number, name: string, price: number } | null, doctor?: { __typename?: 'User', first_name: string, last_name: string } | null, transaction?: { __typename?: 'Transaction', status: string, amountReceived: number, tax: number, stripeFee: number } | null } };

export type GetAppointmentsReminderBannerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppointmentsReminderBannerQuery = { __typename?: 'Query', appointmentsReminderBanner: { __typename?: 'Appointment', id?: number | null, patient?: { __typename?: 'User', first_name: string, last_name: string } | null, doctor?: { __typename?: 'User', first_name: string, last_name: string } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', startTime: any, endTime: any, id: number, selected: boolean }> | null } };

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
  filter: GetTransectionInput;
  id: Scalars['Int'];
}>;


export type GetDoctorEarningsQuery = { __typename?: 'Query', getDoctorEarnings: { __typename?: 'DoctorEarningsResponse', total_number_of_consultation?: number | null, total_number_of_second_opinions?: number | null, total_number_of_patients?: number | null, total_earnings_from_consultation?: number | null, total_earnings_from_second_opinions?: number | null, total_earnings?: number | null } };

export type GetAllStaffByDoctorQueryVariables = Exact<{
  filter: GetStaffFilter;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
}>;


export type GetAllStaffByDoctorQuery = { __typename?: 'Query', staff: { __typename?: 'UserPaginatedResponse', items: Array<{ __typename?: 'User', id: number, role?: string | null, email: string, first_name: string, last_name: string, contact_number?: string | null, doctorId?: number | null, createdAt: any, status: boolean }>, meta: { __typename?: 'Meta', totalPages: number, currentPage: number, totalItems: number } } };

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


export type GetAppointmentNotesByIdQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', doctor?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null, currentAppointmentNote?: { __typename?: 'AppointmentNote', createdAt: any, id: number, subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean, appointment?: { __typename?: 'Appointment', id?: number | null, doctor?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null } | null } | null, notesHistory?: Array<{ __typename?: 'AppointmentNote', createdAt: any, id: number, subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean, appointment?: { __typename?: 'Appointment', id?: number | null, doctor?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null } | null }> | null } };

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


export type GetDoctorNotesByAppIdQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id?: number | null, patientId?: number | null, status?: string | null, doctor?: { __typename?: 'User', first_name: string, last_name: string } | null, currentAppointmentNote?: { __typename?: 'AppointmentNote', createdAt: any, id: number, subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean, appointment?: { __typename?: 'Appointment', id?: number | null, doctor?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null } | null } | null, notesHistory?: Array<{ __typename?: 'AppointmentNote', createdAt: any, id: number, subjective?: string | null, objective?: string | null, assessment?: string | null, plan?: string | null, note?: string | null, isPublished: boolean, appointment?: { __typename?: 'Appointment', id?: number | null, doctor?: { __typename?: 'User', id: number, first_name: string, last_name: string } | null } | null }> | null } };

export type CurrentAppointmentsQueryVariables = Exact<{
  filter: GetCurrentAppointmentInput;
  pagination?: InputMaybe<PaginationParams>;
  sorting?: InputMaybe<SortingParams>;
}>;


export type CurrentAppointmentsQuery = { __typename?: 'Query', currentAppointments: { __typename?: 'AppointmentPaginatedResponse', items: Array<{ __typename?: 'Appointment', id?: number | null, doctorId?: number | null, patientId?: number | null, status?: string | null, appointmentDateTime?: { __typename?: 'AppointmentDateTimeResponse', startTime?: string | null, endTime?: string | null } | null, appointmentTimeSlots?: Array<{ __typename?: 'AppointmentTimeSlots', startTime: any, endTime: any, selected: boolean }> | null, doctor?: { __typename?: 'User', first_name: string, last_name: string } | null, serviceType?: { __typename?: 'AppointmentServiceType', name: string } | null }>, meta: { __typename?: 'Meta', totalPages: number, currentPage: number, totalItems: number } } };


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
export const UpdateAppointmentDocument = gql`
    mutation updateAppointment($updateAppointmentInput: UpdateAppointmentInput!) {
  updateAppointment(updateAppointmentInput: $updateAppointmentInput) {
    doctor {
      first_name
    }
    appointmentTypeProposed {
      type
      serviceId
    }
    serviceType {
      id
      name
      price
    }
  }
}
    `;

export function useUpdateAppointmentMutation() {
  return Urql.useMutation<UpdateAppointmentMutation, UpdateAppointmentMutationVariables>(UpdateAppointmentDocument);
};
export const DeleteDoctorDocument = gql`
    mutation deleteDoctor($id: Int!) {
  deleteDoctor(id: $id) {
    id
  }
}
    `;

export function useDeleteDoctorMutation() {
  return Urql.useMutation<DeleteDoctorMutation, DeleteDoctorMutationVariables>(DeleteDoctorDocument);
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
    isRead
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
export const ResendActivationLinkDocument = gql`
    mutation resendActivationLink($email: String!) {
  resendActivationLink(email: $email) {
    id
    first_name
    last_name
    email
    gender
    date_of_birth
    contact_number
    streetAddress
    country_id
    state_id
    city_id
    zip_code
    password
    status
    role
    doctorId
    createdAt
  }
}
    `;

export function useResendActivationLinkMutation() {
  return Urql.useMutation<ResendActivationLinkMutation, ResendActivationLinkMutationVariables>(ResendActivationLinkDocument);
};
export const CreateDoctorScheduleDocument = gql`
    mutation createDoctorSchedule($doctorId: Int!, $startDay: Int!, $endDay: Int!, $startTime: String!, $endTime: String!) {
  createDoctorSchedule(
    createDoctorScheduleNewInput: {doctorId: $doctorId, startDay: $startDay, endDay: $endDay, startTime: $startTime, endTime: $endTime}
  ) {
    id
    startTime
    endTime
    startDay
    endDay
  }
}
    `;

export function useCreateDoctorScheduleMutation() {
  return Urql.useMutation<CreateDoctorScheduleMutation, CreateDoctorScheduleMutationVariables>(CreateDoctorScheduleDocument);
};
export const RemoveDoctorScheduleDocument = gql`
    mutation removeDoctorSchedule($id: Int!) {
  removeOneDoctorSchedule(id: $id) {
    startDay
    endDay
    id
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
export const OnboardingTosAcceptanceDocument = gql`
    mutation onboardingTosAcceptance($doctorId: Int!, $ip: String!) {
  onboardingTosAcceptance(doctorId: $doctorId, ip: $ip) {
    tos_acceptance
  }
}
    `;

export function useOnboardingTosAcceptanceMutation() {
  return Urql.useMutation<OnboardingTosAcceptanceMutation, OnboardingTosAcceptanceMutationVariables>(OnboardingTosAcceptanceDocument);
};
export const GetOnboardingAccountLinkDocument = gql`
    mutation getOnboardingAccountLink($doctorId: Int!) {
  getOnboardingAccountLink(doctorId: $doctorId) {
    created
    expires_at
    url
  }
}
    `;

export function useGetOnboardingAccountLinkMutation() {
  return Urql.useMutation<GetOnboardingAccountLinkMutation, GetOnboardingAccountLinkMutationVariables>(GetOnboardingAccountLinkDocument);
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
      timeZone {
        countryName
        countryCode
        timeZone
        id
        gmtOffset
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
    certification_and_licensure
    awards_honors_recognition
    language
    about_me
    profile_image
    profile_video
    user {
      id
      first_name
      last_name
      email
      gender
      streetAddress
      contact_number
      country_id
      state_id
      city_id
      contact_number
      timeZoneId
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
    is_active
  }
}
    `;

export function useEnableOrDisableDoctorMutation() {
  return Urql.useMutation<EnableOrDisableDoctorMutation, EnableOrDisableDoctorMutationVariables>(EnableOrDisableDoctorDocument);
};
export const PublishOrUnpublishDoctorDocument = gql`
    mutation publishOrUnpublishDoctor($id: Int!) {
  publishOrUnpublishDoctor(id: $id) {
    id
    status
  }
}
    `;

export function usePublishOrUnpublishDoctorMutation() {
  return Urql.useMutation<PublishOrUnpublishDoctorMutation, PublishOrUnpublishDoctorMutationVariables>(PublishOrUnpublishDoctorDocument);
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
export const UpdateAppointmentAttachmentsDocument = gql`
    mutation updateAppointmentAttachments($updateAppointmentAttachmentsInput: UpdateAppointmentAttachmentsInput!) {
  updateAppointmentAttachments(
    updateAppointmentAttachmentsInput: $updateAppointmentAttachmentsInput
  ) {
    id
    reportUrl
  }
}
    `;

export function useUpdateAppointmentAttachmentsMutation() {
  return Urql.useMutation<UpdateAppointmentAttachmentsMutation, UpdateAppointmentAttachmentsMutationVariables>(UpdateAppointmentAttachmentsDocument);
};
export const GetPatientCurrentAppointmentsDocument = gql`
    query getPatientCurrentAppointments($filter: GetAppointmentInput!, $pagination: PaginationParams, $sorting: SortingParams) {
  appointments(filter: $filter, pagination: $pagination, sorting: $sorting) {
    items {
      id
      doctor {
        id
      }
    }
  }
}
    `;

export function useGetPatientCurrentAppointmentsQuery(options: Omit<Urql.UseQueryArgs<GetPatientCurrentAppointmentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPatientCurrentAppointmentsQuery>({ query: GetPatientCurrentAppointmentsDocument, ...options });
};
export const GetAdminUsersDocument = gql`
    query getAdminUsers($filter: GetAdminUsersFilterInput!, $pagination: PaginationParams, $sorting: SortingParams) {
  adminUsers(filter: $filter, pagination: $pagination, sorting: $sorting) {
    items {
      id
      first_name
      last_name
      email
      createdAt
      status
    }
    meta {
      totalPages
      currentPage
      totalItems
    }
  }
}
    `;

export function useGetAdminUsersQuery(options: Omit<Urql.UseQueryArgs<GetAdminUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminUsersQuery>({ query: GetAdminUsersDocument, ...options });
};
export const AdminDashboardDocument = gql`
    query adminDashboard($filter: GetTransectionInput!) {
  adminDashboard(filter: $filter) {
    total_number_of_users
    total_number_of_physicians
    total_number_of_consultation
    total_number_of_second_opinions
    net_gross_sale
    net_physician_fee
    total_medicus_revenue
    total_number_of_appointments
    total_number_of_physicians
  }
}
    `;

export function useAdminDashboardQuery(options: Omit<Urql.UseQueryArgs<AdminDashboardQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminDashboardQuery>({ query: AdminDashboardDocument, ...options });
};
export const AdminPhysicianAppointmentDocument = gql`
    query AdminPhysicianAppointment($filter: GetAppointmentInput!, $pagination: PaginationParams, $sorting: SortingParams) {
  appointments(filter: $filter, pagination: $pagination, sorting: $sorting) {
    items {
      id
      appointmentTypeProposed {
        type
      }
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
      appointmentCharges {
        total
      }
      status
      serviceType {
        name
      }
    }
    meta {
      totalPages
      currentPage
      totalItems
    }
  }
}
    `;

export function useAdminPhysicianAppointmentQuery(options: Omit<Urql.UseQueryArgs<AdminPhysicianAppointmentQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminPhysicianAppointmentQuery>({ query: AdminPhysicianAppointmentDocument, ...options });
};
export const GetPatientsDocument = gql`
    query getPatients($filter: GetPatientsInput!, $pagination: PaginationParams, $sorting: SortingParams) {
  getPatients(filter: $filter, pagination: $pagination, sorting: $sorting) {
    items {
      id
      first_name
      last_name
      email
      contact_number
      createdAt
      streetAddress
      zip_code
      status
      date_of_birth
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
    meta {
      totalPages
      currentPage
      totalItems
    }
  }
}
    `;

export function useGetPatientsQuery(options: Omit<Urql.UseQueryArgs<GetPatientsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPatientsQuery>({ query: GetPatientsDocument, ...options });
};
export const PhysicianPaymentByAdminDocument = gql`
    mutation physicianPaymentByAdmin($paymentInput: PaymentInput!) {
  payment(paymentInput: $paymentInput) {
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
export const GetAdminTransactionReportListingDocument = gql`
    query getAdminTransactionReportListing($filter: GetTransectionInput!, $pagination: PaginationParams, $sorting: SortingParams) {
  getAdminTransactionReportListing(
    filter: $filter
    pagination: $pagination
    sorting: $sorting
  ) {
    items {
      id
      appointmentId
      payment_status
      appointmentCharges
      amountReceived
      status
      appointment {
        createdAt
        appointmentTypeProposed {
          type
        }
        appointmentDateTime {
          startTime
        }
        transaction {
          amountReceived
          status
        }
        patient {
          first_name
          last_name
        }
        doctor {
          first_name
          last_name
        }
        serviceType {
          name
        }
        status
        requestedDate
        appointmentCharges {
          appointmentPrice
          tax
          systemFee
          total
        }
      }
      stripeFee
      amountReceived
      doctor_percentage
      medicus_percentage
    }
    meta {
      totalItems
      totalPages
      currentPage
    }
  }
}
    `;

export function useGetAdminTransactionReportListingQuery(options: Omit<Urql.UseQueryArgs<GetAdminTransactionReportListingQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminTransactionReportListingQuery>({ query: GetAdminTransactionReportListingDocument, ...options });
};
export const GetAdminTransactionReportDocument = gql`
    query getAdminTransactionReport($filter: GetTransectionInput!) {
  getAdminTransactionReport(filter: $filter) {
    total_number_of_users
    total_medicus_revenue
    total_sale
    net_gross_sale
    net_physician_fee
    total_number_of_consultation
    total_number_of_second_opinions
  }
}
    `;

export function useGetAdminTransactionReportQuery(options: Omit<Urql.UseQueryArgs<GetAdminTransactionReportQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminTransactionReportQuery>({ query: GetAdminTransactionReportDocument, ...options });
};
export const DoctorPayoutsByAdminDocument = gql`
    query doctorPayoutsByAdmin {
  doctorPayoutsByAdmin {
    appointmentMonths
    doctorEarnings
    monthAppointments {
      id
      status
      doctorId
      serviceType {
        name
      }
      appointmentTypeProposed {
        type
      }
      appointmentDateTime {
        startTime
      }
      appointmentCharges {
        appointmentPrice
        tax
        systemFee
        total
      }
      patient {
        first_name
        last_name
      }
      transaction {
        id
        createdAt
        transactionId
        tax
        doctor_percentage
        medicus_percentage
        stripeFee
        amountReceived
        status
        payment_status
        appointmentCharges
      }
    }
  }
}
    `;

export function useDoctorPayoutsByAdminQuery(options?: Omit<Urql.UseQueryArgs<DoctorPayoutsByAdminQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorPayoutsByAdminQuery>({ query: DoctorPayoutsByAdminDocument, ...options });
};
export const GetAllChatChannelsDocument = gql`
    query getAllChatChannels($filter: GetAllChannelFilterInput!) {
  getAllChatChannels(filter: $filter) {
    id
    channelName
    doctorId
    patientId
    isAdminChat
    createdAt
    unReadMessagesCount {
      channelMessagesCount
    }
    lastMessage {
      channelId
      senderId
      receiverId
      message
      messageType
      createdAt
    }
    receiverDetail {
      id
      first_name
      last_name
      role
      email
      adminProfilePicture {
        profile_picture
      }
      doctorProfile {
        profile_image
      }
      patientProfile {
        profileImage
      }
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
          user {
            first_name
            last_name
          }
          profile_image
        }
        patientProfile {
          user {
            first_name
            last_name
          }
          profileImage
        }
        adminProfilePicture {
          id
          profile_picture
          user {
            first_name
            last_name
          }
        }
      }
    }
  }
}
    `;

export function useGetAllChatChannelsQuery(options: Omit<Urql.UseQueryArgs<GetAllChatChannelsQueryVariables>, 'query'>) {
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
    createdAt
    sender {
      first_name
      last_name
      doctorProfile {
        profile_image
      }
      patientProfile {
        profileImage
      }
      adminProfilePicture {
        id
        profile_picture
      }
    }
    receiver {
      role
      adminProfilePicture {
        id
        profile_picture
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
export const GetAppointmentPriceForRequestDocument = gql`
    query getAppointmentPriceForRequest($serviceId: Int!, $patientId: Int!) {
  getAppointmentPriceForRequest(serviceId: $serviceId, patientId: $patientId) {
    appointmentPrice
    tax
    systemFee
    total
  }
}
    `;

export function useGetAppointmentPriceForRequestQuery(options: Omit<Urql.UseQueryArgs<GetAppointmentPriceForRequestQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppointmentPriceForRequestQuery>({ query: GetAppointmentPriceForRequestDocument, ...options });
};
export const GetAppointmentPriceDocument = gql`
    query getAppointmentPrice($id: Int!, $cardId: Int) {
  getAppointmentPrice(id: $id, cardId: $cardId) {
    appointmentPrice
    tax
    systemFee
    total
  }
}
    `;

export function useGetAppointmentPriceQuery(options: Omit<Urql.UseQueryArgs<GetAppointmentPriceQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppointmentPriceQuery>({ query: GetAppointmentPriceDocument, ...options });
};
export const DeleteChatChannelDocument = gql`
    mutation deleteChatChannel($id: Int!) {
  deleteChat(channelId: $id) {
    id
  }
}
    `;

export function useDeleteChatChannelMutation() {
  return Urql.useMutation<DeleteChatChannelMutation, DeleteChatChannelMutationVariables>(DeleteChatChannelDocument);
};
export const MarkMessagesAsReadMutationDocument = gql`
    mutation markMessagesAsReadMutation($id: Int!) {
  markMessagesAsRead(channelId: $id) {
    id
  }
}
    `;

export function useMarkMessagesAsReadMutationMutation() {
  return Urql.useMutation<MarkMessagesAsReadMutationMutation, MarkMessagesAsReadMutationMutationVariables>(MarkMessagesAsReadMutationDocument);
};
export const GetTimeZonesDocument = gql`
    query getTimeZones {
  getTimeZones {
    id
    countryName
    countryCode
    timeZone
    gmtOffset
    timeZoneName
  }
}
    `;

export function useGetTimeZonesQuery(options?: Omit<Urql.UseQueryArgs<GetTimeZonesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTimeZonesQuery>({ query: GetTimeZonesDocument, ...options });
};
export const AppointmentCountByStatusDocument = gql`
    query appointmentCountByStatus {
  appointmentCountByStatus {
    upcoming
    pending
    canceled
    history
    reschedule
    propose
  }
}
    `;

export function useAppointmentCountByStatusQuery(options?: Omit<Urql.UseQueryArgs<AppointmentCountByStatusQueryVariables>, 'query'>) {
  return Urql.useQuery<AppointmentCountByStatusQuery>({ query: AppointmentCountByStatusDocument, ...options });
};
export const GetUnreadMessageCountDocument = gql`
    query getUnreadMessageCount($filter: GetAllChannelFilterInput!) {
  getAllChatChannels(filter: $filter) {
    unReadMessagesCount {
      channelMessagesCount
    }
  }
}
    `;

export function useGetUnreadMessageCountQuery(options: Omit<Urql.UseQueryArgs<GetUnreadMessageCountQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUnreadMessageCountQuery>({ query: GetUnreadMessageCountDocument, ...options });
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
    appointmentTypeProposed {
      type
      price
      dateTime {
        date
        startTime
        endTime
      }
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
    doctor {
      id
      first_name
      last_name
      doctorProfile {
        specialization
        profile_image
      }
      timeZone {
        timeZone
        timeZoneName
      }
    }
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
    appointmentTypeProposed {
      serviceId
      type
      price
      dateTime {
        date
        startTime
        endTime
      }
    }
    transaction {
      status
      amountReceived
    }
    appointmentCharges {
      total
      appointmentPrice
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
      city {
        city_name
      }
      state {
        state_name
      }
      country {
        country_name
      }
      patientProfile {
        id
        maritalStatus
        children
        occupation
        occupationalExposure
        exposureDuration
        pets
        profileImage
      }
    }
  }
}
    `;

export function useDoctorAppointmentDetailPatientInfoQuery(options: Omit<Urql.UseQueryArgs<DoctorAppointmentDetailPatientInfoQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorAppointmentDetailPatientInfoQuery>({ query: DoctorAppointmentDetailPatientInfoDocument, ...options });
};
export const PhysicianAppointmentsDocument = gql`
    query physicianAppointments($filter: GetPhysicianAppointmentInput!, $pagination: PaginationParams, $sorting: SortingParams) {
  physicianAppointments(
    filter: $filter
    pagination: $pagination
    sorting: $sorting
  ) {
    items {
      id
      doctor {
        first_name
        last_name
        timeZone {
          timeZone
          timeZoneName
          id
        }
      }
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
      appointmentDateTime {
        startTime
        endTime
      }
      appointmentTypeProposed {
        type
        price
        dateTime {
          date
          startTime
          endTime
        }
      }
      createdAt
      requestedDate
      charges
      status
      transaction {
        payment_status
        status
        amountReceived
      }
    }
    meta {
      totalPages
      currentPage
      totalItems
    }
  }
}
    `;

export function usePhysicianAppointmentsQuery(options: Omit<Urql.UseQueryArgs<PhysicianAppointmentsQueryVariables>, 'query'>) {
  return Urql.useQuery<PhysicianAppointmentsQuery>({ query: PhysicianAppointmentsDocument, ...options });
};
export const PhysicianAppointmentsHistoryDocument = gql`
    query physicianAppointmentsHistory($filter: GetAppointmentInput!, $pagination: PaginationParams, $sorting: SortingParams) {
  appointments(filter: $filter, pagination: $pagination, sorting: $sorting) {
    items {
      id
      doctorId
      charges
      serviceId
      patientId
      createdAt
      reportUrl
      requestedDate
      serviceType {
        name
      }
      appointmentTypeProposed {
        type
        price
        serviceId
        dateTime {
          date
          startTime
          endTime
        }
      }
      patient {
        id
        first_name
        last_name
        gender
        email
        date_of_birth
        contact_number
        country_id
        city_id
        city {
          city_name
        }
        state {
          state_name
        }
        country {
          country_name
        }
        patientProfile {
          maritalStatus
          children
          occupation
          occupationalExposure
          pets
          profileImage
          exposureDuration
        }
        patientHealthHistory {
          history
        }
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
      appointmentCharges {
        appointmentPrice
        tax
        systemFee
        total
      }
      doctor {
        id
        first_name
        last_name
        doctorProfile {
          specialization
          profile_image
        }
        timeZone {
          timeZone
          timeZoneName
        }
        doctorQuestionnaire {
          id
          doctorId
          questionnaire
          languageId
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
              startDay
              endDay
              startTime
              endTime
              createdAt
              updatedAt
            }
          }
        }
      }
      status
      transaction {
        status
        amountReceived
        appointmentCharges
      }
      charges
    }
    meta {
      totalPages
      currentPage
      totalItems
    }
  }
}
    `;

export function usePhysicianAppointmentsHistoryQuery(options: Omit<Urql.UseQueryArgs<PhysicianAppointmentsHistoryQueryVariables>, 'query'>) {
  return Urql.useQuery<PhysicianAppointmentsHistoryQuery>({ query: PhysicianAppointmentsHistoryDocument, ...options });
};
export const GetTransactionFilterDocument = gql`
    query getTransactionFilter($filter: GetTransectionInput!, $pagination: PaginationParams, $sorting: SortingParams) {
  getTransactionFilter(
    filter: $filter
    pagination: $pagination
    sorting: $sorting
  ) {
    items {
      id
      appointmentId
      transactionId
      payment_status
      amountReceived
      status
      stripeFee
      doctor_percentage
      payment_status
      createdAt
      appointmentCharges
      stripeFee
      tax
      appointment {
        status
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
        appointmentTypeProposed {
          type
          price
        }
      }
    }
    meta {
      totalPages
      currentPage
      totalItems
    }
  }
}
    `;

export function useGetTransactionFilterQuery(options: Omit<Urql.UseQueryArgs<GetTransactionFilterQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTransactionFilterQuery>({ query: GetTransactionFilterDocument, ...options });
};
export const PhysiciansPatientsDocument = gql`
    query physiciansPatients($searchField: String, $pagination: PaginationParams, $sorting: SortingParams) {
  physiciansPatients(
    filter: {searchField: $searchField}
    pagination: $pagination
    sorting: $sorting
  ) {
    items {
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
    meta {
      totalPages
      currentPage
      totalItems
    }
  }
}
    `;

export function usePhysiciansPatientsQuery(options?: Omit<Urql.UseQueryArgs<PhysiciansPatientsQueryVariables>, 'query'>) {
  return Urql.useQuery<PhysiciansPatientsQuery>({ query: PhysiciansPatientsDocument, ...options });
};
export const GetPhysiciansDocument = gql`
    query getPhysicians($filter: GetPhysiciansInput!, $pagination: PaginationParams, $sorting: SortingParams) {
  getPhysicians(filter: $filter, pagination: $pagination, sorting: $sorting) {
    items {
      id
      first_name
      last_name
      email
      streetAddress
      createdAt
      lastLoginDateTime
      is_active
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
    meta {
      totalPages
      currentPage
      totalItems
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
      doctor {
        id
        first_name
        last_name
      }
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
export const DoctorPayoutsDocument = gql`
    query doctorPayouts($doctorId: Int!) {
  doctorPayouts(doctorId: $doctorId) {
    appointmentMonths
    monthAppointments {
      id
      doctorId
      patientId
      appointmentTypeProposed {
        type
      }
      patient {
        first_name
        last_name
      }
      serviceType {
        name
      }
      appointmentDateTime {
        startTime
        endTime
      }
      transaction {
        transactionId
        appointmentId
        id
        doctor_percentage
      }
    }
  }
}
    `;

export function useDoctorPayoutsQuery(options: Omit<Urql.UseQueryArgs<DoctorPayoutsQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorPayoutsQuery>({ query: DoctorPayoutsDocument, ...options });
};
export const DoctorSchedulesByDayDocument = gql`
    query doctorSchedulesByDay($doctorId: Int!, $filter: GetDoctorScheduleFilterInput!) {
  doctorSchedulesByDay(doctorId: $doctorId, filter: $filter) {
    id
    startDay
    endDay
    startTime
    endTime
  }
}
    `;

export function useDoctorSchedulesByDayQuery(options: Omit<Urql.UseQueryArgs<DoctorSchedulesByDayQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorSchedulesByDayQuery>({ query: DoctorSchedulesByDayDocument, ...options });
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
    tos_acceptance
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
    is_active
    streetAddress
    status
    country {
      country_name
    }
    state {
      state_name
    }
    city {
      city_name
    }
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
      connect_details_submitted
      year_of_experience
      specialization
      condition_treated
      educational_background
      professional_experience
      language
      about_me
      profile_image
      profile_video
    }
    timeZone {
      countryName
      countryCode
      timeZone
      timeZoneName
      id
      gmtOffset
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
      doctorQuestionnaire {
        id
        doctorId
        questionnaire
        languageId
      }
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
    awards_honors_recognition
    certification_and_licensure
    language
    about_me
    profile_image
    profile_video
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
      country {
        country_name
      }
      state {
        state_name
      }
      city {
        city_name
      }
      zip_code
      password
      status
      role
      contact_number
      doctorSchedules {
        id
        doctorId
        endDay
        startDay
        startTime
        endTime
        createdAt
        updatedAt
      }
      timeZone {
        timeZone
        timeZoneName
        id
      }
    }
  }
}
    `;

export function useDoctorProfileQuery(options: Omit<Urql.UseQueryArgs<DoctorProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<DoctorProfileQuery>({ query: DoctorProfileDocument, ...options });
};
export const GetAllRequestedAppointmentsDocument = gql`
    query getAllRequestedAppointments($filter: GetAppointmentInput!, $pagination: PaginationParams, $sorting: SortingParams) {
  appointments(filter: $filter, pagination: $pagination, sorting: $sorting) {
    items {
      id
      patientId
      doctorId
      serviceId
      requestedDate
      reportUrl
      createdAt
      status
      charges
      patient {
        first_name
        last_name
        timeZone {
          timeZone
          timeZoneName
          id
        }
      }
      serviceType {
        name
        price
      }
      doctor {
        first_name
        last_name
        timeZone {
          timeZone
          timeZoneName
          id
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
          user {
            doctorId
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
              startDay
              endDay
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
        status
        amountReceived
        tax
        stripeFee
      }
      appointmentCharges {
        total
        appointmentPrice
      }
      appointmentSchedule {
        startTime
        endTime
      }
      appointmentDateTime {
        startTime
        endTime
      }
      appointmentTypeProposed {
        type
        price
        dateTime {
          date
          startTime
          endTime
        }
      }
    }
    meta {
      totalPages
      currentPage
      totalItems
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
      endDay
      startDay
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
    endDay
    startDay
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
    query doctorQuestionnaire($doctorId: Int!, $languageId: Int!) {
  doctorQuestionnaire(doctorId: $doctorId, languageId: $languageId) {
    id
    doctorId
    questionnaire
    languageId
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
    questionnaire
    doctor {
      id
      first_name
      last_name
      doctorProfile {
        specialization
        profile_image
      }
      doctorQuestionnaire {
        questionnaire
        languageId
      }
    }
    patient {
      id
      first_name
      last_name
      timeZone {
        timeZone
        timeZoneName
      }
      patientProfile {
        profileImage
      }
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
    appointmentTypeProposed {
      type
      price
      dateTime {
        date
        startTime
        endTime
      }
    }
    serviceType {
      id
      name
      price
    }
    transaction {
      createdAt
      status
      amountReceived
    }
    appointmentCharges {
      total
      appointmentPrice
    }
    createdAt
    charges
    appointmentHealthHistory {
      history
    }
    currentAppointmentNote {
      appointment {
        id
        doctor {
          id
          first_name
          last_name
        }
      }
      createdAt
      id
      subjective
      objective
      assessment
      plan
      note
      isPublished
    }
    notesHistory {
      appointment {
        id
        doctor {
          id
          first_name
          last_name
        }
      }
      createdAt
      id
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
    query getAllTransactions($pagination: PaginationParams, $sorting: SortingParams) {
  transactions(pagination: $pagination, sorting: $sorting) {
    items {
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
    meta {
      totalPages
      currentPage
      totalItems
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
    endDay
    startDay
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
    appointmentTypeProposed {
      type
      price
      serviceId
      dateTime {
        date
        startTime
        endTime
      }
    }
    serviceType {
      id
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
      tax
      stripeFee
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
      id
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
    query getDoctorEarnings($filter: GetTransectionInput!, $id: Int!) {
  getDoctorEarnings(filter: $filter, id: $id) {
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
    query getAllStaffByDoctor($filter: GetStaffFilter!, $pagination: PaginationParams, $sorting: SortingParams) {
  staff(filter: $filter, pagination: $pagination, sorting: $sorting) {
    items {
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
    meta {
      totalPages
      currentPage
      totalItems
    }
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
    doctor {
      id
      first_name
      last_name
    }
    currentAppointmentNote {
      appointment {
        id
        doctor {
          id
          first_name
          last_name
        }
      }
      createdAt
      id
      subjective
      objective
      assessment
      plan
      note
      isPublished
    }
    notesHistory {
      appointment {
        id
        doctor {
          id
          first_name
          last_name
        }
      }
      createdAt
      id
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
    doctor {
      first_name
      last_name
    }
    currentAppointmentNote {
      appointment {
        id
        doctor {
          id
          first_name
          last_name
        }
      }
      createdAt
      id
      subjective
      objective
      assessment
      plan
      note
      isPublished
    }
    notesHistory {
      appointment {
        id
        doctor {
          id
          first_name
          last_name
        }
      }
      createdAt
      id
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
    query currentAppointments($filter: GetCurrentAppointmentInput!, $pagination: PaginationParams, $sorting: SortingParams) {
  currentAppointments(filter: $filter, pagination: $pagination, sorting: $sorting) {
    items {
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
    meta {
      totalPages
      currentPage
      totalItems
    }
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
        "name": "AdminPayoutResponse",
        "fields": [
          {
            "name": "appointmentMonths",
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
            },
            "args": []
          },
          {
            "name": "doctorEarnings",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
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
            },
            "args": []
          },
          {
            "name": "monthAppointments",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "LIST",
                  "ofType": {
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
        "name": "AdminTransactionReportResponse",
        "fields": [
          {
            "name": "net_gross_sale",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "net_physician_fee",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "total_medicus_revenue",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "total_number_of_appointments",
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
            "name": "total_number_of_physicians",
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
            "name": "total_sale",
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
            "name": "appointmentCharges",
            "type": {
              "kind": "OBJECT",
              "name": "AppointmentPriceResponse",
              "ofType": null
            },
            "args": []
          },
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
            "name": "appointmentTypeProposed",
            "type": {
              "kind": "OBJECT",
              "name": "AppointmentTypeProposedResponse",
              "ofType": null
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
            "name": "endTime",
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
            "name": "serviceTypeRequested",
            "type": {
              "kind": "OBJECT",
              "name": "AppointmentServiceType",
              "ofType": null
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
        "name": "AppointmentPaginatedResponse",
        "fields": [
          {
            "name": "items",
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
            "args": []
          },
          {
            "name": "links",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "meta",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Meta",
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
        "name": "AppointmentTypeProposedResponse",
        "fields": [
          {
            "name": "dateTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "DateTimeSlots",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "price",
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
            "name": "type",
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
        "name": "AppointmentsCountResponse",
        "fields": [
          {
            "name": "canceled",
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
            "name": "pending",
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
            "name": "propose",
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
            "name": "reschedule",
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
            "name": "upcoming",
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
            "name": "lastMessage",
            "type": {
              "kind": "OBJECT",
              "name": "ChatMessages",
              "ofType": null
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
          },
          {
            "name": "unReadMessagesCount",
            "type": {
              "kind": "OBJECT",
              "name": "UnReadMessagesCountResponse",
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
            "name": "isRead",
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
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
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
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
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
        "name": "DateTimeSlots",
        "fields": [
          {
            "name": "date",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
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
        "name": "DoctorCreateLinkResponse",
        "fields": [
          {
            "name": "created",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "expires_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "url",
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
            "name": "total_net_earnings",
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
        "name": "DoctorPayoutResponse",
        "fields": [
          {
            "name": "appointmentMonths",
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
            },
            "args": []
          },
          {
            "name": "monthAppointments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
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
            "name": "awards_honors_recognition",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "certification_and_licensure",
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
            "name": "connect_details_submitted",
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
            "name": "profile_video",
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
            "name": "languageId",
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
            "name": "endDay",
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
            "name": "startDay",
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
        "name": "Language",
        "fields": [
          {
            "name": "code",
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
            "name": "name",
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
        "name": "Meta",
        "fields": [
          {
            "name": "currentPage",
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
            "name": "totalItems",
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
            "name": "totalPages",
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
            "name": "createLanguage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "createLanguageInput",
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
            "name": "createPhysiciansStripeConnectAccount",
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
            "name": "deleteChat",
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
            "name": "deleteDoctor",
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
            "name": "deleteDoctorWithAllDataHardDelete",
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
            "name": "getOnboardingAccountLink",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DoctorCreateLinkResponse",
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
            "name": "markMessagesAsRead",
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
            "name": "onboardingTosAcceptance",
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
                "name": "ip",
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
            "name": "publishOrUnpublishDoctor",
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
            "name": "resendActivationLink",
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
            "name": "updateAppointment",
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
                "name": "updateAppointmentInput",
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
            "name": "updateAppointmentAttachments",
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
                "name": "updateAppointmentAttachmentsInput",
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
            "name": "adminDashboard",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AdminTransactionReportResponse",
                "ofType": null
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
                "kind": "OBJECT",
                "name": "UserPaginatedFilterResponse",
                "ofType": null
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
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "sorting",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
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
            "name": "appointmentCountByStatus",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppointmentsCountResponse",
                "ofType": null
              }
            },
            "args": []
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
                "kind": "OBJECT",
                "name": "AppointmentPaginatedResponse",
                "ofType": null
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
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "sorting",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
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
                "kind": "OBJECT",
                "name": "AppointmentPaginatedResponse",
                "ofType": null
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
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "sorting",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
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
            "name": "doctorPayouts",
            "type": {
              "kind": "OBJECT",
              "name": "DoctorPayoutResponse",
              "ofType": null
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
            "name": "doctorPayoutsByAdmin",
            "type": {
              "kind": "OBJECT",
              "name": "AdminPayoutResponse",
              "ofType": null
            },
            "args": []
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
              },
              {
                "name": "languageId",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
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
            "name": "doctorSchedulesByDay",
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
              },
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
            "name": "getAdminTransactionReport",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AdminTransactionReportResponse",
                "ofType": null
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
            "name": "getAdminTransactionReportListing",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "TransactionPaginatedResponse",
                "ofType": null
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
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "sorting",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
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
                "name": "cardId",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
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
                "name": "filter",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
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
                "kind": "OBJECT",
                "name": "UserPaginatedResponse",
                "ofType": null
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
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "sorting",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "getPhysicians",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserPaginatedResponse",
                "ofType": null
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
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "sorting",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
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
            "name": "getTimeZones",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "TimeZones",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "getTransactionFilter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "TransactionPaginatedResponse",
                "ofType": null
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
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "sorting",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "getUserFilter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserPaginatedFilterResponse",
                "ofType": null
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
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "sorting",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "language",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Language",
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
            "name": "languages",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Language",
                    "ofType": null
                  }
                }
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
                "kind": "OBJECT",
                "name": "AppointmentPaginatedResponse",
                "ofType": null
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
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "sorting",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "physiciansPatients",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserPaginatedResponse",
                "ofType": null
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
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "sorting",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "staff",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserPaginatedResponse",
                "ofType": null
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
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "sorting",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
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
                "kind": "OBJECT",
                "name": "TransactionPaginatedResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "pagination",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "sorting",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
                "kind": "OBJECT",
                "name": "UserPaginatedResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "pagination",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
        "name": "TimeZones",
        "fields": [
          {
            "name": "countryCode",
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
            "name": "countryName",
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
            "name": "gmtOffset",
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
            "name": "timeZone",
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
            "name": "timeZoneName",
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
            "name": "medicus_percentage",
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
            "name": "payout_failed",
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
        "name": "TransactionPaginatedResponse",
        "fields": [
          {
            "name": "items",
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
            "name": "links",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "meta",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Meta",
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
        "name": "UnReadMessagesCountResponse",
        "fields": [
          {
            "name": "channelMessagesCount",
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
            "name": "is_active",
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
            "name": "lastLoginDateTime",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "timeZone",
            "type": {
              "kind": "OBJECT",
              "name": "TimeZones",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeZoneId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "tos_acceptance",
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
            "name": "country",
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
            "name": "currency",
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
        "name": "UserPaginatedFilterResponse",
        "fields": [
          {
            "name": "items",
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
          },
          {
            "name": "links",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "meta",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Meta",
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
        "name": "UserPaginatedResponse",
        "fields": [
          {
            "name": "items",
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
          },
          {
            "name": "links",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "meta",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Meta",
                "ofType": null
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