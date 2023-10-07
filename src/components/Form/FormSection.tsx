import { ReactNode } from "react"

interface FormSectionProps {
  title?: string
  theme?: 'highlight'
  children: ReactNode
}

export function FormSection({title, theme, children}: FormSectionProps) {
  return (
    <div className={`grid grid-cols-3 gap-4 ${theme === 'highlight' ? 'bg-[#f6f6f4]' : null} px-3 py-4 rounded-md`}>
      {title ? (
        <div className="col-span-full">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>) : null}
      {children}
    </div>
  )
}