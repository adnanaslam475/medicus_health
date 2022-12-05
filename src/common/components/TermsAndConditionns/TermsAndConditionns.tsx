import React from "react";
import Link from "next/link";
import { Form, Button } from "antd";
import Container from "./../../../common/components/Container/Container";
import Image from "next/image";

import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

const TermsAndConditions = () => {
  const t = useTranslations("SuccessScreen");
  const onFinish = async (values: object) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const { query } = useRouter();
  return (
    // <Container className="login-bg w-full">
    <div>
      <div className="flex items-center justify-center min-h-screen w-h-100 py-2">
        <div className="w-full sm:w-full md:w-full lg:w-full xl:w-full px-0">
          <div className="card p-4 shadow-lg drop-shadow-2xl rounded-lg bg-white pt-6 pb-3 px-4">
            <h2>Términos de Uso de Medicus</h2>
            <h4>Uso del Sitio Web. </h4>
            <p>
              Medster Health, LLC, operando como <b>Medicus</b>.
              (“Medicus”,“nosotros”, “nos” o “nuestro”) opera el sitio web
              ubicado en <a href="www.joinmedicus.com">www.joinmedicus.com</a> y
              otros sitios web relacionados y aplicaciones móviles con enlaces a
              estos Términos de Uso (colectivamente el “Sitio”) . Ofrecemos
              servicios de telesalud en línea que permiten a nuestros miembros
              («Miembros») informar su historial de salud e involucrar a
              profesionales de la salud («Profesionales de la salud») para
              obtener una segunda opinión u otros servicios similares
              («Servicios»).   Al acceder y utilizar el Sitio, usted acepta
              estar sujeto a estos Términos de uso y todos los demás términos y
              políticas que aparecen en el Sitio. Si Ud. no desea estar sujeto a
              ninguno de estos Términos de Uso, no puede usar el Sitio ni los
              Servicios relacionados. 
            </p>
            <h4>Servicios de salud.</h4>
            <p>
              Los Profesionales de la Salud que prestan servicios a través de
              Medicus son profesionales independientes ejerciendo dentro de sus
              propias prácticas profesionales 
            </p>
            <p>
              (“Prácticas Profesionales Contratadas”). Medicus no ejerce la
              medicina ni ninguna otra profesión autorizada, y no interfiere con
              la práctica de la medicina ni de ninguna otra profesión autorizada
              por parte de los Profesionales de la Salud, cada uno de los cuales
              es responsable de sus servicios y del cumplimiento de los
              requisitos aplicables a su profesión y licencia.  Ni Medicus ni
              otras personas que promocionen los Servicios o le proporcionen un
              enlace a los Servicios serán responsables de ningún consejo
              profesional que obtenga de un Profesional de la Salud a través de
              los Servicios.  Los Profesionales de la Salud tienen las licencias
              necesarias en los Estados Unidos (USA), y emiten recetas para
              medicamentos no restringidos, cuando estén  médicamente indicados,
              en base a una visita de telesalud. 
            </p>
            <p>
              Para pacientes internacionales, los profesionales de la salud
              evalúan su problema médico actual y le brindan sugerencias sobre
              los medicamentos o protocolos de tratamiento necesarios para su
              condición. 
            </p>
            <h4>Contenido del sitio. </h4>
            <p>
              Ninguno de los contenidos del sitio (aparte de la información que
              recibe de los Profesionales de la Salud) debe considerarse un
              consejo médico o un respaldo, representación o garantía de que
              cualquier medicamento o tratamiento en particular es seguro,
              apropiado o efectivo para usted. 
            </p>
            <h4>Información de cuenta. </h4>
            <p>
              Cuando Ud. se registra en el Sitio, debe crear una cuenta
              («Cuenta») ingresando su nombre, dirección de correo electrónico,
              contraseña y otra información recopilada por Medicus
            </p>
            <p>
              (colectivamente, «Información de la cuenta»). Para crear una
              Cuenta, debe ser mayor de edad para formar un contrato
              vinculante.  Si no tiene la edad legal para formar un contrato
              vinculante, no puede registrarse para utilizar nuestros Servicios.
              Ud. acepta que la Información de la cuenta que nos proporciona en
              todo momento, incluso durante el registro y en cualquier
              información que se incluya en el Sitio, será verdadera, precisa,
              actual y completa. No puede transferir ni compartir la contraseña
              de su Cuenta con nadie, ni crear más de una Cuenta. Usted es
              responsable de mantener la confidencialidad de la contraseña de su
              Cuenta y de todas las actividades que ocurran en su Cuenta.
              Medicus se reserva el derecho de tomar todas y cada una de las
              medidas que considere necesarias o razonables con respecto a la
              seguridad del Sitio y la Información de su cuenta. En ningún caso
              y bajo ninguna circunstancia, Medicus será responsable ante usted
              por cualquier tipo de responsabilidad o daño que resulte o surja
              de su uso del Sitio, su uso de la Información de la cuenta o su
              divulgación de la Información de la cuenta a un tercero. No puede
              usar la cuenta de otra persona en ningún momento.  
            </p>
            <h4>Uso de los Servicios por parte de niños.</h4>
            <p>
              Los Servicios están disponibles para que los usen niños, pero los
              niños no están autorizados a convertirse en Miembros y no pueden
              usar los Servicios sin la supervisión de un padre o tutor legal.
              Si se registra como padre o tutor legal en nombre de un menor,
              será completamente responsable de cumplir con estos Términos de
              Uso. 
            </p>
            <h4>Derechos de acceso. </h4>
            <p>
              Por este medio le otorgamos un derecho limitado, no exclusivo e
              intransferible para acceder al Sitio y utilizar los Servicios
              únicamente para su uso personal, no comercial y solo según lo
              permitido por estos Términos de Uso y cualquier otro acuerdo que
              haya suscrito con nosotros <b>(Derechos de acceso)</b>.  Nos
              reservamos el derecho, a nuestro exclusivo criterio, de denegar o
              suspender el uso del Sitio o los Servicios a cualquier persona por
              cualquier motivo. Usted acepta que no hará ni intentará: (a)
              hacerse pasar por ninguna persona o entidad, o tergiversar de otra
              manera su afiliación con una persona o entidad; (b) usar el Sitio
              o los Servicios para violar cualquier ley local, estatal, nacional
              o internacional; (c) realizar ingeniería inversa, desensamblar,
              descompilar o traducir cualquier software u otros componentes del
              Sitio o los Servicios; d) distribuir virus u otro código
              informático dañino a través del Sitio; o (e) de otro modo usar los
              Servicios o el Sitio de cualquier manera que exceda el alcance de
              uso otorgado anteriormente. Además, acepta abstenerse de lenguaje
              y comportamiento abusivos que podrían considerarse inapropiados, o
              conductas ilegales o ilícitas, cuando se comunique con
              Profesionales de la Salud a través del Sitio y abstenerse de
              contactar a Profesionales de la Salud para servicios de telesalud
              fuera del Sitio, a menos que lo autorice dicho Profesional de la
              Salud.  Medicus no es responsable de ninguna interacción con los
              profesionales de la salud que no se lleve a cabo a través del
              Sitio. Le recomendamos enfáticamente que no use los Servicios en
              computadoras públicas. También le recomendamos no almacenar la
              contraseña de su Cuenta a través de su navegador web u otro
              software. 
            </p>
            <h4>Tarifas y términos de compra</h4>
            <p>
              Usted acepta pagar todas las tarifas o cargos a su Cuenta de
              acuerdo con las tarifas, cargos y términos de facturación vigentes
              en el momento en que una tarifa o cargo vence y es pagadero. Al
              proporcionar a Medicus 
            </p>
            <p>
              su número de tarjeta de crédito, cuenta de PayPal o Venmo e
              información de pago asociada, usted acepta que Medicus está
              autorizado a facturar inmediatamente en su cuenta todas las
              tarifas y cargos adeudados y pagaderos a Medicus en virtud del
              presente y que no se requiere ningún aviso o consentimiento
              adicional. Si su plan de salud, empleador o agencia ha hecho
              arreglos con Medicus para pagar la tarifa o cualquier parte de la
              tarifa, o si la tarifa es conforme a algún otro acuerdo con
              Medicus, ese ajuste de tarifa se reflejará en la tarifa que
              finalmente se cobrará. . Consulte con su empleador, plan de salud
              o agencia para determinar si se reembolsará algún Servicio. 
            </p>
            <p>
              <b>
                Usted comprende y acepta que para los Servicios proporcionados
                con cita previa, usted será responsable de una tarifa de cita
                perdida equivalente a la totalidad o una parte de la honorarios
                que habría pagado por los servicios programados si no solicita
                cancelar una cita programada con al menos 24 horas de
                anticipación y dicha cancelación es acordada por el médico
                correspondiente.  No se garantiza que se conceda una solicitud
                de cancelación. Debe comunicar la solicitud de cancelación al
                médico correspondiente, y queda a discreción del médico cancelar
                y emitir un reembolso o reprogramar. 
              </b>
            </p>
            <h4>Terminación</h4>
            <p>
              Usted puede cancelar su Cuenta y dar por terminado su registro en
              cualquier momento desactivando su cuenta en el Sitio. Medicus
              puede suspender o cancelar su uso del Sitio, su Cuenta y/o
              registro por cualquier motivo en cualquier momento. Sujeto a la
              ley aplicable, Medicus se reserva el derecho de mantener, eliminar
              o destruir todas las comunicaciones y materiales publicados o
              cargados en el Sitio de conformidad con sus políticas internas de
              retención de registros y/o destrucción de contenido. Después de
              dicha cancelación Medicus no tendrá más obligación de proporcionar
              los Servicios, excepto en la medida en que estemos obligados a
              brindarle acceso a sus registros de salud o en la medida en que
              los Profesionales de atención médica estén obligados a brindarle
              atención continua según sus obligaciones legales, éticas y
              profesionales aplicables a usted. 
            </p>
            <h4>Derecho a modificar. </h4>
            <p>
              Podemos, a nuestro exclusivo criterio, cambiar, agregar o eliminar
              partes de estos Términos de uso en cualquier momento en el futuro.
              El uso continuado del Sitio y/o los Servicios después de la
              notificación de dichos cambios indicará su reconocimiento de
              dichos cambios y el acuerdo de estar sujeto a los Términos de uso
              revisados, incluidos dichos cambios. 
            </p>
            <h4>DESCARGO DE RESPONSABILIDAD DE GARANTÍAS. </h4>
            <p>
              USTED ACEPTA EXPRESAMENTE QUE EL USO DEL EL SITIO O LOS SERVICIOS
              ES BAJO SU PROPIO RIESGO. TANTO EL SITIO COMO LOS SERVICIOS SE
              PROPORCIONAN «TAL CUAL» Y «SEGÚN DISPONIBILIDAD». MEDICUS NIEGA
              EXPRESAMENTE TODAS LAS GARANTÍAS DE CUALQUIER TIPO, YA SEA
              EXPLÍCITA O IMPLÍCITA, INCLUYENDO, ENTRE OTRAS, CUALQUIER GARANTÍA
              DE COMERCIABILIDAD, IDONEIDAD PARA UN USO PARTICULAR O PROPÓSITO,
              NO INFRACCIÓN, TÍTULO, OPERABILIDAD, CONDICIÓN, DISFRUTE
              TRANQUILO, VALOR, EXACTITUD DE LOS DATOS E INTEGRACIÓN DEL
              SISTEMA.
            </p>
            <h4>LIMITACIÓN DE RESPONSABILIDAD. </h4>
            <p>
              USTED ENTIENDE QUE EN LA MEDIDA EN QUE LO PERMITA LA LEY
              APLICABLE, EN NINGÚN CASO MEDICUS, LAS PRÁCTICAS PROFESIONALES
              CONTRATADAS O SUS LOS RESPECTIVOS ACCIONISTAS, FUNCIONARIOS,
              EMPLEADOS, DIRECTORES, MATRICES, SUBSIDIARIAS, AFILIADOS, AGENTES
              O LICENCIANTES SERÁN RESPONSABLES DE CUALQUIER DAÑO INDIRECTO,
              INCIDENTAL, ESPECIAL, CONSECUENTE O EJEMPLAR, INCLUYENDO, ENTRE
              OTROS, DAÑOS POR PÉRDIDA DE INGRESOS, GANANCIAS, FONDO DE COMERCIO
              , USO, DATOS U OTRAS PÉRDIDAS INTANGIBLES QUE SURJAN O ESTÉN
              RELACIONADAS CON SU USO DEL SITIO O LOS SERVICIOS,
              INDEPENDIENTEMENTE DE SI DICHOS DAÑOS SE BASAN EN CONTRATO,
              AGRAVIO (INCLUYENDO NEGLIGENCIA Y RESPONSABILIDAD ESTRICTA),
              GARANTÍA, ESTATUTO U OTRO. 
            </p>
            <p>
              En la medida en que no podamos, según la ley aplicable, renunciar
              a cualquier garantía implícita o limitar sus responsabilidades, el
              alcance y la duración de dicha garantía y el alcance de nuestra
              responsabilidad serán el mínimo permitido bajo dicha ley
              aplicable. 
            </p>
            <h4>Indemnización. </h4>
            <p>
              Usted acepta indemnizar, defender y eximir de toda responsabilidad
              a Medicus, las Prácticas Profesionales Contratadas y sus
              respectivos accionistas, funcionarios, directores, empleados,
              agentes, subsidiarias, afiliados, otorgantes de licencias y
              proveedores, de y contra cualquier reclamo, acción, demanda,
              responsabilidad y acuerdo, incluidos, entre otros, honorarios
              legales y contables razonables («Reclamaciones»), que resulten o
              presuntamente resulten de su violación de estos Términos de uso.
            </p>
            <h4>Declaraciones</h4>
            <p>
              Todos los profesionales de la salud que realizan los servicios
              clínicos con licencia en el Sitio tienen las licencias
              profesionales emitidas por las juntas o agencias de licencias
              profesionales en los estados donde ejercen. Todos los médicos y
              psicólogos tienen títulos avanzados en medicina o psicología y han
              recibido capacitación de posgrado. Puede presentar una queja
              relacionada con la atención brindada por un profesional de
              atención médica comunicándose con la junta de licencias
              profesionales en el estado donde se encuentra físicamente el
              profesional de atención médica. En una relación profesional, la
              intimidad sexual nunca es apropiada y debe informarse a la junta o
              agencia que autoriza, registra o certifica al licenciatario. Puede
              encontrar la información de contacto de cada una de las juntas
              estatales de licencias profesionales que rigen la medicina en el
              sitio web de la Federación de Juntas Médicas Estatales, la que
              rige la psicología en el sitio web de la Asociación de Juntas de
              Psicología Estatales y Provinciales, y la que rige a los
              trabajadores sociales. 
            </p>
            <p>
              Cualquier registro clínico creado como resultado de su uso de los
              Servicios será mantenido de forma segura por Medicus en nombre de
              las Prácticas profesionales contratadas por un período que no sea
              menor que la cantidad mínima de años que dichos registros deben
              conservarse según la ley estatal y federal. que normalmente es de
              al menos seis años.
            </p>
            <h4>Enlaces a sitios web. </h4>
            <p>
              NO SEREMOS RESPONSABLES DE NINGUNA INFORMACIÓN, SOFTWARE O ENLACES
              QUE SE ENCUENTREN EN CUALQUIER OTRO SITIO WEB, UBICACIÓN DE
              INTERNET O FUENTE DE INFORMACIÓN, NI POR SU USO DE DICHA
              INFORMACIÓN, SOFTWARE O ENLACES, NI POR LOS ACTOS U OMISIONES DE
              TALES SITIOS WEB O SUS RESPECTIVOS OPERADORES. 
            </p>
            <h4>Propiedad.</h4>
            <p>
              El Sitio y todo su contenido, características y funcionalidad
              (incluidos, entre otros, toda la información, software, texto,
              pantallas, imágenes, video y audio, y el diseño, la selección y la
              disposición de los mismos), son propiedad de Medicus, sus
              licenciantes u otros proveedores de dicho material y están
              protegidos por los derechos de autor, marcas registradas,
              patentes, derechos de autor de los Estados Unidos e
              internacionales y otras leyes de propiedad intelectual o derechos
              de propiedad. Estos Términos de uso le permiten utilizar el Sitio
              únicamente para su uso personal y no comercial. No debe
              reproducir, distribuir, modificar, crear trabajos derivados,
              exhibir públicamente, ejecutar públicamente, volver a publicar,
              descargar, almacenar o transmitir ningún material en nuestro
              Sitio, excepto en la forma general y ordinariamente permitida a
              través del Sitio de acuerdo con estos Términos de uso. No debe
              acceder ni utilizar con fines comerciales ninguna parte del Sitio
              ni ningún servicio o material disponible a través del Sitio. 
            </p>
            <h4>Marcas comerciales </h4>
            <p>
              Ciertos nombres, logotipos y otros materiales que se muestran en
              el Sitio o en los Servicios pueden constituir marcas comerciales,
              nombres, marcas de servicio o logotipos («Marcas») de Medicus u
              otras entidades. Usted no está autorizado a utilizar dichas Marcas
              sin el permiso expreso por escrito de Medicus. La propiedad de
              todas esas Marcas y el fondo de comercio asociado con las mismas
              sigue siendo nuestro o de dichas entidades. 
            </p>
            <h4>Privacidad y comunicaciones. </h4>
            <p>
              Medicus debe cumplir con las leyes federales de seguridad y
              privacidad de la atención médica y mantener medidas de seguridad
              para proteger la seguridad de su información médica. Además, la
              información que Ud. le proporciona a su profesional de la salud
              durante una consulta médica es legalmente confidencial, excepto
              por ciertas excepciones legales, como se describe más
              detalladamente en nuestro Aviso de prácticas de privacidad de la
              información de salud y Política de privacidad. 
            </p>
            <p>
              Dedicamos un esfuerzo considerable para garantizar que su
              información personal este segura.  Información sobre nuestro uso
              de la información de salud y otros datos personales se proporciona
              en nuestro
              <b>
                Aviso de prácticas de privacidad de información de salud y
                Política de privacidad.
              </b>
              Como parte de nuestros Servicios, es posible que debamos
              proporcionarle ciertas comunicaciones, como recordatorios de
              citas, anuncios de servicios, avisos de privacidad, mensajes
              administrativos y otras comunicaciones sobre los Servicios
              («Comunicaciones»).
            </p>
            <p>
              Estas Comunicaciones se consideran parte de los Servicios y su
              Cuenta. Usted comprende que al marcar la casilla «aceptar» para
              estos Términos de uso y/o cualquier otro formulario que se le
              presente en el Sitio, usted acepta estos Términos de uso y que
              tales acción constituye una firma legal. Usted acepta que podemos
              enviarle Comunicaciones a través de medios electrónicos que
              incluyen, entre otros, (1) por correo electrónico, utilizando la
              dirección que nos proporcionó durante el registro, (2)
              notificaciones automáticas en su tableta o dispositivo móvil, o (
              3) mediante la publicación de Comunicaciones en el Sitio. La
              entrega de cualquier Comunicación de nuestra parte es efectiva
              cuando la enviamos, independientemente de si lee la Comunicación.
              Puede retirar su consentimiento para recibir Comunicaciones
              desactivando su Cuenta. Si bien siempre se prefiere la mensajería
              electrónica segura al correo electrónico no seguro, en
              determinadas circunstancias, es posible que se produzca una
              comunicación por correo electrónico no seguro que contenga
              información de salud personal entre usted y Medicus. Medicus no
              puede garantizar la seguridad o confidencialidad de los mensajes
              enviados por correo electrónico. La información relacionada con su
              atención, incluidas las notas clínicas y los registros médicos, se
              almacenan en servidores seguros y encriptados mantenidos por
              Medicus.
            </p>
            <h4>Misceláneos.</h4>
            <p>
              Estos Términos de uso y su uso del Sitio se regirán por las leyes
              del Estado de Delaware, sin otorgar efecto a los principios de
              conflicto de leyes. CUALQUIER DISPUTA QUE SURJA O SE RELACIONE DE
              ALGUNA MANERA CON ESTOS TÉRMINOS DE USO SE RESOLVERÁ
              EXCLUSIVAMENTE MEDIANTE ARBITRAJE FINAL Y VINCULANTE EN NUEVA
              YORK, NUEVA YORK, BAJO LAS REGLAS DE LA ASOCIACIÓN AMERICANA DE
              ARBITRAJE, EXCEPTO QUE CUALQUIERA DE LAS PARTES PUEDE PRESENTAR
              UNA RECLAMACIÓN RELACIONADA CON LA PROPIEDAD INTELECTUAL.
              DERECHOS, O BUSCAR CUMPLIMIENTO ESPECÍFICO TEMPORAL Y PRELIMINAR Y
              MEDIDAS CAUTELARES, EN CUALQUIER TRIBUNAL DE JURISDICCIÓN
              COMPETENTE, SIN FIANZA U OTRA GARANTÍA. TODAS LAS RECLAMACIONES,
              YA SEA EN ARBITRAJE O DE OTRA FORMA, DEBEN PRESENTARSE ÚNICAMENTE
              EN SU CAPACIDAD INDIVIDUAL, Y NO COMO DEMANDANTE O MIEMBRO DE
              CUALQUIER CLASE PRETENDIDA O PROCEDIMIENTO COLECTIVO. Las partes
              aceptan la jurisdicción personal y sobre la materia y el lugar de
              los tribunales ubicados en New York, New York, para cualquier
              acción relacionada con estos Términos de uso.  No se considerará
              que Medicus renuncia a ningún término o condición establecidos en
              estos Términos de uso, una renuncia adicional o continua de dicho
              término o condición o una renuncia de cualquier otro término o
              condición, y cualquier falla de Medicus para hacer valer un
              derecho o disposición bajo estos Términos de uso no constituirá
              una renuncia a tal derecho o disposición. Si un tribunal u otro
              tribunal de jurisdicción competente considera que alguna
              disposición de estos Términos de uso es inválida, ilegal o
              inaplicable por cualquier motivo, dicha disposición se eliminará o
              limitará en la medida mínima en que las disposiciones restantes de
              los Términos de uso, el uso continuará en pleno vigor y efecto. 
            </p>
            <p>
              La Ley de derechos de autor del milenio digital de 1998 (la
              «DMCA») brinda recursos a los propietarios de derechos de autor
              que creen que el material que aparece en Internet infringe sus
              derechos según la ley de derechos de autor de EE. UU. Si cree de
              buena fe que los materiales que aparecen en el Sitio infringen sus
              derechos de autor, usted (o su agente) puede enviarnos un aviso
              solicitando que se elimine el material o que se bloquee el acceso
              a él. Además, si cree de buena fe que se ha presentado
              incorrectamente una notificación de infracción de derechos de
              autor en su contra, la DMCA le permite enviarnos una
              contra-notificación. Las notificaciones y contra-notificaciones
              deben cumplir con los requisitos legales impuestos por la DMCA. Un
              lugar para encontrar más información es el sitio web de la Oficina
              de derechos de autor de EE. UU., actualmente ubicado en
              <a
                href="https://www.loc.gov/copyright"
                target="_blank"
                rel="noreferrer"
              >
                https://www.loc.gov/copyright
              </a>
              . De acuerdo con la DMCA, Medicus ha designado a un agente para
              recibir notificaciones de supuestas infracciones de derechos de
              autor de acuerdo con la DMCA. Cualquier notificación escrita de
              infracción reclamada debe cumplir con el Título 17, Código de los
              Estados Unidos, Sección 512 (c) (3) (A) y debe enviarse por
              escrito a Medicus, Inc., 3033 Campus Drive, Suite W225, Plymouth,
              MN 55441. 
            </p>
            <p>
              Por favor envíe cualquier pregunta o reporte de cualquier
              violación de esos términos de uso a{" "}
              <a href="mailto:support@joinmedicus.com">
                Support@joinmedicus.com
              </a>
              . 
            </p>
          </div>
        </div>
      </div>
    </div>
    // </Container>
  );
};
export default TermsAndConditions;
