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

  let id = name
  if (props.value) id = `${name}-${props.value}`

  return (
    <div className={required ? "field field--required" : "field"}>
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
      <input
        {...register(name)}
        className="field__input"
        aria-describedby={hint ? `${id}-hint` : ""}
        id={id}
        type={type}
        {...props}
      />
    </div>
  )
}

export default Field
