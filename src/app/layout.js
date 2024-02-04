import "./globals.css"
import classnames from "classnames"
import Sidebar from "./Sidebar"

export const metadata = {
  title: "Planner",
  description: "Life Planning",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={classnames("flex min-h-screen")}>
        <Sidebar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
