/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import React from "react";

import Form from "./Form";
import LorModal from "./LorModal";

const Index = ({
  name,
  status,
  type,
  student,
  id,
  facultyMessage,
  studentId,
}) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [visible, setVisible] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [studentData, setStudentData] = useState({student: {}, user: {}});  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleOnClose = () => {
    setVisible(false);
  };
  let content;
  let fshow = true;
  let hshow = true;
  if (
    status === "Declined" ||
    status === "Faculty Approved" ||
    status === "Approved"
  ) {
    fshow = false;
  }
  if (status === "Declined" || status === "Approved") {
    hshow = false;
  }

  const approve = async () => {
    try {
      const res = await fetch(`http://localhost:3001/faculty/response/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          hodApproval: true,
          facultyApproval: true,
        }),
      });
      const data = await res.json();
      console.log(data);
      navigate("/asdfasdfasdf");
    } catch (err) {
      console.log(err);
    }
  };

  const StudentInfo = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/faculty/find/${studentId}`,
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
      openModal();
      console.log(studentData);
    } catch (err) {
      console.log("err");
    }
  };

	if (type === "faculty") {
		content = (
			<div className="p-5 h-[10rem]">
				<div className="flex justify-between">
					<h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
						{name}
					</h5>
					<button
						onClick={getInfo}
						className="text-white  bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
						Get Info
					</button>
				</div>

        <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
          {status}
        </p>

        <p className="font-thin text-gray-700 mb-3 dark:text-gray-400">
          <span className="font-bold">Student Request: </span>
          {student}
        </p>

				<div
					className={`flex justify-between ${fshow ? "" : "hidden"}`}>
					<button
						onClick={approve}
						className="text-white  bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
						Approve
					</button>
					<button
						onClick={() => setVisible(true)}
						className="text-white  bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  ">
						Decline
					</button>
				</div>
			</div>
		);
	} else if (type === "hod") {
		content = (
			<div className={` h-[10rem] p-5`}>
				<div className="flex justify-between">
					<h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
						{name}
					</h5>
					<button
						onClick={getInfo}
						className="text-white  bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
						Get Info
					</button>
				</div>

        <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
          {status}
        </p>

        <p className="font-thin text-gray-700 mb-3 dark:text-gray-400">
          <span className="font-bold">Student Request: </span>
          {student}
        </p>

				<div
					className={`flex justify-between ${hshow ? "" : "hidden"}`}>
					<button
						onClick={approve}
						className="text-white  bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
						Approve
					</button>
					<button
						onClick={() => setVisible(true)}
						className="text-white  bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  ">
						Decline
					</button>
				</div>
			</div>
		);
	} else if (type === "student") {
		content = (
			<div className={` p-5 h-[8rem]`}>
				<div className="flex justify-between">
					<h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
						{name}
					</h5>
				</div>

        <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
          {status}
        </p>

        {status === "Declined" ? (
          <p className="font-thin text-gray-700 mb-3 dark:text-gray-400">
            <span className="font-bold">Faculty Message: </span>
            {facultyMessage}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mx-auto w-[100%]">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">{content}</div>
      </div>
      <Form visible={visible} onClose={handleOnClose} lorId={id} />
    </div>
  );
};

export default Index;
