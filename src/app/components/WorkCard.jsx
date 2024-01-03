import {
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

const WorkCard = ({ data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <button
        className="w-full h-40 rounded-lg hover:scale-[1.02] transition-all duration-200 relative"
        onClick={onOpen}
      >
        <img
          className="w-full object-cover h-full absolute left-0 top-0 rounded-lg"
          src={data.coverImage}
          alt={"Imagen de portada: " + data.title}
        />
        <div
          className="z-10 relative backdrop-brightness-50 lg:backdrop-brightness-90 w-full h-full flex items-center
        justify-center hover:backdrop-brightness-50 transition-all duration-200 rounded-lg"
        >
          <img src={data.coverLogo} alt="" />
        </div>
      </button>
      <Modal
        classNames={{
          base: "max-w-[90%] ",
          closeButton: "text-white hover:bg-white/5 active:bg-white/10",
          backdrop: "bg-[#202020]/90",
        }}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="w-full h-3/4 bg-[#202020]/80">
          {(onClose) => (
            <div className="flex w-full h-full items-center">
              <div className="w-1/2 max-h-full p-10 overflow-y-auto grid grid-cols-1 gap-4">
                {data.images.map((image, i) => (
                  <img
                    className={`rounded-sm`}
                    key={i}
                    src={data.imagesRoot + image}
                    alt=""
                  />
                ))}
              </div>
              <div className="w-1/2 h-full bg-[#CE9F5D]/80 flex flex-col text-white p-10 gap-6 items-start">
                <h6 className="text-5xl font-semibold">{data.title}</h6>
                <p>{data.text}</p>
                <ul>
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
                  className="pt-1 pb-1.5 px-6 text-[#202020] rounded-2xl bg-white hover:scale-[1.03] transition-all duration-200"
                >
                  Échale un vistazo
                </a>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default WorkCard;
