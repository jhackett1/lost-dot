import { ApplicationStatus, ApplicationWithUser } from "../types"
import prefs from "../data/preferences"
import { formatDate, prettyStatus } from "../lib/formatters"
import { getStatus } from "../lib/applications"

const ApplicationColumns = ({
  col,
  application,
}: {
  col: typeof prefs[number]
  application: ApplicationWithUser
}) => {
  if (col === "Status") {
    const status = getStatus(application)
    return (
      <td>
        <span
          className={`tag ${
            status === ApplicationStatus.InProgress ? "tag--yellow" : ""
          }`}
        >
          {prettyStatus(status)}
        </span>
      </td>
    )
  }

  if (col === "Started") return <td>{formatDate(application.createdAt)}</td>

  // TODO: add other specialty handling here

  return <td>{application[col]}</td>
}

export default ApplicationColumns
