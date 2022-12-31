import { Application } from "@prisma/client"
import { ApplicationStatus } from "../types"

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
