type LabelProps = {
  htmlFor: string
  children: React.ReactNode
}

export function Label({ htmlFor, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-2 text-xs font-semibold cursor-pointer hover:text-amber-800"
    >
      {children}
    </label>
  )
}