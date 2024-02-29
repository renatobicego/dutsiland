import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
const WorkCard = ({ data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        className={`w-full h-[22vh] md:h-[20vh] lg:h-[40vh] 2xl:h-[46vh] rounded-3xl hover:scale-[1.03]  transition-all duration-500 
      relative outline-none ${data.bg} group shrink-0 scroll-m-2`}
      >
        <Image
          className="w-full object-cover h-full absolute left-0 top-0 rounded-3xl opacity-0 group-hover:opacity-100 
          transition-all duration-500"
          width={400}
          height={400}
          quality={50}
          src={data.imagesRoot + data.coverImage}
          alt={"Imagen de portada: " + data.title}
        />
        <button
          onClick={onOpen}
          className="z-10 relative lg:backdrop-brightness-90 w-full h-full flex items-center
        justify-center hover:backdrop-brightness-50 transition-all duration-500 rounded-3xl"
        >
          <Image
            width={200}
            height={200}
            quality={50}
            className="max-h-[40%] max-w-[50%] md:max-h-[60%] xl:max-h-[70%] 2xl:w-[45%] 3xl:w-[40%] 3xl:h-full object-contain"
            src={data.imagesRoot + data.coverLogo}
            alt={"Logo: " + data.title}
          />
        </button>
      </div>
      <Modal
        classNames={{
          base: "max-w-[90%] ",
          closeButton: "text-white hover:bg-white/5 active:bg-white/10",
          backdrop: "bg-[#202020]/90",
        }}
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="w-full h-[90%] bg-[#202020]/80">
          {(onClose) => (
            <div className="flex w-full h-full items-center flex-wrap overflow-y-auto">
              <div className="w-full lg:w-1/2 lg:h-full bg-[#CE9F5D]/80 flex flex-col text-white p-8 md:p-10 gap-4 md:gap-6 items-start">
                <h6 className="text-2xl md:text-3xl 2xl:text-5xl font-semibold">
                  {data.title}
                </h6>
                <p className="text-sm 2xl:text-base">{data.text}</p>
                <ul className="text-sm 2xl:text-base">
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
                  className="button text-[#202020] bg-white "
                >
                  Visitar proyecto
                </a>
              </div>
              <div className="w-full lg:w-1/2 lg:max-h-full p-10 lg:overflow-y-auto grid grid-cols-1 gap-4">
                {data.images.map((image, i) => (
                  <Image
                    className={`rounded-sm w-full`}
                    width={400}
                    height={500}
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
