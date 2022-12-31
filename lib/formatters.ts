import * as inflection from "inflection"
import { ApplicationStatus } from "../types"

let formatter = Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
})

/** take a raw number in pounds and format it nice */
export const formatCurrency = (raw: number): string => formatter.format(raw)

/** take a raw date and format it nice, works with unix timestamps * 1000 too */
export const formatDate = (raw: number | string | Date): string =>
  new Date(raw).toDateString()

/** take a raw date and time and format it nice, works with unix timestamps * 1000 too */
export const formatDateAndTime = (raw: number | string | Date): string =>
  new Date(raw).toUTCString()

export const prettyKey = (raw: string) =>
  inflection.humanize(inflection.underscore(raw))

export const prettyStatus = (raw: ApplicationStatus): string =>
  prettyKey(
    Object.entries(ApplicationStatus).find(([key, val]) => raw === val)[0]
  )
