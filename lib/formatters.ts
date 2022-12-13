let formatter = Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
})

/** take a raw number in pounds and format it nice */
export const formatCurrency = (raw: number): string => formatter.format(raw)
