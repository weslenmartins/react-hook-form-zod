export function FormErrorField({text}: {text: string | undefined}) {
  return <span className="block text-red-600 text-xs">{text}</span>
}