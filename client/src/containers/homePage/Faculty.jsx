import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LorCard from "../../components/lor";

const Faculty = () => {
	const [lor, setLor] = useState([]);
	const token = useSelector((state) => state.token);
	const user = useSelector((state) => state.user);
	useEffect(() => {
		const fetchLor = async () => {
			const res = await fetch("http://localhost:3001/student/lor/", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await res.json();

			setLor(data);
		};
		fetchLor();
	}, [token]);

	return (
		<div>
			{lor.length === 0 ? (
				<h1 className="text-2xl min-h-screen text-center p-64">
					No LORs to show
				</h1>
			) : (
				<div className="min-h-screen p-4 grid grid-cols-1 md:grid-rows-3 xl:grid-cols-4 gap-3 bg-orange-100 dark:bg-white">
					{lor.map((l, index) => (
						<LorCard
							key={index}
							name={l.studentName}
							studentId={l.studentId}
							status={l.status}
							type={user.userType}
							student={l.studentRequest}
							id={l._id}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Faculty;
