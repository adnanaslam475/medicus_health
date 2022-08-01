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
  q1?: any;
  q2?: any;
  selectedOption?: CheckboxValueType[];
}

const HealthQuestionnaryData: Questions = {
  q1: {
    name: "radio_drink",
    label: "Do you drink alcohol?*",
    type: "radio",
    ans: null,
    option: ["yes", "no"],
    q: {
      name: "drinks",
      label: "How many drinks on average and how often?*",
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
    // q: {
    //   name: "smoke",
    //   label: "How many and for how long do you smoke?*",
    //   type: "text",
    //   ans: "",
    // },
    q: {
      name: "smoke",
      label: "How long have you smoked?*",
      type: "text",
      ans: "",
    },
    q1: {
      name: "smoke1",
      label: "How often do you smoked?*",
      type: "text",
      ans: "",
    },
    q2: {
      name: "smoke2",
      label: "How many cigarretes do you smoke per day?*",
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
        // "Please list any current medical conditions and/or past medical conditions you have experienced. (You can select multiple) *",
        "Please select any current (past) medical conditions you experience(d).",
      type: "checkbox",
      ans: "",
      option: [
        // "Anemia",
        // "Aneurysm",
        // "Arrhythmias",
        // "Arthritis",
        // "Asthma",
        // "Blood disorders",
        // "Bonedisease",
        // "Bronchiectasis",
        // "Cancer",
        // "COPD",
        // "Congestive heart failure",
        // "Coronary artery  disease or heart attacks",
        // "Dermatitis",
        // "Diabetes",
        // "Esophagitis",
        // "Fibrosis",
        // "GERD",
        // "Gastritis",
        // "Hearing or ear problems",
        // "Hyperlipidemia",
        // "Hypertension",
        // "Intestinal problems",
        // "Kidney disease",
        // "Liver diseases",
        // "Migraine",
        // "Obesity",
        // "Pancreatitis",
        // "Peptic ulcer disease",
        // "Pneumonia",
        // "Pulmonary",
        // "Pulmonary hypertension",
        // "Seizures",
        // "Sinusitis",
        // "Skin cancer",
        // "Stroke",
        // "TB",
        // "Thyroid disease",
        // "Valve problems",
        // "Vision or eye problems",
        "Anemia",
        "Appendectomy",
        "Arrhythmia",
        "Asthma",
        "Blood disorders",
        "Brain surgery",
        "Bronchiectasis",
        "Chronic obstructive pulmonary disease (COPD)",
        "Congestive heart failure",
        "Coronary artery disease or heart attacks",
        "Dermatitis",
        "Diabetes",
        "Esophagatis",
        "Gastritis",
        "Gastroesophageal reflux disease (GERD)",
        "Hearing or ear problems",
        "Heart surgery",
        "Heart valve problems",
        "High blood pressue (hypertension)",
        "Hyperlipidemia",
        "Intestinal problems",
        "Kidney disease",
        "Liver disease",
        "Lung surgery",
        "Migraines",
        "Obesity",
        "Pancreatitis",
        "Peptic ulcer disease",
        "Pneumonia",
        "Pulmonary fibrosis",
        "Pulmonary hypertension",
        "Seizures",
        "Sinusitis",
        "Skin cancer",
        "Thyroid disease",
        "Tonsillectomy",
        "Tuberculosis",
        "Vision or eye problems",
        "Others",
      ],
      selectedOption: [],
    },
    q2: {
      name: "drug_text",
      label: "",
      type: "text",
      ans: "",
    },
  },
  q4: {
    name: "surgical_history",
    label: "Please select items that describe your past surgical history*",
    type: "checkbox",
    ans: "",
    option: [
      "Appendectomy",
      "Bladder Surgery",
      "Brain Surgery",
      "Colon Surgery",
      "Heart surgery",
      "Hernia Repair",
      "Lung Surgery",
      "Spine Surgery",
      "Tonsillectomy",
      "Others",
    ],
    selectedOption: [],
    q2: {
      name: "surgical_text",
      label: "",
      type: "text",
      ans: "",
    },
  },
  q5: {
    name: "allergies",
    label: "Please list any known allergies.*",
    type: "text",
    ans: "",
  },
  q6: {
    name: "adverse",
    label:
      "Please explain any adverse side effect(s) you may have experienced from medications.*",
    type: "text",
    ans: "",
  },
  q7: {
    name: "medication",
    label:
      "Please list any current medication(s) you are taking (provide medication name, dosage, and frequency).*",
    type: "text",
    ans: "",
  },
  q8: {
    name: "inherited",
    // label:
    //   "Please list any medical problems that are common/genetically inherited in your family*",
    label: "Please list any medical problems that are common in your family.",
    type: "text",
    ans: "",
  },
};

export default HealthQuestionnaryData;
