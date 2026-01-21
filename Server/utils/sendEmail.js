const { transport } = require("./email");

const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: `"JobStack" <${process.env.EMAIL_USER}>`,
      to,
      subject,
    };

    if (html) {
      mailOptions.html = html;
    } else {
      mailOptions.text = text;
    }

    await transport.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendEmail };
