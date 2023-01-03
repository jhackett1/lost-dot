import React, { useEffect, useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Layout, LayoutObject } from "@stripe/stripe-js"
import Link from "next/link"

const CheckoutForm = ({
  goBackLink,
  completionLink,
}: {
  goBackLink: string
  completionLink: string
}) => {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!stripe) return

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )

    if (!clientSecret) return

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Your payment succeeded")
          break
        case "processing":
          setMessage("Your payment is processing")
          break
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again")
          break
        default:
          setMessage(
            "Something went wrong. Please refresh the page and try again."
          )
          break
      }
    })
  }, [stripe])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!stripe || !elements) return
    // Stripe.js has not yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: completionLink,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("An unexpected error occurred.")
    }

    setIsLoading(false)
  }

  const paymentElementOptions = {
    layout: "tabs" as Layout,
  }

  return (
    <form
      id="payment-form"
      className="form form--payment"
      onSubmit={handleSubmit}
    >
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      {message && (
        <div id="payment-message" className="error error--panel">
          {message}
        </div>
      )}

      <div className="form__footer">
        <Link href={goBackLink}>Go back</Link>

        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading && <div className="spinner" id="spinner"></div>}
            Pay now
          </span>
        </button>
      </div>
    </form>
  )
}

export default CheckoutForm
