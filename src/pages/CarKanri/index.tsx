import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import BaseCircleMap from "../../component/map/BaseCircleMap";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { BaseHeader } from "../../component/template/Header/BaseHeader";

const DynamicMap = dynamic(
	() => {
		return import("../../component/map/BaseCircleMap");
	},
	{ ssr: false }
);

const CarKanri = () => {
	const { page, setPage } = useContext(PageStateContext);
	return (
		<>
			<BaseHeader>
				<h1>Car Manage</h1>
			</BaseHeader>

			<div className="manage-page">
				<BaseButton onClick={() => OnClickSetState(0, setPage)} _className="manage-button button">
					TOPへ
				</BaseButton>
                
				<BaseButton onClick={() => OnClickSetState(8, setPage)} _className="manage-button button">
					通行可能領域設定
				</BaseButton>

				<BaseButton onClick={() => OnClickSetState(9, setPage)} _className="manage-button button">
					車一覧
				</BaseButton>
			</div>

			<BaseFooter />
		</>
	);
};
export default CarKanri;
