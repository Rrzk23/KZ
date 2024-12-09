import ImageKit from 'imagekit';
import env from '../utils/env';
import { RequestHandler } from 'express';
import nodemailer from "nodemailer";
const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/8rwehsppf/KZ',
    publicKey: 'public_9RihJvmeroH9Gc8zBNZRFHhPMbA=',
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
  });
  
  export const adminImagekit : RequestHandler = (req, res) => {
    console.log('adminImagekit')
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
  }

  interface sendContactEmailBody {
    name: string;
    email: string;
    text: string;
  }

  export const sendContactEmail : RequestHandler<unknown, unknown, sendContactEmailBody, unknown> = async (req, res) => {
    try {
        const {name, email, text} = req.body;
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        const mailingParameters = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: "Message Sent!",
            html: 
            `
            <p>
                Hi, <strong>${name}</strong>!
            </p>
            <p>
                It is Wilson here! Thanks for contacting me through KZ.io!
                I will contact you within 24 hours and looking forward the conversation
                with you!!!
            </p>

            <p>
                Regards,<br>
                Wilson Zhu
            </p>
            `
        };
        await transport.sendMail(mailingParameters);
        const mailForWilson = {
          from: process.env.SMTP_EMAIL,
          to: 'wilsonzhu2003@gmail.com',
          subject: "Message Coming From KZ.io!",
          html: 
          `
          <p>
              Hi, <strong>Wilson</strong>!
          </p>
          <p>
              There is a message coming from ${name} with email ${email} written this text:
              ${text}.
              Reaching them quick!!!
          </p>

          <p>
              Regards,<br>
              Wilson Zhu
          </p>
          `
      };
      await transport.sendMail(mailForWilson);

      res.status(200).json({ message: "Email sent successfully" });

        
    } catch (error) {
        if (error instanceof Error) {
            return "failed to send result to students";
        }
    }
}


  
  
  