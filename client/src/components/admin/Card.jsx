/* eslint-disable react/prop-types */
import React from "react";
import Modal from "./Modal";

const Card = (props) => {
  const [showModal, setshowModal] = React.useState(false);
  const toggleModal = () => {
    setshowModal(!showModal);
  };
  return (
    <div>
      <div
        className="cursor-pointer rounded-[24px] p-[10px] bg-gradient-to-r from-neutral-300 to-stone-400 w-[300px] h-[200px]"
        // onClick={toggleModal}
      >
        <div className="max-w-sm rounded-[14px] overflow-hidden h-full">
          <div className="px-10 py-4 bg-white h-full flex flex-col items-center">
            <h1 className="text-xl pb-3 font-bold font-serif">{props.name}</h1>
            <button
              className="bg-orange-500 hover:bg-orange-600 mt-6 p-4 rounded-lg font-semibold"
              onClick={toggleModal}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      {/* <Modal onClose={toggleModal} visible={showModal} name={props.name} /> */}
      <Modal onClose={toggleModal} visible={showModal} />
    </div>
  );
};

export default Card;
