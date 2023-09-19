const Lor = require("../models/lorSchema");

const labels = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

exports.analyticsData = async (req, res) => {
	const role = req.user.userType;
	if (role === "admin" || role === "hod") {
		var lorNumber = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		try {
			const { querry } = req.body;

			const lor = await Lor.find();

			if (querry.findBy == "All") {
				var requiredLor = lor.filter((item) => {
					if (item.updatedAt.getFullYear() === querry.year) {
						return true;
					}
				});
				if (querry.department !== "All") {
					requiredLor = requiredLor.filter((item) => {
						if (item.department === querry.department) {
							return true;
						}
					});
				}
				if (querry.status !== "All") {
					requiredLor = requiredLor.filter((item) => {
						if (item.status === querry.status) {
							return true;
						}
					});
				}
				requiredLor.map((data) => {
					lorNumber[data.updatedAt.getMonth()]++;
				});
				const required = {
					labels,
					datasets: [
						{
							label: "LORs Requested",
							data: lorNumber,
						},
					],
				};
				return res.status(200).json({ data: required });
			}
			if (querry.findBy == "Faculty") {
				var requiredLor = lor.filter((item) => {
					if (
						String(item.facultyId) === String(querry.facultyId) &&
						item.updatedAt.getFullYear() === querry.year
					) {
						return true;
					}
				});

				if (querry.status !== "All") {
					requiredLor = requiredLor.filter((item) => {
						if (item.status === querry.status) {
							return true;
						}
					});
				}
				requiredLor.map((data) => {
					lorNumber[data.updatedAt.getMonth()]++;
				});
				const required = {
					labels,
					datasets: [
						{
							label: "LORs Requested",
							data: lorNumber,
						},
					],
				};
				return res.status(200).json({ data: required });
			}
			if (querry.findBy == "Student") {
				var requiredLor = lor.filter((item) => {
					if (
						item.registrationNumber === querry.registrationNumber &&
						item.updatedAt.getFullYear() === querry.year
					) {
						return true;
					}
				});
				if (querry.status !== "All") {
					requiredLor = requiredLor.filter((item) => {
						if (item.status === querry.status) {
							return true;
						}
					});
				}
				requiredLor.map((data) => {
					lorNumber[data.updatedAt.getMonth()]++;
				});
				const required = {
					labels,
					datasets: [
						{
							label: "LORs Requested",
							data: lorNumber,
						},
					],
				};
				return res.status(200).json({ data: required });
			}
		} catch (err) {
			console.log(err);
			res.status(500).json({ error: err.message });
		}
	} else {
		return res.status(404).json({ error: "cannot perform operation" });
	}
};
exports.defaultData = async (req, res) => {
	// const role = req.user.userType;
	// if (role === "admin" || role === "hod") {
	var lorNumber = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	try {
		const lor = await Lor.find();
		const requiredLor = lor.filter((item) => {
			if (item.updatedAt.getFullYear() === new Date().getFullYear()) {
				return true;
			}
		});
		requiredLor.map((data) => {
			lorNumber[data.updatedAt.getMonth()]++;
		});
		const required = {
			labels,
			datasets: [
				{
					label: "LORs Requested",
					data: lorNumber,
				},
			],
		};
		res.status(200).json({ data: required });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message });
	}
	// } else {
	// 	return res.status(404).json({ error: "cannot perform operation" });
	// }
};
