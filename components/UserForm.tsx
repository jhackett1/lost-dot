import { User } from "@prisma/client"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Field from "./Field"
import { UserInput } from "../types"
import { UserInputSchema } from "../lib/validators"
import { useState } from "react"
import marketingPrefs from "../data/marketing-preferences.json"

interface Props {
  user: User
}

const UserForm = ({ user }: Props) => {
  const [formStatus, setFormStatus] = useState<string>("")

  const methods = useForm<UserInput>({
    defaultValues: user,
    resolver: zodResolver(UserInputSchema),
  })

  const onSubmit = async values => {
    console.log(values)

    const res = await fetch(`/api/profile`, {
      method: "PUT",
      body: JSON.stringify(values),
    })
  }

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="side-by-side">
          <Field label="First name" name="firstName" required />
          <Field label="Last name" name="lastName" required />
        </div>
        <div className="side-by-side">
          <Field
            label="Date of birth"
            name="dateOfBirth"
            hint="You must be 18 years or older on race day"
            type="date"
            required
          />
        </div>
        <Field label="Gender" name="gender" />
        <Field
          label="Ethnicity"
          name="ethnicity"
          hint="The only intention behind collecting information on ethnicity is that Lost Dot choose to take positive action in encouraging diversity on our events."
        />
        <Field
          label="Nationality"
          name="nationality"
          hint="This is the country that you'd like to represent when you race a Lost Dot race. This does not need to be the same as your country of residence."
        />
        <Field
          label="First language"
          name="firstLang"
          hint="We'd like to know your first language in case of emergency."
        />

        <fieldset className="fieldset">
          <legend>Next of kin</legend>
          <p>Who should we contact in an emergency?</p>
          <p>
            We will email this person as part of the application process, so
            make sure you have input their email correctly
          </p>
          <div className="side-by-side">
            <Field label="Their name" name="nextOfKinName" required />
            <Field
              label="Their contact number"
              name="nextOfKinPhone"
              required
            />
          </div>
          <div className="side-by-side">
            <Field label="Their email" name="nextOfKinEmail" required />
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <legend>Contact preferences</legend>
          <p>Let us know what emails you'd like to receive.</p>
          {Object.entries(marketingPrefs).map(opt => (
            <Field
              label={opt[0]}
              value={opt[0]}
              name="contactPrefs"
              hint={opt[1]}
              type="checkbox"
            />
          ))}
        </fieldset>
        {formStatus && <p role="alert">{formStatus}</p>}

        {!methods.formState.isValid && methods.formState.submitCount > 0 && (
          <p role="alert" className="error">
            There are errors with your profile
          </p>
        )}
        <button disabled={methods.formState.isSubmitting}>
          {methods.formState.isSubmitting && (
            <svg width="142" height="142" viewBox="0 0 142 142" fill="none">
              <g clipPath="url(#clip0_541_343)">
                <path
                  opacity="0.5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M71 142C110.212 142 142 110.212 142 71C142 31.7878 110.212 0 71 0C31.7878 0 0 31.7878 0 71C0 110.212 31.7878 142 71 142ZM71 112C93.6437 112 112 93.6437 112 71C112 48.3563 93.6437 30 71 30C48.3563 30 30 48.3563 30 71C30 93.6437 48.3563 112 71 112Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M194 -52H71V30C93.6437 30 112 48.3563 112 71H194V-52Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_541_343">
                  <rect width="142" height="142" rx="71" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
          Save
        </button>
      </form>
    </FormProvider>
  )
}

export default UserForm
