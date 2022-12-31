import { prettyKey } from "../lib/formatters"

const ExpanderRow = data => (
  <tr className="expanded-row">
    <td colSpan={100}>
      <dl className="expanded-row__dl">
        {Object.entries(data).map(entry => (
          <div key={entry[0]}>
            <dt className="expanded-row__dt">{prettyKey(entry[0])}</dt>
            <dd className="expanded-row__dd">
              {JSON.stringify(entry[1], null, 2)}
            </dd>
          </div>
        ))}
      </dl>
    </td>
  </tr>
)

export default ExpanderRow
