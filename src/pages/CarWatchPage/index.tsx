import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { LocationPointContext, PageStateContext, UserIdContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { Modal } from "../../component/atoms/modal/modal";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { DynamicRouteMap } from "../AddRoutePage";
import { ChangeShortCut } from "../_app";

const Url = "http://tktm.kohga.local:3000/next";

const CarWatchPage = () => {
	// =============================== 地図 =============================== //
	const { setPage } = useContext(PageStateContext);
	const { setPoint, setPoly } = useContext(LocationPointContext);
	const { userId, setUserId } = useContext(UserIdContext);
	const onClickMenu = () => {
		setPoint([]);
		setPoly([[]]);
		OnClickSetState(1, setPage);
	};

	// =============================== Modal =============================== //
	const { thirdPage } = useContext(ChangeShortCut); // 親から値を貰う
	const [isModalOpen, setIsModalOpen] = useState(!thirdPage); // 貰った値を初期値とする
	const modalText = [
		["1. 車の現在地", "　経路を指定後、地図上に車の現在地が表示されます。"],
		[
			"2. 次の目的地へ進む",
			"　発進ボタンを押すと次の目的地へ移動を開始します。",
		],
		[
			"3. バッテリー残量",
			"　表示されている残量が残り少ない場合は使用を控えてください。",
		],
	];

	const concatTitles = () => {
		const array = [];
		for (let i = 0; i < modalText.length; i++) {
			array.push(modalText[i][0]);
		}
		return array;
	};
	const concatText = () => {
		const array = [];
		for (let i = 0; i < modalText.length; i++) {
			array.push(modalText[i][1]);
		}
		return array;
	};
	const titles = concatTitles();
	const text = concatText();

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	useEffect(() => {
		return () => {
			document.removeEventListener("click", closeModal);
		};
	}, [closeModal]);

	const openModal = (event: React.MouseEvent) => {
		setIsModalOpen(true);
		document.addEventListener("click", closeModal);
		event.stopPropagation();
	};

	// =============================== バッテリー表示 =============================== //
	let remainCharge = 100; // 充電残量

	// バッテリー残量の可視化
	const showBattery = (rem: number) => {
		const charge = Math.max(0, Math.min(100, rem)); // 0~100%まで
		() => {
			document.documentElement.style.setProperty(
				"--battery-color",
				"rgb(8, 175, 8)"
			); // バッテリーの色(緑)

			if (charge <= 20) {
				document.documentElement.style.setProperty(
					"--battery-color",
					"rgb(255, 68, 68)"
				); // 20%以下の時は赤色にする
			}
			document.documentElement.style.setProperty(
				"--charge",
				String(100 - charge)
			); // パーセンテージ表示
		};
		return charge;
	};

	// =============================== axios =============================== //
	const postdata = { userId: userId };
	const onClickNext = () => {
		axios
			.post(Url, postdata)
			.then((res) => {
				console.log(res.data);
			})
			.catch((e) => console.log(e));
	};

	return (
		<>
			<BaseHeader>
				<BaseButton onClick={onClickMenu} _className="car-watch-button button">
					戻る
				</BaseButton>
				<BaseButton onClick={onClickNext} _className="car-watch-button button">
					発進
				</BaseButton>
				<button
					onClick={(e: any) => openModal(e)}
					className="car-watch-button button"
				>
					使い方
				</button>
				<span className="battery">
					<p>{`${showBattery(remainCharge)}%`}</p>
				</span>
			</BaseHeader>

			{isModalOpen ? (
				<Modal
					closeHandler={closeModal}
					pageNum={3}
					titles={titles}
					text={text}
				/>
			) : (
				<></>
			)}
			<div className="map">
				<DynamicRouteMap />
			</div>

			<BaseFooter />
		</>
	);
};
export default CarWatchPage;
