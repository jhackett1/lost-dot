import { User } from "@prisma/client"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Field from "./Field"
import { UserInput, UserWithApplications } from "../types"
import { UserInputSchema } from "../lib/validators"
import { useState } from "react"
import marketingPrefs from "../data/marketing-preferences.json"
import ethnicities from "../data/ethnicities.json"
import Loader from "./Loader"
import GroupField from "./GroupField"
import ErrorSummary from "./ErrorSummary"
import { useRouter } from "next/router"

interface Props {
  user: User
}

const UserForm = ({ user }: Props) => {
  const [formStatus, setFormStatus] = useState<string>("")
  const { replace, push } = useRouter()

  const methods = useForm<UserInput>({
    defaultValues: {
      ...user,
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().slice(0, 10)
        : "",
    },
    resolver: zodResolver(UserInputSchema),
  })

  const onSubmit = async values => {
    const res = await fetch(`/api/profile`, {
      method: "PUT",
      body: JSON.stringify(values),
    })
    if (res.ok) {
      if (user.onboardedAt) {
        // keep the user on the same page
        replace("/", null, {
          scroll: true,
        })
        // send a newly onboarded user over to applications
      } else {
        push("/applications")
      }
    }
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
        <Field label="Gender" name="gender" type="select">
          <option></option>
          <option>Female</option>
          <option>Male</option>
          <option>Non-binary/genderqueer</option>
          <option>Other</option>
        </Field>
        <Field
          label="Ethnicity"
          name="ethnicity"
          type="select"
          hint="The only intention behind collecting information on ethnicity is that Lost Dot choose to take positive action in encouraging diversity on our events."
        >
          <option></option>
          {Object.entries(ethnicities).map(([groupName, subEthnicities]) => (
            <optgroup label={groupName} key={groupName}>
              {subEthnicities.map(opt => (
                <option value={opt} key={opt}>
                  {opt}
                </option>
              ))}
            </optgroup>
          ))}
        </Field>
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
          <legend className="fieldset__big-legend">Next of kin</legend>
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
          <legend className="fieldset__big-legend">Contact preferences</legend>
          <p>Let us know what emails you'd like to receive.</p>
          {Object.entries(marketingPrefs).map(opt => (
            <GroupField
              label={opt[0]}
              value={opt[0]}
              name="contactPrefs"
              hint={opt[1]}
              type="checkbox"
            />
          ))}
        </fieldset>

        {formStatus && <p role="alert">{formStatus}</p>}

        <ErrorSummary>
          There are errors with your profile—answer all the required questions
          and try again.
        </ErrorSummary>

        <div className="form__footer">
          <button disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting && <Loader />}
            Save
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export default UserForm
