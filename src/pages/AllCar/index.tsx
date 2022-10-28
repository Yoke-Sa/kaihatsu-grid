import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseHeader } from "../../component/template/Header/BaseHeader";

const AllCar = () => {
    const { setPage } = useContext(PageStateContext);

	const onClickBack = () => {
		OnClickSetState(7, setPage);
	};

	return (
		<>
			<BaseHeader>
				<h1>車一覧</h1>
			</BaseHeader>

			<BaseButton onClick={onClickBack} _className="all-car-button button">
				戻る
			</BaseButton>
		</>
	);
};
export default AllCar;
