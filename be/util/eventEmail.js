const nodemailer = require("nodemailer");

async function eventEmail(emailAdress, event) {
  
  let transporter = nodemailer.createTransport({
     service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        accessToken: process.env.ACCESS_TOKEN,
        refreshToken: process.env.REFRESH_TOKEN,
      },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Your Therapy', // sender address
    to: emailAdress, // list of receivers
    subject: "Your pscyhologists added a new event", // Subject line
    text: `Please login to our system by clicking the link.`, // plain text body
    html: `
    <p>Dear Client,</p>
    <p>Your psychologist added a new event to your calendar.</p>
    <p>Event name: ${event.summary}</p>
    <p>Event description: ${event.description}</p>
    <p>Event start: ${event.start}</p>
    <p>Event end: ${event.end}</p>
    <p>Event location: ${event.location}</p>
    <a href="http://localhost:5173/" target="_blank">To login please click this link</a>`, // html body
  });

}

module.exports = eventEmail