import axios from "axios";
import React, { useContext, useEffect } from "react";
import { PageStateContext, UserIdContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { BaseHeader } from "../../component/template/Header/BaseHeader";

const Url = "http://saza.kohga.local:3001/isAcceptable";

const CarMenuPage = () => {
	const { userId, setUserId } = useContext(UserIdContext);
	const { page, setPage } = useContext(PageStateContext);

	const onClickDestinationMap = async () => {
		console.log("userId", userId);

		const postdata = { userId: userId };
		OnClickSetState(2, setPage); //DEBUG
		await axios
			.post(Url, postdata)
			.then((res) => {
				console.log(res.data);
				if (res.data.succeeded === true) {
					//OnClickSetState(2, setPage)
				} else {
					alert("車が見つかりませんでした。時間を空けてもう一度お試しください");
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<>
			<BaseHeader>
				<h1>車メニュー</h1>
				<BaseButton onClick={() => OnClickSetState(6, setPage)} _className="car-menu-button button">
					終了
				</BaseButton>
			</BaseHeader>

			<div className="car-menu">
				<span className="bg-img" />

				<section onClick={onClickDestinationMap}>
					<h2>新規ルート開拓</h2>
					<p>地図上で任意の目的地を指定することができます。</p>
					<div className="img1"/>
				</section>

				<section onClick={() => OnClickSetState(3, setPage)}>
					<h2>既存ルート選択</h2>
					<p>既に定められた経路を選択して移動することができます。</p>
					<div className="img2"/>
				</section>

				<section onClick={() => OnClickSetState(5, setPage)}>
					<h2>車の状況確認</h2>
					<p>通信中の車体が現在どこにいるかを確認できます。</p>
					<div className="img3"/>
				</section>
			</div>

			<BaseFooter />
		</>
	);
};
export default CarMenuPage;
