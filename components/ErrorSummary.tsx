import { useFormContext } from "react-hook-form"

const ErrorSummary = ({ children }) => {
  const { formState } = useFormContext()

  if (!formState.isValid && formState.submitCount > 0)
    return (
      <p role="alert" className="error error--panel">
        {children}
      </p>
    )

  return null
}

export default ErrorSummary
