import ReactModal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import dayjs from "dayjs";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "#1F2937",
		color: "white",
		padding: "2rem",
		borderRadius: "1rem",
		width: "50%",
	},
	overlay: {
		backgroundColor: "rgba(0,0,0,0.5)",
		backdropFilter: "blur(5px)",
	},
};

const LorModal = ({ modalIsOpen, closeModal, Student, User }) => {
	return (
		<div>
			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
				ariaHideApp={false}>
				<h2 className="text-white text-2xl font-bold">Student Info</h2>
				<button
					onClick={closeModal}
					className="absolute text-white top-1 right-1">
					<AiFillCloseCircle size={30} />
				</button>
				<div className="py-10 flex flex-col">
					<div className="my-1">
						<p className="text-lg py-2 text-[#1F2937] font-bold">
							<span className="bg-orange-500 px-3 py-2 rounded-lg">
								Name
							</span>
							<span className="font-bold ml-[24%] mr-[3%] text-white">
								:
							</span>
							<span className="bg-white p-2 rounded-lg">
								{User.name}
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
								{Student.registrationNumber}
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
								{User.department}
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
								{User.email}
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
								{dayjs(Student.yearOfPassing).format("YYYY")}
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
								{Student.greScore}
							</span>
						</p>
					</div>
				</div>
			</ReactModal>
		</div>
	);
};

export default LorModal;
