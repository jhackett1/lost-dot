import { Document } from "@prisma/client"
import Link from "next/link"

const DocumentList = ({ documents }: { documents: Document[] }) => (
  <ul className="document-list">
    {documents.map(doc => (
      <li className="document-list__doc" key={doc.id}>
        <Link className="document-list__title" href={doc.key}>
          {doc.title}
        </Link>
        <p className="secondary-text">
          <>Added {doc.createdAt}</>
        </p>
      </li>
    ))}
  </ul>
)

export default DocumentList
