import { prettyKey } from "../lib/formatters"
import PrettyValue from "./PrettyValue"

const ExpanderRow = data => (
  <tr className="expanded-row">
    <td colSpan={100}>
      <dl className="expanded-row__dl">
        {Object.entries(data).map(entry => (
          <div key={entry[0]}>
            <dt className="expanded-row__dt">{prettyKey(entry[0])}</dt>
            <dd className="expanded-row__dd">
              <PrettyValue rawKey={entry[0]} rawValue={entry[1]} />
            </dd>
          </div>
        ))}
      </dl>
    </td>
  </tr>
)

export default ExpanderRow
