import { object, string } from "yup";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import sendMail from "../utils/sendMail";
import {faroExperienceTunnel} from '../animations/Faro/ExperienceFaro'

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
    <section
      className="w-full mx-auto snap-always snap-start flex flex-col h-full justify-center gap-6 
      items-start relative text-negro z-10"
    >
      {/* <div
          className=" rounded-[70px] lg:!rounded-[100px] 
        w-full h-5/6 absolute bottom-9 -z-10 bg-rojo"
        ></div> */}
      <h4 className="subtitle-size mx-[10%] lg:ml-[9%] 2xl:ml-[7%] relative z-10 drop-shadow-lg">
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
            className="flex flex-col items-start w-11/12 md:w-2/3 lg:w-1/2 2xl:w-1/3 gap-2 
          mx-[10%] lg:ml-[9%] 2xl:ml-[7%] relative z-10 max-lg:mb-16"
          >
            <div className="w-full">
              <label className="text-negro text-sm drop-shadow-lg" htmlFor="name">
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
              <label className="text-negro text-sm drop-shadow-lg" htmlFor="email">
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
              <label className="text-negro text-sm drop-shadow-lg" htmlFor="message">
                Mensaje
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                className={`bg-negro/20 text-white border py-2 outline-none px-3 rounded-2xl w-full resize-none
                md:min-h-[150px] lg:min-h-[100px] ${
                  errors.message && "border-red-600"
                } drop-shadow-lg`}
                type="text"
              />
            </div>
            <button
              aria-disabled={isSubmitting}
              type="submit"
              className="button button-animation-red text-white bg-rojo flex items-center gap-2 drop-shadow-lg"
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
      <div className="absolute left-0 top-0 w-screen h-screen -z-10">
        <faroExperienceTunnel.Out />
      </div>
    </section>
  );
};

export default Contact;
