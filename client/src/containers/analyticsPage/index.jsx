import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import LineChart from "../../components/analytics/LineChart";
import { useSelector } from "react-redux";

const Index = () => {
	const token = useSelector((state) => state.token);
	const [dataset, setDataset] = useState({});
	const [registrationNumber, setRegistrationNumber] = useState(0);
	const [facultyId, setFacultyId] = useState("");
	const [findBy, setFindBy] = useState("All");
	const [year, setYear] = useState(new Date().getFullYear());
	const [faculty, setFaculty] = useState([]);
	const [department, setDepartment] = useState("All");
	const [status, setStatus] = useState("All");
	const [years, setYears] = useState([]);
	const [querry, setQuerry] = useState({
		year,
		findBy,
		department,
		status,
	});
	const fetchDefaultData = async () => {
		const res = await fetch("http://localhost:3001/analytics/default",{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
		const data = await res.json();
		setDataset(data.data);
	};
	const fetchQuerryData = async () => {
		console.log(querry);
		const res = await fetch("http://localhost:3001/analytics/data", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ querry }),
		});
		const data = await res.json();
		console.log(data);
		setDataset(data.data);
	};
	useEffect(() => {
		const tempQuerry = { ...querry };
		tempQuerry.findBy = findBy;
		tempQuerry.facultyId = facultyId;
		tempQuerry.registrationNumber = parseInt(registrationNumber);
		tempQuerry.year = year;
		tempQuerry.department = department;
		tempQuerry.status = status;
		setQuerry(tempQuerry);
		const fetchFaculty = async () => {
			const res = await fetch("http://localhost:3001/student/faculty");
			const data = await res.json();
			setFaculty(data.faculty);
		};
		fetchFaculty();
		fetchDefaultData();

		const currentYear = new Date().getFullYear();
		const year2 = [];
		for (let i = currentYear; i >= currentYear - 100; i--) {
			year2.push(i);
		}
		setYears(year2);
	}, [findBy, facultyId, registrationNumber, year, department, status]);

	return (
		<div>
			<div className="min-h-screen">
				<Navbar />
				<div id="querries" className="flex justify-between p-4">
					<div>
						<label>Find By: </label>
						<select
							onChange={(e) => {
								setFindBy(e.target.value);
							}}>
							<option value="All">All</option>
							<option value="Faculty">Faculty</option>
							<option value="Student">Student</option>
						</select>
					</div>
					<div className={`${findBy === "All" ? "hidden" : ""}`}>
						{findBy === "Faculty" ? (
							<select
								onChange={(e) => {
									setFacultyId(e.target.value);
								}}>
								<option value="All">All</option>
								{faculty.map((faculty, index) => {
									return (
										<option key={index} value={faculty._id}>
											{faculty.name}
										</option>
									);
								})}
							</select>
						) : (
							<input
								onChange={(e) => {
									setRegistrationNumber(e.target.value);
								}}
								type="number"
								placeholder="Registration Number"
							/>
						)}
					</div>

					<div>
						<label>Year: </label>
						<select
							onChange={(e) => {
								setYear(parseInt(e.target.value));
							}}>
							{years.map((year, index) => {
								return (
									<option key={index} value={year}>
										{year}
									</option>
								);
							})}
						</select>
					</div>
					<div>
						<label>Department: </label>
						<select
							onChange={(e) => {
								setDepartment(e.target.value);
							}}>
							<option value="All">All</option>
							<option value="CSE">CSE</option>
							<option value="ECE">ECE</option>
							<option value="EEE">EEE</option>
							<option value="MECH">MECH</option>
							<option value="CIVIL">CIVIL</option>
							<option value="CHEM">CHEM</option>
							<option value="IT">IT</option>
						</select>
					</div>
					<div>
						<label>Status: </label>
						<select
							onChange={(e) => {
								setStatus(e.target.value);
							}}>
							<option value="All">All</option>
							<option value="Approved">Approved</option>
							<option value="Declined">Declined</option>
						</select>
					</div>
					<button
						className="block mt-4  lg:inline-block lg:mt-0 bg-orange-500 hover:bg-orange-600 text-gray-800duration-200 py-1 px-2 rounded-lg"
						onClick={fetchQuerryData}>
						Submit
					</button>
				</div>
				<div className="h-[400px]">
					{Object.keys(dataset).length === 0 ? null : (
						<LineChart chartData={dataset} />
					)}
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Index;
