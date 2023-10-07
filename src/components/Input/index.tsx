import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  widthSize?: 'xs';
  register?: UseFormRegister<any> | null;
}

export function Input({type, name, widthSize, register, ...rest}: InputProps) {
  const wSize = widthSize === 'xs' ? 'w-1/2' : 'w-full'
  
  return (
    <input
      type={type}
      {...register ? register(name) : null}
      className={`${wSize} p-2 h-10 rounded-md border bg-zinc-50 border-zinc-400 outline-none focus:bg-zinc-100 focus:outline-none focus:border-zinc-500 transition-all`}
      {...rest}
    />
  )
}