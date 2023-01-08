import { ApplicationWithUser } from "../types"
import { sendConfirmationEmail } from "./emails.server"

export const submitApplication = async (
  raceId: string,
  userId: string
): Promise<ApplicationWithUser> => {
  const updatedApplication = await prisma.application.update({
    where: {
      raceId_userId: {
        raceId,
        userId,
      },
    },
    data: {
      submittedAt: new Date(),
    },
    include: {
      user: true,
    },
  })

  await prisma.document.create({
    data: {
      ownedBy: userId,
      title: "Race manual",
      key: "/fake/path",
    },
  })

  await sendConfirmationEmail(updatedApplication.user.email, updatedApplication)

  return updatedApplication
}
