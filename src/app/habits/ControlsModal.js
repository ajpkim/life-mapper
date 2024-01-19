import { useRef } from "react"

const ControlsModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose()
    }
  }

  const tableDataClassNames = "border border-gray-600 px-4 py-2"

  if (!isOpen) return null

  return (
    <div
      className="fixed bg-zinc-700 inset-0 bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-zinc-950 p-6 rounded-lg shadow-xl" ref={modalRef}>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Key</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            <tr>
              <td className={tableDataClassNames}>c</td>
              <td className={tableDataClassNames}>Show habit config modal</td>
            </tr>
            <tr>
              <td className={tableDataClassNames}>SPACE | ENTER</td>
              <td className={tableDataClassNames}>
                Toggle habit completion status
              </td>
            </tr>

            <tr>
              <td className={tableDataClassNames}>n</td>
              <td className={tableDataClassNames}>Create new habit</td>
            </tr>
            <tr>
              <td className={tableDataClassNames}>e</td>
              <td className={tableDataClassNames}>Export habit data json</td>
            </tr>
            <tr>
              <td className={tableDataClassNames}>← ↑ ↓ →</td>
              <td className={tableDataClassNames}>Change active day</td>
            </tr>
            <tr>
              <td className={tableDataClassNames}>SHIFT + [← ↑ ↓ →]</td>
              <td className={tableDataClassNames}>Change active habit</td>
            </tr>
            <tr>
              <td className={tableDataClassNames}>TAB</td>
              <td className={tableDataClassNames}>Increment active habit</td>
            </tr>
            <tr>
              <td className={tableDataClassNames}>SHIFT+TAB</td>
              <td className={tableDataClassNames}>Decrement active habit</td>
            </tr>
            <tr>
              <td className={tableDataClassNames}>?</td>
              <td className={tableDataClassNames}>Show controls</td>
            </tr>
            <tr>
              <td className={tableDataClassNames}>ESC</td>
              <td className={tableDataClassNames}>Close modal</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ControlsModal
