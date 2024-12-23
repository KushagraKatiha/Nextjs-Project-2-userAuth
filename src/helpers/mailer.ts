import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // TODO: configure mail for usage
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    
    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, 
        {$set:{
        verifyToken: hashedToken,
        verifyExpirey: Date.now() + 3600000,
      }});
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set:{
        verifyToken: hashedToken,
        verifyExpirey: Date.now() + 3600000,
      }});
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3e989b3ec8efbf",
        pass: "6d58d567ebfde9",
      },
    });

    const mailOptions = {
      from: "kushagra@kushagra.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser.
        <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log("mailResponse", mailResponse);
    
    return mailResponse;
  } catch (error: any) {
    throw new Error(error);
  }
};
