let formatter = Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
})

/** take a raw number in pounds and format it nice */
export const formatCurrency = (raw: number): string => formatter.format(raw)

/** take a raw date and format it nice */
export const formatDate = (raw: string): string => new Date(raw).toDateString()

/** take a raw date and time and format it nice */
export const formatDateAndTime = (raw: string): string =>
  new Date(raw).toUTCString()
