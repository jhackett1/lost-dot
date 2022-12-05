import { HTMLProps } from "react"
import { useFormContext } from "react-hook-form"

export interface Props extends HTMLProps<HTMLInputElement> {
  label: string
  hint?: string
}

const GroupField = ({ label, name, hint, required, type, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors?.[name]?.message

  let id = name
  if (props.value) id = `${name}-${props.value}`

  return (
    <div
      className={`group-field${required ? " field--required" : ""}${
        type === "checkbox" ? " group-field--checkbox" : ""
      }${type === "radio" ? " group-field--radio" : ""}`}
    >
      <input
        {...register(name)}
        className="group-field__input"
        aria-describedby={hint ? `${id}-hint` : ""}
        id={id}
        type={type}
        {...props}
      />

      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {hint && (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p role="alert" className="field__error">
          {error?.toString()}
        </p>
      )}
    </div>
  )
}

export default GroupField
