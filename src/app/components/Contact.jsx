import { object, string } from "yup";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import sendMail from "../utils/sendMail";
import { faroExperienceTunnel } from "../animations/Faro/ExperienceFaro";

const contactSchema = object({
  name: string().required().min(3),
  email: string().email().required(),
  message: string().required().min(3),
});
const Contact = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };
  return (
    <section className="w-full snap-always snap-start h-full flex flex-col justify-center items-center lg:justify-end lg:items-start
     relative text-white z-10 ">
      <div
        className="flex flex-col justify-center md:justify-start lg:justify-center gap-6 h-full lg:px-[9%] 2xl:px-[7%]
        items-start w-full lg:w-3/5 bg-rojo/60 lg:bg-rojo/90 px-8 md:py-[25%] lg:py-20 rounded-none"
      >
        <h4 className="subtitle-size relative z-10 drop-shadow-lg">
          ¡Trabajemos Juntos!
        </h4>
        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values, actions) => {
            try {
              await sendMail(values);
              Swal.fire({
                text: "¡Solicitud de contacto enviada!",
                icon: "success",
                background: "#202020",
                customClass: {
                  popup: "text-white",
                },
                showConfirmButton: false,
                timer: 2000,
              });

              actions.resetForm();
            } catch (error) {
              Swal.fire({
                text: "Error en la petición. Por favor, contactarse a través del correo: dutsiland@gmail.com",
                icon: "error",
                background: "#CE9F5D",
                customClass: {
                  popup: "text-white",
                  confirmButton: "bg-white text-[#202020]",
                },
              });
            }
            actions.setSubmitting(false);
          }}
          validationSchema={contactSchema}
        >
          {({ errors, isSubmitting }) => (
            <Form
              className="flex flex-col items-start w-full gap-2 md:gap-4 
                        relative z-10"
            >
              <div className="w-full">
                <label
                  className=" text-sm drop-shadow-lg"
                  htmlFor="name"
                >
                  Nombre y Apellido
                </label>
                <Field
                  id="name"
                  name="name"
                  className={`bg-negro/20 border text-white py-2 px-3 rounded-2xl w-full outline-none ${
                    errors.name && "border-red-600"
                  } drop-shadow-lg`}
                  type="text"
                />
              </div>
              <div className="w-full">
                <label
                  className=" text-sm drop-shadow-lg"
                  htmlFor="email"
                >
                  Correo Electrónico
                </label>
                <Field
                  id="email"
                  name="email"
                  className={`bg-negro/20 text-white border py-2 px-3 rounded-2xl w-full outline-none ${
                    errors.email && "border-red-600"
                  } drop-shadow-lg`}
                  type="email"
                />
              </div>
              <div className="w-full">
                <label
                  className=" text-sm drop-shadow-lg"
                  htmlFor="message"
                >
                  Mensaje
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  className={`bg-negro/20 text-white border py-2 outline-none px-3 rounded-2xl w-full resize-none
                min-h-[150px] md:min-h-[250px] lg:min-h-[150px] ${
                  errors.message && "border-red-600"
                } drop-shadow-lg`}
                  type="text"
                />
              </div>
              <button
                aria-disabled={isSubmitting}
                type="submit"
                className="button button-animation-red font-semibold text-rojo bg-white flex items-center gap-2 drop-shadow-lg"
              >
                <svg
                  className={`animate-spin -ml-1 mr-3 h-5 w-5 text-negro ${
                    isSubmitting ? "" : "hidden"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-55"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#E9E9E9"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="#1F1F1F"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enviar
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="absolute left-0 top-0 w-screen h-screen -z-10">
        <faroExperienceTunnel.Out />
      </div>
    </section>
  );
};

export default Contact;
