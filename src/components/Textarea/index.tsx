import { TextareaHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  register?: UseFormRegister<any> | null
}

export function Textarea({name, register, ...rest}: TextareaProps) {
  return (
    <textarea
      {...register ? register(name) : null}
      className="w-full p-2 h-11 lg:h-20 rounded-md border bg-zinc-50 border-zinc-400 outline-none focus:bg-zinc-100 focus:outline-none focus:border-zinc-500 transition-all"
      {...rest}
    >
    </textarea>
  )
}