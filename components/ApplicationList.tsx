import { Application } from "@prisma/client"
import Link from "next/link"
import { formatDate } from "../lib/formatters"
import { getRaceById } from "../lib/races"

interface Props {
  applications: Application[]
}

const ApplicationList = ({ applications }: Props) => (
  <ul className="applications-list">
    {applications.map(application => (
      <li className="applications-list__card" key={application.id}>
        <div>
          <h2>
            {getRaceById(application?.raceId)?.title || application?.raceId}{" "}
            {application.type.toLowerCase()} application
          </h2>
          <p>
            <>
              {application.submittedAt
                ? `Submitted: ${formatDate(application.submittedAt)}`
                : `Started: ${formatDate(application.createdAt)}`}
            </>
          </p>
        </div>

        <Link className="button" href={`/applications/${application.raceId}`}>
          View
        </Link>
      </li>
    ))}
  </ul>
)

export default ApplicationList
