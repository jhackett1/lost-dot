import { User } from "@prisma/client"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Field from "./Field"
import { UserInput } from "../types"
import { UserInputSchema } from "../lib/validators"
import { useState } from "react"

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
        <Field label="Ethnicity" name="ethnicity" />
        <Field label="Nationality" name="nationality" />
        <Field label="First language" name="firstLang" />

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
          {/* TODO */}
        </fieldset>

        {formStatus && <p role="alert">{formStatus}</p>}

        <button disabled={methods.formState.isSubmitting}>Save</button>
      </form>
    </FormProvider>
  )
}

export default UserForm
