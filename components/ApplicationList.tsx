import { Application } from "@prisma/client"
import Link from "next/link"
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
            rider application
          </h2>
          <p>
            <>
              {/* TODO: fix this */}
              Submitted: XX/XX/XXXX
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
