/* eslint-disable react/jsx-key */
import React from "react";
import { useCountriesQuery, User } from "../../../../generated/graphql";

type Props = {
  userDetail: User | undefined;
};

function PersonalInfoList({ userDetail }: { userDetail: any }) {
  const {
    first_name,
    last_name,
    gender,
    date_of_birth,
    contact_number,
    email,
    password,
    country_id,
    state_id,
    city_id,
    zip_code,
  } = userDetail || {};

  const [{ data }] = useCountriesQuery();
  const { countries } = data || {};

  let selectedCountry = countries?.filter((item) => item.id === country_id);
  let countryName = "";
  if (selectedCountry) {
    countryName = selectedCountry[0]?.country_name;
  }

  return (
    <div className="custom-list mt-4">
      <ul>
        <div className="border border-gray-3 px-0 rounded custom-list-items">
          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">First Name</div>
              <div className="w-1/2 text-secondary">{first_name}</div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">Last Name</div>
              <div className="w-1/2 text-secondary">{last_name}</div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">Gender</div>
              <div className="w-1/2 text-secondary">{gender}</div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">Date of Birth</div>
              <div className="w-1/2 text-secondary">{date_of_birth}</div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">Contact Number</div>
              <div className="w-1/2 text-secondary">{contact_number}</div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">Email Address</div>
              <div className="w-1/2 text-secondary">{email}</div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">Password</div>
              <div className="w-1/2 text-secondary">
                <div className="word-wrap bg-transparent">
                  <input type="password" disabled value={password} />
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">Country</div>
              <div className="w-1/2 text-secondary">{countryName}</div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">State</div>
              <div className="w-1/2 text-secondary">{state_id}</div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">City</div>
              <div className="w-1/2 text-secondary">{city_id}</div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">Postal Code</div>
              <div className="w-1/2 text-secondary">{zip_code}</div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">Street Address</div>
              <div className="w-1/2 text-secondary">
                5456 YuanTabu , 5th Floor, Suit 2
              </div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">Marital Status</div>
              <div className="w-1/2 text-gray-1">N/A</div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">Do You have any children?</div>
              <div className="w-1/2 text-gray-1">N/A</div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">What is your Occupation?</div>
              <div className="w-1/2 text-gray-1">N/A</div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">
                Do you have any Occupational Exposure?
              </div>
              <div className="w-1/2 text-gray-1">N/A</div>
            </div>
          </li>

          <li>
            <div className="flex w-full  border-b border-gray-3 p-4">
              <div className="w-1/2 text-gray-1">Do you have any pets?</div>
              <div className="w-1/2 text-gray-1">N/A</div>
            </div>
          </li>
        </div>
      </ul>
    </div>
  );
}
export default PersonalInfoList;
