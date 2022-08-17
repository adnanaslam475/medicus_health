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

const SpanishHealthQuestionnaryData: Questions = {
  q1: {
    name: "radio_drink",
    label: "Usted bebe alcohol?",
    type: "radio",
    ans: null,
    option: ["sí", "no"],
    q: {
      name: "drinks",
      label: "Qué tan frecuentemente bebe alcohol?*",
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
        // "Anemia",
        // "Aneurisma",
        // "Arritmias",
        // "Artritis",
        // "Asma",
        // "Trastornos de la sangre",
        // "Enfermedad ósea",
        // "Bronquiectasias",
        // "Cáncer",
        // "EPOC",
        // "Insuficiencia cardíaca congestiva",
        // "Enfermedad de las arterias coronarias o infartos",
        // "Dermatitis",
        // "Diabetes",
        // "Esofagitis",
        // "Fibrosis",
        // "ERGE",
        // "Gastritis",
        // "Problemas de audición o del oído",
        // "Hiperlipidemia",
        // "Hipertensión",
        // "Problemas intestinales",
        // "Enfermedad del riñon",
        // "Enfermedades del HIGADO",
        // "Migraña",
        // "Obesidad",
        // "Pancreatitis",
        // "La enfermedad de úlcera péptica",
        // "Neumonía",
        // "Pulmonar",
        // "Hipertensión pulmonar",
        // "Convulsiones",
        // "Sinusitis",
        // "Cáncer de piel",
        // "Carrera",
        // "TUBERCULOSIS",
        // "Enfermedad de tiroides",
        // "Problemas de válvulas",
        // "Problemas de la vista o de los ojos",
        "Anemia",
        "Apendectomía",
        "Arritmia",
        "Asma",
        "Trastornos de la sangre",
        "Cirugía cerebral",
        "Bronquiectasias",
        "Enfermedad Pulmonar Obstructiva Crónica (EPOC)",
        "Insuficiencia cardíaca congestiva",
        "Enfermedad de las arterias coronarias o infartos",
        "Dermatitis",
        "Diabetes",
        "Esofagatis",
        "Gastritis",
        "Enfermedad por reflujo gastroesofágico (ERGE)",
        "Problemas de audición o del oído",
        "Cirugía de corazón",
        "Problemas de las válvulas del corazón",
        "Presión arterial alta (hipertensión)",
        "Hiperlipidemia",
        "Problemas intestinales",
        "Enfermedad del riñon",
        "Enfermedad del higado",
        "Cirugía de pulmón",
        "Migrañas",
        "Obesidad",
        "Pancreatitis",
        "La enfermedad de úlcera péptica",
        "Neumonía",
        "Fibrosis pulmonar",
        "Hipertensión pulmonar",
        "Convulsiones",
        "Sinusitis",
        "Cáncer de piel",
        "Enfermedad de tiroides",
        "Amigdalectomía",
        "Tuberculosis",
        "Problemas de la vista o de los ojos",
        "Otros",
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
      "Por favor seleccione procedimientos que describan su historial quirúrgico?*",
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
    label: "Por favor enliste cualquier alergia conocida.*",
    type: "text",
    ans: "",
  },
  q6: {
    name: "adverse",
    label:
      "Por favor describa cualquier efecto secundario que haya experimentado con medicamentos.*",
    type: "text",
    ans: "",
  },
  q7: {
    name: "medication",
    label:
      "Por favor enliste cualquier medicamento(s) actual que este tomando (especifique nombre del medicamento, dosis y frecuencia de toma).*",
    type: "text",
    ans: "",
  },
  q8: {
    name: "inherited",
    label:
      "Por favor enliste cualquier problema medico que es común en su familia.*",
    type: "text",
    ans: "",
  },
};

export default SpanishHealthQuestionnaryData;
