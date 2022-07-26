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
        SuccessScreen: {
          ...spanishCommon,
          success_your_account_has_been_created:
            "¡Éxito! Tu cuenta ha sido creada.",
          we_have_sent_you_an_email_on:
            "Le hemos enviado un correo electrónico en",
          verify_your_account_by_click:
            "Haga clic en el enlace de verificación y su cuenta será verificada.",
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
          signup_modal_skip_questionaire_message:
            "Estos son los campos obligatorios para reservar una cita, puede omitirlos por ahora y puede agregar/editar más tarde desde la sección Mi perfil",
        },
        HealthQuestionary: {
          ...spanishCommon,
          skip_this_for_now_fill_this_later:
            "Saltar esto por ahora y llenar esto más tarde",
          please_pick_an_option: "Por favor elige una opción",
          please_fill_field: "Por favor complete el campo",
        },

        UpcomingAppointments: {
          ...spanishCommon,
          upcomingAppointmentsHead: "próximas citas",
        },
        PendingAppointments: {
          ...spanishCommon,
          pending_appointments_head: "Citas Pendientes",
        },
        CanceledAppointments: {
          ...spanishCommon,
          cancel_appointments_head: "Citas Pendientes",
        },
        HistoryAppointments: {
          ...spanishCommon,
          history_appointments_head: "Citas Pendientes",
        },
        SearchFilters: {
          ...spanishCommon,
          // pending_appointments_head: "Citas Pendientes",
        },
        AppointmentCards: {
          ...spanishCommon,
        },
        PhysicianList: {
          ...spanishCommon,
          our_physicians: "Nuestros medicos",
          message_away: "mensaje_lejos",
          message_admin_support:
            "Si necesita ayuda para seleccionar un médico, nuestro equipo de apoyo es un",
          available_today: "Disponible hoy",
          not_available_today: "no disponible hoy",
          about_me: "Sobre mí",
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
          // title: "Account",
        },
        SuccessScreen: {
          ...englishCommon,
          success_your_account_has_been_created:
            "Success! Your account has been created.",
          we_have_sent_you_an_email_on: "We have sent you an email on",
          verify_your_account_by_click:
            "Please click on the verification link and your account will be verified.",
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
          signup_modal_skip_questionaire_message:
            "These are the mandatory fields for Book an Appointment you can Skip it for now and can Add/Edit later from My Profile section",
        },
        HealthQuestionary: {
          ...englishCommon,
          skip_this_for_now_fill_this_later:
            "Skip This For Now & Fill This Later",
          please_pick_an_option: "Please pick an option!",
          please_fill_field: "Please fill field",
        },

        UpcomingAppointments: {
          ...englishCommon,
          upcomingAppointmentsHead: "Upcoming Appointments",
        },
        PendingAppointments: {
          ...englishCommon,
          pending_appointments_head: "Pending Appointments",
        },
        CanceledAppointments: {
          ...englishCommon,
          cancel_appointments_head: "Citas Pendientes",
        },
        HistoryAppointments: {
          ...englishCommon,
          history_appointments_head: "Citas Pendientes",
        },
        SearchFilters: {
          ...englishCommon,
        },
        AppointmentCards: {
          ...englishCommon,
        },
        PhysicianList: {
          ...englishCommon,
          our_physicians: "Our physicians",
          message_away: "message away",
          message_admin_support:
            "If you need help selecting a physician, our support team is a",
          available_today: "Available Today",
          not_available_today: "Not available today",
          about_me: "Not available today",
        },

        PersonalInfo: {
          ...englishCommon,
          Login: "Login",
          AlreadyHaveAnAccount: "Already have an account?",
          gender: "Gender",
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
