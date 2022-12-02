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
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Field label="First name" name="firstName" required />
        <Field label="Last name" name="lastName" required />
        <Field
          label="Date of birth"
          name="dateOfBirth"
          hint="You must be 18 years or older on race day"
          type="date"
          required
        />
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

        <fieldset>
          <legend>Next of kin</legend>
          <p>Who should we contact in an emergency?</p>
          <p>
            We will email this person as part of the application process, so
            make sure you have input their email correctly
          </p>
          <Field label="Their name" name="nextOfKinName" />
          <Field label="Their contact number" name="nextOfKinPhone" />
          <Field label="Their email" name="nextOfKinEmail" />
        </fieldset>

        <fieldset>
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

        <button disabled={methods.formState.isSubmitting}>Save</button>
      </form>
    </FormProvider>
  )
}

export default UserForm
