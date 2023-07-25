import { Outlet } from "react-router-dom";

export default function Main() {
	return (
		<div className="bg-slate-800 flex items-center justify-center h-[100vh]">
			<form>
                <Outlet />
			</form>
		</div>
	);
}
