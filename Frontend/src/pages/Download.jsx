import { CheckIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Download() {
	const [password, setPassword] = useState("");
	const { fileId } = useParams();

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	// why direct res.json dosent work but chaining does
	const handleFileDownload = () => {
		if (password != undefined && password.trim() != "" && password != null) {
			window.location.href = `http://localhost:3000/file/${fileId}/${password}`;
		}
		// TODO HANDLE DOWNLOAD HERE
	};

	return (
		<div className="space-y-12">
			<div className=" border-white/10 pb-12">
				<div className="max-w-min bg-slate-200 rounded-full p-3">
					<LockClosedIcon className="h-8 w-8 text-slate-600" />
				</div>

				<p className="mt-6 text-slate-200 text-lg font-semibold">
					The file is password protected!
				</p>
				<p className="my-2 text-slate-400">
					You need to enter the password to download this file.
				</p>
				<div className="flex gap-3 mt-5">
					<input
						type="text"
						name="password"
						id="password"
						onChange={handlePasswordChange}
						value={password}
						className="flex-1 pl-2 py-2.5 rounded-md bg-white/5 text-slate-100 focus:ring-0 sm:text-sm sm:leading-6"
						placeholder="Enter password (optional)"
					/>
					<button
						type="button"
						onClick={handleFileDownload}
						className="rounded-md px-3.5  text-sm font-semibold bg-white/10 text-white shadow-sm hover:bg-green-500/40"
					>
						<CheckIcon className="  h-5 w-5" aria-hidden="true" />
					</button>
				</div>
				<p className="my-2 text-sm text-slate-500">
					You do remember the password your friend gave you right? 😅
				</p>
			</div>
		</div>
	);
}
