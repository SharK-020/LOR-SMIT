import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";


const Modal = ({visible, onClose}) => {
  
if (!visible) return null;
  return (
    <div
      id="container"
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`bg-white p-4 rounded-3xl ${
          name !== "book" ? "w-[800px] h-[700px]" : "w-[50%] h-[460px]"
        } overflow-y-auto border-l-[10px] border-[#2F2E41]`}
      >
        <div className="flex justify-end p-1 float-right">
          <AiOutlineCloseCircle
            className="text-2xl cursor-pointer"
            onClick={onClose}
          />
        </div>
        {name !== "book" ? (
          <form onSubmit={submit} method="post" className="w-full">
            <h1 className="text-3xl pt-2 px-4">Resource Form</h1>
            <div className="flex flex-row p-2 justify-between">
              <div className="flex flex-col">
                <p className="py-2 text-l font-bold">
                  Event Name <span className="text-red-600">*</span>
                </p>
                <input
                  type="text"
                  className="border-2 border-gray-700 p-2 rounded w-[200px]"
                  
                />
              </div>
              <div className="flex flex-col">
                <p className="py-2 text-l font-bold">
                  Phone Number <span className="text-red-600">*</span>
                </p>
                <input
                  type="text"
                  className="border-2 border-gray-700 p-2 rounded w-[200px]"
                 
                />
              </div>
            </div>
            <div className="flex flex-col px-2">
              <p className="py-2 text-l font-bold">
                Event Details <span className="text-red-600">*</span>
              </p>
              <textarea
                name=""
                id=""
                cols="25"
                rows="5"
                className="border-2 border-black rounded-md"
                placeholder="  Enter text here.."
                onChange={(e) => setEventDetails(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-row p-2">
              <div className="flex flex-col">
                <p className="py-2 text-l font-bold">
                  Date & time <span className="text-red-600">*</span>
                </p>
                <RangePicker
                  className="border-black hover:border-gray-500"
                  format={"DD-MM-YYYY"}
                  onChange={filterByDates}
                  disabledDate={disablePastDates}
                />
              </div>
            </div>
            <div className="flex flex-col p-2">
              <p className="text-l font-bold">Necessary Facilities</p>
            </div>
            <div className="flex flex-row px-2">
              <p>Sound Equipment</p>
              <input
                type="checkbox"
                name=""
                id=""
                className="mx-2 my-2"
                checked={Sound}
                onChange={changeSound}
              />
              <p className="ml-7">Cleaning</p>
              <input
                type="checkbox"
                name=""
                id=""
                className="mx-2 my-2"
                checked={Cleaning}
                onChange={changeCleaning}
              />
              <p className="ml-7">Technician</p>
              <input
                type="checkbox"
                name=""
                id=""
                className="mx-2 my-2"
                checked={Technician}
                onChange={changeTechnician}
              />
            </div>
            <div className="flex flex-col p-2">
              <p className="py-2 text-l font-bold">
                Email <span className="text-red-600">*</span>
              </p>
              <input
                type="email"
                className="border-2 border-gray-700 p-2 rounded w-[200px]"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col p-2">
              <p className="py-2 text-l font-bold">Student Coordinator Name</p>
              <input
                type="text"
                className="border-2 border-gray-700 p-2 rounded w-[200px]"
                onChange={(e) => setStudentCoordinatorName(e.target.value)}
              />
            </div>
            <div className="flex flex-col p-2">
              <p className="py-2 text-l font-bold">Student Email</p>
              <input
                type="email"
                className="border-2 border-gray-700 p-2 rounded w-[200px]"
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col p-2">
              <p className="py-2 text-l font-bold">Registration Number</p>
              <input
                type="text"
                className="border-2 border-gray-700 p-2 rounded w-[200px]"
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>
            <div className="flex p-2">
              <button
                className="w-[100px] py-2 mt-8 border-2 bg-[#27374D] hover:bg-[#526D82] text-white rounded-md"
                type="submit"
                onClick={notify}
              >
                Submit
              </button>
              <ToastContainer />
            </div>
          </form>
        ) : (
          <div className=" mt-[5%] h-[90%] rounded-2xl px-5 pt-3 pb-2 relative flex flex-col">
            <p className="text-[17px]">
              <span className="bg-[#F79C0C] p-2 font-rubik font-bold rounded-lg">
                Resource Name
              </span>
              <span className="mx-2 font-bold">:</span>
              <span className="bg-[#2F2E41] p-2 font-rubik font-bold rounded-lg text-gray-200">
                {books.resourceName}
              </span>
            </p>
            <p className="text-[17px] pt-4">
              <span className="bg-[#F79C0C] p-2 font-rubik font-bold rounded-lg">
                Event Name
              </span>
              <span className="mx-2 ml-9 font-bold">:</span>
              <span className="bg-[#2F2E41] p-2 font-rubik font-bold rounded-lg text-gray-200">
                {books.eventName}
              </span>
            </p>
            <p className="text-[17px] pt-4">
              <span className="bg-[#F79C0C] p-2 font-rubik font-bold rounded-lg">
                Event Details
              </span>
              <span className="mx-2 ml-7 font-bold">:</span>
              <span className="bg-[#2F2E41] p-2 font-rubik font-bold rounded-lg text-gray-200">
                {books.eventDetails}
              </span>
            </p>
            <p className="text-[17px] pt-4">
              <span className="bg-[#F79C0C] p-2 font-rubik font-bold rounded-lg">
                Phone Number
              </span>
              <span className="mx-2 ml-3 font-bold">:</span>
              <span className="bg-[#2F2E41] p-2 font-rubik font-bold rounded-lg text-gray-200">
                {books.phoneNumber}
              </span>
            </p>
            <p className="text-[17px] pt-4">
              <span className="bg-[#F79C0C] p-2 font-rubik font-bold rounded-lg">
                Start Date
              </span>
              <span className="mx-2 ml-12 font-bold">:</span>
              <span className="bg-[#2F2E41] p-2 font-rubik font-bold rounded-lg text-gray-200">
                {books.startDate}
              </span>
            </p>
            <p className="text-[17px] pt-4">
              <span className="bg-[#F79C0C] p-2 font-rubik font-bold rounded-lg">
                End Date
              </span>
              <span className="mx-2 ml-14 font-bold">:</span>
              <span className="bg-[#2F2E41] p-2 font-rubik font-bold rounded-lg text-gray-200">
                {books.endDate}
              </span>
            </p>
            <p className="text-[17px] pt-4 z-[1]">
              <span className="bg-[#F79C0C] p-2 font-rubik font-bold rounded-lg">
                Form Id
              </span>
              <span className="mx-2 ml-[4.3rem] font-bold">:</span>
              <span className="bg-[#2F2E41] p-2 font-rubik font-bold rounded-lg text-gray-200">
                {books.formID}
              </span>
            </p>
            <img
              src={complete}
              alt=""
              className="max-h-[70%] absolute right-5 top-0 drop-shadow-[10px_10px_70px_#F79C0C]"
            />
            <div className="flex justify-center flex-row gap-2 mt-10">
              {books.status==='Submitted'?(<button
                className="bg-[#1657b8] text-white p-2.5 rounded-full transform
                                transition duration-200 hover:scale-110 flex flex-row items-center justify-center gap-2"
                onClick={changeStatus}
              >
                Approve
                <BsCheckCircleFill size={20} />
              </button>):null}
              <button
                className="bg-[#b81616] text-white p-2.5 rounded-full transform
                                transition duration-200 hover:scale-110 flex flex-row items-center justify-center gap-2"
              onClick={changeStatus1}>
                Cancel
                <MdCancel size={23.5} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
