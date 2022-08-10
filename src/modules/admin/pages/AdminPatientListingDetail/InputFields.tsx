import React, { useState, useEffect } from "react";
import Router from "next/router";
import {
  DatePicker,
  Input,
  Form,
  Select,
  Radio,
  Button,
  FormInstance,
} from "antd";
import { patientEditForm } from "utils/helper";

type CountryOrStateProps = {
  id: number | undefined;
  country_name: string | undefined;
  state_name: string | undefined;
  value: string | number | undefined;
};

type Props = {
  data: any | undefined;
  isUpdating: boolean;
  setCountryId: (data: CountryOrStateProps) => void;
  setStateId: (data: CountryOrStateProps) => void;
  formInstance: FormInstance | undefined;
};

const InputFields = ({
  data,
  isUpdating,
  setCountryId,
  setStateId,
  formInstance,
}: Props) => {
  const [showChildren, setShowChildren] = useState<any>();

  useEffect(()=>{
    let init:any = {}
    patientEditForm.filter(item=>item.relationName).forEach((item:any)=>{
        init[item?.relationName] = formInstance?.getFieldValue(item?.relationName);
    })
    setShowChildren(init)
  },[])

  return (
    <>
      <div className="max-w-[800px] gap-x-4 grid grid-cols-2 relative">
        {patientEditForm.map((value: any) => (
          <>
            {value.type === "select" && (!value.relationType || showChildren?.[value?.relationName] === "Yes") && (
              <Form.Item
                label={value.label}
                name={value.option_name}
              >
                <Select
                  placeholder={value.label}
                  onChange={(id) => {
                    setShowChildren((prev:any)=>({
                      ...(prev || {}),
                      [value?.name]: id,
                    }));
                    if (value.option_name !== "city_name") {
                      const updatedValue = (
                        data[value.name] || value.options
                      ).find((val: CountryOrStateProps) => val.id === id);
                      value.option_name === "country_name"
                        ? setCountryId(updatedValue)
                        : setStateId(updatedValue);
                    }
                  }}
                >
                  {(data[value.name] || value.options)?.map(
                    (item: CountryOrStateProps | any) => {
                      return (
                        <Select.Option
                          value={value.options?.length ? `${item?.value?.charAt(0)?.toUpperCase()}${item?.value?.slice(1)}` : item.id}
                        >
                          {value.options?.length
                            ? `${item?.value?.charAt(0)?.toUpperCase()}${item?.value?.slice(1)}`
                            : item[value.option_name]}
                        </Select.Option>
                      );
                    }
                  )}
                </Select>
              </Form.Item>
            )}

            {value.type === "text" && !value?.relationName && (
              <Form.Item
                label={value.label}
                name={value.name}
              >
                <Input type={value.inputType} />
              </Form.Item>
            )}
            {value.type === "text" &&
              showChildren?.[value?.relationName] === "Yes" && (
                <Form.Item
                  label={value.label}
                  name={value.name}
                >
                  <Input type={value.inputType} />
                </Form.Item>
              )}
            {value.type === "date" && (
              <Form.Item label={value.label} name={value.name}>
                <DatePicker
                  placeholder="mm/dd/yy"
                  format={"MM-DD-YYYY"}
                  className="w-full"
                  picker="date"
                />
              </Form.Item>
            )}
            {value.type === "radio" && (
              <Form.Item
                className="mb-0"
                label={value.label}
                name={value.option_name || value.name}
              >
                <Radio.Group
                  name={value.option_name || value.name}
                  onChange={(e) =>
                    setShowChildren((prev:any)=>({
                      ...(prev || {}),
                      [value.name]: e.target.value
                    }))
                  }
                >
                  {value.options?.map((value: string, i: number) =>(
                    <Radio key={i} value={value}>
                      {value}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            )}
          </>
        ))}
      </div>
      <Form.Item>
        <div className="flex gap-4 absolute right-0">
          <Button onClick={() => Router.back()}>Cancel</Button>
          <Button
            loading={isUpdating}
            disabled={isUpdating}
            type="primary"
            htmlType="submit"
          >
            Save changes
          </Button>
        </div>
      </Form.Item>
    </>
  );
};

export default InputFields;
