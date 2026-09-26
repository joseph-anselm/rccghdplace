// pages/api/sendCounselRequest.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, telephone, whatsapp, message, timeToReach } = req.body;

    try {
      let transporter = nodemailer.createTransport({
        host: 'smtp.titan.email', // Replace with your SMTP server host
        port: 465, // Usually 465 for SSL, or 587 for TLS
        secure: true, // Use true for 465, false for other ports
        auth: {
          user: 'counselling@rccghdplace.org', // Authenticated email address
          pass: 'CONTROLLer#1000', // Replace with your email password or app-specific password
        },
      });

      let mailOptions = {
        from: '"Counsel Request" <counselling@rccghdplace.org>', // Match this with the authenticated email
        to: 'counselling@rccghdplace.org', // Email address to receive the request
        subject: 'New Counseling Request',
        text: `
          Name: ${name}
          Email: ${email}
          Telephone: ${telephone}
          WhatsApp: ${whatsapp}
          Message: ${message}
          Preferred Time to Reach: ${timeToReach}
        `,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Counseling request sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email. Please try again later.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
