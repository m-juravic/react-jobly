import { useParams } from "react-router-dom"

function CompanyDetail() {
  const { handle } = useParams();


  return <h1>{handle}</h1>
}


export default CompanyDetail;