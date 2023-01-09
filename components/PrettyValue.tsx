import Link from "next/link"

const PrettyValue = ({ rawKey, rawValue }) => {
  if (rawKey === "customerId")
    return (
      <Link href={`https://dashboard.stripe.com/customers/${rawValue}`}>
        {rawValue}
      </Link>
    )

  if (["email", "nextOfKinEmail"].includes(rawKey))
    return <Link href={`mailto:${rawValue}`}>{rawValue}</Link>

  if (rawValue === null) return <>—</>

  return <>{JSON.stringify(rawValue, null, 2)}</>
}

export default PrettyValue
