import Image from "next/image"
import { formatDate } from "../lib/formatters"
import { Race } from "../types"

interface Props {
  race?: Race
}

const RaceBanner = ({ race }: Props) => {
  if (race)
    return (
      <header className="race-banner">
        <div className="race-banner__inner container">
          <span className="race-banner__hashtag">{race.hashtag}</span>

          <Image src={race.logoUrl} alt={race.title} width={150} height={150} />

          <span className="race-banner__date">{formatDate(race.date)}</span>
        </div>
      </header>
    )

  return null
}

export default RaceBanner
