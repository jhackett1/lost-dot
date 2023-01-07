import * as inflection from "inflection"
import { ApplicationStatus } from "../types"
import { DateTime } from "luxon"

let formatter = Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
})

/** take a raw number in pounds and format it nice */
export const formatCurrency = (raw: number): string => formatter.format(raw)

/** take a raw date and format it nice, works with unix timestamps too if * by 1000 first */
export const formatDate = (raw: number | string | Date): string =>
  new Date(raw).toDateString()

/** take a raw date and time and format it nice, works with unix timestamps too if * by 1000 first */
export const formatDateAndTime = (raw: number | string | Date): string =>
  new Date(raw).toUTCString()

export const prettyKey = (raw: string) => {
  if (raw === "id") return "ID"
  if (raw === "customerId") return "Stripe customer ID"

  return inflection.humanize(inflection.underscore(raw))
}

export const prettyStatus = (raw: ApplicationStatus): string =>
  prettyKey(
    Object.entries(ApplicationStatus).find(([key, val]) => raw === val)[0]
  )

/** Convert an ISO-formatted string into a human-friendly date string */
export const prettyTimeDiff = (raw: Date | string): string => {
  const parsed = DateTime.fromISO(raw)
  return parsed.isValid ? parsed.toRelative() : ""
}
