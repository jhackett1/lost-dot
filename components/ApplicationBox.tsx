import { Application } from "@prisma/client"
import Link from "next/link"
import { formatDateAndTime } from "../lib/formatters"
import { Race } from "../types"
import CompletionMeter from "./CompletionMeter"

const ApplicationBox = ({
  application,
  race,
}: {
  application: Application
  race: Race
}) => {
  const completion = 0.5

  return (
    <div className="application-box">
      <h1 className="application-box__headline">
        {application.submittedAt
          ? `Finish your ${race.hashtag} application using the race manual`
          : `Start by making an expression of interest`}
      </h1>

      <strong className="application-box__deadline">
        Deadline: {formatDateAndTime(race.deadline)}
      </strong>

      <div className="application-box__body">
        <CompletionMeter completion={completion} />

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
                application.submittedAt
                  ? "application-box__timeline-task--complete"
                  : ""
              }`}
            >
              {application.submittedAt && (
                <span className="application-box__timeline-complete">
                  Complete:
                </span>
              )}
              Answer a few questions and pay for the race manual
            </li>
            <li className="application-box__timeline-task">
              Use the race manual to answer some specific questions to complete
              your application
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
