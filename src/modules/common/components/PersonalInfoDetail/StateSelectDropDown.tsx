import { Form, Select } from "antd";
import React from "react";
import { useGetStatesByCountryQuery } from "../../../../generated/graphql";
import { useLocale } from "next-intl";
import initTranslation from "common/utils/initTranslation";
import i18next from "i18next";

type Props = {
  countryId: number | null | undefined;
  onChange: ((value: any, option: any) => void) | undefined;
};

initTranslation(["PersonalInfo"]);

const StateSelectDropDown = (props: Props) => {
  const { countryId, onChange } = props;
  const [{ data }] = useGetStatesByCountryQuery({
    variables: {
      input: countryId || 0,
    },
    pause: countryId === undefined,
  });
  const { getStatesByCountry } = data || {};

  i18next.changeLanguage(useLocale());
  const t = i18next.t;

  return (
    <Form.Item
      className="flex-1"
      name="state_id"
      // rules={[
      //   {
      //     required: true,
      //     message: "Please enter your state",
      //   },
      // ]}
    >
      <Select
        showSearch
        filterOption={(input, state: any) =>
          state.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={onChange}
        // placeholder={t("state")}
        placeholder="Estado"
      >
        {React.Children.toArray(
          getStatesByCountry?.map((el, i) => {
            return (
              <Select.Option value={el.id}>{el?.state_name}</Select.Option>
            );
          })
        )}
      </Select>
    </Form.Item>
  );
};

export default StateSelectDropDown;
