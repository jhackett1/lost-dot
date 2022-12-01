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
    <div className="field">
      <label className="field__label" htmlFor={name}>
        {label}
      </label>
      {hint && <p className="field__hint">{hint}</p>}
      {error && (
        <p role="alert" className="field__error">
          {error?.toString()}
        </p>
      )}
      <input
        {...register(name)}
        className="field__input"
        id={name}
        type={type}
        {...props}
      />
    </div>
  )
}

export default Field
