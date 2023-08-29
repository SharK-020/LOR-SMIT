/* eslint-disable react/prop-types */
import ReactModal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdEmail, MdWork } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useFormik } from "formik";
import { validationSchema, initialValues } from "./utils.jsx";

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
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(5px)",
  },
};

const Modal = ({ closeModal, modalIsOpen }) => {
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values, action) => {
        try {
          console.log(values);
          const response = await fetch("http://localhost:3001/admin/create", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(values),
          });

          const data = await response.json();
          console.log(data);
          action.resetForm();
          if (data.error == "User already exists") {
            alert(data.error);
          } else if (data.error) {
            console.log(data.error);
            alert("Something went wrong");
          } else {
            alert(data.message);
          }
        } catch (err) {
          alert("Something went wrong");
        }
      },
    });
  console.log(values);
  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="text-white text-2xl font-bold">Create Faculty</h2>
        <button
          onClick={closeModal}
          className="absolute text-white top-1 right-1"
        >
          <AiFillCloseCircle size={30} />
        </button>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3 mt-3">
            <div className="flex relative">
              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                <CgProfile size={20} />
              </span>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
            </div>
            {errors.name && touched.name ? (
              <span className="text-xs text-red-600 dark:text-teal-300 font-thin">
                {errors.name}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col mb-3 mt-3">
            <div className="flex relative">
              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                <MdEmail size={20} />
              </span>
              <input
                type="text"
                id="email"
                placeholder="Your Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
            </div>
            {errors.email && touched.email ? (
              <span className="text-xs text-red-600 dark:text-teal-300 font-thin">
                {errors.email}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col mb-3">
            <div className="flex relative">
              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#636161"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5" />
                  <path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.4-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.8 1.1z" />
                </svg>
              </span>
              <input
                type="text"
                id="department"
                placeholder="Your Department"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.department}
                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
            </div>
            {errors.department && touched.department ? (
              <span className="text-xs text-red-600 dark:text-teal-300 font-thin">
                {errors.department}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col mb-3">
            <div className="flex relative">
              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                <MdWork size={20} />
              </span>
              <select
                id="type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userType}
                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              >
                <option value="" disabled>
                  Type
                </option>
                <option value="Faculty">Faculty</option>
                <option value="HOD">HOD</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            {errors.userType && touched.userType ? (
              <span className="text-xs text-red-600 dark:text-teal-300 font-thin">
                {errors.userType}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col mb-3">
            <div className="flex relative">
              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                <RiLockPasswordFill size={20} />
              </span>
              <input
                type="text"
                id="password"
                placeholder="Your Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
            </div>
            {errors.password && touched.password ? (
              <span className="text-xs text-red-600 dark:text-teal-300 font-thin">
                {errors.password}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col mb-3">
            <div className="flex relative">
              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                <RiLockPasswordFill size={20} />
              </span>
              <input
                type="text"
                placeholder="Confirm Password"
                id="passwordConfirm"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirm}
                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
            </div>
            {errors.passwordConfirm && touched.passwordConfirm ? (
              <span className="text-xs text-red-600 dark:text-teal-300 font-thin">
                {errors.passwordConfirm}
              </span>
            ) : null}
          </div>

          <div className="flex w-full mt-3">
            <button
              type="submit"
              className="py-2 px-4  bg-orange-500 hover:bg-orange-600 focus:ring-orange-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Create
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
};

export default Modal;
