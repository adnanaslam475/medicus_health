import { englishCommon, spanishCommon } from "./commonTranslationJson";

export function translationJson(local: string) {
  let json = {};
  switch (local) {
    case "es":
      json = {
        Common: { ...spanishCommon },
        Login: {
          ...spanishCommon,
          title: "Iniciar sesión para continuar",
          description: "Ingrese sus credenciales para acceder a su cuenta.",
          remember: "Acuérdate de mí",
          forgot: "¿Has olvidado tu contraseña?",
        },
        ForgotPass: {
          ...spanishCommon,
          your_password_reset_link_has_been_sent_on_your_email_please_check:
            "Su enlace de restablecimiento de contraseña ha sido enviado a su correo electrónico, ¡compruébelo!",
        },
        Confirm_pass: {
          ...spanishCommon,
        },
        ResendLink: {
          ...spanishCommon,
          resend_password_link: "Reenviar enlace de contraseña",
          your_password_reset_link_has_been_resent_on_your_email_please_check:
            "Su enlace de restablecimiento de contraseña ha sido reenviado en su correo electrónico, ¡compruébelo!",
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
        Questionnary: {
          ...spanishCommon,
          skip_this_for_now_fill_this_later:
            "Saltar esto por ahora y llenar esto más tarde",
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
          cancel: "Cancel",
          apply: "Apply",
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
        Common: { ...englishCommon },
        Login: {
          ...englishCommon,
          // title: "Login to continue",
          title: "Iniciar sesión para continuar",
          // description: "Enter your credentials to access your account.",
          description: "Introduzca sus credenciales para acceder a su cuenta.",
          remember: "Remember me",
          forgot: "Forgot password?",
          login: "Login",
          account: "Don't have an account?",
          register: "Register",
          email: "Email address",
          password: "Password",
        },
        ForgotPass: {
          ...englishCommon,
          your_password_reset_link_has_been_sent_on_your_email_please_check:
            "Your password reset link has been sent on your email please check!",
        },
        Confirm_pass: {
          ...englishCommon,
        },
        ResendLink: {
          ...englishCommon,
          resend_password_link: "Resend Password Link",
          your_password_reset_link_has_been_resent_on_your_email_please_check:
            "Your password reset link has been resent on your email please check!",
        },
        AccountDetail: {
          ...englishCommon,
          title: "Account",
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
          createAccount: "Create your account",
          createYourAccountToStart:
            "Create your account to start using medicus",
          personalInfo: "Personal info",
          healthQuestionnaire: "Health questionnaire",
          login: "Login",
          account: "Don't have an account?",
          signup_modal_skip_questionaire_message:
            "These are the mandatory fields for book an appointment you can skip it for now and can Add/Edit later from my profile section",
        },
        HealthQuestionary: {
          ...englishCommon,
          skip_this_for_now_fill_this_later:
            "Skip this for now & fill this later",
          please_pick_an_option: "Please pick an option!",
          please_fill_field: "Please fill field",
        },
        Questionnary: {
          ...englishCommon,
          skip_this_for_now_fill_this_later:
            "Skip this for now & fill this later",
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
          cancel: "Cancel",
          apply: "Apply",
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
          about_me: "About me",
        },

        PersonalInfo: {
          ...englishCommon,
          Login: "Login",
          AlreadyHaveAnAccount: "Already have an account?",
          gender: "Gender",
          first_name: "First name",
          last_name: "Last name",
          male: "Male",
          female: "Female",
          I_prefer_not_to_answer: "I prefer not to answer",
          date_of_Birth: "Date of birth",
          email_address: "Email address",
          password: "Password",
          confirm_password: "Confirm password",
          street_address: "Street address",
          contact_number: "Contact number",
          country: "Country",
          state: "State",
          city: "City",
          postal_code: "Postal code",
          postal_code_message: "Please enter your postal code",
          i_agree_to_the: "I agree to the ",
          terms_n_conditions: " Terms & conditions",
          next: "Next",
        },
      };

      break;

    default:
      break;
  }

  return json;
}
