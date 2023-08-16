import * as nodemailer from "nodemailer";


export async function sendEmail(to: string, subject: string, text: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "alanemmanueldiazcoutino@gmail.com",
      pass: "",
    },
  });

  const mailOptions = {
    from: "alanemmanueldiazcoutino@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado correctamente");
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
}
