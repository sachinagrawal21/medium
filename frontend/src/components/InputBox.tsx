import { ChangeEvent } from "react";

type inputType = {
  label:string,
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string
}
export function InputBox({label, placeholder, onChange, type}: inputType) {
  return<div>
    <div className="font-semibold p-2">
      {label}
    </div>
    <input onChange={onChange} type={type || "text"} className="border-solid border-2 border-slate-200 rounded-md p-2 w-full" placeholder={placeholder}>
    </input>
  </div>
}