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
    label: "Usted bebe alcohol?",
    type: "radio",
    ans: null,
    option: ["sí", "no"],
    q: {
      name: "drinks",
      label: "Qué tan frecuentemente bebe alcohol?",
      type: "text",
      ans: "",
    },
  },
  q2: {
    name: "radio_smoke",
    label: "¿Usted fuma?",
    type: "radio",
    ans: "",
    option: ["sí", "no"],
    // q: {
    //   name: "smoke",
    //   label: "Por cuánto tiempo ha fumado*",
    //   type: "text",
    //   ans: "",
    // },
    q: {
      name: "smoke",
      label: "¿Cuánto tiempo has fumado?",
      type: "text",
      ans: "",
    },
    q1: {
      name: "smoke1",
      label: "¿Con qué frecuencia fuma?",
      type: "text",
      ans: "",
    },
    q2: {
      name: "smoke2",
      label: "¿Cuántos cigarrillos fuma al día?",
      type: "text",
      ans: "",
    },
  },
  q3: {
    name: "radio_drug",
    label: "Usa alguna droga recreativa?",
    type: "radio",
    ans: "",
    option: ["sí", "no"],
    q: {
      name: "check_drug",
      label:
        // "Please list any current medical conditions and/or past medical conditions you have experienced. (You can select multiple) *",
        "Por favor seleccione cualquier condición medica actual (previa) que padezca (haya padecido).",
      type: "checkbox",
      ans: "",
      option: [
        "Infarto cerebral",
        "Convulsiones",
        "Migrañas",
        "Sinusitis",
        "Presión arterial alta (hipertensión arterial)",
        "Problemas de las válvulas del corazón",
        "Arritmias",
        "Asma",
        "Enfermedad pulmonar obstructiva crónica (EPOC)",
        "Fibrosis pulmonar",
        "Bronquiectasias",
        "Neumonía",
        "Tuberculosis",
        "Esofagitis",
        "Enfermedad por reflujo gastroesofágico (ERGE)",
        "Problemas de la visión o de los ojos",
        "Problemas de la audición o de los oídos",
        "Infarto al corazón o enfermedad coronaria",
        "Insuficiencia cardíaca",
        "Hipertensión pulmonar",
        "Gastritis",
        "Úlcera péptica",
        "Problemas intestinales",
        "Enfermedad del hígado",
        "Pancreatitis",
        "Enfermedad del riñón",
        "Dermatitis",
        "Cáncer de piel",
        "Anemia",
        "Enfermedades de la sangre",
        "Enfermedad de la tiroides",
        "Diabetes",
        "Obesidad",
        "Hiperlipidemia",
        "Amigdalectomía",
        "Cirugía cerebral",
        "Cirugía del corazón",
        "Cirugía pulmonar",
        "Apendicectomía",
        "Otra",
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
    label:
      "Por favor seleccione procedimientos que describan su historial quirúrgico?",
    type: "checkbox",
    ans: "",
    option: [
      "Apendectomía",
      "Cirugía de la vejiga",
      "Cirugía cerebral",
      "Cirugía de Colon",
      "Cirugía de corazón",
      "Reparación de hernia",
      "Cirugía de Pulmón",
      "Cirugía de columna",
      "Amigdalectomía",
      "Otros",
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
    label: "Por favor enliste cualquier alergia conocida.",
    type: "text",
    ans: "",
  },
  q6: {
    name: "adverse",
    label:
      "Por favor describa cualquier efecto secundario que haya experimentado con medicamentos.",
    type: "text",
    ans: "",
  },
  q7: {
    name: "medication",
    label:
      "Por favor enliste cualquier medicamento(s) actual que este tomando (especifique nombre del medicamento, dosis y frecuencia de toma).",
    type: "text",
    ans: "",
  },
  q8: {
    name: "inherited",
    label:
      "Por favor enliste cualquier problema medico que es común en su familia.",
    type: "text",
    ans: "",
  },
};

export default HealthQuestionnaryData;
