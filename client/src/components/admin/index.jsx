import React from "react";
import Card from "./Card";
import UploadFaculty from "./UploadFaculty";
// eslint-disable-next-line react/prop-types
const Index = () => {
	return (
		<div className="grid-cols-3 lg:grid-cols-4 w=[100%]">
			<Card name="Create Faculty" />
			<UploadFaculty />
		</div>
	);
};

export default Index;
