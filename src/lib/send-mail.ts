'use server';
import nodemailer from 'nodemailer';
const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
// const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;
const transporter = nodemailer.createTransport({
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateLimit: 10,
});

export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html,
}: {
  email: string;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
  } catch (error) {
    console.error('Something Went Wrong', SMTP_SERVER_USERNAME, SMTP_SERVER_PASSWORD, error);
    return;
  }
  const info = await transporter.sendMail({
    from: email,
    to: sendTo ,
    subject: subject,
    text: text,
    html: html ? html : '',
  });
  console.log('Message Sent', info.messageId);
//   console.log('Mail sent to', SITE_MAIL_RECIEVER);
  return info;
}