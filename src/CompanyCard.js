import { Link } from "react-router-dom"

import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'

/**
 * Renders a company card
 *
 * Props:
 * - handle, description, logo
 */
function CompanyCard({ handle, description, logo }) {
  return (
    <ListGroup.Item
      action
      href={`/companies/${handle}`}>
        <div className="d-flex justify-content-between">
          <div className="me-3">
            <p className="">{handle}</p>
            <p className="text-muted"><small>{description}</small></p>
          </div>
          {logo && <Image src={logo} alt={handle} fluid={true} />}
        </div>
      </ListGroup.Item>
  );
}

export default CompanyCard;