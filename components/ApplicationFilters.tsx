import Field from "./Field"
import races from "../data/races.json"
import throttle from "lodash.throttle"
import { ApplicationType } from "@prisma/client"

const ApplicationFilters = ({ mutate, ...helpers }) => (
  <form
    onSubmit={helpers.handleSubmit(() => mutate())}
    onChange={throttle(
      helpers.handleSubmit(() => mutate()),
      1000
    )}
    className="filters"
  >
    <Field
      label="Search"
      name="search"
      type="search"
      placeholder="Search by name or contact detail..."
      dontShowOptional
    />

    <Field type="select" label="Races" name="race_id" dontShowOptional>
      <option value="">All races</option>
      {races.map(race => (
        <option key={race.id} value={race.id}>
          {race.title} only
        </option>
      ))}
    </Field>

    <Field type="select" label="Application type" name="type" dontShowOptional>
      <option value="">All applications</option>
      <option value={ApplicationType.Racing}>Racing only</option>
      <option value={ApplicationType.Volunteering}>Volunteering only</option>
    </Field>
  </form>
)

export default ApplicationFilters
