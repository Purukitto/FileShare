import {
	CheckIcon,
	LockClosedIcon,
	FolderArrowDownIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "react-router-dom";

export default function Download() {
	const [password, setPassword] = useState("");
	const { fileId } = useParams();
	const [queryParams] = useSearchParams();

	const handleFileDownload = async (e) => {
		e.preventDefault();
		fetch(`http://127.0.0.1:3000/file/${fileId}?password=${password}`)
			.then((res) => {
				if (res.status != 401) toast.success("Download started!");
				else {
					toast.error("Wrong password!");
					throw new Error("Wrong password!");
				}

				setPassword("");
				return res.blob();
			})
			.then((blob) => {
				const type = blob.type;
				const url = window.URL.createObjectURL(
					new Blob([blob], { type: type })
				);
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", queryParams.get("name"));
				document.body.appendChild(link);
				link.click();
				link.parentNode.removeChild(link);
			})
			.catch(() => {});
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div className="space-y-12">
			<div className=" border-white/10 pb-12">
				{queryParams.get("protected") == "true" ? (
					<>
						<div className="max-w-min bg-slate-200 rounded-full p-3">
							<LockClosedIcon className="h-8 w-8 text-slate-600" />
						</div>

						<p className="mt-6 text-slate-200 text-lg font-semibold">
							The file is password protected!
						</p>
						<p className="my-2 text-slate-400">
							You need to enter the password to download this
							file.
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
								<FolderArrowDownIcon
									className="  h-5 w-5"
									aria-hidden="true"
								/>
							</button>
						</div>
						<p className="my-2 text-sm text-slate-500">
							You do remember the password your friend gave you
							right? 😅
						</p>
					</>
				) : (
					<>
						<div className="max-w-min bg-slate-200 rounded-full p-3">
							<CheckIcon className="h-8 w-8 text-slate-600" />
						</div>
						<div className="mt-5 text-slate-300">
							<p>Your file is ready to download! 🎉</p>
							<button
								type="button"
								onClick={handleFileDownload}
								className="mt-5 pr-5 flex gap-x-3 items-center rounded-full bg-green-500 py-2 px-4 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								<FolderArrowDownIcon
									className="h-5 w-5"
									aria-hidden="true"
								/>{" "}
								Download
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
