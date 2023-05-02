const nodemailer = require("nodemailer");
const axios = require("axios");


async function loginEmail(emailAdress) {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
      auth: {
        type: "OAuth2",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        user: "portaproba85@gmail.com",
        accessToken: process.env.ACCESS_TOKEN,
        refreshToken: process.env.REFRESH_TOKEN,
      },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Your Therapy', // sender address
    to: emailAdress, // list of receivers
    subject: "Your pscyhologists added you", // Subject line
    text: `Please login to our system by clicking the link.`, // plain text body
    html: `
    <a href="http://localhost:5173/" target="_blank">To login please click this link</a>`, // html body
  });

}

module.exports = loginEmail