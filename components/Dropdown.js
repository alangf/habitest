import PropTypes from 'prop-types'
import { useState } from 'react'

function Dropdown({
  options, selected, onChange
}) {
  const [toggled, setToggled] = useState(false);

  const toggle = () => setToggled(!toggled)

  const setSelected = option => {
    onChange(option.value);
    setToggled(false);
  }

  return (
    <div className="dropdown">
      <div className="space-y-1">
        <div className="relative">
          <span className="inline-block w-full rounded-md shadow-sm"
            onClick={toggle}>
            <button type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              <div className="flex items-center space-x-3">
                <span className="block truncate">
                  {selected.text}
                </span>
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </span>

          <div className={`absolute mt-1 w-full rounded-md bg-white shadow-lg ${!toggled ? 'hidden' : ''}`}>
            <ul tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" className="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
              {options.map(option => (
                <li id={`listbox-item-${option.value}`}
                  key={option.value}
                  role="option"
                  className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                  onClick={() => setSelected(option)}>
                  <div className="flex items-center space-x-3">
                    <span className="font-normal block truncate">
                      {option.text}
                    </span>
                  </div>

                  {selected.value === option.value && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string
  })),
  selected: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string
  }),
  onChange: PropTypes.func
}

Dropdown.defaultProps = {
  options: {
    text: '',
    value: ''
  },
  selected: {
    text: '',
    value: ''
  },
  onChange: () => {}
}

export default Dropdown;