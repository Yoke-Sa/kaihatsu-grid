import React from "react";

interface Props {
    children?: React.ReactNode;
    onChange: () => void;
}

export const BaseCheckBox: React.FC<Props> = ({
    children,
    onChange,
}) => {
    return (
        <>
            <input type={"checkbox"} onChange={onChange} id="check1" />
            <label htmlFor="check1">{children}</label>
        </>
    )

}