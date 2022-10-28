import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { LocationPointContext, PageStateContext } from "..";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { DynamicRouteMap } from "../AddRoutePage";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { ChangeShortCut } from "../_app";
import { Modal } from "../../component/atoms/modal/modal";

const RouteNameUrl = "http://saza.kohga.local:3001/routeName";
const reqRouteUrl = "http://saza.kohga.local:3001/reqRoute";

const ExistsRoutePage = () => {
	// =============================== 地図 =============================== //
	const { setPage } = useContext(PageStateContext);
	const { setPoint, setPoly } = useContext(LocationPointContext);
	const [ routeName, setRouteName ] = useState<string[]>([]);
	const [ select, setSelect ] = useState("");
	const [ single, setSingle ] = useState("");

	const goRoute = () => {
		OnClickSetState(4, setPage);
	};
	const backCarMenu = () => {
		setPoly([[]]);
		setPoint([]);
		OnClickSetState(1, setPage);
	};

	
	
	// =============================== Modal =============================== //
	const { secondPage } = useContext(ChangeShortCut); // 親から値を貰う
	const [ isModalOpen, setIsModalOpen]  = useState(!secondPage); // 貰った値を初期値とする
	const modalText = [
		[	// ページ1
			"1. ルートを選択する",
			"　「ルートを選択」と書かれた場所をクリック/タップすると既存ルートのリストが選べるようになります。リストから使用する経路を選択後、経路表示ボタンを押すことで経路を確認することができます。",
		],
		[	// ページ2
			"2. 経路を確定する",
			"　経路が表示された後、確定ボタンを押すことで移動経路が確定します。",
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
	useEffect(() => {
		axios
			.get(RouteNameUrl)
			.then((res) => {
				console.log("res.data.succeeded", res.data.succeeded);
				console.log("res.data.routeName", res.data.routeName);
				setRouteName(res.data.routeName);
			})
			.catch((e) => console.log(e));
	}, []);

	const reqRoute = async (routename: string) => {
		const postdata = { routeName: routename };
		console.log("postdata", postdata);
		console.log("single", single);
		console.log("routeName", routeName);
		await axios
			.post(reqRouteUrl, postdata)
			.then((res) => {
				console.log("reqroute", res.data);
				setPoly(res.data.route);
				setPoint(res.data.dest);
			})
			.catch((e) => console.log(e));
	};

	return (
		<>
			<BaseHeader>
				<BaseButton onClick={backCarMenu} _className="exist-button button">
					戻る
				</BaseButton>

				<select
					id="sel"
					name="sel"
					onChange={(e) => {
						setSelect(e.target.value);
						setSingle(e.target.value);
						console.log("e.target.value", e.target.value);
					}}
					required
				>
					<option value={""} disabled selected hidden>ルートを選択</option>
					{routeName
						? routeName.map((route, key) => (
								<option value={route} key={key}>
									{route}
								</option>
						  ))
						: null}
				</select>

				<BaseButton onClick={() => reqRoute(single)} _className="exist-button button">
					経路表示
				</BaseButton>

				<BaseButton onClick={goRoute} _className="exist-button button">
					確定
				</BaseButton>
				
				<button
					onClick={(e: any) => openModal(e)}
					className="exist-button button"
				>
					使い方
				</button>
			</BaseHeader>
            
			{isModalOpen ? (
				<Modal
					closeHandler={closeModal}
					pageNum={2}
					titles={titles}
					text={text}
					modalID={"second"}
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
export default ExistsRoutePage;
