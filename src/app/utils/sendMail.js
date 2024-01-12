import axios from "axios";

const sendEmail = async ({
  name,
  message,
  email,
}) => {
  try {
    await axios.post(
      "https://formspree.io/f/xnqenpeb",
      {
        name,
        email,
        message,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

export default sendEmail;
