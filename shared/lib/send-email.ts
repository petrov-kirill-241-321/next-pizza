import { Resend } from "resend";

export const sendEmail = async (
  to: string,
  subject: string,
  template: React.ReactNode
) => {
  const resend = new Resend("re_DNueGpEF_8DA2YJ8bFJNRRbnWJVmwxSwT");

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    text: "",
    react: template,
  });

  if (error) {
    throw error;
  }

  return data;
};
