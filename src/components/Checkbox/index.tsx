import { UseFormRegister } from "react-hook-form";


interface CheckboxProps {
  name: string
  options: { value: string, label: string }[]
  register?: UseFormRegister<any> | null
}

export function Checkbox({name, options, register}: CheckboxProps) {
  return (
    <div className="flex gap-4">
      {options.map((option, index) => (
        <div className="flex items-center" key={option.value+index}>
            <input 
              type="checkbox"
              id={option.value}
              name={name}
              value={option.value}
              className="w-4 h-4 accent-zinc-800 text-zinc-600 bg-gray-100 border-gray-300 rounded-md focus:ring-zinc-500 focus:ring-2"
              {...register ? register(name) : null}
            />
              
            <label
              htmlFor={option.value}
              className="ml-2 text-sm font-medium text-gray-900"
              >
                {option.label}
            </label>
        </div>
      ))}
    </div>
  )
}