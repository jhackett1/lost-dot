import { HTMLProps } from "react"
import { useFormContext } from "react-hook-form"

export interface Props extends HTMLProps<HTMLInputElement> {
  label: string
  hint?: string
}

const Field = ({ label, name, hint, required, type, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors?.[name]?.message

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {hint && <p>{hint}</p>}
      {error && <p role="alert">{error?.toString()}</p>}
      <input {...register(name)} id={name} type={type} {...props} />
    </div>
  )
}

export default Field
