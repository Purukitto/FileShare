import {
	PhotoIcon,
	ClipboardDocumentIcon,
	ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/solid";

import { useState } from "react";
import { toast } from "react-toastify";

export default function Upload() {
	const [password, setPassword] = useState("");
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [file, setFile] = useState();
	const [link, setLink] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (file === undefined) {
			alert("Please select a file to upload");
			return;
		}

		const formData = new FormData();

		formData.append("file", file);
		if (password.trim() != "") formData.append("password", password);

		fetch("http://localhost:3000/upload", {
			method: "POST",
			body: formData,
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setLink(
					<a
						href={`http://localhost:3000/download/${data.fileId}?name=${data.fileName}`}
						className="text-indigo-500"
					>
						{`http://localhost:3000/download/${data.fileId}?name=${data.fileName}`}
					</a>
				);
				toast.success("File uploaded successfully!");
			})
			.catch((error) => {
				console.error("Error:", error);
			});

		setIsFilePicked(false);
		setFile();
		setPassword("");
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
		setIsFilePicked(true);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleFileRemove = () => {
		setIsFilePicked(false);
		setFile();
		toast.info("File removed!");
	};

	return (
		<>
			<div className="space-y-12">
				<div className="border-b border-white/10 pb-12">
					<h2 className="font-semibold leading-7 text-2xl text-white ">
						FileShare
					</h2>
					<p className="mt-1 text-base leading-6 text-gray-400">
						A simple file sharing demo app
					</p>

					<div className=" py-6">
						{link ? (
							<div className="flex-row">
								<button
									type="button"
									onClick={() => {
										navigator.clipboard.writeText(
											link.props.href
										);
										toast.success(
											"Link copied to clipboard!"
										);
									}}
									className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Copy download link
									<ClipboardDocumentIcon
										className="-mr-0.5 h-5 w-5"
										aria-hidden="true"
									/>
								</button>
								<p className="mt-2 text-sm text-slate-400">
									Share this with your friends! 🎉
								</p>
							</div>
						) : null}
					</div>

					<div className="col-span-full">
						<div className="block text-sm font-medium leading-6 text-white">
							File
						</div>
						<div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10 w-[450px] h-[200px]">
							{isFilePicked ? (
								<div className="flex-row space-y-6">
									<div className="flex-col text-white text-md">
										<p>Filename: {file.name}</p>
										<p>
											Size in bytes:{" "}
											{(
												file.size /
												1024 /
												1024
											).toPrecision(2)}{" "}
											MB
										</p>
									</div>
									<button
										type="button"
										onClick={handleFileRemove}
										className="rounded-full bg-red-500 py-2 px-4 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>
										<ArchiveBoxXMarkIcon
											className="h-5 w-5"
											aria-hidden="true"
										/>
									</button>
								</div>
							) : (
								<div className="text-center">
									<PhotoIcon
										className="mx-auto h-12 w-12 text-gray-500"
										aria-hidden="true"
									/>
									<div className="mt-4 flex text-sm leading-6 text-gray-400">
										<label
											htmlFor="file-upload"
											className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
										>
											<span className=" px-2">
												Upload a file
											</span>

											<input
												id="file-upload"
												name="file-upload"
												type="file"
												onChange={handleFileChange}
												className="sr-only"
											/>
										</label>
										<p className="pl-1">or drag and drop</p>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<div className="block text-sm font-medium leading-6 text-white">
								Password
							</div>
							<div className="mt-2">
								<div className=" flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
									<input
										type="text"
										name="password"
										id="password"
										onChange={handlePasswordChange}
										value={password}
										className="px-10 flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="Enter password (optional)"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className=" mt-6 flex items-center justify-center">
				<button
					onClick={handleSubmit}
					type="submit"
					className=" px-10 rounded-md bg-indigo-500 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>
					Get share link
				</button>
			</div>
		</>
	);
}
