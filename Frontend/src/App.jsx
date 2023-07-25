// import Upload from "./pages/Upload";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Main from "./layout/Main";
import Upload from "./pages/Upload";
import Download from "./pages/Download";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		// errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Upload />,
			},
			{
				path: "file/:fileId",
				element: <Download />,
			},
		],
	},
]);

export default function App() {
	return (
		<>
			<RouterProvider router={router} />;
			<ToastContainer />;
		</>
	);
}
