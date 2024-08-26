
const CEOName = "Jules Winnfield";
type quote = {
	label: string;
}
export function Quote({label}: quote) {
  return <div className="bg-slate-200 h-screen flex justify-center flex-col">
          	<div className="flex justify-center">
				<div className="max-w-lg">
					<div className="font-bold text-2xl">
						"{label}"
					</div>
					<div className="font-bold text-xl mt-4">
						{CEOName}
					</div>
					<div className="text-slate-500">
						CEO | Acme corp
					</div>
				</div>
		  	</div>
        </div>
}