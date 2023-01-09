import { ApplicationStatus, ApplicationWithUser } from "../types"
import prefs from "../data/preferences"
import { formatDate, prettyStatus } from "../lib/formatters"
import { getStatus } from "../lib/applications"
import Link from "next/link"

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

  if (col === "Submitted") return <td>{formatDate(application.submittedAt)}</td>

  if (col === "Last edited") return <td>{formatDate(application.updatedAt)}</td>

  if (col === "Date of birth")
    return <td>{formatDate(application.user.dateOfBirth)}</td>

  if (col === "First language") return <td>{application.user.firstLang}</td>

  if (col === "Email")
    return (
      <td>
        <Link href={`mailto:${application.user.email}`}>
          {application.user.email}
        </Link>
      </td>
    )

  return (
    <td>
      {application[col.toLowerCase()] || application.user[col.toLowerCase()]}
    </td>
  )
}

export default ApplicationColumns
