const nodemailer = require('nodemailer');
const MailListener = require('mail-listener2');
const dns = require('dns');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
  logger: true, // Log SMTP connection info
  debug: true,  // Log debugging output
});


// Updated sendEmail function
const sendEmail = async (to, subject, html) => {
  try {
   

  console.log(to)

    const mailOptions = {
      from:`EDUCTION BOX TEAM < ${process.env.EMAIL_USER}>`,
      to,
      subject,
      
      html,
    };

    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.error(err);
              reject(err);
          } else {
              console.log(info);
              resolve(info);
          }
      });
  });

    // Attempt to send the email
  //  transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// const mailListener = new MailListener({
//     username: process.env.EMAIL_USER,
//     password: process.env.EMAIL_PASS ,// or use OAuth2
//     host: 'imap.gmail.com',
//     port: 993,
//     tls: true,
//     mailbox: 'INBOX',
//     searchFilter: ['UNSEEN'],
//     markSeen: true,
//     fetchUnreadOnStart: true,
//     tlsOptions: { rejectUnauthorized: false },
//   });
  
//   mailListener.start();
  
//   // Step 4: Listen for new bounce-back messages
//   mailListener.on('mail', (mail, seqno, attributes) => {
//     const { subject, from, text } = mail;
    
//     // Check if the email is a bounce-back message
//     if (subject.includes('Undelivered Mail Returned to Sender')) {
//       console.log('Bounce-back detected');
//       console.log('From:', from);
//       console.log('Message:', text);
  
//       // You can also parse the bounce-back text to identify invalid email addresses
//       if (text.includes('550') || text.includes('5.1.1')) {
//         console.log('Invalid email address detected:', from);
//         // Here you can handle the invalid email address (e.g., update the status, log it, etc.)
//       }
//     }
//   });
  
//   // Step 5: Optionally, handle any errors from the mail listener
//   mailListener.on('error', (err) => {
//     console.error('Mail listener error:', err);
//   });

module.exports = sendEmail;
