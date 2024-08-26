
type buttonInput = {
  label: string;
  onClick: (e: any) => void;
}
export function Button({label, onClick}: buttonInput) {
  return <div>
    <button onClick={onClick} className="bg-black text-white font-semibold w-full rounded-md mt-4 p-2">
      {label}
    </button>
  </div>
}