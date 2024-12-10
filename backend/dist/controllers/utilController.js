"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactEmail = exports.adminImagekit = void 0;
const imagekit_1 = __importDefault(require("imagekit"));
const env_1 = __importDefault(require("../utils/env"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const imagekit = new imagekit_1.default({
    urlEndpoint: 'https://ik.imagekit.io/8rwehsppf/KZ',
    publicKey: 'public_9RihJvmeroH9Gc8zBNZRFHhPMbA=',
    privateKey: env_1.default.IMAGEKIT_PRIVATE_KEY,
});
const adminImagekit = (req, res) => {
    console.log('adminImagekit');
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
};
exports.adminImagekit = adminImagekit;
const sendContactEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, text } = req.body;
        const transport = nodemailer_1.default.createTransport({
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
            html: `
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
        yield transport.sendMail(mailingParameters);
        const mailForWilson = {
            from: process.env.SMTP_EMAIL,
            to: 'wilsonzhu2003@gmail.com',
            subject: "Message Coming From KZ.io!",
            html: `
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
        yield transport.sendMail(mailForWilson);
        res.status(200).json({ message: "Email sent successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            return "failed to send result to students";
        }
    }
});
exports.sendContactEmail = sendContactEmail;
