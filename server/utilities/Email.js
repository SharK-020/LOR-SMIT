const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

// Initialize SendGrid with your API key from the environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send the email
const sendEmail = (mailOptions) => {
	return sgMail.send(mailOptions);
};

module.exports = sendEmail;
