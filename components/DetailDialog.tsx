import { createPortal } from "react-dom"
import { prettyKey } from "../lib/formatters"
import { ApplicationWithUser, UserWithApplications } from "../types"
import PrettyValue from "./PrettyValue"

const DetailSidebar = ({
  data,
  handleClose,
}: {
  data: ApplicationWithUser | UserWithApplications
  handleClose: () => void
}) => {
  if (typeof window !== "undefined")
    return createPortal(
      <aside className="dialog">
        <header className="dialog__header">
          <h1 className="dialog__title">Application detail</h1>

          <button onClick={handleClose} className="dialog__close">
            <svg width="20" height="20" viewBox="0 0 6 6">
              <path d="M0.121308 0.828445L0.828414 0.121338L5.77816 5.07109L5.07105 5.77819L0.121308 0.828445Z"></path>
              <path d="M5.07105 0.121338L5.77816 0.828445L0.828414 5.77819L0.121307 5.07108L5.07105 0.121338Z"></path>
            </svg>

            <span className="visually-hidden">Close</span>
          </button>
        </header>

        <div className="dialog__body">
          <dl className="dialog__dl">
            {Object.entries(data).map(entry => (
              <div key={entry[0]}>
                <dt className="dialog__dt">{prettyKey(entry[0])}</dt>
                <dd className="dialog__dd">
                  <PrettyValue rawKey={entry[0]} rawValue={entry[1]} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>,
      document?.querySelector("#sidebar-portal")
    )

  return null
}

export default DetailSidebar
