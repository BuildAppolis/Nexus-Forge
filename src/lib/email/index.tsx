import "server-only";

import { EmailVerificationTemplate } from "./templates/email-verification";
import { ResetPasswordTemplate } from "./templates/reset-password";
import { render } from "@react-email/render";
import { env } from "@/env";
import { EMAIL_SENDER } from "@/lib/constants";
import { createTransport, type TransportOptions } from "nodemailer";
import type { ComponentProps } from "react";
import { logger } from "../logger";

export enum EmailTemplate {
  EmailVerification = "EmailVerification",
  PasswordReset = "PasswordReset",
}

export type PropsMap = {
  [EmailTemplate.EmailVerification]: ComponentProps<typeof EmailVerificationTemplate>;
  [EmailTemplate.PasswordReset]: ComponentProps<typeof ResetPasswordTemplate>;
};

const getEmailTemplate = async <T extends EmailTemplate>(template: T, props: PropsMap[NoInfer<T>]) => {
  try {
    switch (template) {
      case EmailTemplate.EmailVerification:
        return {
          subject: "Verify your email address",
          body: await render(
            <EmailVerificationTemplate {...(props as PropsMap[EmailTemplate.EmailVerification])} />,
          ),
        };
      case EmailTemplate.PasswordReset:
        return {
          subject: "Reset your password",
          body: await render(
            <ResetPasswordTemplate {...(props as PropsMap[EmailTemplate.PasswordReset])} />,
          ),
        };
      default:
        throw new Error("Invalid email template");
    }
  } catch (error) {
    await logger.error("Failed to render email template:", error);
    throw error;
  }
};

const smtpConfig = {
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
};

const transporter = createTransport(smtpConfig as TransportOptions);

export const sendMail = async <T extends EmailTemplate>(
  to: string,
  template: T,
  props: PropsMap[NoInfer<T>],
) => {
  if (env.MOCK_SEND_EMAIL) {
    await logger.info("📨 Email sent to:", to, "with template:", template, "and props:", props);
    return;
  }

  try {
    const { subject, body } = await getEmailTemplate(template, props);

    const result = await transporter.sendMail({
      from: EMAIL_SENDER,
      to,
      subject,
      html: body,
    });

    await logger.info(`Email sent successfully to ${to}`);
    return result;
  } catch (error) {
    await logger.error(`Failed to send email to ${to}:`, error);
    throw error;
  }
};