import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
const WorkCard = ({ data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        className="w-full h-32 md:h-40 rounded-lg hover:scale-[1.02] transition-all duration-200 relative"
        onClick={onOpen}
      >
        <Image
          className="w-full object-cover h-full absolute left-0 top-0 rounded-lg"
          width={400}
          height={400}
          quality={50}
          src={data.coverImage}
          alt={"Imagen de portada: " + data.title}
        />
        <div
          className="z-10 relative backdrop-brightness-50 lg:backdrop-brightness-90 w-full h-full flex items-center
        justify-center hover:backdrop-brightness-50 transition-all duration-200 rounded-lg"
        >
          <Image
            width={200}
            height={200}
            quality={50}
            src={data.coverLogo}
            alt={"Logo: " + data.title}
          />
        </div>
      </button>
      <Modal
        classNames={{
          base: "max-w-[90%] md:max-w-[80%] lg:max-w-[90%] ",
          closeButton: "text-white hover:bg-white/5 active:bg-white/10",
          backdrop: "bg-[#202020]/90",
        }}
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="w-full h-[90%] md:h-3/4 bg-[#202020]/80">
          {(onClose) => (
            <div className="flex w-full h-full items-center flex-wrap overflow-y-auto">
              <div className="w-full lg:w-1/2 lg:h-full bg-[#CE9F5D]/80 flex flex-col text-white p-8 md:p-10 gap-4 md:gap-6 items-start">
                <h6 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
                  {data.title}
                </h6>
                <p className="text-sm md:text-base">{data.text}</p>
                <ul className="text-sm md:text-base">
                  <p className="font-bold">Servicios</p>
                  {data.fields.map((field, i) => (
                    <li key={i} className="text-sm">
                      {field}
                    </li>
                  ))}
                </ul>
                <a
                  href={data.link}
                  target="_blank"
                  className="text-sm md:text-base pt-1 pb-1.5 px-6 text-[#202020] rounded-2xl bg-white 
                  hover:scale-[1.03] transition-all duration-200"
                >
                  Échale un vistazo
                </a>
              </div>
              <div className="w-full lg:w-1/2 lg:max-h-full p-10 lg:overflow-y-auto grid grid-cols-1 gap-4">
                {data.images.map((image, i) => (
                  <Image
                    className={`rounded-sm w-full`}
                    width={400}
                    height={300}
                    quality={50}
                    key={i}
                    src={data.imagesRoot + image}
                    alt="Imagen del trabajo"
                  />
                ))}
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default WorkCard;
