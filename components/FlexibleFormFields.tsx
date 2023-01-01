import { useForm } from "react-hook-form"
import { Question } from "../types"
import Field from "./Field"
import GroupField from "./GroupField"

interface Props {
  questions: Question[]
}

const FlexibleFormFields = ({ questions }: Props) => {
  const methods = useForm()

  return (
    <>
      {questions.map(question => {
        if (question.options)
          return (
            <fieldset
              className={`fieldset ${
                question.required ? " field--required" : ""
              }`}
              key={question.name}
            >
              <legend>{question.label}</legend>

              {methods.formState.errors[question.name] && (
                <p role="alert" className="error">
                  {methods.formState.errors[question.name].message.toString()}
                </p>
              )}

              {question.options.map(option => (
                <GroupField
                  name={question.name}
                  label={option}
                  key={`${question.name}—${option}`}
                  type={question.type}
                  value={option}
                />
              ))}
            </fieldset>
          )

        return <Field {...question} key={question.name} />
      })}
    </>
  )
}

export default FlexibleFormFields
