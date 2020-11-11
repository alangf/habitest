import PropTypes from 'prop-types'

function Button({
  onClick,
  children,
}) {
  return <button
    className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
    onClick={onClick}>
    {children}
  </button>
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])
}

Button.defaultProps = {
  onClick: () => {}
}

export default Button;