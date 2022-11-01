import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { BaseHeader } from "../../component/template/Header/BaseHeader";

const EndPage = () => {
	const { setPage } = useContext(PageStateContext);
	return (
		<>
			<BaseHeader>
				<h1>終了</h1>
			</BaseHeader>

			<div className="end-page">
				<h2>
					　ご利用ありがとうございました。<br></br>またのご利用をお待ちしております。
				</h2>

				<span className="bg-img" />

				<BaseButton onClick={() => OnClickSetState(0, setPage)} _className="end-button button">
					TOPへ
				</BaseButton>
			</div>

			<BaseFooter />
		</>
	);
};
export default EndPage;
