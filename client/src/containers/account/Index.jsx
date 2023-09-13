import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const Index = () => {
	const code = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		const verify = async () => {
			const res = await fetch(
				`http://localhost:3001/auth/verify/${code}`,
				{
					method: "PUT",
				}
			);
			const data = await res.json();
			if (data.message) {
				alert(data.message);
			} else {
				alert(data.error);
			}
			navigate("/login");
		};
	});
	return <div></div>;
};

export default Index;
