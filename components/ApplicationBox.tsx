import { Application } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/router"
import { getCompleteness } from "../lib/applications"
import { formatDateAndTime } from "../lib/formatters"
import { Race } from "../types"
import CompletionMeter from "./CompletionMeter"

const ApplicationBox = ({
  application,
  race,
}: {
  application: Application
  race?: Race
}) => {
  const { query } = useRouter()

  return (
    <div className="application-box">
      <h1 className="application-box__headline">
        {application.submittedAt || query.success
          ? `Finish your ${
              race.hashtag || application.raceId
            } application using the race manual`
          : `Start by making an expression of interest`}
      </h1>

      {race && (
        <strong className="application-box__deadline">
          Deadline: {formatDateAndTime(race.deadline)}
        </strong>
      )}

      <div className="application-box__body">
        <CompletionMeter completion={getCompleteness(application)} />

        <div>
          <ol className="application-box__timeline">
            <li className="application-box__timeline-task application-box__timeline-task--complete">
              <span className="application-box__timeline-complete">
                Complete:
              </span>
              Create a Lost Dot profile
            </li>
            <li
              className={`application-box__timeline-task ${
                application.submittedAt || query.success
                  ? "application-box__timeline-task--complete"
                  : ""
              }`}
            >
              {(application.submittedAt || query.success) && (
                <span className="application-box__timeline-complete">
                  Complete:
                </span>
              )}
              Answer a few questions and pay for the race manual
            </li>
            <li className="application-box__timeline-task">
              Use the race manual to answer some specific questions to complete
              your application
              <br />
              <a href="#">View race manual</a>
            </li>
          </ol>

          <Link
            href={`/applications/${application.raceId}/steps`}
            className="button"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ApplicationBox
