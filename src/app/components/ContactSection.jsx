"use client";
import { object, string } from "yup";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import sendMail from "../utils/sendMail";
import useClient from "../utils/useClient";
import { sendGAEvent } from "@next/third-parties/google";
import { motion } from "framer-motion";
import Image from "next/image";

const contactSchema = object({
  name: string().required("Nombre requerido").min(3, "Mínimo 3 caracteres"),
  email: string().email("Email inválido").required("Email requerido"),
  message: string().required("Mensaje requerido").min(3, "Mínimo 3 caracteres"),
});

const ContactSection = () => {
  const isClient = useClient();
  const initialValues = { name: "", email: "", message: "" };

  if (!isClient) return null;

  return (
    <section
      id="contacto"
      className="relative flex items-center w-full min-h-screen overflow-hidden text-white snap-always snap-start"
      aria-labelledby="contact-heading"
    >
      {/* Background: opaque left side, transparent right for faro on desktop */}
      <div className="absolute inset-0 bg-negro-light lg:bg-transparent" />
      <div className="hidden lg:block top-0 left-0 absolute bg-negro-light w-[60%] h-full" />
      <div className="absolute inset-0 bg-gradient-to-br from-rojo/10 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="py-16 sm:py-20 w-full section-padding">
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block mb-3 sm:mb-4 font-medium text-rojo text-xs sm:text-sm uppercase tracking-widest"
          >
            Contacto
          </motion.span>
          <h2 id="contact-heading" className="mb-3 sm:mb-4 heading-md">
            Trabajemos Juntos
          </h2>
          <p className="mb-6 sm:mb-8 text-white/50 body-md">
            Contanos tu idea y la hacemos realidad. Respondemos en menos de 24
            horas.
          </p>

          <Formik
            initialValues={initialValues}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (values, actions) => {
              try {
                await sendMail(values);
                Swal.fire({
                  text: "Solicitud de contacto enviada.",
                  icon: "success",
                  background: "#0a0a0a",
                  color: "#fff",
                  showConfirmButton: false,
                  timer: 2000,
                });
                sendGAEvent({ event: "generate_lead", value: "contacto" });
                actions.resetForm();
              } catch (error) {
                Swal.fire({
                  text: "Error en la petición. Contactarse a: dutsiland@gmail.com",
                  icon: "error",
                  background: "#0a0a0a",
                  color: "#fff",
                });
              }
              actions.setSubmitting(false);
            }}
            validationSchema={contactSchema}
          >
            {({ errors, isSubmitting }) => (
              <Form className="flex flex-col gap-4 sm:gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 text-white/60 text-xs sm:text-sm"
                  >
                    Nombre y Apellido
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className={`w-full bg-white/[0.03] border ${
                      errors.name ? "border-rojo" : "border-white/10"
                    } 
                    text-white py-2.5 sm:py-3 px-4 rounded-xl outline-none focus:border-rojo/60 
                    transition-colors duration-200 placeholder:text-white/20 text-sm sm:text-base`}
                    placeholder="Tu nombre"
                  />
                  {errors.name && (
                    <span className="block mt-1 text-rojo-light text-xs">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-white/60 text-xs sm:text-sm"
                  >
                    Correo Electrónico
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className={`w-full bg-white/[0.03] border ${
                      errors.email ? "border-rojo" : "border-white/10"
                    } 
                    text-white py-2.5 sm:py-3 px-4 rounded-xl outline-none focus:border-rojo/60 
                    transition-colors duration-200 placeholder:text-white/20 text-sm sm:text-base`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <span className="block mt-1 text-rojo-light text-xs">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-1 text-white/60 text-xs sm:text-sm"
                  >
                    Mensaje
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    className={`w-full bg-white/[0.03] border ${
                      errors.message ? "border-rojo" : "border-white/10"
                    } 
                    text-white py-2.5 sm:py-3 px-4 rounded-xl outline-none focus:border-rojo/60 
                    transition-colors duration-200 resize-none min-h-[120px] sm:min-h-[140px] 
                    placeholder:text-white/20 text-sm sm:text-base`}
                    placeholder="Contanos sobre tu proyecto..."
                  />
                  {errors.message && (
                    <span className="block mt-1 text-rojo-light text-xs">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="self-start disabled:opacity-50 mt-2 disabled:cursor-not-allowed btn-primary"
                >
                  {isSubmitting ? (
                    <svg
                      className="w-5 h-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    "Enviar mensaje"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Social links */}
      <div className="right-5 sm:right-8 bottom-6 sm:bottom-8 z-10 absolute flex items-center gap-3 sm:gap-4">
        <a
          href="https://www.linkedin.com/company/dutsiland"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn de Dutsiland"
          className="flex justify-center items-center hover:bg-white/10 rounded-full w-9 sm:w-10 h-9 sm:h-10 transition-colors glass"
        >
          <Image
            src="/icons/LinkedIn.png"
            width={18}
            height={18}
            alt="LinkedIn"
          />
        </a>
        <a
          href="https://www.instagram.com/dutsiland.estudio/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram de Dutsiland"
          className="flex justify-center items-center hover:bg-white/10 rounded-full w-9 sm:w-10 h-9 sm:h-10 transition-colors glass"
        >
          <Image
            src="/icons/Instagram.png"
            width={18}
            height={18}
            alt="Instagram"
          />
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
