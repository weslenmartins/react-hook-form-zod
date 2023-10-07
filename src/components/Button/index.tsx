import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({ children }: ButtonProps) {
  return (
    <button
      className="px-4 py-2 bg-zinc-800 rounded-md shadow-sm font-medium text-sm text-zinc-50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
    >
      {children}
    </button>
  )
}