import { ReactNode } from "react"

interface FormFooterProps {
  children: ReactNode
}

export function FormFooter({children}: FormFooterProps) {
  return (
    <footer className="flex justify-between gap-4 bg-[#f6f6f4] p-3 rounded-md mt-4 text-right">
      {children}
    </footer>
  )
}