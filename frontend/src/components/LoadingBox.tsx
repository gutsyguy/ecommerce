import { Spinner } from "react-bootstrap"


const LoadingBox = () => {
  return (
    <Spinner animation="border" role="status">
        <span className="visually-hiden">Loading...</span>
    </Spinner>
  )
}

export default LoadingBox