import React from "react";

interface Props {
	children?: React.ReactNode;
	onClick?: () => void;
	isSubmit?: boolean;
	_className?: string;
}

export const BaseButton: React.FC<Props> = ({
	children,
	onClick,
	isSubmit = true,
	_className,
}) => {
	return (
		<>
			<button
				type={isSubmit ? "submit" : "button"}
				onClick={onClick}
				className={_className}
			>
				{children}
			</button>
		</>
	);
};
