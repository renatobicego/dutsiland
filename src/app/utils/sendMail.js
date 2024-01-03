
const sendEmail = async ({
  name,
  message,
  email,
}) => {
  try {
    await axios.post(
      "",
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
