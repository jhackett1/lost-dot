import { FormProvider, useForm } from "react-hook-form"
import prefs from "../data/preferences"
import GroupField from "./GroupField"
import { usePreferences } from "../hooks/useAdminData"
import { useEffect, useState } from "react"
import useClickOutside from "../hooks/useClickOutside"

interface FormValues {
  preferences: typeof prefs
}

const ApplicationPreferenceControls = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { data, mutate } = usePreferences()

  const methods = useForm<FormValues>({
    defaultValues: data,
  })

  const handleSubmit = async values => {
    const res = await fetch(`/api/profile`, {
      method: "PUT",
      body: JSON.stringify(values),
    })
    if (res.ok) {
      mutate(values)
      setOpen(false)
    }
  }

  const handleClick = () => setOpen(false)

  const ref = useClickOutside(handleClick)

  const handleKeyUp = e => {
    if (e.key === "Escape") handleClick()
  }

  useEffect(() => methods.reset(data), [data, methods])

  return (
    <div className="menu" ref={ref} onKeyUp={handleKeyUp}>
      <button
        className="button button--secondary button--small"
        onClick={() => setOpen(!open)}
      >
        <svg
          width="76"
          height="75"
          viewBox="0 0 76 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M66.8385 40.2719C66.9273 39.3565 66.9784 38.4284 66.9784 37.4874C66.9727 36.2116 66.884 34.9371 66.7107 33.6726L74.6102 28.2682H74.6109C75.1625 27.8921 75.3286 27.1534 74.9922 26.5772L65.9859 10.9358C65.653 10.3596 64.9318 10.1382 64.3319 10.427L55.695 14.5981C53.6477 13.0122 51.3975 11.7079 49.0038 10.7193L48.2663 1.16945H48.2655C48.213 0.507384 47.6586 -0.00211878 46.9935 6.64682e-06H29.0067C28.3415 -0.00212223 27.7871 0.507384 27.7346 1.16945L26.997 10.7193H26.9963C24.9612 11.5567 23.0274 12.6231 21.2336 13.8984L11.0569 9.02826C10.4577 8.71887 9.72087 8.93104 9.37801 9.51151L0.180986 25.4451C-0.169693 26.0306 0.00422686 26.7877 0.57497 27.1617L9.33966 33.1636C9.12599 34.5948 9.02022 36.0403 9.02164 37.4872C9.02164 38.4282 9.02164 39.3564 9.16148 40.2717L0.574884 46.1466V46.1473C0.0041518 46.5206 -0.169779 47.2785 0.1809 47.8639L9.37792 63.7968C9.70872 64.3992 10.4576 64.6299 11.0695 64.3183L19.8975 60.084H19.8982C21.9866 61.7637 24.2987 63.1459 26.7677 64.1912L27.5052 73.805C27.5457 74.477 28.1036 75.0014 28.7773 75H47.1971C47.8708 75.0014 48.4288 74.477 48.4692 73.805L49.2323 64.1912C51.7013 63.1459 54.0134 61.7637 56.1018 60.084L64.9297 64.3183H64.9305C65.5424 64.6299 66.2913 64.3992 66.6221 63.7968L75.8191 47.8759V47.8766C76.1698 47.2912 75.9958 46.5333 75.4251 46.1593L66.8385 40.2719ZM38.0003 51.1957C34.3636 51.1957 30.8753 49.7516 28.3035 47.1806C25.7317 44.6096 24.287 41.1226 24.287 37.4874C24.287 33.8522 25.7316 30.3651 28.3035 27.7942C30.8755 25.2234 34.3637 23.7792 38.0003 23.7792C41.6368 23.7792 45.1252 25.2232 47.697 27.7942C50.2688 30.3652 51.7136 33.8522 51.7136 37.4874C51.71 41.1221 50.264 44.6069 47.6929 47.1765C45.1223 49.7466 41.6363 51.1921 38.0003 51.1957Z"
            fill="#545959"
          />
        </svg>
        Customise
      </button>
      {open && (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="menu__inner"
          >
            <fieldset className="fieldset">
              <legend>Columns to show</legend>

              <GroupField
                label="Race"
                type="checkbox"
                name="x"
                checked
                disabled
                className="group-field--small"
              />
              <GroupField
                label="Applicant"
                type="checkbox"
                name="x"
                checked
                disabled
                className="group-field--small"
              />

              {prefs.map(pref => (
                <GroupField
                  label={pref}
                  type="checkbox"
                  name="preferences"
                  value={pref}
                  className="group-field--small"
                  key={pref}
                />
              ))}
            </fieldset>
            <button
              className="button button--small"
              disabled={methods.formState.isSubmitting}
            >
              Save
            </button>
          </form>
        </FormProvider>
      )}
    </div>
  )
}

export default ApplicationPreferenceControls
