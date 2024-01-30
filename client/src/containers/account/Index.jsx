import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const Index = () => {
	const code = useParams();
	const navigate = useNavigate();
	console.log(code);
	useEffect(() => {
		const verify = async () => {
			const res = await fetch(
				`http://localhost:3001/auth/verify/${code}`,
				{
					headers: { "Content-Type": "application/json" },
					method: "PUT",
					body: JSON.stringify({ code }),
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
		verify();
	}, [code, navigate]);
	return <div></div>;
};

export default Index;
