import { englishCommon, spanishCommon } from "./commonTranslationJson";

export function translationJson(local: string) {
  let json = {};
  switch (local) {
    case "es":
      json = {
        Login: {
          ...spanishCommon,
          title: "Iniciar sesión para continuar",
          description: "Ingrese sus credenciales para acceder a su cuenta.",
          remember: "Acuérdate de mí",
          forgot: "¿Has olvidado tu contraseña?",
        },
        ForgotPass: {
          ...spanishCommon,
        },
        Confirm_pass: {
          ...spanishCommon,
        },
        ResendLink: {
          ...spanishCommon,
        },
        AccountDetail: {
          ...spanishCommon,
          title: "Cuenta",
        },
        Signup: {
          ...spanishCommon,
          createAccount: "Crea tu cuenta",
          createYourAccountToStart:
            "Crea tu cuenta para empezar a usar Medicus",
          personalInfo: "Información personal",
          healthQuestionnaire: "Cuestionario de Salud",
          Login: "Acceso",
          AlreadyHaveAnAccount: "Ya tienes una cuenta",
        },

        UpcomingAppointments: {
          ...spanishCommon,
          upcomingAppointmentsHead: "próximas citas",
        },
        PersonalInfo: {
          ...spanishCommon,
          Login: "Acceso",
          AlreadyHaveAnAccount: "Ya tienes una cuenta",
        },
      };
      break;

    case "en":
      json = {
        Login: {
          ...englishCommon,
          title: "Login to continue",
          description: "Enter your credentials to access your account.",
          remember: "Remember me",
          forgot: "Forgot Password?",
          login: "Login",
          account: "Don't have an account?",
          register: "Register",
          email: "Email Address",
          password: "Password",
        },
        ForgotPass: {
          ...englishCommon,
        },
        Confirm_pass: {
          ...englishCommon,
        },
        ResendLink: {
          ...englishCommon,
        },
        AccountDetail: {
          ...englishCommon,
          title: "Account",
        },

        Signup: {
          ...englishCommon,
          createAccount: "Create Your Account",
          createYourAccountToStart:
            "Create your account to start using Medicus",
          personalInfo: "Personal Info",
          healthQuestionnaire: "Health Questionnaire",
          login: "Login",
          account: "Don't have an account?",
        },

        UpcomingAppointments: {
          ...englishCommon,
          upcomingAppointmentsHead: "Upcoming Appointments",
        },
        PersonalInfo: {
          ...englishCommon,
          Login: "Login",
          AlreadyHaveAnAccount: "Already have an account?",
          Gender: "Gender",
          first_name: "First Name",
          last_name: "Last Name",
          male: "Male",
          female: "Female",
          I_prefer_not_to_answer: "I prefer not to answer",
          date_of_Birth: "Date of Birth",
          email_address: "Email Address",
          password: "Password",
          confirm_password: "Confirm Password",
          street_address: "Street Address",
          contact_number: "Contact Number",
          country: "Country",
          state: "State",
          city: "City",
          postal_code: "Postal Code",
          postal_code_message: "Please enter your postal code",
          i_agree_to_the: "I agree to the ",
          terms_n_conditions: " Terms & Conditions",
          next: "Next",
        },
      };

      break;

    default:
      break;
  }

  return json;
}
