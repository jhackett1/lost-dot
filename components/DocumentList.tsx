import { Document } from "@prisma/client"
import Link from "next/link"
import { formatDate } from "../lib/formatters"

const DocumentList = ({ documents }: { documents: Document[] }) => (
  <ul className="document-list">
    {documents.map(doc => (
      <li className="document-list__doc" key={doc.id}>
        <div className="document-list__preview"></div>

        <div className="document-list__meta">
          <Link className="document-list__title" href={doc.key}>
            {doc.title}
          </Link>
          <p className="secondary-text">
            <>Added {formatDate(doc.createdAt)}</>
          </p>
        </div>
      </li>
    ))}
  </ul>
)

export default DocumentList
