/* eslint-disable react/prop-types */
const Index = ({ name, status }) => {
	return (
		<div className="mx-auto w-[100%]">
			<div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
				<div className="p-5">
					<a href="#">
						<h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
							{name}
						</h5>
					</a>
					<p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
						{status}
					</p>
					<a
						href="#"
						className="text-white  bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  ">
						Read more
						<svg
							className="-mr-1 ml-2 h-4 w-4"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path>
						</svg>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Index;
