import dynamic from "next/dynamic";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { BaseCheckBox } from "../../component/atoms/checkbox/BaseCheckBox";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { LocationPointContext, PageStateContext } from "..";
import axios from "axios";
import { LatLng } from "leaflet";
import { LoadingContext, ChangeShortCut } from "../_app";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { Modal } from "../../component/atoms/modal/modal";

const DynamicMap = dynamic(
	() => {
		return import("../../component/map/BaseMap");
	},
	{ ssr: false }
);
const PostDummyUrl = "http://saza.kohga.local:3000/route/Astar";
const tktmdummy = "http://tktm.kohga.local:3000/api/Astar";

const DestinationMapPage = () => {
	// =============================== 地図 =============================== //
	const { setPage } = useContext(PageStateContext);
	const { point, poly, setPoly, setPoint } = useContext(LocationPointContext);
	const [ junkai, setJunkai ] = useState(false);
	const { setPageLoading } = useContext(LoadingContext);

	const onClickJunkai = () => {
		setJunkai(!junkai);
	};


	
	// =============================== Modal =============================== //
	const { firstPage } = useContext(ChangeShortCut); // 親から値を貰う
	const [ isModalOpen, setIsModalOpen ] = useState(!firstPage); // 貰った値を初期値とする
	const modalText = [
		[	// ページ1
			"1. 目的地を指定する",
			"　地図上でクリック/タップして車の目的地を指定できます。指定後に経路探索ボタンを押すと、車が進む経路が表示されます。巡回するボタンをオンにして経路探索を開始すると、巡回用の経路を表示します。",
		],
		[	// ページ2
			"2. 経路を編集する",
			"　表示された経路が好ましくなければ、再び経路探索ボタンを押すことで別の経路を算出することができます。また、消したい経路あるいは目的地のピンに向かって右クリック/長押しをすると削除できます。",
		],
		[	// ページ3
			"3. 経路を確定する",
			"　確定ボタンを押すと、車が動作を開始します。車の状況を確認したい時は、画面上側にある戻るボタンから車メニューに行き、車の状況を見るボタンを押してください。",
		],
	];

	// タイトルの連結
	const concatTitles = () => {
		const array = [];
		for (let i = 0; i < modalText.length; i++) {
			array.push(modalText[i][0]);
		}
		return array;
	};
	
	// 説明文の連結
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

	const onClickBack = () => {
		setPoint([]);
		setPoly([[]]);
		OnClickSetState(1, setPage);
	};



	// =============================== axios =============================== //
	const PostData = {
		type: "watanabe",
		junkai: junkai,
		data: point,
	};

	let temp: LatLng[][] = [[]];
	const onClickRouteSearch = async () => {
		//ここにaxiosの処理
		setPageLoading(true);
		console.log("PostData", PostData);
		await axios
			.post(tktmdummy, PostData)
			.then((res) => {
				console.log("type", res.data.type);
				console.log(res.data.data);
				setPageLoading(false);
				temp = res.data.data;
				setPoly(temp);
			})
			.catch((e) => {
				console.log("Post Error", e);
				setPageLoading(false);
			})
			.finally(() => {
				OnClickSetState(4, setPage);
				console.log("complete", poly);
			});
	};

	return (
		<>
			<BaseHeader>
				<BaseCheckBox onChange={onClickJunkai}>
					<span className="go-around-button">巡回する</span>
				</BaseCheckBox>

				<BaseButton
					onClick={onClickRouteSearch}
					_className="dest-button button"
				>
					経路探索
				</BaseButton>

				<BaseButton onClick={onClickBack} _className="dest-button button">
					戻る
				</BaseButton>

				<button
					onClick={(e: any) => openModal(e)}
					className="dest-button button"
				>
					使い方
				</button>
			</BaseHeader>

			{isModalOpen ? (
				<Modal
					closeHandler={closeModal}
					pageNum={3}
					titles={titles}
					text={text}
					modalID={"first"}
				/>
			) : (
				<></>
			)}
			<div className="dest-map map">
				<DynamicMap />
			</div>

			<BaseFooter />
		</>
	);
};
export default DestinationMapPage;
