import { Form, Select } from "antd";
import React from "react";
import { useGetCitiesByStateQuery } from "../../../../generated/graphql";
import { useLocale } from "next-intl";
import initTranslation from "common/utils/initTranslation";
import i18next from "i18next";

type Props = {
  stateId: number | undefined | null;
};
initTranslation(["PersonalInfo"]);
const CitySelectDropDown = (props: Props) => {
  const { stateId } = props;
  const [getCityByState] = useGetCitiesByStateQuery({
    variables: {
      input: stateId || 0,
    },
    pause: stateId === undefined,
  });
  i18next.changeLanguage(useLocale());
  const t = i18next.t;
  // console.log(t("title"));
  return (
    <Form.Item
      className="flex-1"
      name="city_id"
      // rules={[
      //   {
      //     required: true,
      //     message: "Please enter your city",
      //   },
      // ]}
    >
      <Select
        placeholder={t("city")}
        showSearch
        filterOption={(input, city: any) =>
          city.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {React.Children.toArray(
          getCityByState?.data?.getCitiesByState?.map((el) => {
            return <Select.Option value={el.id}>{el?.city_name}</Select.Option>;
          })
        )}
      </Select>
    </Form.Item>

    // <Form.Item className="flex-1" name="city_id">
    //   <Select
    //     placeholder={t("city")}
    //     showSearch
    //     filterOption={(input, city: any) =>
    //       city.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    //     }
    //   >
    //     {React.Children.toArray(
    //       getCityByState?.data?.getCitiesByState?.map((el, i) => {
    //         return <Select.Option value={el.id}>{el?.city_name}</Select.Option>;
    //       })
    //     )}
    //   </Select>
    // </Form.Item>
  );
};

export default CitySelectDropDown;
