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

  let id = name
  if (props.value) id = `${name}-${props.value}`

  return (
    <div
      className={`group-field${required ? " group-field--required" : ""}${
        type === "checkbox" ? " group-field--checkbox" : ""
      }${type === "radio" ? " group-field--radio" : ""} ${
        hint ? " group-field--with-hint" : ""
      }`}
    >
      <input
        {...register(name)}
        className="group-field__input"
        aria-describedby={hint ? `${id}-hint` : ""}
        id={id}
        type={type}
        {...props}
      />

      <label className="group-field__label" htmlFor={id}>
        {label}
      </label>

      {hint && (
        <p className="group-field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
    </div>
  )
}

export default GroupField
