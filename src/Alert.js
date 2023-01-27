import BSAlert from 'react-bootstrap/Alert';

/**
 * Renders an alert
 *
 * Props:
 * - message
 *
 * TODO:
 * - Maybe a type for a message? ex: danger, info (BS5)
 */

function Alert({ messages, variant }) {
  return <>
    {messages.map((m, i) => (<BSAlert key={i} variant={variant}>{m}</BSAlert>))}
  </>;
}

export default Alert;