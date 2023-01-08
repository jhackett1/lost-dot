import { Application } from "@prisma/client"
import sg from "@sendgrid/mail"
import { SendVerificationRequestParams } from "next-auth/providers"
import templates from "../data/email-templates.json"
import { getRaceById } from "./races"

export const sendMagicLink = async ({
  identifier,
  url,
  provider,
}: SendVerificationRequestParams) => {
  sg.setApiKey(process.env.SENDGRID_API_KEY as string)

  return await sg.send({
    from: provider.from,
    templateId: templates.signIn,
    personalizations: [
      {
        to: identifier,
        dynamicTemplateData: {
          url,
        },
      },
    ],
  })
}

export const sendConfirmationEmail = async (
  to: string,
  application: Application
) => {
  sg.setApiKey(process.env.SENDGRID_API_KEY as string)

  return await sg.send({
    from: process.env.EMAIL_FROM,
    templateId: templates.expressionOfInterestConfirmation,
    personalizations: [
      {
        to,
        dynamicTemplateData: {
          race: getRaceById(application.raceId)?.title || application.raceId,
          url: `${process.env.PUBLIC_URL}/applications/${application.raceId}`,
        },
      },
    ],
  })
}
