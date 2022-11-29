import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Layout, Divider, Checkbox, Empty } from "antd";
import {
  GetAppointmentByIdQuery,
  useDoctorQuestionnaireQuery,
  User,
} from "../../../generated/graphql";
import { useRouter } from "next/router";
import { parseJson } from "common/utils/helper";
import _classes from "./AppointmentButtons.module.scss";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { NamePath } from "antd/lib/form/interface";
import { getRole, getUserData } from "common/utils/userData";
import { Spin } from "antd";
import styles from "./styles.module.scss";

type Props = {
  appointmentHealthHistory: string;
  disable?: boolean;
  doctorId?: number;
  user?: User;
};

type Item = {
  type: NamePath | undefined;
  label: {} | null | undefined;
  name: NamePath | undefined;
  options: { value: any; label: any }[];
  dependent?: Item;
};

function PhysicianQuestionnaire(props: Props) {
  const { query } = useRouter();
  const [formInstance] = Form.useForm();
  const {
    appointmentHealthHistory,
    disable,
    doctorId,
    user: userData,
  } = props || {};
  let History = parseJson(appointmentHealthHistory);
  const router = useRouter();
  const { user } = getUserData();
  const [isDisabled, setDisabled] = useState<boolean>(false);

  // console.log("user-sadasdsd", userData);

  const { pathname } = router || {};
  let disabled =
    pathname?.includes("/physician/appointments") ||
    pathname?.includes("/patient/appointments") ||
    disable;

  useEffect(() => {
    if (History) {
      prepareAndSetEditPayload();
    }
  }, [History]);

  useEffect(() => {
    if (
      getRole() === "Doctor" ||
      getRole() === "Admin" ||
      getRole() === "User"
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, []);

  function prepareAndSetEditPayload() {
    Object?.keys(History)?.map((value) => {
      return formInstance.setFieldsValue({
        [value]: History?.[value],
      });
    });
  }

  let doctorQuestionnaireId = user?.role === "Doctor" ? user?.id : doctorId;

  // let doctorQuestionnaireId =
  //   user?.role === "Admin" || user?.role === "Doctor" ? doctorId : doctorId;

  const [{ data: dataList, fetching }] = useDoctorQuestionnaireQuery({
    variables: {
      doctorId: Number(doctorQuestionnaireId),
      languageId: 2,
    },
    pause: !doctorQuestionnaireId,
  });
  const { doctorQuestionnaire } = dataList || {};

  const checkBoxHandler = (e: CheckboxChangeEvent) => {
    // let formatedQuestioner = parseJson(patientLastQuestionnaire?.history);
    // if (e?.target?.checked) {
    //   saveStepThree?.({
    //     ...formatedQuestioner,
    //     isLastFilled: e?.target?.checked,
    //   });
    // } else {
    //   saveStepThree?.(undefined);
    //   formInstance.resetFields();
    // }
  };
  function onFinishLocal(values: any) {
    // saveStepThree?.({ ...values, isLastFilled: data?.stepThree?.isLastFilled });
  }
  const [dependent, setDependent] = useState<any>({});

  let questionnair = parseJson(doctorQuestionnaire?.questionnaire);
  const setDepedentState = (
    item: Item | undefined,
    value: boolean,
    depedency: any
  ): any => {
    let updatedDepedencies = { ...depedency };
    updatedDepedencies = {
      ...updatedDepedencies,
      [item?.name as string]: value,
    };
    if (item?.dependent) {
      return setDepedentState(item?.dependent, value, updatedDepedencies);
    } else {
      return updatedDepedencies;
    }
  };
  useEffect(() => {
    let updatedDepedencies = {};
    questionnair?.forEach((item: Item) => {
      if (item.dependent) {
        updatedDepedencies = setDepedentState(item, false, updatedDepedencies);
      }
    });
    setDependent(updatedDepedencies);
  }, [questionnair?.length]);

  const renderItems = (item: Item): any => {
    if (item.type === "text") {
      return (
        <>
          <Form.Item
            label={item.label}
            className="text-secondary"
            name={item.name}
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input readOnly={isDisabled} disabled />
          </Form.Item>
          {item.dependent &&
            dependent[item.name as string] &&
            renderItems(item.dependent)}
          {/* {item.dependent && renderItems(item.dependent)} */}
        </>
      );
    } else if (item.type === "radio") {
      return (
        <>
          <Form.Item
            label={item.label}
            className="text-secondary"
            name={item.name}
            rules={[{ required: true, message: "Required!" }]}
          >
            <Radio.Group disabled={isDisabled}>
              {item?.options?.map(({ value, label }) => {
                return (
                  <Radio value={value} disabled>
                    {label}
                  </Radio>
                );
              })}
            </Radio.Group>
          </Form.Item>
          {item.dependent && renderItems(item.dependent)}
        </>
      );
    } else if (item.type === "checkbox") {
      return (
        <>
          <Form.Item
            label={item.label}
            className="text-secondary"
            name={item.name}
          >
            <Checkbox.Group
              className={`${styles["ant-checkbox-wrapper-cover"]} flex flex-col`}
              disabled={isDisabled || getRole() === "Admin"}
            >
              {item?.options?.map(({ value, label }, index) => {
                return (
                  <>
                    <Checkbox className={`${styles.checkbox}`} value={value}>
                      {label}
                    </Checkbox>
                    {
                      // @ts-ignore
                      formInstance
                        ?.getFieldsValue()
                        [item?.name]?.map((value: any) => {
                          // @ts-ignore
                          return (
                            !!item?.options[value]?.dependent &&
                            value === index &&
                            renderItems(item?.options[value]?.dependent as any)
                          );
                        })
                    }
                  </>
                );
              })}
            </Checkbox.Group>
          </Form.Item>
        </>
      );
    }
  };
  console.log("questionnair", questionnair);
  return (
    <React.Fragment>
      <div className="lg:w-3/6 md:w-full">
        <Form layout="vertical" form={formInstance} onFinish={onFinishLocal}>
          {fetching ? (
            <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
              <Spin />
            </div>
          ) : !questionnair ? (
            <div className="flex items-center justify-center w-full flex-col">
              <Empty description={false} />
              <p className="font-noraml">
                Physician questionnaire not available
              </p>
            </div>
          ) : (
            questionnair?.map((item: Item, index: any) => {
              return renderItems(item);
            })
          )}
        </Form>
      </div>
    </React.Fragment>
  );
}
export default PhysicianQuestionnaire;
