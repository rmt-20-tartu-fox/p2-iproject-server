const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const nodemailer = require('nodemailer');
const midtransClient = require('midtrans-client');
const axios = require("axios");

// var Buffer = require('buffer/').Buffer
// var SpotifyWebApi = require('spotify-web-api-node');
// const Controller = require('../controllers/contoller');
// const CLIENT_ID = process.env.CLIENT_ID
// const CLIENT_SECRET = process.env.CLIENT_SECRET
// const REDIRECT_URI = process.env.REDIRECT_URI
// const CLIENT_SERVER_PAYMENT = process.env.CLIENT_SERVER_PAYMENT

router.post('/send', (req, res) => {
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
      </ul>
      <h3>Message</h3>
      <p>Welcome to GESTURA! Your email has been registered</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'joshsudarso19@gmail.com', // generated ethereal user
          pass: 'Akuadalah1'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <joshsudarso19@gmail.com>', // sender address
        to: `${req.body.email}`, // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    res.status(200).json({ message: 'Message has been sent' })
});

router.post('/payment', async (req, res) => {
  let snap = new midtransClient.Snap({
    isProduction : false,
    serverKey : 'SB-Mid-server-etMCuR0aCqusi59aR6Fa6A4s'
  });
  try {
    const { name, email, price, itemName } = req.body
    let parameter = {
      transaction_details: {
          order_id: `${Math.floor(Date.now() / 10)}`,
          gross_amount: price
      },
      credit_card:{
          secure : true
      },
      item_details: {
        name: itemName,
        price: price,
        quantity: 1
      },
      customer_details: {
          name: name,
          email: email,
      }
    };
    const result  = await snap.createTransaction(parameter)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
})

// const generateRandomString = length => {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVQXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length))
//   }
//   return text
// }

// router.get('/login', async (req, res) => {
//   try {   
//     var scope = 'user-read-private user-read-email playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private';
//     var state = generateRandomString(16);
//     res.redirect('https://accounts.spotify.com/authorize?' +
//       querystring.stringify({
//         response_type: 'token',
//         client_id: CLIENT_ID,
//         scope: scope,
//         redirect_uri: REDIRECT_URI,
//         state: state
//       }));
//     console.log('masukkkk')
//   } catch (error) {
//     console.log(error)
//   }
// })

module.exports = router;