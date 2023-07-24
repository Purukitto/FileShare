import { PhotoIcon } from "@heroicons/react/24/solid";

export default function App() {
	return (
		<div className=" bg-slate-800">
			<form action="http://localhost:3000/upload" method="post">
				<div className="space-y-12">
					<div className="border-b border-white/10 pb-12">
						<h2 className="text-base font-semibold leading-7 text-white">
							FileShare
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-400">
							A simple file sharing demo app
						</p>

						<div className=" py-6"></div>

						<div className="col-span-full">
							<label
								htmlFor="cover-photo"
								className="block text-sm font-medium leading-6 text-white"
							>
								File
							</label>
							<div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
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
												className="sr-only"
											/>
										</label>
										<p className="pl-1">or drag and drop</p>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-4">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-white"
								>
									Password
								</label>
								<div className="mt-2">
									<div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
										<input
											type="text"
											name="password"
											id="password"
											className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
											placeholder="Enter password (optional)"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className=" justify-center mt-6 flex items-center">
					<button
						type="submit"
						className=" px-10 rounded-md bg-indigo-500 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
					>
						Get share link
					</button>
				</div>
			</form>
		</div>
	);
}