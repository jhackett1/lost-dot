import Field from "./Field"
import GroupField from "./GroupField"
import throttle from "lodash.throttle"
import { useEffect } from "react"

const UserFilters = ({ mutate, ...helpers }) => {
  // const vals = helpers.watch()

  // useEffect(() => helpers.handleSubmit(() => mutate()), [vals])

  return (
    <form onSubmit={helpers.handleSubmit(() => mutate())} className="filters">
      <Field
        label="Search"
        name="search"
        type="search"
        placeholder="Search by name or contact detail..."
        dontShowOptional
      />

      <fieldset className="fieldset">
        <legend>Only show</legend>

        <GroupField
          label="Administrators"
          value={1}
          name="only_admins"
          type="checkbox"
        />

        <GroupField
          label="Users with applications"
          value={1}
          name="only_with_applications"
          type="checkbox"
        />
      </fieldset>
    </form>
  )
}

export default UserFilters
