"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const TermsAndConditions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <li className="max-md:w-full">
        <button className="uppercase" onClick={onOpen}>
          Términos y Condiciones
        </button>
      </li>
      <Modal
        classNames={{
          body: "rounded-lg",
        }}
        size={"5xl"}
        isOpen={isOpen}
        placement="center"
        onClose={onClose}
        backdrop="blur"
      >
        <ModalContent className=" max-h-[80%] overflow-y-auto">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Términos y condiciones
              </ModalHeader>
              <ModalBody className="[&>h6]:font-semibold">
                <p>
                  ¡Bienvenido a Estudio Dutsiland! Estos términos y condiciones
                  describen las reglas y regulaciones para el uso del sitio web
                  de Estudio Dutsiland, ubicado en
                  <a
                    href="https://www.dutsiland.com/"
                    className="text-blue-600"
                  >
                    {" "}
                    https://www.dutsiland.com/{" "}
                  </a>
                  . Al acceder a este sitio web, asumimos que aceptas estos
                  términos y condiciones. No continúes usando Estudio Dutsiland
                  si no estás de acuerdo con todos los términos y condiciones
                  establecidos en esta página.
                </p>
                <h6>Condiciones de accceso y utilización</h6>
                <p>
                  El sitio web y sus informaciones son de acceso libre y
                  gratuito. No obstante, Estudio Dustiland puede condicionar la
                  utilización de algunos de los servicios ofrecidos en su web a
                  la previa formalización del correspondiente contrato de
                  prestación de servicios bajo licencias. <br /> El usuario
                  garantiza la autenticidad y actualidad de todos aquellos datos
                  que comunique a Estudio Dustiland y será el único responsable
                  de las manifestaciones falsas o inexactas que realice.
                  <br /> El usuario se compromete expresamente a hacer un uso
                  adecuado de los contenidos y servicios de Estudio Dustiland y
                  a no emplearlos para, entre otros: Difundir contenidos
                  delictivos, violentos, pornográficos, racistas, xenófobos,
                  ofensivos, de apología del terrorismo o, en general,
                  contrarios a la ley o al orden público.
                  <br />
                  Introducir en la red virus informáticos o realizar actuaciones
                  susceptibles de alterar, estropear, interrumpir o generar
                  errores o daños en los documentos electrónicos, datos o
                  sistemas físicos y lógicos de Estudio Dustiland o de terceras
                  personas; así como obstaculizar el acceso de otros usuarios al
                  sitio web y a sus servicios mediante el consumo masivo de los
                  recursos informáticos a través de los cuales Estudio Dustiland
                  presta sus servicios.
                  <br /> Intentar acceder a las cuentas de correo electrónico de
                  otros usuarios o a áreas restringidas de los sistemas
                  informáticos de Estudio Dustiland o de terceros y, en su caso,
                  extraer información.
                  <br /> Vulnerar los derechos de propiedad intelectual o
                  industrial, así como violar la confidencialidad de la
                  información de Estudio Dustiland o de terceros.<br /> Suplantar la
                  identidad de cualquier otro usuario.
                  <br /> Reproducir, copiar, distribuir, poner a disposición de,
                  Estudio Dustiland o cualquier otra forma de comunicación
                  pública, transformar o modificar los contenidos, a menos que
                  se cuente con la autorización del titular de los
                  correspondientes derechos o ello resulte legalmente permitido.
                  <br /> Recabar datos con finalidad publicitaria y de remitir
                  publicidad de cualquier clase y comunicaciones con fines de
                  venta u otras de naturaleza comercial sin que medie su previa
                  solicitud o consentimiento. Todos los contenidos del sitio
                  web, como textos, fotografías, gráficos, imágenes, iconos,
                  tecnología, software, así como su diseño gráfico y códigos
                  fuente, constituyen una obra cuya propiedad pertenece a
                  Estudio Dustiland sin que puedan entenderse cedidos al usuario
                  ninguno de los derechos de explotación sobre los mismos más
                  allá de lo estrictamente necesario para el correcto uso de la
                  web.
                  <br /> En definitiva, los usuarios que accedan a este sitio
                  web pueden visualizar los contenidos y efectuar, en su caso,
                  copias privadas autorizadas siempre que los elementos
                  reproducidos no sean cedidos posteriormente a terceros, ni se
                  instalen a servidores conectados a redes, ni sean objeto de
                  ningún tipo de explotación.
                  <br /> La distribución, modificación, cesión o comunicación
                  pública de los contenidos y cualquier otro acto que no haya
                  sido expresamente autorizado por el titular de los derechos de
                  explotación quedan prohibidos. El establecimiento de un
                  hiperenlace no implica en ningún caso la existencia de
                  relaciones entre Estudio Dutsiland y el propietario del sitio
                  web en la que se establezca, ni la aceptación y aprobación por
                  parte de Estudio Dutsiland de sus contenidos o servicios.
                  <br /> Estudio Dutsiland no se responsabiliza del uso que cada
                  usuario les dé a los materiales puestos a disposición en este
                  sitio web ni de las actuaciones que realice en base a los
                  mismos.
                </p>
                <h6>
                  Procedimiento en caso de realización de actividades de
                  carácter ilícito
                </h6>
                <p>
                  En el caso de que cualquier usuario o un tercero considere que
                  existen hechos o circunstancias que revelen el carácter
                  ilícito de la utilización de cualquier contenido y/o de la
                  realización de cualquier actividad en las páginas web
                  incluidas o accesibles a través del sitio web, deberá enviar
                  una notificación a Milestone identificándose debidamente y
                  especificando las supuestas infracciones.
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TermsAndConditions;
