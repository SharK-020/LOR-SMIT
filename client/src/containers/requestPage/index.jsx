import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import UserCard from "../../components/user";
import { useEffect, useState } from "react";
const Index = () => {
	const [faculty, setFaculty] = useState([]);
	useEffect(() => {
		const fetchFaculty = async () => {
			const res = await fetch("http://localhost:3001/student/faculty");
			const data = await res.json();
			setFaculty(data.faculty);
		};
		fetchFaculty();
	}, []);

	return (
		<div>
			<Navbar />
			<div className=" min-h-screen p-4 grid grid-cols-1 md:grid-rows-3 xl:grid-cols-4 gap-3  bg-orange-100 dark:bg-white">
				{faculty.map((fac, index) => {
					return (
						<UserCard
							key={index}
							name={fac.name}
							email={fac.email}
							department={fac.department}
							contact={fac.contact}
							userId={fac._id}
						/>
					);
				})}
			</div>
			<Footer />
		</div>
	);
};

export default Index;
