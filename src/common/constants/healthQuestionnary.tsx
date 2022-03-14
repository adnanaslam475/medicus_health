import { CheckboxValueType } from "antd/lib/checkbox/Group";

interface Questions {
  q1: Question;
  q2: Question;
  q3: Question;
  q4: Question;
  q5: Question;
  q6: Question;
  q7: Question;
  q8: Question;
}
interface Question {
  name: string;
  label: string;
  type: string;
  ans: any;
  option?: string[];
  q?: any;
  selectedOption?: CheckboxValueType[];
}

const HealthQuestionnaryData: Questions = {
  q1: {
    name: "radio_drink",
    label: "Do you drink Alcohol?*",
    type: "radio",
    ans: null,
    option: ["yes", "no"],
    q: {
      name: "drinks",
      label: "How many Drinks on average and how offen?*",
      type: "text",
      ans: "",
    },
  },
  q2: {
    name: "radio_smoke",
    label: "Do you smoke?",
    type: "radio",
    ans: "",
    option: ["yes", "no"],
    q: {
      name: "smoke",
      label: "How many and for how long do you smoke?*",
      type: "text",
      ans: "",
    },
  },
  q3: {
    name: "radio_drug",
    label: "Do you take any recreational drugs?",
    type: "radio",
    ans: "",
    option: ["yes", "no"],
    q: {
      name: "check_drug",
      label:
        "Please list any current medical conditions and/or past medical conditions you have experienced. (You can select multiple) *",
      type: "checkbox",
      ans: "",
      option: ["Stroke", "Asthma", "Cancer", "Diabetes", "Others"],
      selectedOption: [],
    },
  },
  q4: {
    name: "surgical_history",
    label:
      "Please list your past Surgical History you have gone thorough. (You can select multiple)*",
    type: "checkbox",
    ans: "",
    option: [
      "Bladder Surgery",
      "Hernia Repair",
      "Colon Surgery",
      "Tonsillectomy",
      "Brain Surgery",
      "Spine Surgery",
      "Others",
    ],
    selectedOption: [],
  },
  q5: {
    name: "allergies",
    label: "Please list any known allergies*",
    type: "text",
    ans: "",
  },
  q6: {
    name: "adverse",
    label:
      "Please explain any adverse/side affects you have experienced from medications*",
    type: "text",
    ans: "",
  },
  q7: {
    name: "medication",
    label:
      "Please list any current medication you are taking and provide the dosage, and frequency*",
    type: "text",
    ans: "",
  },
  q8: {
    name: "inherited",
    label:
      "Please list any medical problems that are common/genetically inherited in your family*",
    type: "text",
    ans: "",
  },
};
export default HealthQuestionnaryData;
