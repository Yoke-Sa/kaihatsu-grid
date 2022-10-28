import axios from "axios";
import { LatLng } from "leaflet";
import dynamic from "next/dynamic";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { LocationPointContext, PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { BaseCheckBox } from "../../component/atoms/checkbox/BaseCheckBox";
import { Modal } from "../../component/atoms/modal/modal";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { ChangeShortCut, LoadingContext } from "../_app";

export const DynamicRouteMap = dynamic(
	() => {
		return import("../../component/map/Routemap");
	},
	{ ssr: false }
);
const tktmdummy = "http://tktm.kohga.local:3000/api/Astar";

const AddRoutePage = () => {
	// =============================== 地図 =============================== //
	const { page, setPage } = useContext(PageStateContext);
	const { point, setPoint, poly, setPoly } = useContext(LocationPointContext);
	const [junkai, setJunkai] = useState(false);
	const [input, setInput] = useState("");
	const { setPageLoading } = useContext(LoadingContext);

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

	
	
	// =============================== Modal =============================== //
	const { firstPage, setFirstPage } = useContext(ChangeShortCut); // 親から値を貰う
	const [ isModalOpen, setIsModalOpen]  = useState(false);
	const modalText = [
		[	// ページ1
			"1. 目的地を指定する",
			"　地図上でクリック/タップして車の目的地を指定できます。指定後に経路探索ボタンを押すと、車が進む経路が表示されます。巡回するボタンをオンにして経路探索を開始すると、巡回用の経路を表示します。",
		],
		[	// ページ2
			"2. 経路を編集する",
			"　経路が表示された後、再び経路探索ボタンを押すと別の経路を算出します。また、消したい経路又は目的地の上で右クリックをすると削除できます。",
		],
		[	// ページ3
			"3. 経路を確定する",
			"　確定ボタンを押すと、車が動作を開始します。車の状況を確認したい時は、戻るボタンから車メニューに行き、車の状況を見るボタンを押してください。",
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
					<span className="go-around-add">巡回する</span>
				</BaseCheckBox>

				<input
					type="text"
					onChange={(e) => setInput(e.target.value)}
					name="input"
					id="input"
					value={input}
					placeholder={"経路名を入力"}
					className="text-area"
				/>

				<BaseButton onClick={routeCheck} _className="add-route-button button">
					確定
				</BaseButton>
				<BaseButton onClick={onClickBack} _className="add-route-button button">
					戻る
				</BaseButton>
				<BaseButton
					onClick={onClickRouteSearch}
					_className="add-route-button button"
				>
					経路探索
				</BaseButton>
				<button
					onClick={(e: any) => openModal(e)}
					className="add-route-button button"
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
			<div className="map .add-map">
				<DynamicRouteMap />
			</div>

			<BaseFooter />
		</>
	);
};
export default AddRoutePage;
