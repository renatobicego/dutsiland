import { object, string } from "yup";
import { motion, useTransform } from "framer-motion";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import sendMail from "../utils/sendMail";
const contactSchema = object({
  name: string().required().min(3),
  email: string().email().required(),
  message: string().required().min(3),
});
const Contact = ({ scrollClampSecondAnimation }) => {
  // Opacity animation
  const opacityContact = useTransform(
    scrollClampSecondAnimation,
    [0.85, 0.93],
    [0, 1]
  );

  const zIndex = useTransform(
    scrollClampSecondAnimation,
    [0.85, 0.93],
    [0, 50]
  );

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };
  return (
    <motion.div
      style={{ opacity: opacityContact, zIndex }}
      className="w-[90%] md:w-2/3 lg:w-2/5 2xl:w-1/3 lg:h-5/6 bg-[#202020]/30 absolute top-1/2 -translate-y-1/2 lg:left-[10%] z-50
                    rounded-lg flex flex-col items-center py-10 px-4 gap-6 left-1/2 -translate-x-1/2 lg:-translate-x-0"
    >
      <h4 className="text-3xl text-white font-semibold">¡Trabajemos Juntos!</h4>
      <Formik
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values, actions) => {
          try {
            // await sendEmail(values);
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
              text: "Error en la petición. Por favor, contactarse a través del correo: renato.bicego@gmail.com",
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
          <Form className="flex flex-col items-start w-11/12 md:w-2/3 gap-2">
            <div className="w-full">
              <label className="text-white text-sm" htmlFor="name">
                Nombre y Apellido
              </label>
              <Field
                id="name"
                name="name"
                className={`bg-white/10 border text-white py-1 px-3 rounded-lg w-full outline-none ${
                  errors.name && "border-red-600"
                }`}
                type="text"
              />
            </div>
            <div className="w-full">
              <label className="text-white text-sm" htmlFor="email">
                Correo Electrónico
              </label>
              <Field
                id="email"
                name="email"
                className={`bg-white/10 text-white border py-1 px-3 rounded-lg w-full outline-none ${
                  errors.email && "border-red-600"
                }`}
                type="email"
              />
            </div>
            <div className="w-full">
              <label className="text-white text-sm" htmlFor="message">
                Mensaje
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                className={`bg-white/10 text-white border py-1 outline-none px-3 rounded-lg w-full resize-none min-h-[100px] ${
                  errors.message && "border-red-600"
                }`}
                type="text"
              />
            </div>
            <button
              aria-disabled={isSubmitting}
              type="submit"
              className="pt-1 pb-1.5 px-6 text-white rounded-2xl bg-[#B34D4D] flex items-center gap-2"
            >
              <svg
                className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white ${
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
    </motion.div>
  );
};

export default Contact;
