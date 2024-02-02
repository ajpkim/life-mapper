"use client"
import { useState } from "react"
import Link from "next/link"
import classNames from "classnames"

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true)

  const linksContainerClass = classNames({
    flex: true,
    "flex-col": true,
    hidden: !isVisible,
  })

  return (
    <div className="flex flex-col items-start p-2 font-mono">
      <button onClick={() => setIsVisible(!isVisible)} className="mb-4">
        {isVisible ? "👁" : "👁"}
      </button>

      <div className={linksContainerClass}>
        <Link href="/">Home</Link>
        <Link href="/timer">Timer</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/habits">Habits</Link>
      </div>
    </div>
  )
}

export default Sidebar
