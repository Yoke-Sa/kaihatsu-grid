import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { CircleContext, PageStateContext } from "..";
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

const PathOK = () => {
	const { page, setPage } = useContext(PageStateContext);
	const { radius, setRadius } = useContext(CircleContext);

	const pathAreaOK = () => {
		console.log("pathAreaOK");
	};

	return (
		<>
			<BaseHeader>
				<BaseButton onClick={() => OnClickSetState(0, setPage)} _className="path-button button">
					TOPへ
				</BaseButton>
				{/* <label htmlFor="sel">半径を入力</label> */}
				<input type="number" onChange={(e) => setRadius(e.target.valueAsNumber)} name="sel" id="sel" value={radius} placeholder="半径を入力" className="radius-area" />
				<BaseButton onClick={pathAreaOK} _className="path-button button">
					領域を設定
				</BaseButton>
			</BaseHeader>

			<div className="map">
				<DynamicMap />
			</div>

			<BaseFooter />
		</>
	);
};
export default PathOK;
