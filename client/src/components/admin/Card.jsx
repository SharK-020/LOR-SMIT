/* eslint-disable react/prop-types */
import React from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";

const Card = (props) => {
	const token = useSelector((state) => state.token);
	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}
	return (
		<div>
			<div
				className="cursor-pointer rounded-[24px] p-[10px] w-[300px] h-[200px] m-0"
				// onClick={toggleModal}
			>
				<div className="max-w-sm rounded-[14px] overflow-hidden h-full">
					<div className="px-10 py-4 h-full flex flex-col items-center bg-[#1F2937] text-white">
						<h1 className="text-xl pb-3 font-bold font-serif">
							{props.name}
						</h1>
						<button
							className="bg-orange-500 hover:bg-orange-600 mt-6 p-4 rounded-lg font-semibold"
							onClick={openModal}>
							Create
						</button>
					</div>
				</div>
			</div>
			{/* <Modal onClose={toggleModal} visible={showModal} name={props.name} /> */}
			<Modal
				closeModal={closeModal}
				modalIsOpen={modalIsOpen}
				token={token}
			/>
		</div>
	);
};

export default Card;
