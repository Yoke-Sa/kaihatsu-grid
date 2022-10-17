import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { CircleContext, PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import BaseCircleMap from "../../component/map/BaseCircleMap";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
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
	return (
		<div className="container map path-check">
			<BaseHeader>
				<BaseButton onClick={() => OnClickSetState(7, setPage)} _className="button">
					戻る
				</BaseButton>
                <label htmlFor="sel">半径を入力</label>
                <input type="number" onChange={(e) => setRadius(e.target.valueAsNumber)} name="sel" id="sel" value={radius} className="no-spin"/>
			</BaseHeader>

			<main>
				<DynamicMap />
			</main>

			<footer>
				<h1>&copy; Kohga. All rights Reserved.</h1>
			</footer>
		</div>
	);
};
export default PathOK;
