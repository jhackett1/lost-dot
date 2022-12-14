import sg from "@sendgrid/mail"
import { SendVerificationRequestParams } from "next-auth/providers"

sg.setApiKey(process.env.SENDGRID_API_KEY as string)

export const sendMagicLink = async ({
  identifier,
  url,
  provider,
}: SendVerificationRequestParams) =>
  await sg.send({
    from: provider.from,
    to: identifier,
    subject: "Sign in to Lost Dot",
    content: [
      {
        type: "text/html",
        value: `Sign in to Lost Dot: \n${url}\n\n`,
      },
    ],
  })
