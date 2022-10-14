import dynamic from "next/dynamic";
import React, { useContext, useState } from "react";
import { LocationPointContext, PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { BaseCheckBox } from "../../component/atoms/checkbox/BaseCheckBox";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseHeader } from "../../component/template/Header/BaseHeader";

export const DynamicRouteMap = dynamic(
	() => {
		return import("../../component/map/Routemap");
	},
	{ ssr: false }
);

const AddRoutePage = () => {
	const { page, setPage } = useContext(PageStateContext);
	const { point, setPoint, poly, setPoly } = useContext(LocationPointContext);
	const [junkai, setJunkai] = useState(false);
	const [input, setInput] = useState("");

	const onClickJunkai = () => {
		setJunkai(!junkai);
	};
	const routeCheck = () => {
		//経路チェック

		OnClickSetState(5, setPage);
	};
	const routeGoChcek = () => {
		//実行可能チェック
	};
	const onClickBack = () => {
		setPoint([]);
		setPoly([[]]);
		OnClickSetState(1, setPage);
	};

	return (
		<div className="container map add-route">
			<BaseHeader>
				<BaseCheckBox onChange={onClickJunkai}><span className="check">巡回ルート</span></BaseCheckBox>

				<label htmlFor="input" id="input">経路名</label>
				<input type="text" onChange={(e) => setInput(e.target.value)} name="input" id="input" value={input} />

				<BaseButton onClick={routeCheck} _className="button">
					確定
				</BaseButton>
				<BaseButton onClick={onClickBack} _className="button">
					戻る
				</BaseButton>
			</BaseHeader>

			<main>
				<DynamicRouteMap />
			</main>

			<footer>
				<h1>&copy; Kohga. All rights Reserved.</h1>
			</footer>
		</div>
	);
};
export default AddRoutePage;
