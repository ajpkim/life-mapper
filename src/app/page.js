import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex text-white">
        <ul>
          <li>
            <Link href="/timer">Timer</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/habits">Habits</Link>
          </li>
        </ul>
      </div>
    </main>
  )
}
