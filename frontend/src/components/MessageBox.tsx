import { Alert} from "react-bootstrap"

const MessageBox = (props:any) => {
  return (
    <Alert variant={props.variant || 'info'}>{props.children}</Alert>
  )
}

export default MessageBox