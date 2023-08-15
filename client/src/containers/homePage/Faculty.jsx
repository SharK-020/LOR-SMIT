import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LorCard from "../../components/lor";

const Faculty = () => {
	const [lor, setLor] = useState([]);
	const token = useSelector((state) => state.token);
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
	console.log(lor);
	return (
		<div className=" min-h-screen p-4 grid grid-cols-1 md:grid-rows-3 xl:grid-cols-4 gap-3 bg-orange-100 dark:bg-white">
			{lor.map((l, index) => (
				<LorCard key={index} name={l.studentName} status={l.status} />
			))}
		</div>
	);
};

export default Faculty;