import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
const Index = () => {
	const user = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
	const [Student, setStudentData] = useState({});
	useEffect(() => {
		const StudentInfo = async () => {
			try {
				const res = await fetch(
					`http://localhost:3001/faculty/find/${user._id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const studentData = await res.json();
				setStudentData(await studentData);
			} catch (err) {
				console.log(err);
			}
		};
		StudentInfo();
	}, []);

	return (
		<div>
			<Navbar />
			<div className="h-screen">
				<div className="flex flex-col w-[50%] mx-auto bg-gray-800 my-9 p-10 rounded-xl">
					<div className="my-1">
						<p className="text-lg py-2 text-[#1F2937] font-bold">
							<span className="bg-orange-500 px-3 py-2 rounded-lg">
								Name
							</span>
							<span className="font-bold ml-[24%] mr-[3%] text-white">
								:
							</span>
							<span className="bg-white p-2 rounded-lg">
								{user.name}
							</span>
						</p>
					</div>
					<div className="my-1">
						<p className="text-lg py-2 text-[#1F2937] font-bold">
							<span className="bg-orange-500 px-3 py-2 rounded-lg">
								Registration Number
							</span>
							<span className="font-bold ml-[5.2%] mr-[3%] text-white">
								:
							</span>
							<span className="bg-white p-2 rounded-lg">
								{Student.student.registrationNumber}
							</span>
						</p>
					</div>
					<div className="my-1">
						<p className="text-lg py-2 text-[#1F2937] font-bold">
							<span className="bg-orange-500 px-3 py-2 rounded-lg">
								Department
							</span>
							<span className="font-bold ml-[16.3%] mr-[3%] text-white">
								:
							</span>
							<span className="bg-white p-2 rounded-lg">
								{user.department}
							</span>
						</p>
					</div>
					<div className="my-1">
						<p className="text-lg py-2 text-[#1F2937] font-bold">
							<span className="bg-orange-500 px-3 py-2 rounded-lg">
								Email Id
							</span>
							<span className="font-bold ml-[21.4%] mr-[3%] text-white">
								:
							</span>
							<span className="bg-white p-2 rounded-lg">
								{user.email}
							</span>
						</p>
					</div>
					<div className="my-1">
						<p className="text-lg py-2 text-[#1F2937] font-bold">
							<span className="bg-orange-500 px-3 py-2 rounded-lg">
								Year of Passing
							</span>
							<span className="font-bold ml-[13%] mr-[3%] text-white">
								:
							</span>
							<span className="bg-white p-2 rounded-lg">
								{dayjs(Student.student.yearOfPassing).format(
									"YYYY"
								)}
							</span>
						</p>
					</div>
					<div className="my-1">
						<p className="text-lg py-2 text-[#1F2937] font-bold">
							<span className="bg-orange-500 px-3 py-2 rounded-lg">
								GRE Score
							</span>
							<span className="font-bold ml-[19%] mr-[3%] text-white">
								:
							</span>
							<span className="bg-white p-2 rounded-lg">
								{Student.student.greScore}
							</span>
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Index;
