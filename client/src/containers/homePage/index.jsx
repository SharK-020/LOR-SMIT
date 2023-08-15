import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Admin from "./Admin";
import Faculty from "./Faculty";
import Student from "./Student";
const Index = ({ userType }) => {
	let page;
	if (userType === "admin") {
		page = <Admin />;
	} else if (userType === "faculty") {
		page = <Faculty />;
	} else {
		page = <Student />;
	}
	return (
		<div>
			<Navbar />
			{page}
			<Footer />
		</div>
	);
};

export default Index;
