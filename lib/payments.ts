import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
})

/** get all a user's payments, for all races, most recent first  */
export const getPaymentsByCustomer = async (customerId: string) =>
  await stripe.charges.list({
    customer: customerId,
  })

/** get all a user's payments for a particular race, most recent first  */
export const getPaymentsByCustomerAndRace = async (
  customerId: string,
  raceId: string
) => {
  const charges = await stripe.charges.list({
    customer: customerId,
  })

  return charges.data.filter(charge => charge.metadata["raceId"] === raceId)
}

/** create a new blank customer for us to attribute payments to */
export const createCustomer = async () => await stripe.customers.create({})
