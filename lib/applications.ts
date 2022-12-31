import { Application } from "@prisma/client"
import { ApplicationStatus } from "../types"

export const getStatus = (application: Application): ApplicationStatus => {
  if (application.completedAt) return ApplicationStatus.Completed
  if (application.submittedAt) return ApplicationStatus.Submitted
  return ApplicationStatus.InProgress
}
