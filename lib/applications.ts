import { Application } from "@prisma/client"
import { ApplicationStatus, ApplicationWithUser } from "../types"
import { sendConfirmationEmail } from "./emails"

export const getStatus = (application: Application): ApplicationStatus => {
  if (application.completedAt) return ApplicationStatus.Completed
  if (application.submittedAt) return ApplicationStatus.Submitted
  return ApplicationStatus.InProgress
}

export const getCompleteness = (application: Application): number => {
  if (application.completedAt) return 1
  if (application.submittedAt) return 0.66
  return 0.33
}

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
      user: {
        update: {
          ownedDocuments: {
            create: {
              title: "Race manual",
              key: "/fake/path",
              uploadedBy: "Lost Dot",
            },
          },
        },
      },
    },
    include: {
      user: true,
    },
  })

  await sendConfirmationEmail(updatedApplication.user.email, updatedApplication)

  return updatedApplication
}
