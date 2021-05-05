import React from "react";

const Button = ({ action, category, classes, text }) => {
	return (
		<button className={classes} onClick={() => action(category)}>
			{text}
		</button>
	);
};

export default Button;
