import { HTMLProps } from "react"
import { useFormContext } from "react-hook-form"

export interface Props
  extends HTMLProps<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > {
  label?: string
  hint?: string
  dontShowOptional?: boolean
}

const Field = ({
  label,
  name,
  hint,
  required,
  type,
  children,
  dontShowOptional,
  ...props
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors?.[name]?.message

  let id = name.replaceAll(" ", "").toLowerCase()
  if (props.value)
    id += `-${props.value.toString().replaceAll(" ", "").toLowerCase()}`

  return (
    <div className={`field${required ? " field--required" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {!required && !dontShowOptional && (
          <span className="field__optional">optional</span>
        )}
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

      {!["checkbox", "radio"].includes(type) &&
        (type === "textarea" ? (
          <textarea
            {...register(name)}
            className="field__input"
            aria-describedby={hint ? `${id}-hint` : ""}
            id={id}
            rows={3}
          ></textarea>
        ) : type === "select" ? (
          //@ts-ignore
          <select
            {...register(name)}
            className="field__input"
            aria-describedby={hint ? `${id}-hint` : ""}
            id={id}
            {...props}
          >
            {children}
          </select>
        ) : (
          //@ts-ignore
          <input
            {...register(name)}
            className="field__input"
            aria-describedby={hint ? `${id}-hint` : ""}
            id={id}
            type={type}
            {...props}
          />
        ))}
    </div>
  )
}

export default Field
