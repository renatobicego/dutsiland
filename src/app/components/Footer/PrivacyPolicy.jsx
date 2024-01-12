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

const PrivacyPolicy = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <li className="max-md:w-full">
        <button className="uppercase" onClick={onOpen}>
          Política de Privacidad
        </button>
      </li>
      <Modal
        classNames={{
          body: "rounded-lg",

        }}
        size={"5xl"}
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
      >
        <ModalContent className=" max-h-[80%] overflow-y-auto">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Política de privacidad
              </ModalHeader>
              <ModalBody className="[&>h6]:font-semibold">
                <p>
                  El presente Política de Privacidad establece los términos en
                  que Estudio Dutsiland usa y protege la información que es
                  proporcionada por sus usuarios al momento de utilizar su sitio
                  web. Esta compañía está comprometida con la seguridad de los
                  datos de sus usuarios. Cuando le pedimos llenar los campos de
                  información personal con la cual usted pueda ser identificado,
                  lo hacemos asegurando que sólo se empleará de acuerdo con los
                  términos de este documento. Sin embargo esta Política de
                  Privacidad puede cambiar con el tiempo o ser actualizada por
                  lo que le recomendamos y enfatizamos revisar continuamente
                  esta página para asegurarse que está de acuerdo con dichos
                  cambios.
                </p>
                <h6>Información que es recogida</h6>
                <p>
                  Nuestro sitio web podrá recoger información personal: Nombre
                  completo e información de contacto como su dirección de correo
                  electrónica. Así mismo cuando sea necesario podrá ser
                  requerida información específica para procesar algún pedido o
                  realizar una entrega o facturación.
                </p>
                <h6>Uso de la información recogida</h6>
                <p>
                  Nuestro sitio web emplea la información con el fin de
                  proporcionar el mejor servicio posible, particularmente para
                  contactar a nuestros clientes, cuando estos lo requieran, y
                  mejorar nuestros productos y servicios. Estudio Dutsiland está
                  altamente comprometido para cumplir con el compromiso de
                  mantener su información segura. Usamos los sistemas más
                  avanzados y los actualizamos constantemente para asegurarnos
                  que no exista ningún acceso no autorizado.
                </p>
                <h6>Enlaces a Terceros</h6>
                <p>
                  Este sitio web pudiera contener en laces a otros sitios que
                  pudieran ser de su interés. Una vez que usted de clic en estos
                  enlaces y abandone nuestra página, ya no tenemos control sobre
                  al sitio al que es redirigido y por lo tanto no somos
                  responsables de los términos o privacidad ni de la protección
                  de sus datos en esos otros sitios terceros. Dichos sitios
                  están sujetos a sus propias políticas de privacidad por lo
                  cual es recomendable que los consulte para confirmar que usted
                  está de acuerdo con estas.
                </p>
                <p>
                  Estudio Dutsiland se reserva el derecho de cambiar los
                  términos de la presente Política de Privacidad en cualquier
                  momento.
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PrivacyPolicy;
