import React, { useContext, useState } from "react";
import { ChangeShortCut } from "../../../pages/_app";

// 外部でModalを呼び出す際に引数として必要となるプロパティ
interface Props {
	closeHandler: () => void; // Modal閉じる用関数
	pageNum: number; // ページ数
	titles: string[]; // タイトル
	text: string[]; // 説明文
	modalID?: string; // ModalID
}

// ページ毎のプロパティ
interface Pages {
	number: string; // ページ数
	title: string; // タイトル
	sentence: string; // 説明文
}

// Modal
export const Modal: React.FC<Props> = ({
	closeHandler,
	pageNum,
	titles,
	text,
	modalID,
}) => {
	// ページ数の確保
	const makePageNumArray = () => {
		const array = [];
		for (let i = 0; i < pageNum; i++) {
			array.push("page" + i);
		}
		return array;
	};

	const modalPages = makePageNumArray(); // 確保したページ数("page0","page1"...)
	const [modalName, setModalName] = useState(modalPages[0]); // 表示ページのステート
	const [backDisable, setBackDisabled] = useState(true); // 戻るボタンのdisableステート
	const [nextDisable, setNextDisabled] = useState(false); // 次へボタンのdisableステート
	const { firstPage, setFirstPage } = useContext(ChangeShortCut); // チェックボックスのステート(親から値と関数を貰う)
	const { secondPage, setSecondPage } = useContext(ChangeShortCut); // チェックボックスのステート(親から値と関数を貰う)
	const { thirdPage, setThirdPage } = useContext(ChangeShortCut); // チェックボックスのステート(親から値と関数を貰う)

	const selectChangeState = () => {
		let flag: boolean = false;
		if (modalID === "first") flag = firstPage;
		else if (modalID === "second") flag = secondPage;
		else flag = thirdPage;
		return flag;
	};
	const isChecked = selectChangeState();

	// フラグ切替 (チェックボックスのonChange属性)
	const onChangeShortCut = () => {
		if (modalID === "first") setFirstPage(!firstPage);
		else if (modalID === "second") setSecondPage(!secondPage);
		else setThirdPage(!thirdPage);
	};

	// ページ戻し用 (戻るボタンのonClick属性)
	const goBackPage = (event: any) => {
		setModalName((current) => {
			const index = modalPages.indexOf(current); // 現在表示しているページの要素数をもらう
			if (index === 1) setBackDisabled(true); // 最初のページでは戻るを押させない
			if (nextDisable) setNextDisabled(false); // 次へボタンの復帰
			return modalPages[index - 1]; // 前のページを返す
		});
		document.addEventListener("click", closeHandler);
		event.stopPropagation();
	};

	// ページ送り用 (次へボタンのonClick属性)
	const goNextPage = (event: any) => {
		setModalName((current) => {
			const index = modalPages.indexOf(current); // 現在表示しているページの要素数をもらう
			if (index === modalPages.length - 2) setNextDisabled(true); // 最後のページでは次へを押させない
			if (backDisable) setBackDisabled(false); // 戻るボタンの復帰
			return modalPages[index + 1]; // 次のページを返す
		});
		document.addEventListener("click", closeHandler);
		event.stopPropagation();
	};

	// ページの作成
	const makePages = (props: Pages) => {
		return (
			<>
				<div className={props.number}>
					<h2>{props.title}</h2>
					<p>{props.sentence}</p>
				</div>
			</>
		);
	};

	// ページの連結
	const concatPages = () => {
		const array = [];
		for (let i = 0; i < pageNum; i++) {
			array.push(
				makePages({
					number: modalPages[i],
					title: titles[i],
					sentence: text[i],
				})
			);
		}
		return array;
	};

	const modals = concatPages();

	// ページ表示
	const showPages = () => {
		for (let i = 0; i < modalPages.length; i++) {
			if (modalName === modalPages[i] && modals[i]) {
				return modals[i];
			}
		}
	};

	// css用にクラス名を付与する
	const getClassName = () => {
		let className = "";
		for(let i=0; i<modalName.length; i++){
			modalName === modalPages[i]
		}
		return className;
	}

	return (
		<>
			<div className="modal-container" onClick={closeHandler}>
				<div
					className="modal-body"
					onClick={(event) => {
						event.stopPropagation();
					}}
				>
					<div className="modal-page">{showPages()}</div>

					<div className="modal-footer">
						<input
							type="checkbox"
							id="short-cut"
							className={getClassName()}
							onChange={onChangeShortCut}
							checked={isChecked}
						/>
						<label htmlFor="short-cut">次から表示しない</label>
						<button
							onClick={(event) => {
								goBackPage(event);
							}}
							className="modal-button"
							disabled={backDisable}
						>
							戻る
						</button>
						<button
							onClick={(event) => {
								goNextPage(event);
							}}
							className="modal-button"
							disabled={nextDisable}
						>
							次へ
						</button>
						<button onClick={closeHandler} className="modal-button">
							閉じる
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
