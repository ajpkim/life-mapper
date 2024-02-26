'use client'

import { useState } from 'react'
import classnames from 'classnames'

export default function ToggleFormVisibility({ text, children }) {
  const [isVisible, setIsVisible] = useState(false)

  const buttonClass = classnames(
    'rounded p-2 text-white transition-colors duration-200 hover:opacity-70',
    { 'bg-gray-600': !isVisible, 'bg-gray-500': isVisible },
  )

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)} className={buttonClass}>
        {isVisible ? 'Hide Form' : text}
      </button>
      {isVisible && <div className="mt-4">{children}</div>}
    </div>
  )
}
