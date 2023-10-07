import { SelectHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: string[],
  register?: UseFormRegister<any> | null
}

export function Select({name, options, register, ...rest}: SelectProps) {
  return (
    <select 
      {...register ? register(name) : null}
      className="p-2 h-10 rounded-md border bg-zinc-50 border-zinc-400 outline-none focus:bg-zinc-100 focus:outline-none focus:border-zinc-500 transition-all"
      {...rest}
    >
     {options.map((option, index) => {
        return (
          <option key={`option-${index}`} value={option}>{option}</option>
        )
      })}
    </select>
  )
}