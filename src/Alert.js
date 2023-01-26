/**
 * Renders an alert
 *
 * Props:
 * - message
 *
 * TODO:
 * - Maybe a type for a message? ex: danger, info (BS5)
 */

function Alert({message}) {
  return <h2>{message}!</h2>
}

export default Alert;